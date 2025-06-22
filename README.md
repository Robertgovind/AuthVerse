# 🔐 AuthVerse - Email/Password Authentication (Backend Only)

AuthVerse is a modular, backend-only authentication API built using **Node.js**, **Express**, **MongoDB**, and **JWT**.  
This project implements a secure authentication based on**Email/Password-based authentication system**, **OAuth (Social Login (google, gitHub, facebook))**, **Magic Link Authentication**, **OTP based Login**, **Two-Factor Authentication(2FA)**

---

## ✅ Features

- User Registration with hashed password
- User Login with JWT token
- JWT-based Protected Routes
- OAuth (Social Login(Google, gitHub, Facebook))
- Magic Link Authentication
- OTP Based Login
- Two-Factor Authentication(2FA)
- Basic Error Handling
- Clean Project Structure

---

## 🧱 Tech Stack

- Node.js + Express
- MongoDB (via Mongoose)
- JWT (jsonwebtoken)
- bcryptjs for password hashing
- dotenv for environment configs
- express-validator (optional)
- Nodemailer (email sending)
- Passport.js (for OAuth)

---

## 📂 Folder Structure

## 🛠 Setup Instructions

### 1. **Clone the repository:**

```bash
git clone https://github.com/Robertgovind/AuthVerse.git
cd AuthVerse
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create .env file

```bash
PORT=4000
MONGO_URI=mongodb://localhost:27017/authverse
JWT_SECRET=your_jwt_secret

GOOGLE_ID=your_google_client_id
GOOGLE_SECRET=your_google_client_secret

GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret

```

### 4. Run the Server

``` bash
npm run dev

```

## API Endpoints

### 1. Email/Password(JWT)

- POST /api/auth/user/register  
   Body:{ "email": "", "password":"" }

- POST /api/auth/user/login  
   Body:{ "email": "", "password":"" }

### 2. Social Login(google, github, facebook)

## 🙋‍♂️ Author

## Govind Kr Yadav

🔗 [LinkedIn](https://www.linkedin.com/in/govind-kr-yadav-715b9426a/) | 📧 [Email Me](mailto:govind803556@gmail.com)
