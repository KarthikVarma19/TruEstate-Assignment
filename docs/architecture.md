# /docs/architecture.md

## Backend architecture

The backend follows a layered architecture:

* **Entry (index.ts)**: boots the Express app, middleware (helmet, cors, morgan), global error handler, and connects to MongoDB and Redis.
* **Routes**: lightweight route definitions that map HTTP endpoints to controllers.
* **Controllers**: handle HTTP details — parse request, validate inputs, call service functions, and return HTTP responses.
* **Services**: contain business logic such as building MongoDB queries, applying filters/sorting/pagination, performing DB queries, caching logic (Redis), and mapping DB documents to DTOs.
* **Models**: Mongoose schemas and models for domain entities (e.g., Sale).
* **Config**: configuration files for MongoDB, Redis, environment variables and helper utilities.
* **Middlewares**: request logging, error handling, input validation, and authentication (if present).

## Frontend architecture

The frontend follows a component-driven structure (React + TypeScript):

* **Pages / Routes**: top-level routes (SalesList, SaleDetail, Dashboard)
* **Components**: reusable UI components (Table, Pagination, FiltersPanel, SearchInput, SortDropdown)
* **Services / API layer**: functions that call backend endpoints (e.g., `salesService.getAllSales(params)`), handle query serialization, and error handling.
* **State management**: lightweight local state via hooks; optional global state via Context or a state manager (e.g., Zustand/Redux) for complex state like auth and shared filters.
* **Styles**: Tailwind or CSS modules for scoped styling.

## Data flow

1. User interacts with UI (search text, selects filters, changes page/sort).
2. Frontend builds query params and calls the backend API: `/api/sales?page=1&pageSize=10&search=...&sort=date_desc&customerRegion=South&...`.
3. Express route -> Controller extracts and normalizes params -> Service.
4. Service builds MongoDB query & sort object, computes pagination (`skip`, `limit`).
5. Service checks Redis cache for an existing response using a deterministic cache key. If found, returns cached response.
6. If not cached, the service queries MongoDB (with proper indexes), maps results to DTOs, stores a cached copy in Redis (if memory limits allow), and returns the response.
7. Controller sends JSON to frontend, which renders the table, pagination controls, and filter states.

## Folder structure

```
backend/
├── src/
│   ├── config/
│   │   ├── mongodb.config.ts
│   │   └── redis.config.ts
│   ├── controllers/
│   │   └── sales.controller.ts
│   ├── middlewares/
│   │   └── errorHandler.ts
│   ├── models/
│   │   └── sale.model.ts
│   ├── routes/
│   │   └── sales.routes.ts
│   ├── services/
│   │   └── sale.service.ts
│   ├── scripts/
│   │   └── sales-csv-importer.ts
│   ├── utils/
│   │   └── apiResponse.ts
│   ├── index.ts
│   └── env.ts
└── package.json
```

## Module responsibilities

* **index.ts**: App bootstrap — loads env, connects to DB/Redis, starts Express.
* **config/**: Contains connection logic and helper utilities for MongoDB and Redis.
* **routes/**: Define HTTP endpoints and attach controllers.
* **controllers/**: Validate and normalize HTTP inputs; call services and format responses.
* **services/**: All business logic: build queries, call models, caching, map to DTOs.
* **models/**: Mongoose schemas and exports of model objects.
* **middlewares/**: Centralized error handling, request logging, and auth/validation hooks.
* **scripts/**: One-off scripts (CSV importer) used for data seeding and migration.
* **utils/**: Shared utilities like response formatters and helpers.

---