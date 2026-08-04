# 🛍️ ShopSmart – MERN E-Commerce Web Application

A full-stack eCommerce web application built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). The application provides a complete shopping experience with secure authentication, cart management, order processing, and an admin dashboard.

---

## 🚀 Features

### 👤 User Features

* User Registration & Login with JWT Authentication
* Browse and view products
* Product details page
* Add/Remove products from cart
* Place orders with delivery information
* Cash on Delivery (COD)
* View order history
* User profile
* Newsletter subscription
* Dark/Light mode



### 🛠️ Admin Features

* Secure admin-only access
* View all users
* View all orders
* Mark orders as delivered
* Delete products
* Dashboard with total users, orders, products, and sales

---

## 🛠️ Tech Stack

### Frontend

* React.js (Vite)
* Tailwind CSS
* React Router

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcrypt

### Database

* MongoDB
* Mongoose

---

## 📂 Database Collections

* **Users** – User information, authentication, and roles
* **Products** – Product information
* **Orders** – Orders, shipping details, and payment information
* **Subscribers** – Newsletter subscriptions

---

## 🔒 Authentication

* JWT-based authentication
* Password hashing using bcrypt
* Protected user routes
* Role-based admin authorization

---

## 📸 Screenshots


* Home Page
<img width="1902" height="910" alt="Screenshot 2026-07-28 185700" src="https://github.com/user-attachments/assets/ae59e328-7459-46ae-9563-9a39179d838e" />

* Product Details
<img width="1913" height="910" alt="Screenshot 2026-07-28 185732" src="https://github.com/user-attachments/assets/d1533b53-2b60-43b3-a994-07cae20ae9e2" />
<img width="1906" height="955" alt="Screenshot 2026-07-28 185750" src="https://github.com/user-attachments/assets/a8c1102f-cb05-4c37-b93a-31c10fc3a223" />


* Cart
<img width="1907" height="892" alt="Screenshot 2026-07-28 185809" src="https://github.com/user-attachments/assets/2ed4cd13-7cca-4d76-8fdb-1c62ebf27a8d" />
* login
<img width="1908" height="918" alt="Screenshot 2026-08-03 192744" src="https://github.com/user-attachments/assets/fe35eff9-5370-493b-89bd-9c76494b8a6e" />


---

## 📦 Installation

### Clone the repository

```bash
git clone https://github.com/<Kharini-24>/<Fullstack-Ecommerce>.git
```

### Install Frontend

```bash
cd frontend
npm install
npm run dev
```

### Install Backend

```bash
cd backend
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend directory:

```env
MONGO_URI=mongodb://localhost:27017/ecommerce_new
JWT_SECRET=mysuperkey123
PORT=5000
```


## 📈 Future Improvements

* Stripe Payment Integration
* Razorpay Payment Integration
* Product Filtering & Sorting
* Product Reviews & Ratings
* Inventory Management
* Order Tracking

---

## 👩‍💻 Author

**Harini K**
