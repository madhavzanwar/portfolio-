---
title: TraceGuard — Industrial AI Safety & Surveillance
year: 2026
role: Computer Vision Lead & Hackathon Finalist
tags: [YOLOv8, Computer Vision, OpenCV, FastAPI, Real-Time Inference]
link: https://github.com/madhavzanwar/traceguard
banner: /images/projects/traceguard.jpg
---

## Overview

**TraceGuard** was developed during the **Hack Carnival 2026** (36-Hour Hackathon Finalist), providing industrial facilities with automated, real-time safety compliance monitoring using custom YOLOv8 computer vision pipelines.

### Key Capabilities
- **Automated PPE Verification:** Detects hard hats, safety vests, gloves, and protective eyewear simultaneously across multiple video feeds.
- **Geofenced Zone Intrusion:** Identifies unauthorized personnel entering restricted machinery perimeters and triggers instant automated alarms.
- **Real-Time Edge Streaming:** RTSP stream ingestion with OpenCV hardware-accelerated decoding yielding 30+ FPS throughput.

### Technical Stack
- **Vision:** Ultralytics YOLOv8 fine-tuned on industrial compliance datasets.
- **Backend:** FastAPI, Python, WebSockets for instant incident dispatch.
- **Frontend:** Interactive telemetry dashboard with live bounding-box overlays.
