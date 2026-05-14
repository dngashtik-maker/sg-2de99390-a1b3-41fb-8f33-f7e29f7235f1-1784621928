---
title: Member Data Import
status: in_progress
priority: high
type: feature
tags: [admin, import, csv, xml]
created_by: agent
created_at: 2026-05-14T12:42:38Z
position: 6
---

## Notes
Admin functionality to import member data from CSV or XML files. Allows bulk upload of members from existing membership systems. Includes file upload, data preview, validation, and confirmation before import.

## Checklist
- [ ] Create import page: pages/admin/import.tsx
- [ ] Add file upload component (CSV and XML support)
- [ ] Parse CSV files (name, credentials, role, company, country, etc.)
- [ ] Parse XML files with member data structure
- [ ] Display preview table of imported data
- [ ] Add validation for required fields
- [ ] Show import errors and warnings
- [ ] Add confirm import button
- [ ] Add link to import page from admin dashboard

## Acceptance
- Admin can upload CSV or XML files
- Preview shows all member data before import
- Validation catches missing required fields
- Successful import adds members to directory