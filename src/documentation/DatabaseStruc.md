# Academic Timetable Management System Documentation

## 1. Overview

University timetable management system with support for multiple editions (semesters), draft system for timetable optimization, and management of room requests for one-time events.

---

## 2. Core Concepts

### 2.1 Immutable vs. Mutable Academic Structure

#### **Subject (Abstract Course)**
- **Concept**: Represents the course in abstract form, containing **only data that NEVER changes**
- **Data examples**: Name, Acronym, ECTS
- **Note**: Does not contain information about professors, schedules, or students

#### **SubjectEdition (Course Instance)**
- **Concept**: Represents a course **in a specific edition** (year/semester)
- **Data that can vary between editions**:
  - Responsible professor (regente)
  - Total number of students
  - Weekly hours (TP, P, T, LAB)
  - Number of classes needed
- **Rule**: This data is **common throughout the entire edition** and only changes **between editions**
```
Example:
Subject: "Algorithms and Data Structures" (AED, 6 ECTS)
  ├─ SubjectEdition 2024/1: Prof. Silva, 150 students, 3h TP + 2h P
  └─ SubjectEdition 2024/2: Prof. Costa, 120 students, 3h TP + 2h P
```

### 2.2 Classes

- **Concept**: Practical division of a SubjectEdition
- **Identifier**: Combination of type + number (e.g., TP1, P2, T1, LAB3)
- **Attributes**:
  - Class type (TP, P, T, PL, LAB)
  - Number of students in that specific class
- **Relationship**: `SUM(Class.number_students)` should match `SubjectEdition.total_students`

#### **Fundamental Rule: One Class = One Lesson Per Week**

**Each class has ONLY one weekly lesson.**

**Examples:**
```
SubjectEdition: AED (6h TP weekly for 150 students)
  ├─ AED-TP1: 50 students, 3h (Monday 10:00-13:00)
  ├─ AED-TP2: 50 students, 3h (Wednesday 14:00-17:00)
  └─ AED-TP3: 50 students, 3h (Friday 09:00-12:00)

SubjectEdition: BD (4h P weekly for 80 students)
  ├─ BD-P1: 40 students, 2h (Tuesday 14:00-16:00)
  └─ BD-P2: 40 students, 2h (Thursday 10:00-12:00)
```

**Important**: If you need 6h weekly, create **2 classes of 3h**, not 2 lessons of the same class.

---

## 3. Draft System

### 3.1 Purpose

The draft system allows **experimenting and optimizing timetables** before publishing them officially.

### 3.2 Optimization Goals

- **For Professors**: Minimize conflicts, respect time preferences
- **For Students**: Avoid overlaps between courses in the same curricular year
- **For Rooms**: Maximize occupancy and match room type to class type

### 3.3 Draft Lifecycle
```
1. DRAFT (working version)
   ├─ Initial creation
   ├─ Experimentation with different configurations
   ├─ Modification of: professors, rooms, schedules
   └─ Multiple drafts can coexist
   
2. ACTIVE (published)
   ├─ Only ONE draft can be active per edition
   ├─ Represents the official published timetable
   └─ Students and professors consult this timetable
   
3. ARCHIVED (historical)
   └─ Old drafts kept for history
```

### 3.4 Draft Structure

Each `DraftClassSchedule` represents a **concrete lesson**:
- **Class** (Class) - unique class identification
- **Professor** (teacher_id) - responsible for the class
- **Room** (Classroom via composite key)
- **Schedule** (day of week + start/end time)

#### **Fundamental Rules:**

1. **One class = One lesson per draft**
```
   ✅ VALID:
   Draft 1: AED-TP1 → Monday 10:00-13:00
   
   ❌ INVALID:
   Draft 1:
   ├─ AED-TP1 → Monday 10:00-13:00
   └─ AED-TP1 → Wednesday 14:00-17:00  // ERROR: Duplicate class!
```

2. **Same class can be in different drafts**
```
   ✅ VALID:
   Draft 1: AED-TP1 → Monday 10:00-13:00, Prof. Silva
   Draft 2: AED-TP1 → Wednesday 14:00-17:00, Prof. Costa  // Experimentation
```

3. **A draft can have multiple classes from the same subject**
```
   ✅ VALID:
   Draft 1:
   ├─ AED-TP1 → Monday 10:00-13:00
   ├─ AED-TP2 → Wednesday 14:00-17:00
   └─ AED-TP3 → Friday 09:00-12:00
```

### 3.5 Draft Flexibility

Within a draft, you can experiment with:
- ✅ Different professors for each class
- ✅ Different rooms
- ✅ Different time slots
- ✅ Different complete configurations

**Experimentation Example:**
```
Draft "Experiment A":
├─ AED-TP1: Prof. Silva, Room A101, Monday 10:00-13:00
├─ AED-TP2: Prof. Costa, Room B202, Wednesday 14:00-17:00
└─ AED-TP3: Prof. Silva, Room A101, Friday 09:00-12:00

Draft "Experiment B" (same classes, different configuration):
├─ AED-TP1: Prof. Costa, Room C301, Tuesday 14:00-17:00
├─ AED-TP2: Prof. Silva, Room A101, Thursday 10:00-13:00
└─ AED-TP3: Prof. Costa, Room B202, Friday 14:00-17:00
```

---

## 4. Template and Slot System

### 4.1 Purpose

**Templates are used ONLY in the Business Logic layer** to issue warnings/alerts about time restrictions.

### 4.2 How It Works

#### **Slot (Time Window)**
- Represents a specific time block of 30 minutes
- Example: Monday, 08:00

#### **Template (Set of Restrictions)**
- Created by user (e.g., secretary, admin)
- Groups multiple slots
- **Practical use**: "Classes should only be scheduled at this time on this day"

### 4.3 Usage Example
```
When Business Logic detects that a DraftClassSchedule
uses one slot that isn't available, it issues a warning:
"⚠️ Warning: This class is scheduled outside recommended hours"
```

**Note**: Templates **do not block** timetable creation, they only **warn**.

### 4.4 Practical Use Cases

1. **Non-recommended hours**
   - Classes after 10 PM
   - Classes before 8 AM
   - Classes on Saturday
   - No classes on Friday

2. **Department preferences**
   - "Avoid Friday afternoons"
   - "Prioritize mornings for labs"

---

## 5. Room Request System

### 5.1 Concept

Room requests are **one-time events** (not associated with specific courses or editions).

### 5.2 Use Cases

- Department meetings
- Thesis defenses
- External workshops/seminars
- Student events
- Substitute classes
- Extraordinary exams
- Conferences

### 5.3 Request Structure

#### **Request (Main Request)**
- Contains **general information** about the event
- **Block approval**: The entire request is approved/rejected at once
- **Key fields**:
  - `user_id`: Who made the request
  - `type_request_id`: Type of event (TEST, EVENT, MEETING, etc.)
  - `status_id`: Current status (pending, approved, rejected, completed)
  - `request_date`: Specific date of the event
  - `hour_start`, `hour_end`: Event schedule
  - `required_vigilants`: Number of supervisors needed
  - `approved_at`, `approved_by`: Who and when approved the request

#### **RequestClassroomType (What is Requested)**
- Specifies **which types of rooms** and **how many** are needed
- Examples:
  - "I need 2 laboratories"
  - "I need 1 auditorium + 1 meeting room"
- **Fields**:
  - `classroom_type_id`: Type of room needed
  - `quantity`: How many rooms of this type

#### **RequestClassroom (What is Assigned)**
- Contains **specific rooms** assigned to the request
- Filled by admin/system **after analyzing availability**
- Examples:
  - Lab A101
  - Lab B202
  - Auditorium C301

#### **Vigilants (Supervisors)**
- List of people assigned to supervise the event
- **Associated with the request as a whole**, not with specific rooms
- Validation: Number of supervisors assigned should match `required_vigilants`

### 5.4 Request Flow
```
1. REQUEST CREATION
   ├─ User creates Request
   ├─ Specifies event type, date, schedule
   ├─ Indicates how many supervisors are needed
   ├─ In RequestClassroomType: specifies room types and quantities
   │   Example: "2 laboratories + 1 auditorium"
   └─ Initial status: PENDING

2. ADMIN ANALYSIS
   ├─ Verifies room availability
   ├─ In RequestClassroom: assigns specific compatible rooms
   │   Example: Lab A101, Lab B202, Auditorium C301
   ├─ In Vigilants: assigns supervisors
   └─ Validates no conflicts

3. BLOCK APPROVAL
   ├─ Admin approves or rejects the ENTIRE request
   ├─ If approved:
   │   ├─ Request.status_id → 'approved'
   │   ├─ Request.approved_at → NOW()
   │   └─ Request.approved_by → admin_id
   └─ All assigned rooms and supervisors are approved together

4. FINALIZATION
   └─ After event occurs:
       └─ Request.status_id → 'completed'
```

### 5.5 Practical Example

**Scenario**: Programming exam needing 2 labs for 120 students
```
1. Professor creates request:
   Request:
   ├─ type_request_id: 1 (TEST)
   ├─ request_date: 2025-06-10
   ├─ hour_start: 10:00
   ├─ hour_end: 12:00
   ├─ required_vigilants: 3
   ├─ description: "Final Programming Exam"
   └─ status_id: 1 (PENDING)

   RequestClassroomType:
   └─ classroom_type_id: 2 (Laboratory), quantity: 2

2. Admin assigns:
   RequestClassroom:
   ├─ Lab A101 (capacity 60)
   └─ Lab B202 (capacity 65)

   Vigilants:
   ├─ Prof. Silva (user_id: 10)
   ├─ Prof. Maria (user_id: 15)
   └─ Prof. Carlos (user_id: 20)

3. Admin approves ALL AT ONCE:
   Request:
   ├─ status_id: 2 (APPROVED)
   ├─ approved_at: 2025-05-20 14:30:00
   └─ approved_by: 1 (admin_id)
```

### 5.6 Separation of Responsibilities

| Table | Responsibility |
|-------|----------------|
| `Request` | General event data and global approval status |
| `RequestClassroomType` | What the user REQUESTS (types and quantities) |
| `RequestClassroom` | What is ASSIGNED (specific rooms) |
| `Vigilants` | Who supervises the event |

### 5.7 Key Validations

#### **Before Approving:**
1. **Assigned quantity = Requested quantity**
```
   For each RequestClassroomType:
   COUNT(RequestClassroom with that type) == quantity
```

2. **Number of supervisors = Required supervisors**
```
   COUNT(Vigilants) == Request.required_vigilants
```

3. **No room conflicts**
```
   Rooms in RequestClassroom cannot have:
   - Approved classes in ACTIVE draft at same time
   - Other approved requests at same time
```

4. **No supervisor conflicts**
```
   Supervisors cannot have:
   - Classes at same time
   - Other approved requests at same time
```

### 5.8 Status Types

| Status | Description |
|--------|-------------|
| `pending` | Created, awaiting analysis |
| `approved` | Approved (rooms + supervisors assigned) |
| `rejected` | Rejected by admin |
| `cancelled` | Cancelled by requester |

### 5.9 Request Types

| Type | Description | Example |
|------|-------------|---------|
| `TEST` | Exams and tests | Final exam, mid-term test |
| `EVENT` | Academic events | Workshops, seminars, lectures |
| `MEETING` | Administrative meetings | Department meetings |
| `DEFENSE` | Thesis/dissertation defenses | Master's thesis defense |
| `OTHER` | Other events | Special activities |

### 5.10 Difference: Requests vs. Drafts

| Aspect | Request (One-time) | Draft (Timetable) |
|--------|-------------------|-------------------|
| **Purpose** | Specific one-time event | Recurring weekly schedule |
| **Duration** | One specific date | Entire semester |
| **Association** | Not linked to courses | Linked to SubjectEditions |
| **Approval** | Block approval before event | Publication to make official |
| **Rooms** | Assigned for specific date/time | Assigned for every week |
| **Example** | Thesis defense on Dec 15 | AED-TP1 every Monday |
| **Supervisors** | Specific for the event | Not applicable |

---

## 6. Audit

### 6.1 AuditLog

Records **all relevant actions** in the system:

| Action | Description | Example |
|--------|-------------|---------|
| `CREATE` | Record creation | New draft, new class, new request |
| `UPDATE` | Data modification | Professor change, new room |
| `DELETE` | Record removal | Delete schedule, cancel request |
| `PUBLISH` | Draft activation | Make draft official (status=ACTIVE) |
| `APPROVE` | Request approval | Approve room for event |

**Important fields**:
- `user_id`: Who performed the action
- `timestamp`: When it was performed
- `action`: Action type
- `description`: Action details (can include JSON with before/after)

### 6.2 Log Examples
```json
{
  "user_id": 5,
  "action": "PUBLISH",
  "timestamp": "2024-11-15 14:30:00",
  "description": "Draft 'Final Timetable 2024/2' activated. Previous draft 'Provisional Timetable' archived."
}

{
  "user_id": 3,
  "action": "APPROVE",
  "timestamp": "2024-11-15 16:45:00",
  "description": "Request #123 approved: 2 laboratories + 3 supervisors for exam on 2024-12-15"
}
```

---

## 7. Main Business Rules

### 7.1 Editions
- Only semesters 1 or 2 are allowed
- An edition is identified by (year, semester)
- Example: (2024, 1) = 1st Semester of 2024

### 7.2 SubjectEdition
- Combination (subject_id, edition_year, edition_semester) is **unique**
- Must have **at least 1 class** (Class) associated
- Regente is mandatory
- Weekly hours define how many classes to create

**Planning Example:**
```
SubjectEdition: AED 2024/1
├─ weekly_hours_tp = 6h
├─ weekly_hours_p = 4h
├─ total_students = 150
└─ Class creation:
    ├─ AED-TP1: 50 students, 3h
    ├─ AED-TP2: 50 students, 3h
    ├─ AED-P1: 50 students, 2h
    └─ AED-P2: 50 students, 2h
```

### 7.3 Drafts

#### **One Class = One Lesson Per Draft**
- **Guarantee**: Constraint `UNIQUE (draft_id, class_id)` in database
- **Meaning**: Each class can only appear **once** in each draft
```sql
-- ✅ VALID: Same class in different drafts
Draft 1: AED-TP1 → Monday 10:00
Draft 2: AED-TP1 → Wednesday 14:00

-- ✅ VALID: Different classes in same draft
Draft 1:
├─ AED-TP1 → Monday 10:00
└─ AED-TP2 → Wednesday 14:00

-- ❌ INVALID: Same class twice in same draft
Draft 1:
├─ AED-TP1 → Monday 10:00
└─ AED-TP1 → Wednesday 14:00  // ERROR: duplicate key
```

#### **Only One Active Draft Per Edition**
- Possible statuses: `DRAFT`, `ACTIVE`, `ARCHIVED`
- When activating a draft, other active ones are automatically archived
- Drafts in `DRAFT` mode can coexist without limits

#### **Creating Multiple Versions**
```
Edition 2024/1:
├─ Draft "Initial Version" (ACTIVE)
├─ Draft "Experiment A" (DRAFT) - test professor swaps
├─ Draft "Experiment B" (DRAFT) - test other schedules
└─ Draft "Experiment C" (DRAFT) - minimize conflicts
```

### 7.4 Classrooms
- Identified by (department, floor, number)
- Capacity must be respected (validated in Business Logic)
- Room type must be compatible with class type

**Room Types:**
- Laboratory (LAB)
- Auditorium (T - Large lectures)
- Normal Room (TP, P)
- Computer Room (PL)

### 7.5 Validations (Business Logic)

#### **Professor Conflicts**
```
A professor CANNOT have 2 classes at the same time in the same draft
Validate: (draft_id, teacher_id, day_of_week, hour_start) unique
```

**Example:**
```
❌ INVALID:
Draft 1:
├─ AED-TP1: Prof. Silva, Monday 10:00-13:00
└─ BD-P1: Prof. Silva, Monday 10:00-12:00  // Conflict!
```

#### **Room Conflicts**
```
A room CANNOT have 2 classes at the same time in the same draft
Validate: (draft_id, classroom, day_of_week, hour_start) unique
```

**Example:**
```
❌ INVALID:
Draft 1:
├─ AED-TP1: Room A101, Monday 10:00-13:00
└─ BD-TP1: Room A101, Monday 11:00-14:00  // Overlap!
```

#### **Room Capacity**
```
Number of class students ≤ Room capacity
Class.number_students <= Classroom.capacity
```

**Example:**
```
❌ INVALID:
AED-TP1: 60 students → Room A101 (capacity 50)
```

#### **Lesson Duration**
```
hour_end > hour_start
Duration should be reasonable multiple (e.g., 1h, 1.5h, 2h, 3h)
```

#### **Room-Class Type Compatibility**
```
Laboratory classes → LAB type rooms
Large lectures → Auditoriums
Practical classes → Normal rooms or labs
```

#### **Availability in Requests**
```
When approving a Request, validate that:
- Assigned rooms don't have classes in ACTIVE draft at that time
- Assigned rooms don't have other approved requests at same time
- Supervisors don't have classes at that time
- Supervisors don't have other approved requests at same time
- Number of assigned rooms matches requested quantities by type
- Number of supervisors matches required_vigilants
```

---