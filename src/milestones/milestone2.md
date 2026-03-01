# Milestone 2 - Elaboration


<div class="mt-8 rounded-2xl shadow-xl overflow-hidden border border-gray-200 w-full" style="aspect-ratio: 16/9">
    <iframe src="/ClassManager-microsite/Milestone2.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH" width="100%" height="100%" style="border: none;"></iframe>
</div>

## State-of-the-art

The current state of the art is primarily based on a single professor, Professor Tomás, who developed his own system for resource management.

Our team met with the professor to gain a detailed understanding of how the process works and which tools he uses. The goal was to identify weaknesses in the current system and uncover opportunities for improvement.

The situation was more concerning than expected. However, despite having access to all this information, much of the knowledge used to create timetables relies entirely on the professor’s personal experience.


## Personas

- Student Receives notifications about schedule/room changes.
- Teacher Validates their schedule, declares availability, checks room conditions.
- Secretary User with limited IT experience, manages schedules, rooms, notifications.
- Admin Super user, full privileges, supports Secretary.

## Use Cases

Here we have the use cases for the MVP, as illustrated in the diagram below.

<img src="/ClassManager-microsite/useCase_Mvp.png" alt="ClassManager High-Level Architecture" width="100%" />

## Requirements

### Functional Requirements

- The system must allow authorized users to add, edit, and remove academic entities, including (but not limited to) subjects (UCs), teachers, groups/classes, and classrooms.

- The system must allow for association between teachers and subjects and define teaching hours per class.

- The system must allow setting global academic periods and specific unavailability for schedules.

- The system must send automatic notifications when changes occur in schedules or rooms.

- The system must allow teachers to submit availability and preferences to influence schedule planning.

- The system must allow teachers to request room reservations and receive approval or rejection feedback.

- The system must allow students to scan a room’s QR code to instantly view its timetable.

- The system must provide suggestions to resolve scheduling conflicts.

### Non-Functional Requirements

- The system should integrate the University of Aveiro’s Idp, allowing users to securely log in using their institutional credentials.

- The interface should be intuitive, visually clear, and easy to use for secretaries, teachers, and students through the following of Nielsen’s 10 Usability Heuristics.

- All API endpoints should be protected against SQL injection, XSS and CSRF attacks through tools like OWASP ZAP.


## Architecture
### Container-level Diagram

The following diagram illustrates the container-level architecture of our system.

<img src="/ClassManager-microsite/arch_tech.png" alt="ClassManager Container-level Architecture" width="100%" />

## Mockups
You can checkout our mockups <link src="#">here<link/>.

## Calendar 

Regarding the project timeline, it is not exactly the same as in the first milestone. Our meeting with Professor Tomás led us to adjust our initial efforts, quickly developing the frontend to test the workflow of actions.

It is important to note that we only added tasks; none were removed. Even with this addition, we managed to maintain all the functionalities originally planned for the project, staying within the established plan and schedule.

For this milestone, we focused on completing the frontend tasks. The first version of the frontend is now finished, and everything is prepared to begin the development of the backend required for our MVP. The updated project calendar is shown below.

<img src="/ClassManager-microsite/calendar_m2.png" alt="ClassManager Project Calendar" width="100%" />