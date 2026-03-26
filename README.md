# 🎯 Golf Charity Subscription Platform

## 🚀 Overview

This is a full-stack web application where users can:

* Add and manage golf scores
* Participate in a draw system
* Support charities
* Subscribe using Stripe payments

The platform is built using modern technologies and demonstrates full-stack development skills.

---

## 🛠 Tech Stack

* Frontend: Next.js + Tailwind CSS
* Backend: Supabase (Auth + Database)
* Payments: Stripe (Test Mode)

---

## ✨ Features

* 🔐 User Authentication (Signup/Login)
* 📊 Score Management (only last 5 scores are stored)
* 🎲 Lottery Draw System (weighted + random logic)
* ❤️ Charity Selection & Contribution
* 💰 Stripe Payment Integration
* 🧑‍💻 Basic Admin Panel

---

## 🧠 Core Logic

* The system keeps only the latest 5 scores per user
* A draw is generated and matched against user scores
* Weighted algorithm increases chances based on past inputs
* Charity selection is stored per user

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone <https://github.com/Himangshu001/golf-platform.git>
cd golf-platform
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Add Environment Variables

Create a `.env.local` file in the root directory and add:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

---

### 4. Run the project

```bash
npm run dev
```

---

## 🌐 How to Use the Application

1. Sign up or log in
2. Add scores (between 1–45)
3. Maintain at least 5 scores
4. Click **Run Draw** to see results
5. Select a charity and save it
6. Click **Subscribe** to test payment flow

---

## 💳 Testing Payments (Stripe)

This project uses Stripe in test mode, so no real money is required.

When you click the **Subscribe** button, you will be redirected to the Stripe checkout page.

You can use the following test card details:

* Card Number: 4242 4242 4242 4242
* Expiry Date: Any future date (e.g., 12/34)
* CVV: Any 3 digits (e.g., 123)
* ZIP Code: Any value

The payment will be successfully simulated, and no actual money will be deducted.

---

## 🗄 Database Setup (Supabase)

Make sure you have created the following tables:

### 1. scores

* id (uuid, primary key)
* user_id (uuid)
* score (int)
* date (date)

### 2. charities

* id (uuid)
* name (text)
* description (text)

### 3. user_charity

* id (uuid)
* user_id (uuid)
* charity_id (uuid)
* percentage (int)

Also ensure Row Level Security (RLS) policies are enabled.

---

## 🚀 Deployment

* Deploy using Vercel
* Add environment variables in Vercel dashboard
* Connect Supabase backend

---

## 📌 Notes

* Stripe is used in test mode only
* No real payments are processed
* This project is intended for learning and demonstration purposes

---

## 👨‍💻 Author
Himangshu Pramanik