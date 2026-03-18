# Milestone 4 - Usability

<div class="mt-8 rounded-2xl shadow-xl overflow-hidden border border-gray-200 w-full" style="aspect-ratio: 16/9">
<iframe src="/ClassManager-microsite/Milestone4.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH" width="100%" height="100%" style="border: none;"></iframe>
</div>

## Overview

With the MVP now functional and capable of supporting the core room reservation operations, this milestone focused on **usability** — evaluating whether the system is clear, efficient, and easy to use for its end users.

## Personas

- **Student** — Consults their timetable and finds out which room each class is in.
- **Teacher** — Validates their schedule and submits room reservation requests for exams or events.
- **Secretary** — Manages schedules and validates room reservation requests.
- **Admin** — Super user overseeing global schedule organisation and system management.

## Key Improvements

Based on usability principles and early feedback, several interface improvements were implemented before testing:

- **Contrast & colour coding** — Colours were revised in the drafts view to improve contrast, and consistent per-subject colour coding was introduced to help users locate subjects more quickly across the application.
- **Multi-language support** — The system now supports both Portuguese and English, allowing users to interact in their preferred language.
- **Change summary menu** — A menu was added to display a diff of changes made when a timetable is modified.
- **Conflict hints** — Textual cues were added to timetable cells to surface scheduling conflicts inline.
- **Multi-window workflow** — Following a suggestion from advisor Prof. João Almeida, the system now supports a three-window layout (room schedule, course schedule, and teacher schedule simultaneously), allowing users to see all relevant constraints at once and avoid conflicts.

## Usability Testing

Real usability tests were conducted with **17 participants** across three distinct test scripts, each tailored to the tasks each group actually performs day-to-day.

| Group | Participants | SUS Score |
|---|---|---|
| Students | 10 | 92.5 |
| Secretaries | 2 | 90.0 |
| Administrators | 5 | 79.0 |

The administrator group faced the most complex tasks — such as schedule planning and conflict resolution — and still achieved a solid score. Secretaries and students, whose workflows are more streamlined, scored in the **excellent** range.

Overall feedback was very positive, confirming the application is intuitive and meets the goals set at the project's outset. The tests also surfaced concrete friction points that are now being addressed.

## Next Steps

- **By next week** — Finalise the remaining small improvements identified during usability testing.
- **25/03 → 14/04** — Optimise algorithm response time and solution quality; implement caching and observability.
- **Upcoming milestones** — Each remaining milestone maps to a specific deliverable adapted to the project context.