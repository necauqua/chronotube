async function main() {
    const hostInfo = platforms[location.host];
    if (!hostInfo) {
        return;
    }
    const [video] = document.getElementsByTagName('video');
    if (!video) {
        console.error('No video tags found on the page');
        return;
    }
    const {offset, styles = {}} = await browser.storage.sync.get(['offset', 'styles']);
    const offsetInt = parseInt(offset) || -1;
    const formatter = formatters[hostInfo.types[styles[location.host] || 0]].fn;
    const param = hostInfo.param || 't';

    const pattern = new RegExp(`([&?])${param}=${parameterRegex}|$`);
    let prev;
    video.addEventListener('timeupdate', () => {
        const seconds = Math.round(video.currentTime) + offsetInt;
        if (!(seconds !== prev && seconds > 0)) {
            return;
        }
        prev = seconds;
        const url = location.href.replace(pattern,
            (_, x) => `${x || (location.search.length > 0 ? '&' : '?')}${param}=${formatter(seconds)}`);
        history.replaceState(null, '', url);
        browser.runtime.sendMessage({action: 'browser.history.deleteUrl', url})
            .catch(console.error);
    });
}

main()
    .catch(console.error);
