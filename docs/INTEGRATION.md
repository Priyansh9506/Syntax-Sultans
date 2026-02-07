# DataPulse — Integration Guide

> **Project:** DataPulse  
> **Version:** 1.0  
> **Last Updated:** February 2026  
> **Audience:** Developers integrating DataPulse tracking into their websites

---

## Table of Contents

1. [Quick Start](#1-quick-start)
2. [What Gets Tracked](#2-what-gets-tracked)
3. [Configuration](#3-configuration)
4. [Troubleshooting](#4-troubleshooting)
5. [Security](#5-security)

---

## 1. Quick Start

Integration requires three steps:

### Step 1 — Create a Project

1. Sign up at the DataPulse dashboard.
2. Navigate to **Projects** → **New Project**.
3. Enter your project name and domain.
4. Copy your generated **API key**.

### Step 2 — Add the Tracking Code

Insert the following script before the closing `</body>` tag on your website:

```html
<script>
const API_KEY = 'YOUR_API_KEY';
const API_URL = 'http://localhost:3001/api/track';

function getFormData(form) {
  const data = {};
  for (let el of form.elements) {
    if (!el.name || el.type === 'submit') continue;
    if (el.type === 'password') data[el.name] = '[REDACTED]';
    else if (el.type === 'checkbox') data[el.name] = el.checked;
    else if (el.value) data[el.name] = el.value;
  }
  return data;
}

document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function(e) {
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apiKey: API_KEY,
        formId: this.id || 'form',
        data: getFormData(this),
        pageUrl: location.href
      })
    });
  });
});
</script>
```

> **Important:** Replace `YOUR_API_KEY` with the API key obtained in Step 1. Update `API_URL` to your production server URL when deploying.

### Step 3 — View Submissions

Navigate to **Dashboard** → **Submissions** to view tracked form data in real time.

---

## 2. What Gets Tracked

Each form submission captures the following data:

- **Form ID** — The form's `id` or `name` attribute
- **Form Data** — All field values (password fields are automatically redacted)
- **Page URL** — The URL where the submission occurred
- **Timestamp** — When the submission was made
- **User Agent** — Browser and device information

---

## 3. Configuration

### 3.1 Ignoring Specific Forms

To exclude a form from tracking, add the `data-datapulse-ignore` attribute:

```html
<form data-datapulse-ignore>
  <!-- This form will not be tracked -->
</form>
```

### 3.2 Manual Event Tracking

You can send custom events programmatically using the tracking API:

```javascript
fetch('http://localhost:3001/api/track', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    apiKey: 'YOUR_API_KEY',
    formId: 'custom-event',
    data: { action: 'button_click', page: '/pricing' },
    pageUrl: location.href
  })
});
```

---

## 4. Troubleshooting

- **Forms not being tracked** — Verify your API key is correct and confirm the tracking script is loaded on the page.
- **Data not appearing in dashboard** — Ensure the backend server is running and accessible from the client website.
- **CORS errors** — The DataPulse server includes CORS configuration by default. If issues persist, verify the server's CORS settings match your domain.

---

## 5. Security

- Password fields are automatically redacted before data transmission.
- All projects are authenticated via unique API keys.
- Data is stored in Supabase (PostgreSQL) with support for row-level security.
- HTTPS is supported and recommended for production deployments.
