# 💊 Pharmacy Backend API

## 🚀 Overview

This project is a backend API for a pharmacy system built using **NestJS** and **MongoDB**.
It supports user authentication, guest users, and order management with a scalable modular architecture.

---

## 🛠 Tech Stack

* **Backend Framework:** NestJS
* **Database:** MongoDB (Mongoose)
* **Authentication:** JWT (JSON Web Token)
* **Validation:** class-validator
* **API Docs:** Swagger

---

## 📦 Features

* 🔐 User Authentication (Login / Signup)
* 👤 Guest User Support (GuestId-based flow)
* 🛒 Order Creation & Tracking
* 📡 RESTful API Structure
* 📄 Swagger API Documentation
* ✅ Request Validation using DTOs

---

## 📁 Project Structure

```
src/
 ├── auth/        # Authentication module
 ├── users/       # User management
 ├── orders/      # Order handling
 ├── common/      # Shared utilities
 ├── config/      # App configuration
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/sunny-gil/pharmacy-backend.git
cd pharmacy-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file in root:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4. Run the project

```bash
npm run start:dev
```

---

## 📚 API Documentation (Swagger)

After running the server, open:

```
http://localhost:3000/api-docs
```

👉 Use this to test all APIs directly from browser.

---

## 🔑 Authentication Flow

* User registers or logs in
* Server returns JWT token
* Protected routes require `Authorization: Bearer <token>`

---

## 👤 Guest User Logic

* Guest users are identified using a **GuestId**
* Enables order tracking without login
* Can be extended to merge with user account later

---

## 📌 Important Notes

* `.env` file is not included for security reasons
* Do not commit sensitive data
* Use proper validation for all inputs

---

## 📬 Sample API Endpoints

### Auth

* `POST /auth/register`
* `POST /auth/login`

### Orders

* `POST /orders`
* `GET /orders/:id`

---

## 🚧 Future Improvements

* Role-based access (Admin/User)
* Payment integration
* Order history dashboard
* Deployment (AWS / Render)

---

## 👨‍💻 Author

Sunny

---
