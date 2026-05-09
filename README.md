# Abhyudaya Pharmacy - Modernized Backend API 🚀

Welcome to the official backend repository for the Abhyudaya Pharmacy platform. This API has been built using **NestJS** and **MongoDB**, following industry-standard practices for performance, documentation, and scalability.

---

## 🌟 Key Features

### 1. High-Performance Caching ⚡
- **Server-Side Caching**: Integrated `@nestjs/cache-manager` to minimize database hits for frequently accessed content.
- **Smart Invalidation**: Cache for modules like Products and Blogs is automatically cleared upon any data modification (`POST`, `PATCH`, `DELETE`).
- **Global TTL**: Standardized 10-minute cache for content-heavy modules.

### 2. Interactive API Documentation 📚
- **Swagger Integration**: Full OpenAPI documentation is available.
- **API Playground**: Test all endpoints directly from the browser.
- **Endpoint**: Access it at `/api/docs` when the server is running.

### 3. Standardized API Responses 🏛️
- **Global Response Interceptor**: All successful responses follow the format `{ success: true, data: [...] }`.
- **Global Exception Filter**: Consistent error handling with clear messages for the frontend.

### 4. Robust Security 🔐
- **JWT Authentication**: Secured user-specific modules (Cart, Orders, Profile).
- **Password Hashing**: Industry-standard `bcrypt` encryption for user security.

---

## 📂 Module Overview

### 🛍️ Content Modules (Cached)
- **Products**: Complete catalog management with category filtering.
- **Blogs**: Health and wellness articles for user engagement.
- **Services**: Healthcare services offered by Abhyudaya.
- **News**: Latest updates and announcements.
- **Testimonials**: User reviews and feedback.
- **Home Slides**: Dynamic hero section slider management.

### 🛒 E-Commerce & User Features
- **Cart**: User-specific shopping cart logic (Persistent in DB).
- **Orders**: Seamless checkout process with order history and status tracking.
- **Notifications**: System alerts for order updates and announcements.
- **Users & Profile**: Secure profile management and authentication.

### ℹ️ Informational Modules
- **About**: Manageable "About Us" content, mission, vision, and team details.
- **Contact**: User inquiry handling.

---

## 🛠️ Technology Stack

- **Framework**: [NestJS](https://nestjs.com/) (Node.js)
- **Database**: [MongoDB](https://www.mongodb.com/) with Mongoose ODM
- **Documentation**: [Swagger UI](https://swagger.io/)
- **Caching**: [Cache Manager](https://github.com/BryanDonovan/node-cache-manager)
- **Validation**: [Class Validator](https://github.com/typestack/class-validator)
- **Security**: Passport.js & JWT

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas or Local instance
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Run the application**
   ```bash
   # Development mode
   npm run start:dev

   # Production build
   npm run build
   ```

5. **Access API Docs**
   Open your browser and navigate to:
   `http://localhost:5000/api/docs`

---

## 🏗️ Folder Structure

```text
src/
├── common/           # Interceptors, Filters, Guards
├── modules/v1/       # Versioned API modules
│   ├── auth/         # Login/Registration
│   ├── cart/         # Shopping Cart
│   ├── orders/       # Order Tracking
│   └── ...           # All other feature modules
├── app.module.ts     # Main application module
└── main.ts           # Entry point (Swagger & Global settings)
```

---

## 👨‍💻 Developed for
**Abhyudaya Pharmacy** - Modernizing Ayurvedic Healthcare.
