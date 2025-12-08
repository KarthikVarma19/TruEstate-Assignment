import mongoose, { Schema } from "mongoose";

export interface ISale {
  "Transaction ID": string;
  "Date": string; 

  "Customer ID": string;
  "Customer Name": string;
  "Phone Number": string;
  "Gender": string;
  "Age": number;
  "Customer Region": string;
  "Customer Type": string;

  "Product ID": string;
  "Product Name": string;
  "Brand": string;
  "Product Category": string;
  "Tags": string[]; 

  "Quantity": number;
  "Price per Unit": number;
  "Discount Percentage": number;
  "Total Amount": number;
  "Final Amount": number;

  "Payment Method": string;
  "Order Status": string;
  "Delivery Type": string;

  "Store ID": string;
  "Store Location": string;

  "Salesperson ID": string;
  "Employee Name": string;
}

const SaleSchema = new Schema<ISale>(
  {
    "Transaction ID": { type: String, required: true, unique: true },
    "Date": { type: String, required: true },

    "Customer ID": { type: String, required: true },
    "Customer Name": { type: String, required: true },
    "Phone Number": { type: String, required: true },
    "Gender": { type: String, required: true },
    "Age": { type: Number, required: true },
    "Customer Region": { type: String, required: true },
    "Customer Type": { type: String, required: true },

    "Product ID": { type: String, required: true },
    "Product Name": { type: String, required: true },
    "Brand": { type: String, required: true },
    "Product Category": { type: String, required: true },

    "Tags": { type: [String], required: true },

    "Quantity": { type: Number, required: true },
    "Price per Unit": { type: Number, required: true },
    "Discount Percentage": { type: Number, required: true },
    "Total Amount": { type: Number, required: true },
    "Final Amount": { type: Number, required: true },

    "Payment Method": { type: String, required: true },
    "Order Status": { type: String, required: true },
    "Delivery Type": { type: String, required: true },

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
