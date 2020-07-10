browser.runtime.onMessage.addListener(({action, url}) => {
    if (action === 'browser.history.deleteUrl') {
        browser.history.deleteUrl({url})
            .catch(console.error);
    }
});
