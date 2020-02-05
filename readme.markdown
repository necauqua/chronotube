# Chronotube

This is a tiny addon that I made from my userscript just so that it would be synced across any of my devices where I happen to use Firefox (or even Chrome, since this is a web-extension apparently).

It simply updates your URL when you're watching a YouTube video so that it always contains a timecode at the position you're watching the vid.

This makes it a bit simpler to share videos with timecodes, but the main reason is to store the position at which I've stopped watching the video in the browser history.
Didn't want to bother with localStorage or whatever, and YouTube already had timecodes - also this was made just for fun and was my little userscript, as I've said above.

## Settings
I've also added a whole single setting - seconds offset.
It used to store not the exact second in the URL, but the one behind it, so that I definitely wont miss a couple of frames upon reloading.

This offset of -1 was moved to the config (addon preferences page or `options_ui` if that means anything to you) so that you can set it to 0 to disable it, to -5 or -whatever to have some time to recall whats happening in the vid, or even to some positive value if you wanted to for whatever reason :)

## Building
Yeah I made a little makefile to create the final zip instead of using the default tool whatever it is called, just for fun of course.

## License
Licensed under MIT except the icon, it was made by Freepik from www.flaticon.com
