# DataPulse — Form Schema Reference

> **Project:** DataPulse  
> **Version:** 1.0  
> **Last Updated:** February 2026  
> **Scope:** All form types available in the DataPulse Test Suite

---

## Table of Contents

1. [Contact Form](#1-contact-form)
2. [User Registration](#2-user-registration)
3. [Product Survey](#3-product-survey)
4. [Newsletter Signup](#4-newsletter-signup)
5. [Appointment Booking](#5-appointment-booking)
6. [Support Ticket](#6-support-ticket)
7. [Database Storage](#7-database-storage)

---

## 1. Contact Form

**Form ID:** `contact-form`

**Fields:**

- `fullName` (text, **required**) — User's full name
- `email` (email, **required**) — Email address
- `subject` (text, optional) — Message subject
- `message` (textarea, optional) — Message content

**Sample Submission:**

```json
{
  "formId": "contact-form",
  "data": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "subject": "Inquiry",
    "message": "I'm interested in your product..."
  }
}
```

---

## 2. User Registration

**Form ID:** `registration-form`

**Fields:**

- `firstName` (text, **required**) — First name
- `lastName` (text, **required**) — Last name
- `email` (email, **required**) — Email address
- `password` (password, **required**) — Password (auto-redacted by SDK)
- `newsletter` (checkbox, optional) — Newsletter opt-in

**Sample Submission:**

```json
{
  "formId": "registration-form",
  "data": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "[REDACTED]",
    "newsletter": true
  }
}
```

---

## 3. Product Survey

**Form ID:** `survey-form`

**Fields:**

- `source` (select, **required**) — How the user found the product. Options: `google`, `social`, `friend`, `ad`
- `rating` (select, **required**) — Satisfaction rating. Options: `1`–`5` stars
- `feedback` (textarea, optional) — User comments

**Sample Submission:**

```json
{
  "formId": "survey-form",
  "data": {
    "source": "google",
    "rating": "5",
    "feedback": "Great product!"
  }
}
```

---

## 4. Newsletter Signup

**Form ID:** `newsletter-form`

**Fields:**

- `email` (email, **required**) — Subscriber email address
- `interests` (multi-select, optional) — Topics of interest. Options: `tech`, `business`, `design`, `marketing`
- `frequency` (select, **required**) — Email frequency. Options: `daily`, `weekly`, `monthly`

**Sample Submission:**

```json
{
  "formId": "newsletter-form",
  "data": {
    "email": "user@example.com",
    "interests": ["tech", "design"],
    "frequency": "weekly"
  }
}
```

---

## 5. Appointment Booking

**Form ID:** `booking-form`

**Fields:**

- `name` (text, **required**) — Full name
- `phone` (tel, **required**) — Phone number
- `date` (date, **required**) — Appointment date
- `time` (time, **required**) — Appointment time
- `service` (select, **required**) — Service type. Options: `consultation`, `demo`, `support`

**Sample Submission:**

```json
{
  "formId": "booking-form",
  "data": {
    "name": "John Doe",
    "phone": "+1 234 567 890",
    "date": "2026-02-15",
    "time": "14:30",
    "service": "demo"
  }
}
```

---

## 6. Support Ticket

**Form ID:** `support-form`

**Fields:**

- `email` (email, **required**) — Contact email
- `priority` (select, **required**) — Ticket priority. Options: `low`, `medium`, `high`, `urgent`
- `issue` (textarea, **required**) — Issue description

**Sample Submission:**

```json
{
  "formId": "support-form",
  "data": {
    "email": "user@example.com",
    "priority": "high",
    "issue": "Cannot login to my account..."
  }
}
```

---

## 7. Database Storage

All submissions are stored in Supabase using a flexible JSONB schema. This allows any form structure to be captured without schema migrations.

```sql
CREATE TABLE submissions (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES projects(id),
  form_id TEXT,           -- e.g., "contact-form"
  data JSONB,             -- All form fields as JSON
  page_url TEXT,          -- Source page URL
  user_agent TEXT,        -- Browser info
  timestamp TIMESTAMPTZ   -- When submitted
);
```

**Key Design Decisions:**

- **JSONB column** allows flexible, schema-less form field storage.
- **No schema changes** are required when new form types are added.
- **PostgreSQL JSON operators** enable querying any nested field directly.
