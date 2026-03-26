# Golf Charity Subscription Platform

## 🚀 Overview
A full-stack web application that combines:
- Golf score tracking
- Monthly lottery draw system
- Charity contribution
- Subscription-based access

## 🛠 Tech Stack
- Frontend: Next.js + Tailwind CSS
- Backend: Supabase
- Payments: Stripe

## ✨ Features
- 🔐 Authentication (Supabase Auth)
- 📊 Score system (last 5 scores logic)
- 🎲 Draw system (random + weighted algorithm)
- ❤️ Charity selection system
- 💰 Stripe subscription
- 🧑‍💻 Admin panel

## 🧠 Key Logic
- Only latest 5 scores stored
- Draw system matches user scores
- Charity contributions stored per user

## 🧪 How to Run
```bash
npm install
npm run dev