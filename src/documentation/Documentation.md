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
  - Request a room for tests or events.
- **Main Tasks:**
  - Fill out availability/preferences forms.
  - Review and respond to schedule proposals.
  - Book rooms for tests or events.

## Student
- **Profile:** Receives notifications about changes to their schedule or rooms.
- **Goals:**
  - Be promptly notified of schedule or room changes.
  - Easily access updated schedules.
- **Main Tasks:**
  - Receive notifications about changes (room, schedule, teacher).
  - Check schedule via portal, app, or QR code.

# User Stories and Acceptance Criteria (with Difficulty Ratings)

## Secretary

- **US-S1:** Add new Subjects (UCs) to the system.
  - _Acceptance:_ I can register new UCs, associating name, code, and other relevant information.
  - _Difficulty:_ Walking
- **US-S2:** Add teachers to the system.
  - _Acceptance:_ I can register teachers, define areas of expertise, and associate them with UCs.
  - _Difficulty:_ Walking
- **US-S3:** Add groups/classes to the system.
  - _Acceptance:_ I can create groups/classes, set the number of students, and associate them with UCs.
  - _Difficulty:_ Walking
- **US-S4:** Add rooms to the system.
  - _Acceptance:_ I can register rooms, defining capacity, location, and available resources.
  - _Difficulty:_ Walking
- **US-S5:** Assign teachers to subjects and teaching hours.
  - _Acceptance:_ I can link teachers to the subjects they will teach and specify their teaching hours for each group/class.
  - _Difficulty:_ Bicycle
- **US-S6:** Define global temporal restrictions (e.g., academic periods, holidays).
  - _Acceptance:_ I can configure start/end dates for academic periods and holidays, and the system blocks allocations in these periods.
  - _Difficulty:_ Bicycle
- **US-S7:** Define specific temporal restrictions (e.g., room or teacher unavailability).
  - _Acceptance:_ I can mark time slots when certain rooms or teachers are unavailable, and the system prevents allocations at those times.
  - _Difficulty:_ Bicycle
- **US-S8:** Automatically generate the initial schedule based on data and restrictions.
  - _Acceptance:_ The system generates an initial schedule respecting all previously set restrictions and rules.
  - _Difficulty:_ Rocket
- **US-S9:** Manually add a class to the schedule.
  - _Acceptance:_ I can add a class, choosing UC, teacher, group, room, and time, with automatic conflict validation.
  - _Difficulty:_ Bicycle
- **US-S10:** Remove a class from the schedule.
  - _Acceptance:_ I can remove any class, and the system updates the data and resolves associated conflicts.
  - _Difficulty:_ Walking
- **US-S11:** Edit class details (room, teacher, time, group, UC).
  - _Acceptance:_ I can edit any information for an existing class, with conflict alerts.
  - _Difficulty:_ Bicycle
- **US-S12:** Edit the schedule using drag and drop.
  - _Acceptance:_ I can drag and drop classes to other times or rooms, with immediate visual feedback on conflicts.
  - _Difficulty:_ Car
- **US-S13:** Receive immediate visual feedback about conflicts and restrictions.
  - _Acceptance:_ Whenever I add, remove, or edit a class, I see visual alerts for conflicts (room, teacher, group, or temporal restrictions).
  - _Difficulty:_ Bicycle
- **US-S14:** Send automatic notifications to teachers and students about schedule or room changes.
  - _Acceptance:_ When I edit or publish the schedule, all affected users receive a clear notification about the change.
  - _Difficulty:_ Bicycle
- **US-S15:** Receive and view alerts about conflicts or unavailability.
  - _Acceptance:_ The system displays real-time alerts whenever there are schedule overlaps, unavailable rooms, or teacher conflicts.
  - _Difficulty:_ Bicycle
  - **US-S16:** Lock a class or subject to a specific day/time and automatically solve any conflicts.
  - _Acceptance:_ I can lock a class (e.g., Programming) to Wednesday at a specific time. If conflicts or errors arise, the system calculates and suggests alternative solutions. I can trigger this by clicking a "Solve Problem" button.
  - _Difficulty:_ Big Rocket

## Admin

- **US-A1:** Manage user roles and permissions for Secretaries and Teachers.
  - _Acceptance:_ I can grant or revoke permissions for any user, controlling their access to system features.
  - _Difficulty:_ Bicycle
- **US-A2:** Access all modules and perform any operation in the system.
  - _Acceptance:_ I have full access to all system functionalities, regardless of restrictions.
  - _Difficulty:_ Walking
- **US-A3:** Provide support and troubleshooting for users.
  - _Acceptance:_ I can view and resolve problems reported by users, including schedule conflicts and errors.
  - _Difficulty:_ Bicycle

## Teacher

- **US-T1:** Fill out the availability and preferences form to influence my schedule planning.
  - _Acceptance:_ The system allows me to indicate time blocks per day/week, morning/afternoon preferences, room resources, subject area, UC, coordinator, and academic degree.
  - _Difficulty:_ Walking
- **US-T2:** Receive schedule proposals and be able to suggest a counter-proposal if there is a conflict or unavailability.
  - _Acceptance:_ When I receive a schedule proposal, I can accept or suggest changes before final publication.
  - _Difficulty:_ Bicycle
- **US-T3:** Book a room for tests or events.
  - _Acceptance:_ Whenever I need to schedule a test or an event, I can book a room through the system, specifying the reason and requirements. I am notified of the Secretary's decision.
  - _Difficulty:_ Bicycle

## Student

- **US-ST1:** Receive immediate notifications about changes in my schedule or room, so I can adjust my plans in time.
  - _Acceptance:_ Whenever there is a relevant change, I receive a clear notification indicating the before and after of the change.
  - _Difficulty:_ Bicycle
- **US-ST2:** Scan a QR code on a room to view its schedule.
  - _Acceptance:_ I can scan the QR code posted on any classroom door and immediately see the current and upcoming schedule for that room.
  - _Difficulty:_ Walking

# User Story Prioritization

## Highest Priority (Fundamental for basic scheduling and viewing)

1. **US-S1:** Add new Subjects (UCs) to the system.  
2. **US-S2:** Add teachers to the system.  
3. **US-S3:** Add groups/classes to the system.  
4. **US-S4:** Add rooms to the system.  
5. **US-S5:** Assign teachers to subjects and teaching hours.  
6. **US-S9:** Manually add a class to the schedule.  
7. **US-S10:** Remove a class from the schedule.  
8. **US-S11:** Edit class details (room, teacher, time, group, UC).  
9. **US-S12:** Edit the schedule using drag and drop.  
10. **US-S13:** Receive immediate visual feedback about conflicts and restrictions.  
11. **US-T1:** Teacher: Fill out the availability and preferences form.  
12. **US-T2:** Teacher: Receive schedule proposals and suggest counter-proposals.  
13. **US-T3:** Teacher: Request a room change if conditions are not met.  
14. **US-S15:** Receive and view alerts about conflicts or unavailability.  

## Medium Priority (Features for usability, conflict management, and notifications)


15. **US-S6:** Define global temporal restrictions (academic periods, holidays).  
16. **US-S7:** Define specific temporal restrictions (room or teacher unavailability).  
17. **US-S14:** Send automatic notifications to teachers and students.  
18. **US-ST1:** Student: Receive immediate notifications about changes in my schedule or room.
19. **US-ST2:** Student: Scan a QR code on a room to view its schedule.

## Lower Priority (Admin & support, advanced scheduling, automation tools)

20. **US-A1:** Admin: Manage user roles and permissions.  
21. **US-A2:** Admin: Access all modules and perform any operation.  
22. **US-A3:** Admin: Provide support and troubleshooting for users.  
23. **US-S8:** Automatically generate the initial schedule (advanced, generator).  
24. **US-S16:** Lock a class or subject to a specific day/time and automatically solve any conflicts (solve problem, big rocket). 

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

# API Endpoint


## GET classmanager/api/teacher/{year}

- Returns all teachers from that year

- Response

```
[
  {
    "Id": teacher_number,
    "Department_Name" : department_name,
    "Name": teacher_full_name,
    "Hora_TP_1Sem": nhours,
    "Hora_P_1Sem": nhours,
    "Hora_TP_2Sem": nhours,
    "Hora_P_2Sem": nhours
  },
  ...
]
```

## GET classmanager/api/teacher/{year}/{id}

- Returns a specific teacher id from year

- Response

```
{
  "Id": teacher_number,
  "Department_Name" : department_name,
  "Name": teacher_full_name,
  "Subjects": [
                {
                  "Id": subject_id,
                  "Name": subject_name,
                  "Acronym": subject_acronym,
                  "Classes": [
                              {
                                "ClassName": class_name,
                                "Hour": class_weekly_hours
                              },
                              ...
                            ]
                },
                ...
              ]
}
```

## GET classmanager/api/subject/{year}

- Returns all subjects from an year

- Response

```
[
  {
    "Id": suject_number,
    "Department_Name" : department_name,
    "Acronym": subject_acronym,
    "Name": subject_name,
    "Regent_id": teacher_number,
    "Regent_name": teacher_name,
    "Semester": semester,
    "Students_Number": N_Students,
    "Theorical_Classes_Number": N_Theorical_Classes,
    "Theorical_Hours_By_Classes": N_of_Hours_By_Theorical_Class,
    "Pratical_Classes_Number": N_Pratical_Classes,
    "Pratical_Hours_By_Classes": N_of_Hours_By_Pratical_Class
  },
  ...
]
```

## GET classmanager/api/subject/{year}/{id}

- Returns a specific subject by id

- Response

```
{
  "Id": suject_number,
  "Department_Name" : department_name,
  "Acronym": subject_acronym,
  "Name": subject_name,
  "Regent_id": teacher_number,
  "Semester": semester,
  "Students_Number": N_Students,
  "Teachers": [
                {
                  "Id": teacher_number,
                  "Department_Name" : department_name,
                  "Name": teacher_full_name,
                  "Classes": [
                              {
                                "ClassName": class_name,
                                "Hour": class_weekly_hours
                              },
                              ...
                            ]
                },
                ...
              ]
}
```

## GET classmanager/api/template

- Returns all templates

- Response

```
[
  {
    "Id": template_Id,
    "Name": template_name,
    "Last_Edited_Date": Edited_Date
  },
  ...
]
```

## GET classmanager/api/template/{id}

- Returns a template details

- Response

```
[
  {
    "Id": template_Id,
    "Name": template_name,
    "Time_Slots": {Week_Day :[start_time1, start_time2, ...]} #Slot has 30 minutes that has classes
  },
  ...
]
```

## GET classmanager/api/draft

- Returns all drafts

- Response

```
[
  {
    "Id": draft_Id,
    "Name": draft_name,
    "Last_Edited_Name": Edited_Date,
    "Year" : draft_year,
    "Semester" : draft_semester,
  },
  ...
]
```

## GET classmanager/api/draft/{id}

- Return draft's details

- Response


```
[
  {
    "Id": draft_Id,
    "Name": draft_name
    "Subjects": [
                  {
                    "Id": subject_id,
                    "Type": subject_type,
                    "Acronym": subject_acronym,
                    "Classes": [
                                {
                                  "Id": class_id,
                                  "Type": class_type,
                                  "Weekday": class_day,
                                  "Starting_Time": class_starting_time,
                                  "Duration": class_duration,
                                  "Teacher_Id": class_teacher_id,
                                  "Teacher_Name": class_teacher_name,
                                  "Classrooms": [
                                                  {
                                                    "Department": classroom_department,
                                                    "Floor": classroom_floor,
                                                    "Number": classroom_number
                                                  },
                                                  ...
                                                ],
                                  "Attendents_Groups": [
                                    {
                                      "Course": course_id,
                                      "Year": "year
                                    },
                                    ...
                                  ]
                                },
                                ...
                                ]
                  },
                  ...
                ]
  },
  ...
]
```

## GET classmanager/api/schedule/{year}/{classroom}

- Return all the classroom events and classes

- Response


```
{
  "Classes" : [
                {
                  "Id": class_id,
                  "Name": class_name,
                  "Subject_Acronym": subject_acronym,
                  "Subject_Name": subject_name,
                  "Starting_Time": class_starting_time,
                  "Duration": class_duration,
                  "Teacher_Name": class_teacher_name
                },
                ...
              ],
  "Events" : [
                {
                  "Id": event_id,
                  "Name": event_name,
                  "Starting_Time": class_starting_time,
                  "Duration": class_duration,
                  "Responsible_Person": responsible_name
                },
                ...
              ],
  }
```

## GET classmanager/api/request

- Return all pending requests

- Response


```
[
  { # Test Request Example
    "Id": event_id,
    "Name": event_name,
    "Starting_Time": class_starting_time,
    "Duration": class_duration,
    "Date": event_date,
    "Responsible_Person": responsible_name,
    "Number_Vigilants" : number_vigilants,
    "Description" : description,
    "Classroom_Types" : [
                          {
                            "Classroom_Type" : classroom_type,
                            "ClassRooms_Number": N_classes                         
                          },
                          ...
                        ]
  },
  { # Event Request Example
    "Id": event_id,
    "Name": event_name,
    "Starting_Time": class_starting_time,
    "Duration": class_duration,
    "Date": event_date,
    "Responsible_Person": responsible_name,
    "Classroom_Types" : classroom_type,
    "Description" : description
  },
  ...
]
```

## GET classmanager/api/request

- Return all pending requests

- Response


```
[
  { # Test Request Example
    "Id": event_id,
    "Name": event_name,
    "Starting_Time": class_starting_time,
    "Duration": class_duration,
    "Date": event_date,
    "Responsible_Person": responsible_name,
    "Number_Vigilants" : number_vigilants,
    "Description" : description,
    "Classroom_Types" : [
                          {
                            "Classroom_Type" : classroom_type,
                            "ClassRooms_Number": N_classes                         
                          },
                          ...
                        ]
  },
  { # Event Request Example
    "Id": event_id,
    "Name": event_name,
    "Starting_Time": class_starting_time,
    "End_time": event_ending_time,
    "Date": event_date,
    "Responsible_Person": responsible_name,
    "Classroom_Types" : classroom_type,
    "Description" : description
  },
  ...
]
```

## GET classmanager/api/classroom

- Return all classes

- Params: start_time, end_time, class_type, date

- Response


```
[
  { # Test Request Example
    "Id": classroom_id,
    "Name": classroom_name,
    "Capacity": classroom_capacity
    "Classroom_Types" : [type-1, type-2, ...]
  }
  ...
]
```

## GET classmanager/api/classtype

- Return all classes types


- Response


```
[type1, type2,  ...]
```

