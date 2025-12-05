---
title: Firefox Scrollbar configs
---

I don't like stupid tiny scrollbars.

As of firefox 145.0.2, this is what I know.

[documentation in comments](https://searchfox.org/firefox-release/source/modules/libpref/init/StaticPrefList.yaml)

`about:config`:
```
# prevent websites from making scrollbars smaller
layout.css.scrollbar-width-thin.disabled = true

# set the scrollbar width
widget.non-native-theme.scrollbar.size.override = 30

# set scrollbar style
# 0. Default Platform scrollbar style
# 1. MacOS style
# 2. GTK scrollbars
# 3. Android style
# 4. Windows 10 style
# 5. Windows 11 style
# using 2 cause because of gtk config stuff
widget.non-native-theme.scrollbar.style = 2

# don't do scrollbars as overlays over content
# https://docs.gtk.org/gtk3/property.ScrolledWindow.overlay-scrolling.html
widget.gtk.overlay-scrollbars.enabled = false

# use square ends instead of round on GTK style scrollbars
widget.non-native-theme.gtk.scrollbar.round-thumb = false
```

If you want buttons, maybe look at [this support forum thread](https://support.mozilla.org/en-US/questions/1420887), but I didn't try it

Sources:
* [techav on tumblr](https://techav.net/post/801587738081165312/what-documentation-exists-for-these-controls-is)
* [Michael Kjörling's blog](https://michael.kjorling.se/blog/2025/firefox-larger-scrollbars/)
