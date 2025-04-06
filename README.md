# 🐶 Pet Adoption Platform

A full-stack web platform that connects lovable pets with their future families. This platform simplifies the adoption process with seamless payments, intelligent assistance, and a user-friendly interface.

## 🌟 Features

### 🐾 Adoption Experience
- Browse a variety of pets with detailed profiles.
- Filter pets by type, breed, age, and availability.
- Click "Adopt Now" to auto-fill adopter details, pet info, and initiate the payment process.

### 💳 Smart Payment Integration
- Multiple payment methods: **Card, UPI, MetaMask (Crypto Wallet)**
- Auto-filled payment forms for quick transactions.
- Secure transactions stored in **MongoDB**.
- Dynamic **receipt generation** with:
  - Pet name
  - Adopter name
  - User ID
  - Payment date
  - Scheduled adoption date
  - Amount

### 🤖 AI-Powered Assistance
- Built-in **AI Chatbot** for:
  - Answering adoption-related queries
  - Guiding users through the process
  - Providing support in real-time

### 📊 Admin Dashboard *(optional feature)*
- Manage pet listings
- View adoption statistics
- Track payments and scheduled adoptions

---

## 🛠️ Tech Stack

### Frontend
- **ReactJS**
- **Tailwind CSS**

### Backend
- **Node.js** + **Express.js**
- **MongoDB** (Mongoose for ODM)

### AI
- Integrated chatbot powered by OpenAI API (or similar)

### Blockchain (MetaMask Integration)
- Ethereum-based wallet connection
- Web3.js or Ethers.js for smart payment support

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Dhravya285/pet-ai.git
cd pet-ai
