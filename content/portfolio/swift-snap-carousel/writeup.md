---
title: SwiftSnapCarousel
date: '2026'
tags:
  - Design
  - App
languages:
  - Swift
images:
  - src: swift-snap-carousel-1.gif
    caption: GIF Demo
  - src: swift-snap-carousel-2.png
    caption: 1. A scrolling list
  - src: swift-snap-carousel-3.png
    caption: 2. Flip to reveal
  - src: swift-snap-carousel-4.png
    caption: 3. The expanding pill
  - src: swift-snap-carousel-5.png
    caption: 4. Center becomes selection
---
A snapping carousel component for SwiftUI.

## Background

My team for the senior capstone course at my university worked with Apple on a setup assistant for distributed computing across a cluster of Macs. Aside from the technical problems, we were tasked with building a UI similar to that of other macOS apps, with apps like Apple Watch Setup and Xcode as references. I was tasked with leading the UI design and pinpointed the discovery page as the most important page. I spent months designing this page, which led to the SnapCarousel component.

## Process

The three prior iterations of the component are shown on this page. Each solved part of the problem but fell short on their own. Combining them and adding positional selection, where the centered card becomes the selection, is what made the component come together. A technical issue I ran into was if the selected card changed its layout width when it expanded, the carousel's geometry would shift and decenter the rest of the items. The fix was to separate layout size from visual size. Every card holds the same space in the scroll layout, and the selected card grows visually past its slot while the scroll geometry stays put. Expansion also waits for scrolling to settle, so a fast swipe keeps every card compact and navigation stays fluid.

## Outcome

SnapCarousel shipped in the final app interface. During our presentation, several people assumed it was a native SwiftUI component, and a Swift engineer from Apple commented on how clean the design was. After the course, I extracted the component to be used by myself and others.

Code on [GitHub](https://github.com/PaulLin1/SwiftSnapCarousel).
