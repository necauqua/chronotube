const offset = document.getElementById('offset');

offset.addEventListener('change', () =>
    browser.storage.sync.set({ offset: offset.value }));

document.addEventListener('DOMContentLoaded', () =>
    browser.storage.sync.get('offset')
        .then(res => offset.value = res.offset || -1, console.error));
