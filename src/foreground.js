const listenedVideos = new WeakSet();

const hostInfo = platforms[location.host];

async function update() {
    if (!(location.pathname + location.search).match(hostInfo.pattern)) {
        return;
    }
    const [video] = document.getElementsByTagName('video');
    if (!video || listenedVideos.has(video)) {
        return;
    }
    listenedVideos.add(video);

    const {offset, styles = {}} = await browser.storage.sync.get(['offset', 'styles']);
    const offsetInt = parseInt(offset) || -1;
    const formatter = formatters[hostInfo.types[styles[location.host] || 0]].fn;
    const param = hostInfo.param || 't';

    const paramPattern = new RegExp(`([&?])${param}=[^&;]*?(?=&|;|$)|$`);
    let prev;
    video.addEventListener('timeupdate', () => {
        const seconds = Math.round(video.currentTime) + offsetInt;
        if (!(seconds !== prev && seconds > 0)) {
            return;
        }
        prev = seconds;
        const url = location.href.replace(paramPattern,
            (_, x) => `${x || (location.search.length > 0 ? '&' : '?')}${param}=${formatter(seconds)}`);
        history.replaceState(null, '', url);
        browser.runtime.sendMessage({action: 'browser.history.deleteUrl', url})
            .catch(console.error);
    });
}

if (hostInfo) {
    update().catch(console.error);
    new MutationObserver(() => update().catch(console.error))
        .observe(document.documentElement || document.body, {childList: true, subtree: true});
}
