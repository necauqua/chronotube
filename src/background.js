browser.runtime.onMessage.addListener(message => {
    if (message.action === 'browser.history.deleteUrl') {
        browser.history.deleteUrl({url: message.url})
            .catch(console.error);
    }
});
