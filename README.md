# Student Progress Management System

A MERN (MongoDB, Express, React, Node.js) based application to manage and track the competitive programming progress of students on Codeforces.

## 📌 Features

### ✅ Student Table View
- View, Add, Edit, Delete student entries
- Download student dataset as CSV
- Columns:
  - Name
  - Email
  - Phone Number
  - Codeforces Handle
  - Current Rating
  - Max Rating
- **View Details** button for each student to explore their Codeforces progress

### ✅ Student Profile View
- **Contest History**
  - Filter by last 30, 90, or 365 days
  - Rating progression graph
  - Contest list with:
    - Rating changes
    - Rank
- **Problem Solving Data**
  - Filter by last 7, 30, or 90 days
  - Statistics:
    - Most difficult problem solved
    - Total problems solved
    - Average problem rating
    - Average problems per day
  - Bar chart: Problems solved by rating bucket

### ✅ Codeforces Data Sync
- Automatic daily data fetch via **cron job** (default: 2 AM)
- Option to configure sync time and frequency
- Real-time update on handle change
- Displays **Last Updated** time for each user on main table

## 📽️ Video Demonstration

👉 [Watch Video Here](https://drive.google.com/file/d/1e7PaMdi1McmpgeF3J9vrKH3dRZxXJcNr/view?usp=sharing)

---

## ⚙️ Tech Stack

| Technology     | Usage                  |
|----------------|------------------------|
| **MongoDB**    | Database               |
| **Express.js** | Backend API            |
| **React.js**   | Frontend UI            |
| **Node.js**    | Server runtime         |
| **Codeforces API** | For fetching competitive programming data |
| **node-cron**  | Scheduling data sync   |
| **Recharts** | For graphs & charts       |

---

## 🛠️ Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone https://github.com/amanpatel04/assignment.git
cd assignment
```
```Backend
cd backend
npm install
npm run dev
```
```Frontend
cd frontend
npm install
npm run dev
```
