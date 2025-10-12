# 📘 Database Information

## 🧩 Class Structure

### 👨‍🏫 Teacher
The teacher is responsible for one or more classes, and may teach multiple subjects or just one.  
It also stores their **teaching preferences** and schedules.

### 📚 Subject
Represents a **course subject**.

### 👥 Class
Associates a **teacher** with a **subject**, including the **students** and the corresponding **classroom**.

### 🏫 Classroom
Represents a **physical room** available for lessons and bookings.

### 📅 Lesson
Represents a **specific event** of a class, held in a **specific classroom**, at a set **date and time**.

### 🎓 Student
Associated with a **class**, the student receives **notifications** whenever relevant changes occur.

### 👥 Users
Covers **teachers and students**, allowing authentication and permission management in the system.

### 📝 Course Enrollment
Relates **subjects** to the corresponding **years and courses**.

### 🧑‍💼 Secretary
Responsible for **managing classroom bookings**, **approving or rejecting requests**, and **maintaining system organization**.

### 🧱 Templates
A set of **reusable conditions** that can be applied to various situations (e.g., bookings, notifications, schedules).

### 🔔 Notifications
May or may not be needed.  
System that sends **automatic alerts** to students and teachers in case of important changes or events.

### 🏷️ Room Request
Allows a **teacher** to make a **classroom reservation request**.  
The **secretary** is responsible for **approving or rejecting** the request.