---
title: Prusa mk3s+ printer status
---

Next steps:
* mmu2s -> mmu3 or ultimulti


## input cable situation
There is a single ethernet/power connector location now:
![ethernet input](/assets/pages/prusa-mk3s/ethernet.jpg)
I didn't plan for clearance of the ethernet from the bed, so the quarter inch
bit provides enough of a shim to make it clear safely.

## power distribution
![power distribution](/assets/pages/prusa-mk3s/power.jpg)
Power rails from left to right:
* 24V from PSU
* GND
* GND II: more ground
* switched 24V, controlled by that relay in the middle of the picture by
  octoprint

That usb port sneaking out on the right side is 5v off the switched 24v rail to
run lights because the light strip I found was 5V with a usb connector.

## MMU
As of right now, it doesn't work because of the design flaw with the 5V rail,
but aside from that it didn't always load properly.  It's mounted with a
relocate thing that I didn't write down the source of so it's easier to work
on.

M10 bowden tube connectors from unknown source: `M10PassthroughPLate_v15.stl`

## octoprint
![octoprint pi](/assets/pages/prusa-mk3s/octopi.jpg)

rpi4 with
[a breakout I made](https://github.com/mtfurlan/um2-octoprint-breakout).

I don't have the power button hooked up because I don't want to cad a real
button panel, you can see the relay switch zip tied to the top of the z axis.

camera mount unknown source:
* `Prusa_I3_MK3_Camera_Mount_x_axis_v12.stl`
* `Raspberry_Camera_case_back_v1.stl`
* `Raspberry_Camera_case_front_v1.stl`


## filament box
Using the [Ikea Samla 45l Filament Buffering Dry Box V2 by Canislupus](www.printables.com/model/146367-ikea-samla-45l-filament-buffering-dry-box).

I need to reglue the lid snaps.

## Misc
bolt on stuff
* `long_mount_bottom.stl`
* `long_mount_top.stl`
* `short_mount_bottom.stl`
* `short_mount_top.stl`
* `PC4-M10 adapter.stl`

better knob: `lcd-knob.stl`

