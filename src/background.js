browser.runtime.onMessage.addListener(message => {
    if (message.action === 'browser.history.deleteUrl') {
        browser.history.deleteUrl({url: message.url})
            .catch(console.error);
    }
});
Promise.all(Object.values(platforms)
    .map(({pattern}) =>
        browser.contentScripts.register({
            matches: [pattern],
            js: [
                {file: 'src/platforms.js'},
                {file: 'src/foreground.js'},
            ],
        })))
    .catch(console.error);
