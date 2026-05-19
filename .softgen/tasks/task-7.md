---
title: Advanced Directory Filters (CIArb Style)
status: in_progress
priority: medium
type: feature
tags: [directory, filters, search]
created_by: agent
created_at: 2026-05-14T13:55:00Z
position: 7
---

## Notes
Upgrade the directory filtering system to match the CIArb member directory. This replaces the simple category buttons with multiple dropdown filters for professional data points.

## Checklist
- [ ] Add Grade/Credentials filter dropdown (FCIArb, MCIArb, ACIArb)
- [ ] Add Country filter dropdown
- [ ] Add Primary Branch filter dropdown
- [ ] Update search bar to search across name, company, and role
- [ ] Update the `index.tsx` layout to accommodate the new filter sidebar or filter bar
- [ ] Ensure all filters work together (intersection/AND logic)
- [ ] Add a "Clear Filters" button

## Acceptance
- Users can filter the directory by multiple CIArb-specific criteria simultaneously
- The UI handles the expanded filter set cleanly
- Clearing filters resets the view to show all members