import { Request as ExpressRequest, Response as ExpressResponse } from "express";
import { checkRedisMemoryUsageUnderLimit, getRedisBuffer, setRedisBuffer } from "../config/redis.config";
import { Sale } from "../models/sale.model";

const toStringArray = (value: any): string[] | undefined => {
  if (!value) return undefined;
  if (Array.isArray(value)) return value.map(String);
  return [String(value)];
};

export const getAllSales = async (req: ExpressRequest, res: ExpressResponse) => {
  try {
    const {
      page = 1,
      pageSize = 10,
      sort,
      search,
      customerRegion,
      gender,
      productCategory,
      tags,
      paymentMethod,
      ageMin,
      ageMax,
      dateFrom,
      dateTo,
    } = req.query;

    const redisKey = `sales?page=${page}&pageSize=${pageSize}&sort=${sort}&search=${search}&customerRegion=${customerRegion}&gender=${gender}&productCategory=${productCategory}&tags=${tags}&paymentMethod=${paymentMethod}&ageMin=${ageMin}&ageMax=${ageMax}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
    const cachedRedisValue = await getRedisBuffer(redisKey);
    if (cachedRedisValue !== null) {
      const responseCachedData = JSON.parse(cachedRedisValue.toString());  
      return res.status(200).json(responseCachedData);
    }

    const pageNum = Number(page) || 1;
    const limit = Number(pageSize) || 10;
    const skip = (pageNum - 1) * limit;

    const query: any = {};

    if (search) {
      const s = String(search);
      query.$or = [
        { "Customer Name": { $regex: s, $options: "i" } },
        { "Phone Number": { $regex: s, $options: "i" } },
      ];
    }

    // multi-select filters
    const regionArr = toStringArray(customerRegion);
    if (regionArr?.length) {
      query["Customer Region"] = { $in: regionArr };
    }

    const genderArr = toStringArray(gender);
    if (genderArr?.length) {
      query["Gender"] = { $in: genderArr };
    }

    const categoryArr = toStringArray(productCategory);
    if (categoryArr?.length) {
      query["Product Category"] = { $in: categoryArr };
    }

    const tagsArr = toStringArray(tags);
    if (tagsArr?.length) {
      query["Tags"] = { $in: tagsArr };
    }

    const paymentArr = toStringArray(paymentMethod);
    if (paymentArr?.length) {
      query["Payment Method"] = { $in: paymentArr };
    }

    // age range
    const minAge = ageMin ? Number(ageMin) : undefined;
    const maxAge = ageMax ? Number(ageMax) : undefined;
    if (minAge !== undefined || maxAge !== undefined) {
      query["Age"] = {};
      if (minAge !== undefined) query["Age"].$gte = minAge;
      if (maxAge !== undefined) query["Age"].$lte = maxAge;
    }

    // date range (YYYY-MM-DD strings)
    if (dateFrom || dateTo) {
      query["Date"] = {};
      if (dateFrom) query["Date"].$gte = String(dateFrom);
      if (dateTo) query["Date"].$lte = String(dateTo);
    }

    // sort
    const sortObj: any = {};
    if (sort) {
      const [field, dir] = (sort as string).split("_");
      const dirNum = dir === "desc" ? -1 : 1;

      const sortMap: Record<string, string> = {
        date: "Date",
        totalAmount: "Total Amount",
        quantity: "Quantity",
        customerName: "Customer Name",
        age: "Age",
      };

      const mongoField = sortMap[field ?? ""];
      if (mongoField) {
        sortObj[mongoField] = dirNum;
      }
    }

    if (Object.keys(sortObj).length === 0) {
      sortObj["Date"] = -1;
    }

    //  DB query
    const [items, total] = await Promise.all([
      Sale.find(query).sort(sortObj).skip(skip).limit(limit).lean(),
      Sale.countDocuments(query),
    ]);

    const data = items.map((d) => ({
      transactionId: d["Transaction ID"],
      date: d["Date"],
      customerId: d["Customer ID"],
      customerName: d["Customer Name"],
      phoneNumber: d["Phone Number"],
      gender: d["Gender"],
      age: d["Age"],
      productCategory: d["Product Category"],
      quantity: d["Quantity"],
      totalAmount: d["Total Amount"],
      customerRegion: d["Customer Region"],
      productId: d["Product ID"],
      employeeName: d["Employee Name"],
    }));

    const response = {
      data,
      pagination: {
        page: pageNum,
        pageSize: limit,
        totalItems: total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    };
    if (await checkRedisMemoryUsageUnderLimit()) {
      await setRedisBuffer(redisKey, Buffer.from(JSON.stringify(response)));      
    }
    return res.json(response);
  } catch (err) {
    console.error("getAllSales error:", err);
    return res.status(500).json({ message: "Failed to fetch sales data" });
  }
};