# 📘 Database Information

## 🧩 Class Structure

###  User
Represents any user in the system (teachers, students, or secretaries).  
Stores their **name** and **email** information.  
Each user can have one or more **profiles** defining their role.

###  Perfil
Defines the **type of user profile**, such as *Teacher*, *Student*, or *Secretary*.  
Used to manage permissions and access levels.

### PerfilUser
Associative table linking **Users** and **Profiles**,  
allowing a single user to have multiple roles.

###  Request
Represents a **room booking request** made by a user.  
Contains **start and end times**, **status**, and a **description**.  
Each request is made by a specific **User**.

###  Classroom
Represents a **physical classroom**, identified by its **department**, **floor**, and **number**.  
Each classroom can be linked to **classes** and **requests**.

###  ReqClassroom
Associative table connecting **Requests** to specific **Classrooms**.  
Indicates which room(s) were requested for a particular booking.

###  Edition
Represents an **academic period**, identified by **year** and **semester**.  
Used to associate classes with their specific academic edition.

###  Class
Represents a **course class**, linked to a **subject (Ucs)**.  
It serves as the core link between subjects, students, and teachers.

###  ClassEdition
Associates a **class** with a specific **edition**, **classroom**, and **schedule**.  
Also includes details like the **number of students**, **course year**, and **time slots**.

###  UsersClass
Links **Users** (teachers or students) to **Classes**.  
Defines who participates in which class.

###  Ucs
Represents a **subject** or **curricular unit** within a course.  
Each class is tied to one **Ucs**.

###  Course
Represents an **academic course** (e.g., Computer Science, Engineering, etc.).  
Each course includes multiple subjects.

###  UcsCourse
Associative table linking **Courses** and **Subjects (Ucs)**.  
Defines which subjects belong to which course.

###  Templates
A **reusable scheduling template** created by a **User**.  
Used to standardize lesson times or booking configurations.

###  TemplatesSlots
Defines **time slots** within a specific **Template**.  
Each slot has a **start time** and links back to a template.

###  Slots
Represents a **unique time slot** (e.g., 09:00, 10:00).  
Used as a base reference for templates and scheduling.

###  ClassroomType
Defines a **type of equipment or feature** available in classrooms  
(e.g., Projector, Computer Lab, Audio System).

###  ClassroomHasType
Associates a **Classroom** with the **equipment types** it possesses.  
Also includes the **quantity** of each equipment type.

###  ClassroomTypeReq
Specifies which **equipment types** and **quantities** are requested in a **room request**.  
Helps match **requests** with **available classroom resources**.

---

###  Relationships Overview

- **Users ↔ Perfil** → via `PerfilUser` (many-to-many)
- **Users ↔ Request** → one-to-many (a user can create multiple requests)
- **Request ↔ Classroom** → via `ReqClassroom`
- **Request ↔ ClassroomType** → via `ClassroomTypeReq`
- **Ucs ↔ Class** → one-to-many
- **Class ↔ Edition** → via `ClassEdition`
- **Class ↔ User** → via `UsersClass`
- **Course ↔ Ucs** → via `UcsCourse`
- **Templates ↔ Users** → one-to-many
- **Templates ↔ Slots** → via `TemplatesSlots`
- **Classroom ↔ ClassroomType** → via `ClassroomHasType`
- **ClassEdition ↔ Classroom** → direct relation (department, floor, number)

---

###  Notes

- Classrooms are identified by a **composite key**: *(Department, Floor, Number)*.  
- Editions use **(Year, Semester)** as their unique identifier.  
- All relationships are **normalized** for consistency and integrity.  
- The structure supports **multiple courses, subjects, and roles** seamlessly.  

---

