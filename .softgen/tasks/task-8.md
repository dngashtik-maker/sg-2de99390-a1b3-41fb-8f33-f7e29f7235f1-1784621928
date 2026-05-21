---
title: Dynamic CPD Year Management
status: done
priority: high
type: feature
tags: [admin, cpd, years, settings]
created_by: agent
created_at: 2026-05-21T14:00:00Z
position: 8
---

## Notes
Admin interface for dynamically adding and managing CPD tracking years. Instead of hardcoded 2024/2025 fields, the system supports unlimited years configured through admin settings. All pages (directory, profile, leaderboard, edit, import) adapt automatically to tracked years stored in localStorage.

## Checklist
- [x] Create admin CPD settings page for adding new years
- [x] Add navigation to CPD settings from admin dashboard
- [x] Update Member interface to use dynamic year structure `cpdPoints: { [year: string]: number }`
- [x] Update profile page to display all years dynamically
- [x] Update leaderboard to calculate totals from all years
- [x] Update edit form to show inputs for all tracked years
- [x] Update import functionality to support dynamic years

## Acceptance
- Admin can add new tracking years (2026, 2027, etc.) via settings page
- All pages automatically support newly added years without code changes
- Historical data is preserved when adding new years
- Import templates reflect currently tracked years