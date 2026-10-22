---
title: "Snap Carousel"
date: "2026"
tags: ["Design", "App"]
layout: "case-study"
aspect: "3/2"
hero: "artwork-1.gif"
images:
  - src: "artwork-list.png"
    caption: "1 · A scrolling list"
  - src: "artwork-flip.png"
    caption: "2 · Flip to reveal"
  - src: "artwork-pill.png"
    caption: "3 · The expanding pill"
  - src: "artwork-final.png"
    caption: "4 · Center becomes selection"
---

A carousel component for a Mac cluster setup assistant, designed for my senior capstone with Apple. I led the UI design.

## Background

Our team worked with Apple on a setup assistant for distributed computing across a cluster of Macs. Aside from the technical problems, one UI problem sat at the center of it: how do you let someone move between machines while still giving them enough information to understand each one?

## Process

I spent about a month on interaction models before arriving at the final carousel. The images alongside walk through the four models I tried. The first three each solved part of the problem but fell short on their own. Combining them and adding positional selection, where the centered card becomes the selection, is what made the component come together.

## Decisions

If the selected card actually changed its layout width when it expanded, the carousel's geometry would shift at the exact moment the card was meant to settle. The fix was to separate layout size from visual size. Every card holds the same space in the scroll layout, and the selected card grows visually past its slot while the scroll geometry stays put. Expansion also waits for scrolling to settle, so a fast swipe keeps every card compact and navigation stays fluid.

## Outcome

SnapCarousel shipped in the final app interface. During our presentation, several people assumed it was a native SwiftUI component, and a Swift engineer from Apple commented on how clean the design was.

Code on [GitHub](https://github.com/PaulLin1/SnapCarousel).
