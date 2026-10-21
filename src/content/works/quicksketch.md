---
title: QuickSketch — Playful Neural Doodle Recognition
year: 2026
role: Deep Learning Engineer & Full-Stack Architect
tags: [Python, Custom CNN, Computer Vision, Flask, Railway, Interactive Canvas]
link: https://madhavzanwar.github.io/quicksketch/
banner: /images/projects/quicksketch.jpg
---

## Overview

**QuickSketch** is a playful, high-performance sketch recognition web platform where users draw on an interactive canvas and a custom-trained Convolutional Neural Network (CNN) identifies the doodle in real time with high accuracy.

### Key Technical Capabilities
- **Low-Latency Neural Inference:** Sub-50ms inference pipeline processing serialized stroke vectors directly into a convolutional classifier.
- **Interactive HTML5 Canvas:** Smooth touch and mouse stroke rasterization with dynamic line-width normalization and bounding-box centering.
- **Custom CNN Architecture:** Trained on millions of standardized QuickDraw vector sketch datasets, optimized for edge and cloud deployment.

### System Architecture
- **Model:** PyTorch / TensorFlow custom CNN with batch normalization and dropout regularization.
- **Backend:** Flask / Python web server serving optimized ONNX model inference.
- **Frontend:** Responsive React & Vanilla Canvas with instant feedback visualizer.
