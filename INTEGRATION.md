# DataPulse Integration Guide

## Quick Start

Add DataPulse tracking to your website in 3 simple steps:

### Step 1: Create a Project

1. Sign up at the DataPulse dashboard
2. Click "New Project" in the Projects section
3. Enter your project name and domain
4. Copy your unique API key

### Step 2: Add the Tracking Code

Add this script before the closing `</body>` tag of your website:

```html
<!-- DataPulse Tracking Code -->
<script>
(function(d,p,k){
  var s=d.createElement('script');
  s.src='YOUR_DATAPULSE_URL/datapulse.js';
  s.dataset.key=k;
  s.async=true;
  d.head.appendChild(s);
})(document,'datapulse','YOUR_API_KEY');
</script>
```

Replace:
- `YOUR_DATAPULSE_URL` with the DataPulse server URL
- `YOUR_API_KEY` with your project's API key

### Step 3: Start Tracking

That's it! DataPulse will automatically:
- Detect all forms on your page
- Capture form submissions
- Send data to your dashboard in real-time

## What Gets Tracked

For each form submission, DataPulse captures:
- **Form ID**: The form's id, name, or a generated identifier
- **Form Data**: All form fields (passwords are automatically redacted)
- **Page URL**: Where the submission occurred
- **Timestamp**: When it happened
- **User Agent**: Browser information

## Configuration Options

### Ignoring Specific Forms

Add `data-datapulse-ignore` to forms you don't want tracked:

```html
<form data-datapulse-ignore>
  <!-- This form won't be tracked -->
</form>
```

### Custom API Endpoint

Specify a custom tracking endpoint:

```html
<script src="datapulse.js" 
        data-key="YOUR_API_KEY"
        data-url="https://your-api.com/api/track">
</script>
```

### Manual Event Tracking

Track custom events programmatically:

```javascript
// After DataPulse loads
window.DataPulse.track('custom-event', {
  action: 'button_click',
  value: 'signup',
  page: '/pricing'
});
```

## Viewing Your Data

1. **Dashboard**: See overview stats and recent submissions
2. **Submissions**: Browse all form submissions with filtering
3. **Export**: Download your data as JSON

## Troubleshooting

### Forms Not Being Tracked

1. Verify the API key is correct
2. Check browser console for errors
3. Ensure the script loads before form submissions
4. Confirm the form doesn't have `data-datapulse-ignore`

### Data Not Appearing

1. Check the backend server is running
2. Verify CORS is configured correctly
3. Look for API errors in browser network tab

## Security

- Password fields are automatically redacted
- All data is transmitted securely
- API keys are project-specific
- We never share or sell your data

## Need Help?

Check the dashboard's Help section or review the Architecture documentation for technical details.
