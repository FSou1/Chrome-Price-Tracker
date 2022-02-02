/*global chrome*/
export function playAudio(url) {
    let a = new Audio(url);
    a.play();
}

export function getPriceChangedAudio() {
    return chrome.runtime.getURL('note.mp3');
}

export function getPriceChangedNotification(price, title) {
    return {
        title: '$' + price,
        message: title
    };
}

export function getTooManyErrorsNotification(title) {
    return {
        title: 'Too many errors',
        message: title
    };
}

export function showNotification(notificationOptions) {
    const options = {
        iconUrl: chrome.runtime.getURL('logo192.png'),
        title: notificationOptions.title,
        message: notificationOptions.message,
        type: 'basic'
    };
    chrome.notifications.create(null, options);
}