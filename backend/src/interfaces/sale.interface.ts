import { DeliveryType, OrderStatus, PaymentMethod, ProductCategory, CustomerType, CustomerRegion, Gender } from "../constants/enum";

export interface ISale {
  "Transaction ID": string;
  "Date": string; 

  "Customer ID": string;
  "Customer Name": string;
  "Phone Number": string;
  "Gender": Gender;
  "Age": number;
  "Customer Region": CustomerRegion;
  "Customer Type": CustomerType;

  "Product ID": string;
  "Product Name": string;
  "Brand": string;
  "Product Category": ProductCategory;
  "Tags": string[]; 

  "Quantity": number;
  "Price per Unit": number;
  "Discount Percentage": number;
  "Total Amount": number;
  "Final Amount": number;

  "Payment Method": PaymentMethod;
  "Order Status": OrderStatus;
  "Delivery Type": DeliveryType;

  "Store ID": string;
  "Store Location": string;

  "Salesperson ID": string;
  "Employee Name": string;
}