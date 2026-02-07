/**
 * DataPulse Tracking SDK
 * Lightweight form tracking for websites
 * 
 * Usage:
 * <script src="datapulse.js" data-key="YOUR_API_KEY"></script>
 */

(function () {
    'use strict';

    // Configuration
    const SCRIPT_TAG = document.currentScript || document.querySelector('script[data-key]');
    const API_KEY = SCRIPT_TAG?.dataset?.key;
    const API_URL = SCRIPT_TAG?.dataset?.url || window.location.origin + '/api/track';

    // Validate API key
    if (!API_KEY) {
        console.warn('[DataPulse] No API key provided. Add data-key attribute to the script tag.');
        return;
    }

    console.log('[DataPulse] Tracking initialized');

    /**
     * Send tracking data to the API
     */
    function sendTrackingData(formId, formData) {
        const payload = {
            apiKey: API_KEY,
            formId: formId,
            data: formData,
            pageUrl: window.location.href,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString(),
        };

        // Use sendBeacon for reliable delivery
        if (navigator.sendBeacon) {
            const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
            navigator.sendBeacon(API_URL, blob);
        } else {
            // Fallback to fetch
            fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                keepalive: true,
            }).catch(err => console.warn('[DataPulse] Failed to send data:', err));
        }

        console.log('[DataPulse] Form submission tracked:', formId);
    }

    /**
     * Extract form data
     */
    function extractFormData(form) {
        const formData = {};
        const elements = form.elements;

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            const name = element.name || element.id;

            if (!name || element.type === 'submit' || element.type === 'button') {
                continue;
            }

            // Skip password fields for security
            if (element.type === 'password') {
                formData[name] = '[REDACTED]';
                continue;
            }

            if (element.type === 'checkbox') {
                formData[name] = element.checked;
            } else if (element.type === 'radio') {
                if (element.checked) {
                    formData[name] = element.value;
                }
            } else if (element.type === 'select-multiple') {
                formData[name] = Array.from(element.selectedOptions).map(opt => opt.value);
            } else if (element.value) {
                formData[name] = element.value;
            }
        }

        return formData;
    }

    /**
     * Generate unique form ID
     */
    function getFormId(form) {
        return form.id || form.name || form.action?.split('/').pop() || 'form-' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Handle form submit
     */
    function handleFormSubmit(event) {
        const form = event.target;

        // Skip if form has data-datapulse-ignore attribute
        if (form.dataset.datapulseIgnore !== undefined) {
            return;
        }

        const formId = getFormId(form);
        const formData = extractFormData(form);

        // Send tracking data
        sendTrackingData(formId, formData);
    }

    /**
     * Initialize tracking
     */
    function init() {
        // Track all form submissions
        document.addEventListener('submit', handleFormSubmit, true);

        // Track dynamically added forms
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeName === 'FORM') {
                        console.log('[DataPulse] New form detected');
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        // Expose manual tracking function
        window.DataPulse = {
            track: function (eventName, data) {
                sendTrackingData(eventName, data);
            },
            version: '1.0.0',
        };
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
