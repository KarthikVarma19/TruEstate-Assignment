import { Request as ExpressRequest, Response as ExpressResponse } from "express";
import { getSales } from "../services/sale.service";
import { SaleQueryParams } from "../services/sale.service";

export const getAllSales = async (req: ExpressRequest, res: ExpressResponse) => {
  try {
    const {
      page,
      pageSize,
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

    // Convert numeric params if present
    const params = {
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
      sort: sort ? String(sort) : undefined,
      search: search ? String(search) : undefined,
      customerRegion: customerRegion ?? undefined,
      gender: gender ?? undefined,
      productCategory: productCategory ?? undefined,
      tags: tags ?? undefined,
      paymentMethod: paymentMethod ?? undefined,
      ageMin: ageMin ? Number(ageMin) : undefined,
      ageMax: ageMax ? Number(ageMax) : undefined,
      dateFrom: dateFrom ? String(dateFrom) : undefined,
      dateTo: dateTo ? String(dateTo) : undefined,
    };

    const result = await getSales(params as SaleQueryParams);
    return res.status(200).json(result);
  } catch (err) {
    console.error("getAllSales error:", err);
    return res.status(500).json({ message: "Failed to fetch sales data" });
  }
};
