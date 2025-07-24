---
title:  "jailbreaking a kindle paperwhite 2 in 2025"
---

The other day my kindle went into a bad state, and had to be factory reset.

I got it working again, so here are the notes I took along the way.

## What I have
* Kindle Paperwhite 2 / PW2 / Kindle Paperwhite 6th Gen
* `system/version.txt`: `Kindle 5.4.0 (206145 050)`

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

## results
K5 jailbreak worked fine on 5.4.0, so I'm not updating for now

On boot after reset the kindle wants to be registered, I got around this by
copying my `system/acw/*` from the old kindle usb fs, and by deleting the
welcome document

I'm not convinced copying the acw helped any in hindsight, but that's what I
did, and I'm not undoing all this to check if it was necessary

mods (mostly from [NiLuJe's Snapshots thread](https://www.mobileread.com/forums/showthread.php?t=225030))
* `kindle-jailbreak-1.16.N-r19426.tar.xz`
* `kindle-rp-20180530.N-r18920.tar.xz`
* `kual-batterystatus-1.1.N-r18977.tar.xz`
* `kual-gawk-1.5.N-r18977.tar.xz`
* `kual-helper-0.5.N-r18980.tar.xz`
* `kual-kual-plus-0.2.N-r13380.tar.xz`
* `kual-mrinstaller-1.7.N-r19303.tar.xz`
* `KUAL-v2.7.35-g2d06358-20250103.tar.xz`
* [`CollectionsManager_2.8.1.zip`](https://www.mobileread.com/forums/showthread.php?t=186305)
  * I tried the 2017 versions from ADambi linked on the wiki linked from that
    post, but they gave an error message

KUAL has a "don't ota" button so I did that not the instructions from
WinterBreak, pretty sure it's the same thing but automatic.

I'm pretty sure I'm never connecting this to wifi ever again so it shouldn't
matter, but better safe than sorry.

Now I can read my book :)


===
UPDATE 2025-05-30
some [certs expired](https://www.mobileread.com/forums/showpost.php?p=4510449&postcount=2) and things wouldn't launch anymore


keysotre and update from https://www.mobileread.com/forums/showpost.php?p=4506164&postcount=1295
update mkk/developer.keystore
put k5 .bin in root, run update, not sure this was required
no dice
install jailbreak again, do keystore stuff again, no dice
install mkk
give up?
