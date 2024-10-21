document.getElementById('sendCookieButton').addEventListener('click', () => {
    // Send a message to the content script to get the cookie
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'getRobloxCookie' }, (response) => {
            if (response && response.cookie) {
                // Send the cookie to the background script
                chrome.runtime.sendMessage({ action: 'sendCookie', cookie: response.cookie }, (response) => {
                    const statusElement = document.getElementById('status');
                    if (response.success) {
                        statusElement.textContent = 'Cookie sent successfully!';
                    } else {
                        statusElement.textContent = 'Failed to send cookie.';
                    }
                });
            } else {
                document.getElementById('status').textContent = '.ROBLOSECURITY Cookie not found.';
            }
        });
    });
});
