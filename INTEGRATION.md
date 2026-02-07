# DataPulse Integration Guide

## Quick Start (3 Steps)

### 1. Create a Project
1. Sign up at DataPulse dashboard
2. Go to **Projects** → **New Project**
3. Enter name and domain
4. Copy your **API key**

### 2. Add Tracking Code
Add before `</body>` on your website:

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

### 3. View Submissions
Go to **Dashboard** → **Submissions** to see tracked data.

---

## What Gets Tracked

| Field | Description |
|-------|-------------|
| Form ID | Form's id/name attribute |
| Form Data | All fields (passwords redacted) |
| Page URL | Where submission occurred |
| Timestamp | When it happened |
| User Agent | Browser info |

## Configuration

### Ignore Specific Forms
```html
<form data-datapulse-ignore>
  <!-- This form won't be tracked -->
</form>
```

### Manual Event Tracking
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

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Forms not tracked | Check API key, verify script loads |
| Data not appearing | Ensure backend server is running |
| CORS errors | Server CORS is pre-configured |

## Security

- ✅ Password fields auto-redacted
- ✅ API key authentication
- ✅ Data stored in Supabase (PostgreSQL)
- ✅ HTTPS supported in production
