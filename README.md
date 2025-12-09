# README.md

1. Overview (3–5 lines)

A fast, paginated sales data API and React frontend for viewing and analyzing transactional records. Supports full-text search, multi-select filters, server-side sorting, and paginated responses. Uses MongoDB for storage and Redis for caching to accelerate repeated queries.

2. Tech Stack

* Backend: Node.js, TypeScript, Express
* Database: MongoDB (Mongoose)
* Cache: Redis
* Frontend: React (TypeScript), Tailwind CSS
* Dev / Tools: TypeScript, ts-node, nodemon

3. Search Implementation Summary

Search is implemented server-side in the sales service. A `search` query parameter runs a case-insensitive partial match against `Customer Name` and `Phone Number` using MongoDB regular expressions (`$regex` with `$options: 'i'`). Optionally, this can be replaced with MongoDB text indexes and `$text` queries for faster and more robust full-text behavior.

4. Filter Implementation Summary

Filters are expressed as query parameters and translated into a MongoDB query object:

* Multi-select filters (customerRegion, gender, productCategory, tags, paymentMethod) use `$in` with an array of selected values.
* Range filters: `ageMin` / `ageMax` map to `Age.$gte` and/or `Age.$lte`.
* Date range: `dateFrom` / `dateTo` map to `Date.$gte` and/or `Date.$lte`. If `Date` in DB is stored as `Date`, inputs are parsed to `Date` objects and `dateTo` should include end-of-day.

5. Sorting Implementation Summary

Sorting is controlled via a `sort` parameter in the form `field_direction` (e.g. `date_desc`, `totalAmount_asc`). The backend maps client fields to MongoDB fields (e.g., `date` → `Date`, `totalAmount` → `Total Amount`) and applies the appropriate direction (`1` for asc, `-1` for desc). Default sort is `Date desc`.

6. Pagination Implementation Summary

Pagination uses `page` and `pageSize` query parameters. The service computes `skip = (page - 1) * pageSize` and `limit = pageSize`, and returns a `pagination` object: `{ page, pageSize, totalItems, totalPages }`. Cap `pageSize` server-side to prevent excessively large responses.

7. Setup Instructions

1. Clone the repo:

```bash
git clone https://github.com/KarthikVarma19/TruEstate-Assignment.git
cd backend
```

2. Install dependencies (locally):

```bash
npm install
```

> If deploying to Render or another host that installs only `dependencies`, either:
> * Configure the build to install dev dependencies: `npm install --include=dev && npm run build`

4. Create a `.env` file (example):

```
PORT=5555
API_URL="https://truestate-assignment-backend-n4p9.onrender.com/"
MONGO_URI="mongodb+srv://ganarajukarthikvarma1635_db_user:<password>@truestate-sales-cluster.ehmey3s.mongodb.net/?appName=truestate-sales-cluster"
REDIS_USERNAME=default
REDIS_PASSWORD=<password>
REDIS_HOST=redis-14647.crce182.ap-south-1-1.ec2.cloud.redislabs.com
REDIS_PORT=14647
```

5. Build and run (development):

```bash
npm run dev
```

6. Build and run (production):

```bash
npm run build
npm start
```
---