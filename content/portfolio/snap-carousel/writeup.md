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

## Initial Problem

For my senior capstone our team worked with Apple on a setup assistant for distributed computing across a cluster of Macs. Aside from the technical problems, one UI problem sat at the center of it: how do you let someone move between machines while still giving them enough to understand each one? I led the UI design and spent about a month on interaction models before the final carousel.

## Design progression

The design progression walks through the four models I tried. The first three each solved part of the problem, but were imperfect. However, once I combined all of them and added positional selection, the component came together. Scroll through the images on left, to see captioned pictures on each design.

## Making it feel stable

If the selected card actually changed its layout width when it expanded, the carousel's geometry would shift at the exact moment the card was meant to settle. The fix was to separate layout size from visual size: every card holds the same space in the scroll layout, and the selected one grows *visually* past its slot while the scroll geometry stays put. Expansion also waits for scrolling to settle, so a fast swipe keeps every card compact and navigation stays fluid.

## Making it into a component

I later pulled the interaction into a standalone SwiftUI package. The API stays small on purpose — the carousel decides *when* a card is selected and expanded; the caller decides what that looks like.

```swift
SnapCarouselView(items, selection: $selection) { item, isExpanded in
    MyCard(item: item, isExpanded: isExpanded)
}
```

## Outcome

SnapCarousel shipped in the final cluster interface. During our presentation several people assumed it was a native SwiftUI component, and a Swift engineer from Apple called it out as a standout. The implementation was demanding, but that isn't what people saw — they just saw a machine move into focus and tell them more about itself.

View the component [on GitHub](https://github.com/PaulLin1/SnapCarousel)
