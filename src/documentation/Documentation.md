# Requirements

- The system must allow user registration and authentication.
- There are different profiles: Admin, Teacher, and Student.
- The system must provide forms for collecting teachers' preferences and constraints (preferred schedules, areas of expertise, maximum teaching load).
- The system must assign classes to teachers according to their preferences, areas of expertise, and teaching load.
- The administrator can manually adjust the assignments made automatically.
- The system must automatically generate schedules, considering constraints imposed by teachers, rooms, courses, and schedule overlaps.
- It should detect and flag scheduling conflicts or resource overlaps.
- The administrator can manually edit the generated schedules.
- It must be possible to reserve rooms in an integrated way with the academic timetable.
- The system must monitor room occupancy rates, signaling cases of overuse.
- The system must generate QR Codes for each room.
- Scanning the QR Code should allow the user to view the room's assigned schedule in real time.
- The system must automatically notify relevant users about changes in schedules, rooms, or conflicts.
- The system must display dashboards with graphical visualization of teaching loads by teacher, course, and department.
- It should provide exportable CSV reports on room occupancy and the efficiency of the distribution of teaching service.
- The system must be responsive and offer its main functionalities on mobile devices (Progressive Web App).
- The parser must validate and normalize imported data, flagging any errors to the administrator.
- The administrator must be able to approve or reject imported data before integration into the system.


# Personas

## Secretary
- **Profile:** User with limited IT experience responsible for managing schedules, rooms, and notifications for teachers and students.
- **Goals:**
  - Quickly create and edit schedules using drag-and-drop features.
  - Register subjects (UCs), teachers, groups/classes, and rooms.
  - Assign teachers to subjects and set their teaching hours.
  - Set up and manage global and specific time restrictions.
  - Notify teachers and students of changes.
  - Resolve conflicts and ensure schedule consistency.
- **Main Tasks:**
  - Configure academic periods and calendars.
  - Add and update teachers, subjects, groups, and rooms.
  - Assign teachers to subjects and teaching hours.
  - Edit and publish schedules, sync with system (web, PWA, QR codes).
  - Handle notifications and conflict alerts.

## Admin
- **Profile:** Super user with full system privileges; responsible for overseeing all operations, managing permissions, and supporting the Secretary.
- **Goals:**
  - Grant or revoke permissions for Secretaries and Teachers.
  - Support and resolve any system-wide issues.
  - Perform any task within the system if needed.
- **Main Tasks:**
  - Access and manage all system modules.
  - Configure user roles and permissions.
  - Provide support and troubleshooting for users.

## Teacher
- **Profile:** Responsible for validating their schedule, declaring availability, and ensuring room conditions.
- **Goals:**
  - Declare availabilities, preferences, and restrictions.
  - Receive and review proposed schedules; suggest changes if necessary.
  - Request a room change if conditions are inadequate.
- **Main Tasks:**
  - Fill out availability/preferences forms.
  - Review and respond to schedule proposals.
  - Request room changes with justification.

## Student
- **Profile:** Receives notifications about changes to their schedule or rooms.
- **Goals:**
  - Be promptly notified of schedule or room changes.
  - Easily access updated schedules.
- **Main Tasks:**
  - Receive notifications about changes (room, schedule, teacher).
  - Check schedule via portal, app, or QR code.

# User Stories

## Administrative Secretary

- **US-SA1.1:** Add new Courses/Subjects (UCs) to the system.
  - _Acceptance:_ I can register new UCs, associating name, code, and other relevant information.
- **US-SA1.2:** Add teachers to the system.
  - _Acceptance:_ I can register teachers, define areas of expertise, and associate them with UCs.
- **US-SA1.3:** Add groups to the system.
  - _Acceptance:_ I can create groups/classes, set the number of students, and associate them with UCs.
- **US-SA1.4:** Add rooms to the system.
  - _Acceptance:_ I can register rooms, defining capacity, location, and available resources.

- **US-SA2.1:** Define global temporal restrictions (e.g., academic periods, holidays).
  - _Acceptance:_ I can configure start/end dates for academic periods and holidays, and the system blocks allocations in these periods.
- **US-SA2.2:** Define specific temporal restrictions (e.g., room or teacher unavailability).
  - _Acceptance:_ I can mark time slots when certain rooms or teachers are unavailable, and the system prevents allocations at those times.

- **US-SA3.1:** Automatically generate the initial schedule based on data and restrictions.
  - _Acceptance:_ The system generates an initial schedule respecting all previously set restrictions and rules.
- **US-SA3.2:** Manually add a class to the schedule.
  - _Acceptance:_ I can add a class, choosing UC, teacher, group, room, and time, with automatic conflict validation.
- **US-SA3.3:** Remove a class from the schedule.
  - _Acceptance:_ I can remove any class, and the system updates the data and resolves associated conflicts.
- **US-SA3.4:** Edit class details (room, teacher, time, group, UC).
  - _Acceptance:_ I can edit any information for an existing class, with conflict alerts.
- **US-SA3.5:** Edit the schedule using drag and drop.
  - _Acceptance:_ I can drag and drop classes to other times or rooms, with immediate visual feedback on conflicts.

- **US-SA4.1:** Receive immediate visual feedback about conflicts and restrictions.
  - _Acceptance:_ Whenever I add, remove, or edit a class, I see visual alerts for conflicts (room, teacher, group, or temporal restrictions).

- **US-SA5:** Send automatic notifications to teachers and students about schedule or room changes.
  - _Acceptance:_ When I edit or publish the schedule, all affected users receive a clear notification about the change.

- **US-SA6:** Receive and view alerts about conflicts or unavailability.
  - _Acceptance:_ The system displays real-time alerts whenever there are schedule overlaps, unavailable rooms, or teacher conflicts.

## Admin

- **US-AD1:** Support the Administrative Secretary in case of questions or problems, without directly editing schedules or managing rooms.
  - _Acceptance:_ I can access a support panel for consultation, but I do not have permissions to edit schedules or rooms.

## Teacher

- **US-D1:** Fill out the availability and preferences form to influence my schedule planning.
  - _Acceptance:_ The system allows me to indicate time blocks per day/week, morning/afternoon preferences, room resources, subject area, UC, coordinator, and academic degree.
- **US-D2:** Receive schedule proposals and be able to suggest a counter-proposal if there is a conflict or unavailability.
  - _Acceptance:_ When I receive a schedule proposal, I can accept or suggest changes before final publication.
- **US-D3:** Request a room change only if the assigned room does not meet minimum conditions.
  - _Acceptance:_ Whenever I identify problems in the assigned room (e.g., capacity, equipment, accessibility), I can send a change request detailing the reason, and I am notified of the Secretary's decision.

## Student

- **US-AL1:** Receive immediate notifications about changes in my schedule or room, so I can adjust my plans in time.
  - _Acceptance:_ Whenever there is a relevant change, I receive a clear notification indicating the before and after of the change.


# Database Information

## Class Structure

### Teacher
The teacher is responsible for one or more classes, and may teach multiple subjects or just one.  
It also stores their **teaching preferences** and schedules.

### Subject
Represents a **course subject**.

### Class
Associates a **teacher** with a **subject**, including the **students** and the corresponding **classroom**.

### Classroom
Represents a **physical room** available for lessons and bookings.

### Lesson
Represents a **specific event** of a class, held in a **specific classroom**, at a set **date and time**.

### Student
Associated with a **class**, the student receives **notifications** whenever relevant changes occur.

### Users
Covers **teachers and students**, allowing authentication and permission management in the system.

### Course Enrollment
Relates **subjects** to the corresponding **years and courses**.

### Secretary
Responsible for **managing classroom bookings**, **approving or rejecting requests**, and **maintaining system organization**.

### Templates
A set of **reusable conditions** that can be applied to various situations (e.g., bookings, notifications, schedules).

### Notifications
May or may not be needed.  
System that sends **automatic alerts** to students and teachers in case of important changes or events.

### Room Request
Allows a **teacher** to make a **classroom reservation request**.  
The **secretary** is responsible for **approving or rejecting** the request.