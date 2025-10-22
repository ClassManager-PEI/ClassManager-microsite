
# Meeting 2

**Place:** IEETA
**Date:** 15th of October 2025 **Theme:** Definition of calendar, priorities, and architectural planning.
**Participants:** José Bagagem, Gonçalo Almeida, Simão Tojal, João Barreira, Margarida Ribeiro, Daniel Ferreira e João Almeida 

---

## Notes From the

| Notes Taken                                                                      | More Notes                                         |
| -------------------------------------------------------------------------------- | -------------------------------------------------- |
| (TODO)Define calendar by time and epics.                                         | Each module corresponds to an epic.                |
| User stories are the atomic elements of epics.                                   | Each user story belongs to a specific module/epic. |
| Tasks such as setting up shared repositories should be included in the calendar. | Operational planning element.                      |
| Assign **labels** for priorities, importance, and effort.                        | Helps manage development and sprint planning.      |
| Define **priority** of user stories, not only difficulty.                        | For better sprint distribution.                    |
| Planning is essential to avoid wasted development time.                          | Reiteration of importance.                         |

---

## Calendar and Planning

* The calendar will be structured **by time** (weekly/monthly) and **by epics** (modules).
* **Each module = one epic**, composed of several **user stories**.
* Technical setup tasks (e.g., repository configuration, CI/CD pipeline, mockup design) will also appear in the calendar to track progress.

---

## Mock-up Feedback

* Allow **schedule creation even with errors** (for flexibility during testing).
* Prepare a **list of questions** regarding schedule creation to clarify with the teacher responsible for scheduling processes.
* Enable viewing of **the schedule for a single UC (course)**.
* Consider **four main dimensions (frontiers)** for schedule generation:

  1. Course
  2. Classes
  3. Teacher
  4. Rooms
* If fully automatic generation is too complex, allow **manual schedule building** and provide **feedback** (validation only).
* Add a **draft mode** for schedule creation, to let users save incomplete or inconsistent schedules.

---

## Database Feedback

* One user can have **one or more profiles** → relation: `User *–* Profile`.
* The **ReqClassroom** entity must include the **type of event** (e.g., lecture, lab, seminar).
* Relation between **Class *–* Classroom** is many-to-many (`Class *–* Classroom`).
* Discussion on **how to store template information** in the database — **issue resolved**.
* Database schema will continue to evolve alongside the scheduling engine design.

---

## To Do

* Prepare a **final prioritized list of user stories**.
* Build the **project calendar**, structured by **epics** (modules) and **time** (development stages). On github.
* Assign **priority** to each user story.


