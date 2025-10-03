---
title: Comparing ublox GNSS module accuracy
---

Goals:
* how real are the marketeering numbers from ublox product page
* how good are the accuracy numbers from a ublox module data stream

[ublox f9 hps 1.4.0 interface description](https://content.u-blox.com/sites/default/files/documents/u-blox-F9-HPS-1.40_InterfaceDescription_UBXDOC-963802114-13138.pdf)
## What I have to test with

[instock PD5140 dc block splitter](https://www.instockwireless.com/DC-blocking-rf-splitter-4way-sma-pd5140.htm)


### antennas
* [sparkfun SPK6618H](https://www.sparkfun.com/gnss-multi-band-l1-l2-l5-surveying-antenna-tnc-spk6618h.html): L1/L2/L5/E6 GPS, GLONASS, Galileo, and BeiDou
* [ublox ann-MB-00-00](https://www.u-blox.com/en/product/ann-mb-series): L1, L2/E5b/B2I GPS, GLONASS, Galileo, and BeiDou

### modules

The modules under test are going to be
* [ZED-F9R](https://content.u-blox.com/sites/default/files/ZED-F9R_Integrationmanual_UBX-20039643.pdf)
  * IMU & wheel ticks for sensor fusion
  * only use if your use case matches one of the profiles:
    > optimized for automotive, e-scooter, rail vehicle and robotic lawn mower
    > platforms only
* [ZED-F9P](https://content.u-blox.com/sites/default/files/ZED-F9P_IntegrationManual_UBX-18010802.pdf)
  no imu, better at "centimeter-level" rtk
* [NEO-M8P](https://cdn.sparkfun.com/assets/a/a/d/2/2/NEO-M8P_HardwareIntegrationManual__UBX-15028081_.pdf)
  M8 that does "centimeter-level" RTK

actual devices:
* 3x C102-F9R, ZED-F9R devkit unknown firmware
* 1x EVK-F9P-16-00, NEO-F9P/ZED-F9P devkit unknown firmware
* 4x C94-M8P-2: NEO-M8P devkit unknown firmware

### Monuments that are nearby
stability A no pictures:
* up near troy: https://geodesy.noaa.gov/datasheets/passive-marks/index.html?PID=NE1606

Stability B with picutres:
* mound and 13.5 https://geodesy.noaa.gov/datasheets/passive-marks/index.html?PID=DI6413
* 8 and dequinder.5: https://geodesy.noaa.gov/datasheets/passive-marks/index.html?PID=DI6131

## Tests

### monument from NGS
static test, with a single antenna on a tripod going to a splitter with all the modules

test both antennas sparkfun and ublox sequentially

* ZED-F9R no imu, CFG-SFCORE-USE_SF=0
* ZED-F9R imu=static
* ZED-F9R imu=static, rtk fixed
* ZED-F9P rtk fixed

#### outputs
* graph each ublox like ![this person's](https://lh7-us.googleusercontent.com/ihaPLpK5bsSqtMJ0WP8bCQ0cPS7pMGX2N6o5RG_DigGCtahzaTeLNlR-OOVrrqFyKwqsbGePWa1bk0HRGxeMmwL-9q8mfYZ4mNd2TW2WHudRmB0B40oEeP7M5hXBu6AoJ0jRtHteAMZfMYSvEOQ_kSs)

#### results
* compare location to monument to measure actual accuracy
* compare location + location accuracy to monument to check if location accuracy is correct

### starr jc park rails
moving test, with a single antenna mounted to a train going to a splitter to all the modules

test both antennas sparkfun and ublox sequentially

* ZED-F9R no imu, CFG-SFCORE-USE_SF=0
* ZED-F9R imu=rail
* ZED-F9R imu=rail, rtk
* ZED-F9P rtk

I kinda also want to try an M8P with netowrk ntrip vs M8P with local ntrip over 915MHz from a base station that was allowed to settle
that would only be ublox antennas though

#### outputs
* graph of location for each module over time maybe on a map

#### results
* check how smooth and real the path looks (no jumps, similar elevation)
* compare to satellite photos of rail lines



## Test Setup
### wheel ticks
TODO: need direction and wheel tick lines from train

### Status Lights to make testing possible
* F9R for a light for sensor fusion initialized/initializing
* F9P for a light for rtk off/float/fixed
* M8P for a light for rtk off/float/fixed

maybe accuracy lights for each board like sparkfun has on their kit, 10m, 5m, 1m, 10cm, 1cm?

### data flow
ublox -> mcu for status lights
ublox -> computer for data logging

log to table of
time, module, location, hacc, vacc, sensor fusion status, rtk status, fix status(2d/3d)
