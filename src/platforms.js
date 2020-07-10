/**
 ** This file contains all platform-specific configuration required for this addon.
 ** You may add support for another platform by changing this file and manifest.
 ** Don't forget to add the content script to the manifest (in package.json file)
 **/

/**
 * Formatters for the timecode parameters, separated because several platforms may reuse the same format.
 * Examples are, of course, YouTube and Twitch whose formats are actually interchangeable.
 */
const formatters = {
    secs: {
        desc: 'Seconds only, YouTube style (e.g. t=4535s)',
        fn: x => `${x}s`,
    },
    hms: {
        desc: 'HMS, Twitch style (e.g. t=1h15m35s)',
        fn: x => {
            const whole_mins = x % 3600;
            const h = Math.floor(x / 3600);
            const m = Math.floor(whole_mins / 60);
            const s = Math.ceil(whole_mins % 60);
            let res = s + 's';
            if (m !== 0 || h !== 0) {
                res = (m < 10 ? '0' + m : m) + 'm' + (s < 10 ? '0' : '') + res;
            }
            if (h !== 0) {
                res = `${h}h${res}`;
            }
            return res;
        },
    },
};

/**
 * Set of supported platforms and their configs.
 * <ul>
 * <li>`types` is a list of strings which are keys from the formatters object above.</li>
 * <li>`pattern` is a regex pattern that the `location.pathname + location.search` should match for the addon to apply.</li>
 * <li>`title` is the title of the section at the options page, so if you specify only one type above then you may not use it.</li>
 * <li>`param` specifies the query parameter name for the timecode, defaults to 't'.</li>
 * </ul>
 */
const platforms = {
    'www.youtube.com': {
        title: 'YouTube', // defaults to host itself, e.g. 'www.youtube.com'
        pattern: '/watch.*',
        types: ['secs', 'hms'], // if more than one then it will be added to config page
        // param: 't', // optional, defaults to 't'
    },
    'www.twitch.tv': {
        title: 'Twitch VOD\'s',
        pattern: '/videos/.*',
        types: ['hms', 'secs'],
    },
};
