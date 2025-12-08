import mongoose from "mongoose";
import { createReadStream } from "fs";
import { parse } from "csv-parse";
import { Sale } from "../models/sale.model"; // 👈 flat collection model
import { APP_CONFIG } from "../env";

const MONGODB_URI = APP_CONFIG.MONGO_URI;
const CSV_PATH = `${__dirname}/../data/truestate_assignment_dataset.csv`;
const BATCH_SIZE = 1000;

async function main() {
  await mongoose.connect(MONGODB_URI, {
    dbName: "truestate-sales-db",
  });
  console.log("Connected to MongoDB");

  const parser = createReadStream(CSV_PATH)
    .pipe(
      parse({
        columns: true, 
        trim: true,
      })
    );

  let saleFlatOps: any[] = [];
  let rowCount = 0;

  for await (const row of parser) {
    rowCount++;

    const transactionId = String(row["Transaction ID"]);
    const date = String(row["Date"]); 

    const customerId = row["Customer ID"];
    const customerName = row["Customer Name"];
    const phoneNumber = String(row["Phone Number"]);
    const gender = row["Gender"];
    const age = Number(row["Age"]);
    const customerRegion = row["Customer Region"];
    const customerType = row["Customer Type"];

    const productId = row["Product ID"];
    const productName = row["Product Name"];
    const brand = row["Brand"];
    const productCategory = row["Product Category"];
    const tagsRaw = row["Tags"] as string;
    const tags =
      tagsRaw && typeof tagsRaw === "string"
        ? tagsRaw
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [];

    const quantity = Number(row["Quantity"]);
    const pricePerUnit = Number(row["Price per Unit"]); // note lowercase 'per'
    const discountPercentage = Number(row["Discount Percentage"]);
    const totalAmount = Number(row["Total Amount"]);
    const finalAmount = Number(row["Final Amount"]);

    const paymentMethod = row["Payment Method"];
    const orderStatus = row["Order Status"];
    const deliveryType = row["Delivery Type"];

    const storeId = row["Store ID"];
    const storeLocation = row["Store Location"];

    const salespersonId = String(row["Salesperson ID"]);
    const employeeName = row["Employee Name"];


    saleFlatOps.push({
      updateOne: {
        filter: { "Transaction ID": transactionId },
        update: {
          $set: {
            "Transaction ID": transactionId,
            "Date": date,

            "Customer ID": customerId,
            "Customer Name": customerName,
            "Phone Number": phoneNumber,
            "Gender": gender,
            "Age": age,
            "Customer Region": customerRegion,
            "Customer Type": customerType,

            "Product ID": productId,
            "Product Name": productName,
            "Brand": brand,
            "Product Category": productCategory,
            "Tags": tags,

            "Quantity": quantity,
            "Price per Unit": pricePerUnit,
            "Discount Percentage": discountPercentage,
            "Total Amount": totalAmount,
            "Final Amount": finalAmount,

            "Payment Method": paymentMethod,
            "Order Status": orderStatus,
            "Delivery Type": deliveryType,

            "Store ID": storeId,
            "Store Location": storeLocation,

            "Salesperson ID": salespersonId,
            "Employee Name": employeeName,
          },
        },
        upsert: true, 
      },
    });

    if (rowCount === 1) {
      console.log("First row parsed:", row);
    }

    if (rowCount % BATCH_SIZE === 0) {
      await flushFlat({ saleFlatOps });
      console.log(`Flushed ${rowCount} rows into SaleFlat...`);
    }
  }

 
  await flushFlat({ saleFlatOps });

  console.log(`Import completed. Total rows: ${rowCount}`);
  await printCounts();
  await mongoose.disconnect();
}

async function flushFlat({ saleFlatOps }: { saleFlatOps: any[] }) {
  const promises: Promise<any>[] = [];

  if (saleFlatOps.length) {
    promises.push(
      Sale.bulkWrite(saleFlatOps, { ordered: false }).then((res) => {
        console.log("SaleFlat bulk:", {
          inserted: res.insertedCount,
          upserted: Object.keys(res.upsertedIds || {}).length,
          matched: res.matchedCount,
          modified: res.modifiedCount,
        });
      })
    );
  }

  if (promises.length) {
    await Promise.all(promises);
  }

  saleFlatOps.length = 0; 
}

async function printCounts() {
  const flatCount = await Sale.countDocuments();
  console.log("SaleFlat documents:", flatCount);
}

main().catch((err) => {
  console.error("Error while importing CSV into SaleFlat:", err);
  process.exit(1);
});
