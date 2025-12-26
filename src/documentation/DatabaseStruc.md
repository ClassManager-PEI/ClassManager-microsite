# Academic Timetable Management System Documentation

## 1. Overview

University timetable management system with support for multiple editions (semesters), draft system for timetable optimization, and management of room requests for one-time events.

---

## 2. Entity Relationship Diagram

```mermaid
erDiagram
    USER {
        varchar uuid PK
        varchar name
        varchar email UK
    }
    
    PROFILE {
        int id PK
        varchar profile_type UK
        varchar description
    }
    
    PROFILE_USER {
        varchar user_uuid PK,FK
        int profile_id PK,FK
    }
    
    EDITION {
        int year PK
        int semester PK
        date start_date
        date end_date
    }
    
    COURSE {
        int id PK
        varchar name UK
        varchar code UK
    }
    
    SUBJECT {
        int id PK
        varchar name UK
        varchar acronym IX
        int ects
    }
    
    SUBJECT_EDITION {
        int id PK
        int subject_id FK
        int edition_year FK
        int edition_semester FK
        varchar regente_uuid FK
        int total_students
        int weekly_hours_tp
        int weekly_hours_p
        int weekly_hours_t
        int weekly_hours_lab
    }
    
    COURSE_SUBJECT_EDITION {
        int course_id PK,FK
        int subject_edition_id PK,FK
        int curricular_year
    }
    
    CLASS {
        int id PK
        int subject_edition_id FK
        varchar identifier
        varchar class_type
        int duration
        int number_students
        int number_per_week
    }
    
    CLASSROOM_TYPE {
        int id PK
        varchar name UK,IX
        varchar description
    }
    
    CLASSROOM {
        int department PK
        int floor PK
        varchar number PK
        int type_id FK,IX
        varchar name
        int capacity
    }
    
    DRAFT {
        int id PK
        varchar name
        int edition_year FK
        int edition_semester FK
        varchar status
        timestamp created_at
        timestamp last_modified
        text notes
        varchar created_by FK
    }
    
    DRAFT_CLASS_SCHEDULE {
        int id PK
        int draft_id FK
        int class_id FK
        varchar teacher_uuid FK
        int classroom_department FK
        int classroom_floor FK
        varchar classroom_number FK
        int day_of_week
        time hour_start
    }
    
    REQUEST {
        int id PK
        varchar user_uuid FK
        varchar name
        date request_date
        time hour_start
        int duration
        int status_id FK
        text description
        int number_vigilants
        timestamp created_at
        timestamp check_at
        varchar check_by FK
        int type_request_id FK
    }
    
    STATUS {
        int id PK
        varchar name UK
    }
    
    TYPE_REQUEST {
        int id PK
        varchar name UK
    }
    
    REQUEST_CLASSROOM {
        int request_id PK,FK
        int classroom_department PK,FK
        int classroom_floor PK,FK
        varchar classroom_number PK,FK
    }
    
    REQUEST_CLASSROOM_TYPE {
        int request_id PK,FK
        int classroom_type_id PK,FK
        int quantity
    }
    
    VIGILANTS {
        int request_id PK,FK
        varchar user_uuid PK,FK
    }
    
    SLOT {
        int id PK
        int day_of_week
        time time_start
    }
    
    TEMPLATE {
        int id PK
        varchar name
        timestamp created_at
        varchar user_uuid FK
    }
    
    TEMPLATE_SLOTS {
        int slot_id PK,FK
        int template_id PK,FK
    }
    
    AUDIT_LOG {
        int id PK
        varchar user_uuid FK,IX
        varchar action
        timestamp timestamp
        text description
    }
    
    ALLOWEDEMAIL {
        int id PK
        varchar email UK,IX
        text description
        timestamp created_at
    }
    
    USER ||--o{ PROFILE_USER : "has"
    PROFILE ||--o{ PROFILE_USER : "assigned to"
    
    SUBJECT ||--o{ SUBJECT_EDITION : "has editions"
    EDITION ||--o{ SUBJECT_EDITION : "contains"
    USER ||--o| SUBJECT_EDITION : "regente"
    
    COURSE ||--o{ COURSE_SUBJECT_EDITION : "contains"
    SUBJECT_EDITION ||--o{ COURSE_SUBJECT_EDITION : "belongs to"
    
    SUBJECT_EDITION ||--o{ CLASS : "has"
    
    CLASSROOM_TYPE ||--o{ CLASSROOM : "categorizes"
    
    EDITION ||--o{ DRAFT : "has"
    USER ||--o{ DRAFT : "created by"
    
    DRAFT ||--o{ DRAFT_CLASS_SCHEDULE : "contains"
    CLASS ||--o{ DRAFT_CLASS_SCHEDULE : "scheduled in"
    USER ||--o| DRAFT_CLASS_SCHEDULE : "teaches"
    CLASSROOM ||--o{ DRAFT_CLASS_SCHEDULE : "used by"
    
    USER ||--o{ REQUEST : "creates"
    USER ||--o| REQUEST : "checks"
    STATUS ||--o{ REQUEST : "has"
    TYPE_REQUEST ||--o| REQUEST : "categorizes"
    
    REQUEST ||--o{ REQUEST_CLASSROOM : "assigned"
    CLASSROOM ||--o{ REQUEST_CLASSROOM : "used by"
    
    REQUEST ||--o{ REQUEST_CLASSROOM_TYPE : "requests"
    CLASSROOM_TYPE ||--o{ REQUEST_CLASSROOM_TYPE : "requested"
    
    REQUEST ||--o{ VIGILANTS : "supervised by"
    USER ||--o{ VIGILANTS : "supervises"
    
    USER ||--o{ TEMPLATE : "creates"
    
    SLOT ||--o{ TEMPLATE_SLOTS : "included in"
    TEMPLATE ||--o{ TEMPLATE_SLOTS : "contains"
    
    USER ||--o{ AUDIT_LOG : "performs"
```

---

## 3. Core Concepts

### 3.1 Immutable vs. Mutable Academic Structure

#### **Subject (Abstract Course)**
- **Concept**: Represents the course in abstract form, containing **only data that NEVER changes**
- **Data examples**: Name, Acronym, ECTS
- **Note**: Does not contain information about professors, schedules, or students

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | INTEGER | PK, auto-generated | Unique identifier |
| `name` | VARCHAR(255) | NOT NULL, UNIQUE | Full course name |
| `acronym` | VARCHAR(255) | NOT NULL, INDEXED | Short course code (e.g., "AED") |
| `ects` | INTEGER | NOT NULL | European credit units |

#### **SubjectEdition (Course Instance)**
- **Concept**: Represents a course **in a specific edition** (year/semester)
- **Data that can vary between editions**:
  - Responsible professor (regente)
  - Total number of students
  - Weekly hours (TP, P, T, LAB)
  - Number of classes needed
- **Rule**: This data is **common throughout the entire edition** and only changes **between editions**

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | INTEGER | PK, auto-generated | Unique identifier |
| `subject_id` | INTEGER | FK → subject.id, NOT NULL | Reference to abstract course |
| `edition_year` | INTEGER | NOT NULL, Composite FK | Academic year |
| `edition_semester` | INTEGER | NOT NULL, Composite FK | Semester (1 or 2) |
| `regente_uuid` | VARCHAR(255) | FK → user.uuid, NULLABLE | Course coordinator |
| `total_students` | INTEGER | NOT NULL | Total enrolled students |
| `weekly_hours_tp` | INTEGER | DEFAULT 2 | Theoretical-Practical hours/week |
| `weekly_hours_p` | INTEGER | DEFAULT 2 | Practical hours/week |
| `weekly_hours_t` | INTEGER | DEFAULT 0 | Theoretical hours/week |
| `weekly_hours_lab` | INTEGER | DEFAULT 0 | Laboratory hours/week |

**Constraints:**
- `UNIQUE(subject_id, edition_year, edition_semester)` - One edition per subject per semester
- `FK(edition_year, edition_semester) → edition(year, semester)` - Valid edition reference

```
Example:
Subject: "Algorithms and Data Structures" (AED, 6 ECTS)
  ├─ SubjectEdition 2024/1: Prof. Silva, 150 students, 3h TP + 2h P
  └─ SubjectEdition 2024/2: Prof. Costa, 120 students, 3h TP + 2h P
```

### 3.2 Classes

- **Concept**: Practical division of a SubjectEdition
- **Identifier**: Combination of type + number (e.g., TP1, P2, T1, LAB3)
- **Attributes**:
  - Class type (TP, P, T, PL, LAB)
  - Number of students in that specific class
  - Duration (in minutes) - how long each lesson lasts
  - Number per week - how many times this class meets weekly
- **Relationship**: `SUM(Class.number_students)` should match `SubjectEdition.total_students`

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | INTEGER | PK, auto-generated | Unique identifier |
| `subject_edition_id` | INTEGER | FK → subject_edition.id, NOT NULL | Parent subject edition |
| `identifier` | VARCHAR(20) | NOT NULL | Class identifier (e.g., "TP1") |
| `class_type` | VARCHAR(10) | NOT NULL | Type: TP, P, T, PL, LAB |
| `duration` | INTEGER | NOT NULL | Duration per lesson (minutes) |
| `number_students` | INTEGER | NOT NULL | Students in this class |
| `number_per_week` | INTEGER | NOT NULL | How many times per week |

**Constraints:**
- `UNIQUE(subject_edition_id, identifier)` named `uq_subject_identifier`

#### **Fundamental Rule: Classes Can Have Multiple Lessons Per Week**

**Each class can have ONE OR MORE weekly lessons based on `number_per_week`.**

**Examples:**
```
SubjectEdition: AED (6h TP weekly for 150 students)
Option 1 - Single 3h classes:
  ├─ AED-TP1: 50 students, 3h duration, 1x/week (Monday 10:00-13:00)
  ├─ AED-TP2: 50 students, 3h duration, 1x/week (Wednesday 14:00-17:00)
  └─ AED-TP3: 50 students, 3h duration, 1x/week (Friday 09:00-12:00)

Option 2 - Multiple lessons per class:
  ├─ AED-TP1: 50 students, 90min duration, 2x/week
  │   ├─ Monday 10:00-11:30
  │   └─ Wednesday 10:00-11:30
  └─ AED-TP2: 50 students, 90min duration, 2x/week
      ├─ Tuesday 14:00-15:30
      └─ Thursday 14:00-15:30

SubjectEdition: BD (4h P weekly for 80 students)
  ├─ BD-P1: 40 students, 2h duration, 1x/week (Tuesday 14:00-16:00)
  └─ BD-P2: 40 students, 2h duration, 1x/week (Thursday 10:00-12:00)
```

**Important**: 
- `Class.duration` stores the duration of each individual lesson in minutes
- `Class.number_per_week` indicates how many lessons this class has per week
- In drafts, you create multiple `DraftClassSchedule` entries for classes with `number_per_week > 1`

---

## 4. User & Access Management

### 4.1 User

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `uuid` | VARCHAR(255) | PK | Unique identifier (from Keycloak) |
| `name` | VARCHAR(255) | NOT NULL | User's full name |
| `email` | VARCHAR(255) | NOT NULL, UNIQUE | User's email address |

### 4.2 Profile

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | INTEGER | PK, auto-generated | Unique identifier |
| `profile_type` | VARCHAR(255) | NOT NULL, UNIQUE | Role name (e.g., "admin", "teacher") |
| `description` | VARCHAR(255) | NULLABLE | Role description |

### 4.3 ProfileUser (Many-to-Many Junction)

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `user_uuid` | VARCHAR(255) | PK, FK → user.uuid | User reference |
| `profile_id` | INTEGER | PK, FK → profile.id | Profile reference |

### 4.4 AllowedEmail

Controls which email domains/addresses can register in the system.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | INTEGER | PK, auto-generated | Unique identifier |
| `email` | VARCHAR(255) | NOT NULL, UNIQUE, INDEXED | Allowed email pattern |
| `description` | TEXT | NULLABLE | Purpose/reason |
| `created_at` | TIMESTAMP | NOT NULL, auto-generated | Creation timestamp |

---

## 5. Academic Structure

### 5.1 Edition

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `year` | INTEGER | PK | Academic year (e.g., 2024) |
| `semester` | INTEGER | PK | Semester number (1 or 2) |
| `start_date` | DATE | NOT NULL | Semester start date |
| `end_date` | DATE | NOT NULL | Semester end date |

### 5.2 Course

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | INTEGER | PK, auto-generated | Unique identifier |
| `name` | VARCHAR(255) | NOT NULL, UNIQUE | Full course name (e.g., "Computer Science") |
| `code` | VARCHAR(255) | NOT NULL, UNIQUE | Course code (e.g., "LEI") |

### 5.3 CourseSubjectEdition

Links courses to subject editions with curricular year information.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `course_id` | INTEGER | PK, FK → course.id | Course reference |
| `subject_edition_id` | INTEGER | PK, FK → subject_edition.id | Subject edition reference |
| `curricular_year` | INTEGER | NOT NULL | Year in course (1st, 2nd, 3rd) |

---

## 6. Physical Resources

### 6.1 ClassroomType

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | INTEGER | PK, auto-generated | Unique identifier |
| `name` | VARCHAR(255) | NOT NULL, UNIQUE, INDEXED | Type name (e.g., "Laboratory", "Auditorium") |
| `description` | VARCHAR(255) | NULLABLE | Type description |

### 6.2 Classroom

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `department` | INTEGER | PK | Department number |
| `floor` | INTEGER | PK | Floor number |
| `number` | VARCHAR(255) | PK | Room number/identifier |
| `type_id` | INTEGER | FK → classroom_type.id, INDEXED | Room type reference |
| `name` | VARCHAR(255) | NULLABLE | Room name/alias |
| `capacity` | INTEGER | NOT NULL | Maximum occupancy |

**Room Types:**
- Laboratory (LAB)
- Auditorium (T - Large lectures)
- Normal Room (TP, P)
- Computer Room (PL)

---

## 7. Draft System

### 7.1 Purpose

The draft system allows **experimenting and optimizing timetables** before publishing them officially.

### 7.2 Optimization Goals

- **For Professors**: Minimize conflicts, respect time preferences
- **For Students**: Avoid overlaps between courses in the same curricular year
- **For Rooms**: Maximize occupancy and match room type to class type

### 7.3 Draft

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | INTEGER | PK, auto-generated | Unique identifier |
| `name` | VARCHAR(255) | NOT NULL | Draft name |
| `edition_year` | INTEGER | NOT NULL, Composite FK | Academic year |
| `edition_semester` | INTEGER | NOT NULL, Composite FK | Semester (1 or 2) |
| `status` | VARCHAR(50) | DEFAULT "deactive" | Status: draft, active, archived |
| `created_at` | TIMESTAMP | NOT NULL, auto-generated | Creation timestamp |
| `last_modified` | TIMESTAMP | NOT NULL, auto-updated | Last modification timestamp |
| `notes` | TEXT | NULLABLE | Additional notes |
| `created_by` | VARCHAR(255) | FK → user.uuid, NOT NULL | Creator reference |

**Constraints:**
- `UNIQUE(edition_year, edition_semester, name)` - Unique draft name per edition
- `FK(edition_year, edition_semester) → edition(year, semester)` - Valid edition reference

### 7.4 Draft Lifecycle
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

### 7.5 DraftClassSchedule

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | INTEGER | PK, auto-generated | Unique identifier |
| `draft_id` | INTEGER | FK → draft.id, NOT NULL | Parent draft |
| `class_id` | INTEGER | FK → class.id, NOT NULL | Class being scheduled |
| `teacher_uuid` | VARCHAR(255) | FK → user.uuid, NULLABLE | Assigned teacher |
| `classroom_department` | INTEGER | NOT NULL, Composite FK | Room department |
| `classroom_floor` | INTEGER | NOT NULL, Composite FK | Room floor |
| `classroom_number` | VARCHAR(255) | NOT NULL, Composite FK | Room number |
| `day_of_week` | INTEGER | NOT NULL | Day (1=Monday, 7=Sunday) |
| `hour_start` | TIME | NOT NULL | Lesson start time |

**Constraints:**
- `INDEX(teacher_uuid, day_of_week, hour_start)` named `ix_teacher_day_hour`
- `FK(classroom_department, classroom_floor, classroom_number) → classroom(department, floor, number)` named `fk_classroom`

**Relationships (SQLModel):**
- `draft: Draft` - Bidirectional relationship with Draft
- `class_: Class` - Bidirectional relationship with Class

Each `DraftClassSchedule` represents a **concrete lesson occurrence**:
- **Class** (Class) - which class this lesson belongs to
- **Professor** (teacher_uuid) - responsible for the lesson
- **Room** (Classroom via composite key)
- **Schedule** (day of week + start time)
- **Duration** - inherited from Class.duration, end time calculated as `hour_start + Class.duration`

#### **Fundamental Rules:**

1. **One class can have MULTIPLE lessons per draft**
```
   ✅ VALID: Class with number_per_week=2
   Draft 1:
   ├─ AED-TP1 → Monday 10:00-11:30 (lesson 1)
   └─ AED-TP1 → Wednesday 10:00-11:30 (lesson 2)
```

2. **Same class can be in different drafts with different schedules**
```
   ✅ VALID:
   Draft 1 (Experiment A):
   ├─ AED-TP1 → Monday 10:00-11:30, Prof. Silva
   └─ AED-TP1 → Wednesday 10:00-11:30, Prof. Silva
   
   Draft 2 (Experiment B):
   ├─ AED-TP1 → Tuesday 14:00-15:30, Prof. Costa
   └─ AED-TP1 → Thursday 14:00-15:30, Prof. Costa
```

3. **A draft can have multiple classes from the same subject**
```
   ✅ VALID:
   Draft 1:
   ├─ AED-TP1 → Monday 10:00-11:30
   ├─ AED-TP1 → Wednesday 10:00-11:30
   ├─ AED-TP2 → Tuesday 14:00-15:30
   ├─ AED-TP2 → Thursday 14:00-15:30
   └─ AED-TP3 → Friday 09:00-10:30
```

4. **Validation: Number of lessons matches number_per_week**
```
   Business Logic should validate:
   COUNT(DraftClassSchedule WHERE class_id=X AND draft_id=Y) == Class.number_per_week
```

### 7.6 Draft Flexibility

Within a draft, you can experiment with:
- ✅ Different professors for each lesson of the same class
- ✅ Different rooms for each lesson
- ✅ Different time slots for each lesson
- ✅ Different complete configurations

**Experimentation Example:**
```
Draft "Experiment A":
├─ AED-TP1 (2x/week): Prof. Silva, Room A101, Monday 10:00 + Wednesday 10:00
├─ AED-TP2 (2x/week): Prof. Costa, Room B202, Tuesday 14:00 + Thursday 14:00
└─ AED-TP3 (1x/week): Prof. Silva, Room A101, Friday 09:00

Draft "Experiment B" (same classes, different configuration):
├─ AED-TP1 (2x/week): Prof. Costa, Room C301, Monday 14:00 + Wednesday 14:00
├─ AED-TP2 (2x/week): Prof. Silva, Room A101, Tuesday 10:00 + Thursday 10:00
└─ AED-TP3 (1x/week): Prof. Costa, Room B202, Friday 14:00
```

---

## 8. Template and Slot System

### 8.1 Purpose

**Templates are used ONLY in the Business Logic layer** to issue warnings/alerts about time restrictions.

### 8.2 Slot

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | INTEGER | PK, auto-generated | Unique identifier |
| `day_of_week` | INTEGER | NOT NULL | Day (1-7) |
| `time_start` | TIME | NOT NULL | Time slot start |

**Constraints:**
- `UNIQUE(day_of_week, time_start)` named `uq_day_time`
- `CHECK(day_of_week >= 1 AND day_of_week <= 7)` named `ck_day_of_week`

- Represents a specific time block of 30 minutes
- Example: Monday, 08:00

### 8.3 Template

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | INTEGER | PK, auto-generated | Unique identifier |
| `name` | VARCHAR(255) | NOT NULL | Template name |
| `created_at` | TIMESTAMP | NOT NULL | Creation timestamp |
| `user_uuid` | VARCHAR(255) | FK → user.uuid, NOT NULL | Creator reference |

- Created by user (e.g., secretary, admin)
- Groups multiple slots
- **Practical use**: "Classes should only be scheduled at these times on these days"

### 8.4 TemplateSlots (Many-to-Many Junction)

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `slot_id` | INTEGER | PK, FK → slot.id | Slot reference |
| `template_id` | INTEGER | PK, FK → template.id | Template reference |

### 8.5 Usage Example
```
When Business Logic detects that a DraftClassSchedule
uses one slot that isn't available in the template, it issues a warning:
"⚠️ Warning: This class is scheduled outside recommended hours"
```

**Note**: Templates **do not block** timetable creation, they only **warn**.

### 8.6 Practical Use Cases

1. **Non-recommended hours**
   - Classes after 10 PM
   - Classes before 8 AM
   - Classes on Saturday
   - No classes on Friday

2. **Department preferences**
   - "Avoid Friday afternoons"
   - "Prioritize mornings for labs"

---

## 9. Room Request System

### 9.1 Concept

Room requests are **one-time events** (not associated with specific courses or editions).

### 9.2 Use Cases

- Department meetings
- Thesis defenses
- External workshops/seminars
- Student events
- Substitute classes
- Extraordinary exams
- Conferences

### 9.3 Status

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | INTEGER | PK, auto-generated | Unique identifier |
| `name` | VARCHAR(255) | NOT NULL, UNIQUE | Status name |

**Relationship (SQLModel):**
- `request: list[Request]` - Bidirectional relationship with Request

| Status | Description |
|--------|-------------|
| `pending` | Created, awaiting analysis |
| `approved` | Approved (rooms + supervisors assigned) |
| `rejected` | Rejected by admin |
| `cancelled` | Cancelled by requester |
| `completed` | Event has occurred |

### 9.4 TypeRequest

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | INTEGER | PK, auto-generated | Unique identifier |
| `name` | VARCHAR(255) | NOT NULL, UNIQUE | Request type name |

| Type | Description | Example |
|------|-------------|---------|
| `TEST` | Exams and tests | Final exam, mid-term test |
| `EVENT` | Academic events | Workshops, seminars, lectures |
| `MEETING` | Administrative meetings | Department meetings |
| `DEFENSE` | Thesis/dissertation defenses | Master's thesis defense |
| `OTHER` | Other events | Special activities |

### 9.5 Request

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | INTEGER | PK, auto-generated | Unique identifier |
| `user_uuid` | VARCHAR(255) | FK → user.uuid, NOT NULL | Requester |
| `name` | VARCHAR(255) | NOT NULL | Event name/title |
| `request_date` | DATE | NOT NULL | Event date |
| `hour_start` | TIME | NOT NULL | Event start time |
| `duration` | INTEGER | NOT NULL | Duration in minutes |
| `status_id` | INTEGER | FK → status.id, NOT NULL | Current status |
| `description` | TEXT | NOT NULL | Event description |
| `number_vigilants` | INTEGER | NULLABLE | Required supervisors count |
| `created_at` | TIMESTAMP | NOT NULL, auto-generated | Creation timestamp |
| `check_at` | TIMESTAMP | NULLABLE | Review timestamp |
| `check_by` | VARCHAR(255) | FK → user.uuid, NULLABLE | Reviewer |
| `type_request_id` | INTEGER | FK → type_request.id, NULLABLE | Event type |

**Relationship (SQLModel):**
- `status: Status` - Bidirectional relationship with Status

### 9.6 RequestClassroomType (What is Requested)

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `request_id` | INTEGER | PK, FK → request.id | Request reference |
| `classroom_type_id` | INTEGER | PK, FK → classroom_type.id | Requested room type |
| `quantity` | INTEGER | NOT NULL | How many rooms of this type |

- Specifies **which types of rooms** and **how many** are needed
- Examples:
  - "I need 2 laboratories"
  - "I need 1 auditorium + 1 meeting room"

### 9.7 RequestClassroom (What is Assigned)

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `request_id` | INTEGER | PK, FK → request.id | Request reference |
| `classroom_department` | INTEGER | PK, Composite FK | Room department |
| `classroom_floor` | INTEGER | PK, Composite FK | Room floor |
| `classroom_number` | VARCHAR(255) | PK, Composite FK | Room number |

**Constraints:**
- `FK(classroom_department, classroom_floor, classroom_number) → classroom(department, floor, number)`

- Contains **specific rooms** assigned to the request
- Filled by admin/system **after analyzing availability**

### 9.8 Vigilants (Supervisors)

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `request_id` | INTEGER | PK, FK → request.id | Request reference |
| `user_uuid` | VARCHAR(255) | PK, FK → user.uuid | Supervisor reference |

- List of people assigned to supervise the event
- **Associated with the request as a whole**, not with specific rooms
- Validation: Number of supervisors assigned should match `number_vigilants`

### 9.9 Request Flow
```
1. REQUEST CREATION
   ├─ User creates Request
   ├─ Specifies event type, date, schedule (hour_start + duration)
   ├─ Indicates how many supervisors are needed (number_vigilants)
   ├─ In RequestClassroomType: specifies room types and quantities
   │   Example: "2 laboratories + 1 auditorium"
   └─ Initial status: PENDING

2. ADMIN ANALYSIS
   ├─ Verifies room availability
   ├─ In RequestClassroom: assigns specific compatible rooms
   │   Example: Lab A101, Lab B202, Auditorium C301
   ├─ In Vigilants: assigns supervisors (if number_vigilants > 0)
   └─ Validates no conflicts

3. BLOCK APPROVAL
   ├─ Admin approves or rejects the ENTIRE request
   ├─ If approved:
   │   ├─ Request.status_id → 'approved'
   │   ├─ Request.check_at → NOW()
   │   └─ Request.check_by → admin_uuid
   └─ All assigned rooms and supervisors are approved together

4. FINALIZATION
   └─ After event occurs:
       └─ Request.status_id → 'completed'
```

### 9.10 Practical Example

**Scenario**: Programming exam needing 2 labs for 120 students
```
1. Professor creates request:
   Request:
   ├─ name: "Final Programming Exam"
   ├─ type_request_id: 1 (TEST)
   ├─ request_date: 2025-06-10
   ├─ hour_start: 10:00
   ├─ duration: 120 (minutes)
   ├─ number_vigilants: 3
   ├─ description: "Final Programming Exam - 120 students"
   └─ status_id: 1 (PENDING)

   RequestClassroomType:
   └─ classroom_type_id: 2 (Laboratory), quantity: 2

2. Admin assigns:
   RequestClassroom:
   ├─ Lab A101 (capacity 60)
   └─ Lab B202 (capacity 65)

   Vigilants:
   ├─ Prof. Silva (user_uuid: uuid-10)
   ├─ Prof. Maria (user_uuid: uuid-15)
   └─ Prof. Carlos (user_uuid: uuid-20)

3. Admin approves ALL AT ONCE:
   Request:
   ├─ status_id: 2 (APPROVED)
   ├─ check_at: 2025-05-20 14:30:00
   └─ check_by: admin-uuid-1
```

### 9.11 Separation of Responsibilities

| Table | Responsibility |
|-------|----------------|
| `Request` | General event data and global approval status |
| `RequestClassroomType` | What the user REQUESTS (types and quantities) |
| `RequestClassroom` | What is ASSIGNED (specific rooms) |
| `Vigilants` | Who supervises the event |

### 9.12 Key Validations

#### **Before Approving:**
1. **Assigned quantity = Requested quantity**
```
   For each RequestClassroomType:
   COUNT(RequestClassroom with that type) == quantity
```

2. **Number of supervisors = Required supervisors** (if applicable)
```
   If Request.number_vigilants IS NOT NULL:
   COUNT(Vigilants) == Request.number_vigilants
```

3. **No room conflicts**
```
   Rooms in RequestClassroom cannot have:
   - Approved classes in ACTIVE draft at same time
   - Other approved requests at same time
   
   Time overlap calculated as:
   request_hour_start to (request_hour_start + request_duration)
```

4. **No supervisor conflicts** (if vigilants are assigned)
```
   Supervisors cannot have:
   - Classes at same time
   - Other approved requests at same time
```

### 9.13 Difference: Requests vs. Drafts

| Aspect | Request (One-time) | Draft (Timetable) |
|--------|-------------------|-------------------|
| **Purpose** | Specific one-time event | Recurring weekly schedule |
| **Duration** | One specific date | Entire semester |
| **Association** | Not linked to courses | Linked to SubjectEditions |
| **Approval** | Block approval before event | Publication to make official |
| **Rooms** | Assigned for specific date/time | Assigned for every week |
| **Example** | Thesis defense on Dec 15 | AED-TP1 every Monday & Wednesday |
| **Supervisors** | Specific for the event | Not applicable |

---

## 10. Audit System

### 10.1 AuditLog

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | INTEGER | PK, auto-generated | Unique identifier |
| `user_uuid` | VARCHAR(255) | FK → user.uuid, INDEXED | Who performed the action |
| `action` | VARCHAR(50) | NOT NULL | Action type |
| `timestamp` | TIMESTAMP | NOT NULL, auto-generated | When it was performed |
| `description` | TEXT | NULLABLE | Action details |

**Constraints:**
- `INDEX(user_uuid)` named `ix_auditlog_user_id`

Records **all relevant actions** in the system:

| Action | Description | Example |
|--------|-------------|---------|
| `CREATE` | Record creation | New draft, new class, new request |
| `UPDATE` | Data modification | Professor change, new room |
| `DELETE` | Record removal | Delete schedule, cancel request |
| `PUBLISH` | Draft activation | Make draft official (status=ACTIVE) |
| `APPROVE` | Request approval | Approve room for event |

### 10.2 Log Examples
```json
{
  "user_uuid": "uuid-5",
  "action": "PUBLISH",
  "timestamp": "2024-11-15 14:30:00",
  "description": "Draft 'Final Timetable 2024/2' activated. Previous draft 'Provisional Timetable' archived."
}

{
  "user_uuid": "uuid-3",
  "action": "APPROVE",
  "timestamp": "2024-11-15 16:45:00",
  "description": "Request #123 approved: 2 laboratories + 3 supervisors for exam on 2024-12-15"
}
```

---

## 11. Main Business Rules

### 11.1 Editions
- Only semesters 1 or 2 are allowed
- An edition is identified by (year, semester)
- Example: (2024, 1) = 1st Semester of 2024

### 11.2 SubjectEdition
- Combination (subject_id, edition_year, edition_semester) is **unique**
- Must have **at least 1 class** (Class) associated
- Regente is optional but recommended
- Weekly hours define how many classes to create

**Planning Example:**
```
SubjectEdition: AED 2024/1
├─ weekly_hours_tp = 6h
├─ weekly_hours_p = 4h
├─ total_students = 150
└─ Class creation:
    ├─ AED-TP1: 50 students, 90min duration, 2x/week
    ├─ AED-TP2: 50 students, 90min duration, 2x/week
    ├─ AED-P1: 50 students, 2h duration, 1x/week
    └─ AED-P2: 50 students, 2h duration, 1x/week
```

### 11.3 Drafts

#### **Classes Can Have Multiple Lessons Per Draft**
- **No constraint preventing multiple lessons per class**
- Each `DraftClassSchedule` entry = one lesson occurrence
- Business Logic should validate: number of lessons matches `Class.number_per_week`
```sql
-- ✅ VALID: Same class multiple times in same draft
Draft 1:
├─ AED-TP1 → Monday 10:00-11:30
└─ AED-TP1 → Wednesday 10:00-11:30

-- ✅ VALID: Same class in different drafts
Draft 1: AED-TP1 → Monday 10:00, Wednesday 10:00
Draft 2: AED-TP1 → Tuesday 14:00, Thursday 14:00

-- ✅ VALID: Different classes in same draft
Draft 1:
├─ AED-TP1 → Monday 10:00-11:30
├─ AED-TP1 → Wednesday 10:00-11:30
├─ AED-TP2 → Tuesday 14:00-15:30
└─ AED-TP2 → Thursday 14:00-15:30
```

#### **Only One Active Draft Per Edition**
- Possible statuses: `draft`, `active`, `archived`, `deactive`
- When activating a draft, other active ones are automatically archived
- Drafts in `draft` mode can coexist without limits

#### **Creating Multiple Versions**
```
Edition 2024/1:
├─ Draft "Initial Version" (ACTIVE)
├─ Draft "Experiment A" (DRAFT) - test professor swaps
├─ Draft "Experiment B" (DRAFT) - test other schedules
└─ Draft "Experiment C" (DRAFT) - minimize conflicts
```

### 11.4 Classrooms
- Identified by (department, floor, number)
- Capacity must be respected (validated in Business Logic)
- Room type must be compatible with class type

### 11.5 Validations (Business Logic)

#### **Class Lesson Count**
```
Each class must have correct number of lessons in draft:
COUNT(DraftClassSchedule WHERE class_id=X AND draft_id=Y) == Class.number_per_week
```

#### **Professor Conflicts**
```
A professor CANNOT have 2 classes at the same time in the same draft
Validate: No overlapping lessons for same teacher

Check time overlap:
lesson1.hour_start < lesson2.hour_start + lesson2.duration AND
lesson1.hour_start + lesson1.duration > lesson2.hour_start
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
Validate: No overlapping lessons for same room
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
Duration should be reasonable (e.g., 30min, 60min, 90min, 120min, 180min)
End time calculated as: hour_start + (Class.duration minutes)
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
- Supervisors don't have classes at that time (if number_vigilants > 0)
- Supervisors don't have other approved requests at same time
- Number of assigned rooms matches requested quantities by type
- Number of supervisors matches number_vigilants (if specified)

Time calculations use:
- Draft lessons: hour_start to (hour_start + Class.duration)
- Requests: hour_start to (hour_start + Request.duration)
```

---

## 12. Database Schema (DBML)

```sql
// ClassManager Database Schema
// Generated from SQLModel models

Table "user" {
  "uuid" VARCHAR(255) [pk, not null]
  "name" VARCHAR(255) [not null]
  "email" VARCHAR(255) [not null, unique]
}

Table "profile" {
  "id" INTEGER [pk, not null]
  "profile_type" VARCHAR(255) [not null, unique]
  "description" VARCHAR(255)
}

Table "profile_user" {
  "user_uuid" VARCHAR(255) [pk, not null, ref: > user.uuid]
  "profile_id" INTEGER [pk, not null, ref: > profile.id]
}

Table "edition" {
  "year" INTEGER [pk, not null]
  "semester" INTEGER [pk, not null]
  "start_date" DATE [not null]
  "end_date" DATE [not null]
}

Table "course" {
  "id" INTEGER [pk, not null]
  "name" VARCHAR(255) [not null, unique]
  "code" VARCHAR(255) [not null, unique]
}

Table "subject" {
  "id" INTEGER [pk, not null]
  "name" VARCHAR(255) [not null, unique]
  "acronym" VARCHAR(255) [not null]
  "ects" INTEGER [not null]
  
  Indexes {
    acronym
  }
}

Table "subject_edition" {
  "id" INTEGER [pk, not null]
  "subject_id" INTEGER [not null, ref: > subject.id]
  "edition_year" INTEGER [not null]
  "edition_semester" INTEGER [not null]
  "regente_uuid" VARCHAR(255) [ref: > user.uuid]
  "total_students" INTEGER [not null]
  "weekly_hours_tp" INTEGER [default: 2]
  "weekly_hours_p" INTEGER [default: 2]
  "weekly_hours_t" INTEGER [default: 0]
  "weekly_hours_lab" INTEGER [default: 0]

  Indexes {
    (subject_id, edition_year, edition_semester) [unique]
  }
}

Ref: subject_edition.(edition_year, edition_semester) > edition.(year, semester)

Table "course_subject_edition" {
  "course_id" INTEGER [pk, not null, ref: > course.id]
  "subject_edition_id" INTEGER [pk, not null, ref: > subject_edition.id]
  "curricular_year" INTEGER [not null, note: '1º, 2º, 3º ano do curso']
}

Table "class" {
  "id" INTEGER [pk, not null]
  "subject_edition_id" INTEGER [not null, ref: > subject_edition.id]
  "identifier" VARCHAR(20) [not null]
  "class_type" VARCHAR(10) [not null]
  "duration" INTEGER [not null]
  "number_students" INTEGER [not null]
  "number_per_week" INTEGER [not null]

  Indexes {
    (subject_edition_id, identifier) [unique, name: "uq_subject_identifier"]
  }
}

Table "classroom_type" {
  "id" INTEGER [pk, not null]
  "name" VARCHAR(255) [not null, unique]
  "description" VARCHAR(255)

  Indexes {
    name
  }
}

Table "classroom" {
  "department" INTEGER [pk, not null]
  "floor" INTEGER [pk, not null]
  "number" VARCHAR(255) [pk, not null]
  "type_id" INTEGER [not null, ref: > classroom_type.id]
  "name" VARCHAR(255)
  "capacity" INTEGER [not null]

  Indexes {
    type_id
  }
}

Table "draft" {
  "id" INTEGER [pk, not null]
  "name" VARCHAR(255) [not null]
  "edition_year" INTEGER [not null]
  "edition_semester" INTEGER [not null]
  "status" VARCHAR(50) [default: 'deactive']
  "created_at" TIMESTAMP [not null, default: `CURRENT_TIMESTAMP`]
  "last_modified" TIMESTAMP [not null, default: `CURRENT_TIMESTAMP`]
  "notes" TEXT
  "created_by" VARCHAR(255) [not null, ref: > user.uuid]

  Indexes {
    (edition_year, edition_semester, name) [unique]
  }
}

Ref: draft.(edition_year, edition_semester) > edition.(year, semester)

Table "draft_class_schedule" {
  "id" INTEGER [pk, not null]
  "draft_id" INTEGER [not null, ref: > draft.id]
  "class_id" INTEGER [not null, ref: > class.id]
  "teacher_uuid" VARCHAR(255) [ref: > user.uuid]
  "classroom_department" INTEGER [not null]
  "classroom_floor" INTEGER [not null]
  "classroom_number" VARCHAR(255) [not null]
  "day_of_week" INTEGER [not null, note: '1=Segunda, 7=Domingo']
  "hour_start" TIME [not null]

  Indexes {
    (teacher_uuid, day_of_week, hour_start) [name: "ix_teacher_day_hour"]
  }
}

Ref: draft_class_schedule.(classroom_department, classroom_floor, classroom_number) > classroom.(department, floor, number)

Table "status" {
  "id" INTEGER [pk, not null]
  "name" VARCHAR(255) [not null, unique]
}

Table "type_request" {
  "id" INTEGER [pk, not null]
  "name" VARCHAR(255) [not null, unique]
}

Table "request" {
  "id" INTEGER [pk, not null]
  "user_uuid" VARCHAR(255) [not null, ref: > user.uuid]
  "name" VARCHAR(255) [not null]
  "request_date" DATE [not null]
  "hour_start" TIME [not null]
  "duration" INTEGER [not null, note: 'Duration in minutes']
  "status_id" INTEGER [not null, ref: > status.id]
  "description" TEXT [not null]
  "number_vigilants" INTEGER
  "created_at" TIMESTAMP [not null, default: `CURRENT_TIMESTAMP`]
  "check_at" TIMESTAMP
  "check_by" VARCHAR(255) [ref: > user.uuid]
  "type_request_id" INTEGER [ref: > type_request.id]
}

Table "request_classroom" {
  "request_id" INTEGER [pk, not null, ref: > request.id]
  "classroom_department" INTEGER [pk, not null]
  "classroom_floor" INTEGER [pk, not null]
  "classroom_number" VARCHAR(255) [pk, not null]
}

Ref: request_classroom.(classroom_department, classroom_floor, classroom_number) > classroom.(department, floor, number)

Table "request_classroom_type" {
  "request_id" INTEGER [pk, not null, ref: > request.id]
  "classroom_type_id" INTEGER [pk, not null, ref: > classroom_type.id]
  "quantity" INTEGER [not null]
}

Table "vigilants" {
  "request_id" INTEGER [pk, not null, ref: > request.id]
  "user_uuid" VARCHAR(255) [pk, not null, ref: > user.uuid]
}

Table "slot" {
  "id" INTEGER [pk, not null]
  "day_of_week" INTEGER [not null, note: '1-7']
  "time_start" TIME [not null]

  Indexes {
    (day_of_week, time_start) [unique, name: "uq_day_time"]
  }
}

Table "template" {
  "id" INTEGER [pk, not null]
  "name" VARCHAR(255) [not null]
  "created_at" TIMESTAMP [not null]
  "user_uuid" VARCHAR(255) [not null, ref: > user.uuid]
}

Table "template_slots" {
  "slot_id" INTEGER [pk, not null, ref: > slot.id]
  "template_id" INTEGER [pk, not null, ref: > template.id]
}

Table "audit_log" {
  "id" INTEGER [pk, not null]
  "user_uuid" VARCHAR(255) [not null, ref: > user.uuid]
  "action" VARCHAR(50) [not null]
  "timestamp" TIMESTAMP [not null, default: `CURRENT_TIMESTAMP`]
  "description" TEXT

  Indexes {
    user_uuid [name: "ix_auditlog_user_id"]
  }
}

Table "allowedemail" {
  "id" INTEGER [pk, not null]
  "email" VARCHAR(255) [not null, unique]
  "description" TEXT
  "created_at" TIMESTAMP [not null, default: `CURRENT_TIMESTAMP`]

  Indexes {
    email
  }
}
```

---

## 13. Summary Table of All Entities

| Entity | Primary Key | Description |
|--------|-------------|-------------|
| `user` | uuid | System users (from Keycloak) |
| `profile` | id | User roles/permissions |
| `profile_user` | (user_uuid, profile_id) | User-role assignments |
| `edition` | (year, semester) | Academic semesters |
| `course` | id | Degree courses |
| `subject` | id | Abstract course definitions |
| `subject_edition` | id | Course instances per semester |
| `course_subject_edition` | (course_id, subject_edition_id) | Course-subject mappings |
| `class` | id | Class groups within subject editions |
| `classroom_type` | id | Room categories |
| `classroom` | (department, floor, number) | Physical rooms |
| `draft` | id | Timetable drafts |
| `draft_class_schedule` | id | Scheduled lessons in drafts |
| `status` | id | Request status types |
| `type_request` | id | Request categories |
| `request` | id | Room booking requests |
| `request_classroom` | (request_id, department, floor, number) | Assigned rooms to requests |
| `request_classroom_type` | (request_id, classroom_type_id) | Requested room types |
| `vigilants` | (request_id, user_uuid) | Request supervisors |
| `slot` | id | Time slots for templates |
| `template` | id | Time restriction templates |
| `template_slots` | (slot_id, template_id) | Template-slot assignments |
| `audit_log` | id | System action log |
| `allowedemail` | id | Allowed registration emails |