---
title: Member Directory Page
status: done
priority: high
type: feature
tags: [directory, ui, core]
created_by: agent
created_at: 2026-05-14T10:22:16Z
position: 1
---

## Notes
Main directory page showing all members in a scannable grid format. Includes search bar, filter options, and member cards. Industrial-utilitarian design with monospace typography and data-grid layout.

## Checklist
- [x] Set up design system: Import IBM Plex Mono and Space Mono fonts in globals.css
- [x] Configure color tokens in globals.css (graphite, steel, amber palette)
- [x] Register fonts and custom tokens in tailwind.config.ts
- [x] Create MemberCard component: displays member photo, name, role, email, phone in grid format
- [x] Create member directory page (index.tsx): grid of 12-15 member cards with mock data
- [x] Add search bar component at top of directory
- [x] Add filter buttons for member categories (All, Staff, Board, Volunteers)
- [x] Implement basic search functionality (filter by name)
- [x] Implement category filter functionality
- [x] Add stats header showing total member count

## Acceptance
- Directory displays members in a scannable grid
- Search filters members by name in real-time
- Category filters work correctly
- Design reflects industrial-utilitarian aesthetic with monospace fonts