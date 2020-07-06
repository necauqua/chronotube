async function main() {
    const {offset = -1, styles = {}} = await browser.storage.sync.get(['offset', 'styles']);

    const offsetElem = document.getElementById('offset');
    offsetElem.value = offset;
    offsetElem.addEventListener('change',
        () => browser.storage.sync.set({offset: offsetElem.value}));

    let html = '';
    let checkboxIndex = 0;

    for (const [host, {types, title=host}] of Object.entries(platforms)) {
        if (types.length <= 1) {
            continue;
        }
        const setting = parseInt(styles[host] || '0');
        const form = types.map(
            (type, i) =>
                `<input type="radio" id="checkbox${checkboxIndex}" name="style" ` +
                `data-host="${host}" data-index="${i}"${i === setting ? ' checked' : ''}/>` +
                `<label for="checkbox${checkboxIndex++}">${formatters[type].desc}</label>`).join('<br>');

        html += `<div class="host">${title}</div><form>${form}</form>`;
    }

    document.getElementById('timecode-params')
        .innerHTML += html;

    async function onCheckboxChange(e) {
        if (!e.target.checked) {
            return;
        }
        const {styles = {}} = await browser.storage.sync.get('styles');
        styles[e.target.dataset.host] = e.target.dataset.index;
        await browser.storage.sync.set({styles});
    }

    for (let i = 0; i < checkboxIndex; i++) {
        document.getElementById(`checkbox${i}`)
            .addEventListener('change', onCheckboxChange);
    }
}

main()
    .catch(console.error);

