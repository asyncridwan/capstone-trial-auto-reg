# AutoReg Capstone Project

A vehicle registration backend API built with Node.js, Express, and MongoDB. This project supports user authentication, vehicle registration, approval workflows, inspections, payments, renewals, transfers, and audit logging.

## Features

- User registration and login with JWT authentication
- Role-based access control for admin, staff, and regular users
- Vehicle creation, retrieval, update, deletion, and search
- Administrative approval and rejection of vehicle registrations
- Inspection workflow management
- Payment initialization and verification
- Renewal requests for registered vehicles
- Vehicle transfer requests and approvals
- Audit log retrieval for admin users

## Project Structure

- `server.js` - application entry point
- `src/config/db.js` - MongoDB connection
- `src/routes/` - API route definitions
- `src/controllers/` - request handlers
- `src/middlewares/` - authentication, authorization, validation, and error handling
- `src/models/` - Mongoose models
- `src/services/` - business logic and helper services
- `src/utility/` - utilities for certificate, plate, and transaction generation
- `src/validators/` - request validation logic

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB instance or Atlas cluster

### Install dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file at the project root and set the following variables:

```env
PORT=5000
MONGODB_URL=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
EMAIL_USER=<email-for-smtp>
EMAIL_PASS=<email-password>
```

> If you do not use email features right away, `EMAIL_USER` and `EMAIL_PASS` can remain unset until needed.

### Run the server

```bash
node server.js
```

The app will start on the configured `PORT` or default to `5000`.

## API Endpoints

### Authentication

- `POST /auth/register` - register a new user
- `POST /auth/login` - login and receive a JWT token

### Vehicle Management

- `POST /vehicle/` - create a new vehicle (authenticated)
- `GET /vehicle/` - get vehicles for the current user (authenticated)
- `GET /vehicle/:id` - get a vehicle by ID (authenticated)
- `PUT /vehicle/:id` - update a vehicle by ID (authenticated)
- `DELETE /vehicle/:id` - delete a vehicle by ID (authenticated)
- `GET /vehicle/search` - search vehicles (authenticated)

### Admin Routes

- `PATCH /admin/approve/:id` - approve a vehicle registration (admin or staff)
- `PATCH /admin/reject/:id` - reject a vehicle registration (admin only)
- `GET /admin/stats` - get admin statistics (admin only)

### Staff Routes

- `GET /staff/vehicles` - list all vehicles (staff/admin)
- `PATCH /staff/review/:id` - review a vehicle (staff/admin)

### Inspection

- `PATCH /inspection/start/:id` - mark an inspection as started (staff/admin)
- `PATCH /inspection/complete/:id` - mark an inspection as completed (staff/admin)

### Payments

- `POST /payments/initialize` - initialize a payment (authenticated)
- `PATCH /payments/verify/:paymentId` - verify payment status (staff/admin)

### Renewals

- `POST /renewals/:vehicleId` - request a renewal for a vehicle (authenticated)

### Transfers

- `POST /transfers/request/:vehicleId` - request a vehicle transfer (authenticated)
- `PATCH /transfers/approve/:transferId` - approve a transfer (staff/admin)

### Audit

- `GET /audit/` - retrieve audit logs (admin only)

## Notes

- Most routes require JWT authentication via the `Authorization` header.
- Admin and staff roles are enforced by middleware in protected routes.
- The database connection string is loaded from `process.env.MONGODB_URL`.

## Future Improvements

- Add automated tests and a proper test script
- Add request/response examples for each endpoint
- Add a frontend interface or API documentation UI

## License

This project is currently licensed under ISC.
