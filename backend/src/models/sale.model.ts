import mongoose, { Schema } from "mongoose";
import { Gender, CustomerRegion, ProductCategory, PaymentMethod, CustomerType, OrderStatus, DeliveryType } from "../constants/enum";
import { ISale } from "../interfaces/sale.interface";

const SaleSchema = new Schema<ISale>(
  {
    "Transaction ID": { type: String, required: true, unique: true },
    "Date": { type: String, required: true },

    "Customer ID": { type: String, required: true },
    "Customer Name": { type: String, required: true },
    "Phone Number": { type: String, required: true },
    "Gender": { type: String, enum: Object.values(Gender), required: true },
    "Age": { type: Number, required: true },
    "Customer Region": { type: String, enum: Object.values(CustomerRegion), required: true },
    "Customer Type": { type: String, enum: Object.values(CustomerType), required: true },

    "Product ID": { type: String, required: true },
    "Product Name": { type: String, required: true },
    "Brand": { type: String, required: true },
    "Product Category": { type: String, enum: Object.values(ProductCategory), required: true },

    "Tags": { type: [String], required: true },

    "Quantity": { type: Number, required: true },
    "Price per Unit": { type: Number, required: true },
    "Discount Percentage": { type: Number, required: true },
    "Total Amount": { type: Number, required: true },
    "Final Amount": { type: Number, required: true },

    "Payment Method": { type: String, enum: Object.values(PaymentMethod), required: true },
    "Order Status": { type: String, enum: Object.values(OrderStatus), required: true },
    "Delivery Type": { type: String, enum: Object.values(DeliveryType), required: true },

    "Store ID": { type: String, required: true },
    "Store Location": { type: String, required: true },

    "Salesperson ID": { type: String, required: true },
    "Employee Name": { type: String, required: true },
  },
  { timestamps: false }
);

// indexes for filters/sorting
SaleSchema
  .index({ "Date": 1 })
  .index({ "Customer Region": 1 })
  .index({ "Gender": 1 })
  .index({ "Age": 1 })
  .index({ "Product Category": 1 })
  .index({ "Payment Method": 1 })
  .index({ "Total Amount": 1 })
  .index({ "Customer Name": "text", "Phone Number": "text" })
  .index({ "Phone Number": 1 });

export const Sale = mongoose.model<ISale>("Sale", SaleSchema);
