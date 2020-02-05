
function run(offset) {
    const vids = document.getElementsByTagName('video');
    if (vids.length === 0) {
        console.error('No video tags found on the page');
        return;
    }
    const [vid] = vids;
    let prev;
    vid.addEventListener('timeupdate', () => {
        const seconds = Math.round(vid.currentTime) + offset;
        if (seconds !== prev && seconds > 0) {
            prev = seconds;
            const url = window.location.href.replace(/&t=\d+s|$/, '&t=' + seconds + 's');
            window.history.replaceState(null, '', url);
        }
    });
}

browser.storage.sync.get('offset')
    .then(
        res => run(parseInt(res.offset || '-1')),
        e => {
            console.error(e);
            run(-1);
        }
    );
