---
redirectFrom: joysticks-linux-joydev-evdev
date: 2020-09-05
title:  "Joysticks in Linux with joydev and evdev"
categories: linux
---

Linux has two joystick modules, `joydev` and `evdev`.

Most joystick calibration tooling is for joydev, but that's deprecated.


## Problem Statement
I would like to use a joystick in linux, and it needs to be calibrated.

Apparently this means learning things.


## evdev vs joydev overview
Linux has joydev(depricated) and evdev(used but harder to calibrate).

See also: [a reddit post](https://www.reddit.com/r/linux_gaming/comments/5xics8/a_big_problem_with_joysticks_in_linux_right_now/).

### joydev
```
/dev/input/js0
/dev/input/by-id/usb-SAITEK_CYBORG_3D_USB-joystick@ ⇒ ../js0
```
[jscal](https://manpages.debian.org/trixie/joystick/jscal.1.en.html) which has "type,precision,coefficients,..."
([coefficients explainer by gimx](https://web.archive.org/web/20240917222059/https://blog.gimx.fr/joystick-calibration-in-gnulinux/))

### evdev
```
/dev/input/event25
/dev/input/by-id/usb-SAITEK_CYBORG_3D_USB-event-joystick@ ⇒ ../event25
```
[evdev-joystick](https://manpages.debian.org/trixie/joystick/evdev-joystick.1.en.html), which has parameters for min/max/deadzone/fuzz

But fun fact, evdev-joystick basically just does:
```
fd = open(evdev, O_RDONLY)
abs_features.minimum = minvalue;
abs_features.maximum = maxvalue;
abs_features.flat = deadzonevalue;
abs_features.fuzz = fuzzvalue;
ioctl(fd, EVIOCSABS(axisindex), &abs_features)
```
But flat doesn't seem to do anything.

Looking at some history, there [used to be a comment](https://github.com/torvalds/linux/commit/d31b2865a4e8a9dd02f39e56c8fadb824c5e187b#diff-8770676ecb512b3a3f206b989cb6068bb1700e17e6e163e766fd7f095f0aec9bL1115) on the flat field that it's only used by joydev, so that's cool.
I gave up.


A bunch of posts on the internet are confused about what fuzz does, but it's just some smoothing.
See [drivers/input/input.c](https://github.com/torvalds/linux/blob/v6.17/drivers/input/input.c#L70-L84)


## Calibrating
### Calibrating for the "joydev" system
* [jscal](https://manpages.debian.org/stable/joystick/jscal.1.en.html): show and change joystick cal
* [jstest](https://manpages.debian.org/stable/joystick/jstest.1.en.html): show input
* [jstest-gtk](https://manpages.debian.org/stable/jstest-gtk/jstest-gtk.1.en.html): show input and change cal gui

What I ended up doing was the automated cal in `jstest-gtk`, and then manually editing the values till the deadzones worked out.

Export the cal with `jcal -p <device-name>`, it'll print out the jscal command to set the settings to how they are.

Debian's `joystick` package does some stuff with `/lib/udev/rules.d/60-joystick.rules` and `jscal-store`/`jscal-restore` to automatically apply calibrations for joydev via udev.

### Calibrating for the "evdev" system
* [evdev-joystick](https://manpages.debian.org/stable/joystick/evdev-joystick.1.en.html): show and change cal
* [evtest](https://manpages.debian.org/stable/evtest/evtest.1.en.html): show input, very raw
* [shumatech/evjs](https://github.com/shumatech/evjs): nice ncurses ui, wants you to save values to sqlite and use udev to apply the config
* [Virusmater/evdev-joystick-calibration](https://github.com/Virusmater/evdev-joystick-calibration) autocal script with some autoload functionality, I got frustrated and rewrote this but haven't pushed it

I used `evjstest` to get the calibration values, but I didn't want to call it's sqlite to apply config via udev, so
```
$ evdev-joystick -s /dev/input/by-id/usb-SAITEK_CYBORG_3D_USB-event-joystick | tail -n+2 | sed 's/  Absolute axis 0x.. (\([0-9]\+\)) (\([^)]\+\)).*min: \([-0-9]\+\), max: \([-0-9]\+\), flatness: \([-0-9]\+\).*, fuzz: \([-0-9]\+\))/evdev-joystick -e $joystickDev -a \1 -m \3 -M \4 -f \6/'
evdev-joystick -e $joystickDev -a 0 -m 34 -M 163 -d 0 -f 0
evdev-joystick -e $joystickDev -a 1 -m 36 -M 161 -d 0 -f 0
evdev-joystick -e $joystickDev -a 5 -m 18 -M 147 -d 0 -f 1
evdev-joystick -e $joystickDev -a 6 -m 17 -M 174 -d 0 -f 1
evdev-joystick -e $joystickDev -a 16 -m -1 -M 1 -d 0 -f 0
evdev-joystick -e $joystickDev -a 17 -m -1 -M 1 -d 0 -f 0
```


And then:`/etc/udev/rules.d/85-saitek-cyborg-3d-joystick-jscal.rules`:
```
SUBSYSTEM=="input", ATTRS{idVendor}=="06a3", ATTRS{idProduct}=="0006", ATTRS{product}=="CYBORG 3D USB", ACTION=="add", RUN+=" /bin/bash -c 'joystickDev=/dev/input/by-id/usb-SAITEK_CYBORG_3D_USB-event-joystick; evdev-joystick -e $joystickDev -a 0 -m 34 -M 163 -d 0 -f 0; evdev-joystick -e $joystickDev -a 1 -m 36 -M 161 -d 0 -f 0; evdev-joystick -e $joystickDev -a 5 -m 18 -M 147 -d 0 -f 1; evdev-joystick -e $joystickDev -a 6 -m 17 -M 174 -d 0 -f 1; evdev-joystick -e $joystickDev -a 16 -m -1 -M 1 -d 0 -f 0; evdev-joystick -e $joystickDev -a 17 -m -1 -M 1 -d 0 -f 0; '"
```


## Testing the inputs in programs
### Testing SDL
SDL is a cross-platform library a lot of games use.
I have no idea if the game I care about uses it, but I thought it did for a while.

To test how input looks to sdl, [Grumbel/sdl-jstest](https://github.com/Grumbel/sdl-jstest) works well.
It is important to run `git submodule init`.

One thing a bunch of places on the internet recommend is putting `SDL_JOYSTICK_DEVICE=/dev/input/js0` into your environment somehow.
This worked with SDL 1, but not SDL2, you can see that by trying it with `sdl-jtest` and `sdl2-jtest`

### Testing whatever windows gets via proton
To test whatever the windows inside wine gets, this works:
```
WINEPREFIX=$STEAMLIBRARY/steamapps/compatdata/$APPID/pfx $STEAMLIBRARY/steamapps/common/Proton\ 5.0/dist/bin/wine64 control
```

----
UPDATE 2025-10-09

got annoyed about deadzones not working

Rewrote some of this post with better learning because I found my own post while searching for background on linux joysticks, so clearly the SEO is good.
