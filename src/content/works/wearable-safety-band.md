---
title: Smart Wearable Safety Band for Women
year: 2026
role: Hardware Prototype & IoT Systems Architect
tags: [IoT Architecture, Microcontrollers, GPS / GSM, Hardware Concept]
banner: /works/covers/graphics.jpg
---

## Overview

The **Smart Wearable Safety Band** is a compact, discreet IoT emergency response prototype engineered to provide rapid, unobtrusive distress signaling for women navigating vulnerable environments.

### System Architecture
- **Multi-Sensor Trigger:** Integrates a concealed capacitive dual-tap pressure switch and an inertial accelerometer capable of detecting sudden impact or force trauma.
- **Immediate Telemetry Transmission:** Embedded GSM/GPRS module transmits high-accuracy GPS coordinates to designated emergency contacts and local security dispatch networks within 4 seconds.
- **Continuous Audible Deterrent:** Optional high-decibel piezo siren paired with an ultra-low-power Bluetooth Low Energy (BLE) link to the companion smartphone.

### Hardware & Firmware
- **Microcontroller:** ESP32 / Arduino Nano 33 BLE
- **Telemetry Modules:** SIM800L GSM/GPRS, Neo-6M GPS receiver
- **Power Optimization:** Deep-sleep firmware state machine yielding 72+ hours of active standby on a 450mAh LiPo cell
