/*global chrome*/
chrome.browserAction.setPopup({ popup: '' });

chrome.browserAction.onClicked.addListener(() => {
    chrome.tabs.create({ url: 'index.html' });
});