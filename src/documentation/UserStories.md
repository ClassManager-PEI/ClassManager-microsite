# User Stories and Acceptance Criteria

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