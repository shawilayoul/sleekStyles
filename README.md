# 🛍️ Clothing E-Commerce Website

**Live Demo**: [https://sleekstyle.onrender.com/](https://sleekstyle.onrender.com/)

A full-stack modern clothing e-commerce platform built with **React**, **Tailwind CSS**, **Node.js**, **Express**, **MongoDB**, and **Firebase**.

## 🚀 Project Overview

This project is a feature-rich, responsive clothing e-commerce website designed to deliver a seamless shopping experience for customers and efficient management tools for administrators.

### 🔧 Key Features

- **Modern UI/UX**: Built with React and Tailwind CSS for a sleek, responsive, and intuitive interface.
- **Secure Backend**: Node.js and Express power a robust backend API.
- **Database**: MongoDB for managing products, users, and orders.
- **Image Hosting**: Firebase Storage for secure and scalable image hosting.
- **Admin Dashboard**: Custom-built dashboard for managing products and orders.
- **Seller Access Control**: Sellers must request permission to access the admin dashboard. Only after admin approval can they list and manage products.
- **Scalable Architecture**: Built for future expansion and easy maintenance.

### 💡 Seller Access Flow

1. Seller registers an account on the platform.
2. Seller submits a request to access the admin dashboard.
3. Admin reviews the request and approves or rejects it.
4. Approved sellers can add, edit, or delete their own products through the dashboard.

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Image Storage**: Firebase

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   https://github.com/shawilayoul/sleekStyles.git
   cd your-repo
2. **Install dependencies**
cd client
npm install

cd ../server
npm install

3. **Add environment variables**

Create a .env file in both client and server directories with your Firebase and MongoDB configurations.

4. **Run the project**

**In the server directory**
npm run dev

**In the client directory**
npm start

## 📄 License
   This project is open-source and available under the MIT License.
