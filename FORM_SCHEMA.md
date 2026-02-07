# DataPulse - Form Schema Reference

All form types available in the DataPulse Test Suite with their field schemas.

---

## 📧 Contact Form
**Form ID:** `contact-form`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| fullName | text | ✅ | User's full name |
| email | email | ✅ | Email address |
| subject | text | ❌ | Message subject |
| message | textarea | ❌ | Message content |

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

## 👤 User Registration
**Form ID:** `registration-form`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| firstName | text | ✅ | First name |
| lastName | text | ✅ | Last name |
| email | email | ✅ | Email address |
| password | password | ✅ | Password (auto-redacted) |
| newsletter | checkbox | ❌ | Newsletter opt-in |

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

## 📝 Product Survey
**Form ID:** `survey-form`

| Field | Type | Required | Options |
|-------|------|----------|---------|
| source | select | ✅ | google, social, friend, ad |
| rating | select | ✅ | 1-5 stars |
| feedback | textarea | ❌ | User comments |

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

## 📰 Newsletter Signup
**Form ID:** `newsletter-form`

| Field | Type | Required | Options |
|-------|------|----------|---------|
| email | email | ✅ | - |
| interests | multi-select | ❌ | tech, business, design, marketing |
| frequency | select | ✅ | daily, weekly, monthly |

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

## 📅 Appointment Booking
**Form ID:** `booking-form`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | text | ✅ | Full name |
| phone | tel | ✅ | Phone number |
| date | date | ✅ | Appointment date |
| time | time | ✅ | Appointment time |
| service | select | ✅ | consultation, demo, support |

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

## 🎫 Support Ticket
**Form ID:** `support-form`

| Field | Type | Required | Options |
|-------|------|----------|---------|
| email | email | ✅ | - |
| priority | select | ✅ | low, medium, high, urgent |
| issue | textarea | ✅ | Issue description |

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

## Database Storage

All submissions are stored in Supabase using this schema:

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

**Key Features:**
- ✅ JSONB allows flexible form fields
- ✅ No schema changes needed for new forms
- ✅ Query any field with PostgreSQL JSON operators
