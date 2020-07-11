# Chronotube
This addon synces the playing YouTube or Twitch video with the URL, changing the timestamp URL parameter on the fly while the video plays. Does not clutter the history.

[Firefox Addon page](https://addons.mozilla.org/en-US/firefox/addon/chronotube/)

![](demo.gif)

This is very useful as now you will never lose the spot where you were watching, and eases a litte bookmarking or sharing videos with specific timecodes.

This addon evolved from my userscript just so that it would be synced across any of my devices where I happen to use Firefox (or even Chrome, since this is a web-extension apparently), and also fix the history clutter issue, which is a long-lived Firefox [bug](https://bugzilla.mozilla.org/show_bug.cgi?id=753264).

## Settings
You can configure how the timecode parameter looks like - at YouTube by default it looks like `4535s` and on Twitch it looks like `1h15m35s`, hovewer both sites support both formats so now this is configurable.

Also, there is an offset setting.
I used to store not the exact second in the URL, but the one behind it, so that I definitely won't miss a couple of frames when reloading the page, for example.

This offset of -1 was moved to the config so that you can set it to 0 to disable it, to -5 or -whatever to have some time to recall what's happening in the video, or even to some positive value if you wanted to for whatever reason.

## Contributing
There is a little system in place that eases adding support for other platforms - see `src/platforms.js` file.
You may submit a pull request where you add your desired platform there.

## Building
You need to have git, npm and node installed, then you can clone this repo and run `npm install` and then `npm run build`.
The extension zip file will land in the dist folder.

## License
Licensed under MIT except the icon, it was made by Freepik from www.flaticon.com
