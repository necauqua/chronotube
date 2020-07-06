# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog], and this project adheres to [Semantic Versioning].

Also, dates in this file are in [Holocene Calendar] because it is amazing, logical and I want more people to know about it.

## [1.1.0] - 12020-07-06
### Added
 - Support for Twitch VOD's
 - Config for different styles of the time parameter in the URL (both YouTube and Twitch support both seconds-only and HMS) per site
 - Easy to extend system for adding support for other platforms (contributions are welcome) - does not affect end users (except that next updates will likely support more sites)
### Changed
 - Now properly building the extension with the `web-ext` tool and npm - does not affect end users
### Fixed
 - Worked around Firefox [Bug 753264](https://bugzilla.mozilla.org/show_bug.cgi?id=753264) that causes the history clutter by manually removing excess history items
 - Better icon rendering on HiDPI displays

## [1.0.0] - 12020-02-05
### Added
 - The first release, the addon just synced the URL with the playing video on YouTube only, the config only had the offset option

[Semantic Versioning]: https://semver.org/spec/v2.0.0.html "Semantic Versioning"
[Keep a Changelog]: https://keepachangelog.com/en/1.0.0/ "Keep a Changelog"
[Holocene Calendar]: https://en.wikipedia.org/wiki/Holocene_calendar "Holocene Calendar"
