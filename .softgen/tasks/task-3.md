---
title: Member Edit Form
status: in_progress
priority: high
type: feature
tags: [admin, form, edit]
created_by: agent
created_at: 2026-05-14T12:02:12Z
position: 3
---

## Notes
Admin edit form for updating member details. Accessed via "Edit" button on member profile pages. Form includes all member fields: name, role, category, email, phone, bio, skills, committees, join date, and status.

## Checklist
- [ ] Create edit page: pages/members/[id]/edit.tsx
- [ ] Build form with all member fields (name, role, category, email, phone, bio, skills, committees, join date, status)
- [ ] Add form validation
- [ ] Add "Edit" button to member profile page linking to edit form
- [ ] Add Save and Cancel buttons on edit form
- [ ] Style form with consistent design system

## Acceptance
- Edit button appears on member profile pages
- Edit form displays all current member data
- Form validation prevents invalid submissions
- Save button updates member data (mock implementation)
- Cancel returns to profile without changes