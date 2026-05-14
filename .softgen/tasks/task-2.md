---
title: Member Profile Pages
status: done
priority: medium
type: feature
tags: [profile, routing, detail-view]
created_by: agent
created_at: 2026-05-14T10:22:16Z
position: 2
---

## Notes
Individual member profile pages accessed by clicking member cards. Shows full member details including bio, skills, committees, and contact information. Uses dynamic routing with [id] parameter.

## Checklist
- [x] Create dynamic route: pages/members/[id].tsx
- [x] Design profile layout with photo, full details, bio section
- [x] Add back button to return to directory
- [x] Display member committees/groups
- [x] Display member skills or areas of expertise
- [x] Show join date and member status
- [x] Link member cards in directory to profile pages

## Acceptance
- Clicking a member card navigates to their profile page
- Profile displays all member information clearly
- Back button returns to directory with preserved search/filter state