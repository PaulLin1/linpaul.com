---
title: "oneoneone"
date: "2026"
tags: ["Full Stack"]
layout: "case-study"
aspect: "2/1"
---

A daily reading site that serves one short story, one poem, and one essay each day, drawn from quality writers in the public domain.

## Background

The idea comes from a talk by Ray Bradbury. His advice to aspiring writers was to read one short story, one poem, and one essay before bed for 1,000 nights. He credited that routine with improving his own writing and helping him come up with vivid imagery.

When I first started the routine myself, I found myself stuck in analysis paralysis, wondering whether the material I picked was useful enough. But that isn't the point. The routine works best when you're open to any piece from any writer. The site takes the choice away so you can focus on reading and soaking in the material.

## Decisions

Because of that, the site is deliberately simple. While developing it, I added extra features, like a randomizer to swap out the day's material and a way for users to suggest pieces. They're useful, but they distract from the main purpose of habitual reading.

Every reader also receives the same material, like a daily puzzle (Wordle, NYT Games, etc.). At first, I worried this would lead to a monoculture of people consuming the same thing every day. Realistically, any community that forms around the site would be small, and shared material gives people something to discuss.

## Under the hood

It's a Next.js app on Neon Postgres, with a scheduled pipeline that finds candidate works, checks their rights status, and reviews them. A portrait of the writer and a short description of each work are also generated.

Live at [readoneoneone.com](https://readoneoneone.com). Code on [GitHub](https://github.com/PaulLin1/oneoneone).
