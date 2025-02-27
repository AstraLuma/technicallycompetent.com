---
title:  "jailbreaking a kindle paperwhite 2 in 2025"
---

The other day my kindle went into a bad state, and had to be factory reset.
It's a good kindle I won forever ago by being on a team that hacked a
hackathon's rules, I don't want to pay money for a new one.


## What I have
* Kindle Paperwhite 2 / PW2 / Kindle Paperwhite 6th Gen
* `$mount/system/version.txt`: `Kindle 5.4.0 (206145 050)`

## literature review
### jailbreaks:
* [NiLuJe's Jailbreaks thread](https://www.mobileread.com/forums/showthread.php?t=320564)
  * updated 2023
  * WatchThis <= to 5.14.2.
  * archived instructions for KindleBreak 5.10.3 to 5.13.3
  * archived instructions for Factory JB PW2: 5.4.3.2
  * > of updates, remember that everything is basically evil since FW 5.12.x, so the only sure fire way not to get screwed is to *permanently* stay in Airplane mode.
    > On older FW versions, there are non-intrusive ways to prevent OTA updates, c.f., the mentions about that in the final section of this document.

* [NiLuJe's Snapshots thread](https://www.mobileread.com/forums/showthread.php?t=225030)
  * updated 2025
  * not a specific jailbreak, but list
  * K5 Factory JB >= 5.11
  * K5 JailBreak (5.0.x - 5.4.4.2)
  * KindleBreak (5.10.3 to 5.13.3)
* [WatchThis](https://www.mobileread.com/forums/showthread.php?t=346037)
  * <= 5.14.2, 0 day broken by 5.14.3
  * calls out PW2 5.12.2.2 directly
* [WinterBreak](https://kindlemodding.org/jailbreaking/kindle-models.html)
  * released 2025
  * > or particularly old devices (<PW3) simply have links to the latest firmwares at the time of writing.
  * requires registered kindle
  * > Disabling OTA Updates on firmware versions <=5.10.x is much easier
* [LanguageBreak](https://github.com/notmarek/LanguageBreak)
  * around 5.16.2
  * doesn't mention pw2
* [yossarian17 root shell](https://www.mobileread.com/forums/showthread.php?t=227532)
  * reported to work 5.3.9
  * I think this is used by NiLuJe's K5 JailBreak?

### stock kindle firmwares
[list of firmware versions from amazon](https://www.amazon.com/gp/help/customer/display.html?nodeId=200203720)
That doesn't work in the internet archive anymore, so I [made a backup](/pages/amazon-kindle-source-code-notices)

* factory firmware
  * [update_PW2_5.4.3.2_initial.bin](https://www.mediafire.com/file/d4177kuq2r7qb74/update_PW2_5.4.3.2_initial.bin)
    * [backup links are on this wiki page](https://wiki.mobileread.com/wiki/5_x_Jailbreak)
* updates
  * 5.8.2.1 >= version: `https://s3.amazonaws.com/firmwaredownloads/update_kindle_paperwhite_v2_$VERSION.bin`
  * 5.6.1 <= version <= 5.8.2: `https://s3.amazonaws.com/G7G_FirmwareUpdates_WebDownloads/update_kindle_paperwhite_v2_$VERSION.bin`



## the plan:
Try rooting 5.4.0 with K5 JailBreak

if that fails, update to 5.10.3 and try KindleBreak
