---
title: Member Directory Page
status: in_progress
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
- [ ] Set up design system: Import IBM Plex Mono and Space Mono fonts in globals.css
- [ ] Configure color tokens in globals.css (graphite, steel, amber palette)
- [ ] Register fonts and custom tokens in tailwind.config.ts
- [ ] Create MemberCard component: displays member photo, name, role, email, phone in grid format
- [ ] Create member directory page (index.tsx): grid of 12-15 member cards with mock data
- [ ] Add search bar component at top of directory
- [ ] Add filter buttons for member categories (All, Staff, Board, Volunteers)
- [ ] Implement basic search functionality (filter by name)
- [ ] Implement category filter functionality
- [ ] Add stats header showing total member count

## Acceptance
- Directory displays members in a scannable grid
- Search filters members by name in real-time
- Category filters work correctly
- Design reflects industrial-utilitarian aesthetic with monospace fonts