# 📅 Appointment Booking API

A REST API for managing appointments between guests, employees, and services.

Built with **Node.js, TypeScript, and Express.js**, following a layered architecture (Controller / Service / Repository pattern).

---

## 🚀 Features

- Manage employees, guests, and services
- Create and handle appointments between entities
- Appointment status lifecycle:
  - PENDING → CONFIRMED / REJECTED
  - CONFIRMED → CANCELLED
- Prevent overlapping appointments for the same employee
- Automatic guest creation (deduplication by phone number)
- Clean separation of business logic and data access layers
- OOP-based domain models

---

## 🧱 Tech Stack

- Node.js
- TypeScript
- Express.js
- In-memory storage (no database yet)

---

## 🏗️ Architecture

The project is structured into multiple layers:

- **Controllers** – handle HTTP requests and responses
- **Services** – contain business logic
- **Repositories** – manage in-memory data storage
- **Models** – domain entities (Appointment, Employee, Guest, Service)
- **Enums** – shared constants (status, roles, etc.)

---

## 📦 Domain Models

- **Employee** – staff members providing services
- **Guest** – clients booking appointments
- **Service** – available services with duration and price
- **Appointment** – booking connecting guest, employee, and service

---

## ⚙️ Installation

```bash
npm install
npm run dev