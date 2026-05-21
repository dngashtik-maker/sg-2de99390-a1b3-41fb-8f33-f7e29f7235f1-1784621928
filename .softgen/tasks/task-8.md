---
title: Dynamic CPD Year Management
status: in_progress
priority: high
type: feature
tags: [admin, cpd, settings]
created_by: agent
created_at: 2026-05-21T14:10:00Z
position: 8
---

## Notes
Allow admins to dynamically add CPD tracking fields for new years (2026, 2027, etc.) instead of hardcoding year fields. The system should:
- Store CPD points as a year-indexed object
- Provide admin interface to add new years
- Automatically display all tracked years in profiles, leaderboard, edit forms
- Default to showing the two most recent years prominently

## Checklist
- [x] Create admin CPD settings page for adding new years
- [x] Add navigation to CPD settings from admin dashboard
- [ ] Update Member interface to use dynamic year structure `cpdPoints: { [year: string]: number }`
- [ ] Update profile page to display all years dynamically
- [ ] Update leaderboard to calculate totals from all years
- [ ] Update edit form to show inputs for all tracked years
- [ ] Update import functionality to support dynamic years

## Acceptance
- Admin can add new CPD year fields via settings interface
- All pages automatically display newly added years
- Historical data is preserved when adding new years
- Import templates reflect currently tracked years