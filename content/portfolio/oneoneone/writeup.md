---
title: "oneoneone"
date: "2026"
tags: ["Next.js", "Full-Stack", "Personal Project"]
---

oneoneone is a daily reading site. Every day it picks one poem, one essay, and one short
story, and everyone who visits sees the same three, the same way every Wordle player gets
the same puzzle. There's no feed, no personalization, no algorithm tuned to what you already
read. The picks come from a fixed, deterministic rotation, so the same date always produces
the same three works for every reader, and I never have to store or compute anything per
visitor to make that true.

The idea comes from something Ray Bradbury said about his own habits: for a thousand nights
early in his career he read one short story, one poem, and one essay before bed, on purpose
picking things dense enough with imagery and ideas that his head filled up faster than he
could consciously track. He credited that routine with a lot of his own writing. oneoneone
runs that same routine automatically and makes it public, using public domain works pulled
from Project Gutenberg, Wikisource, and similar archives, each one checked before it goes
live.

Under the hood it's a Next.js app on Neon Postgres, with a scheduled pipeline that finds new
candidate works, checks their rights status, and reviews them, all through the same code path
whether a human or an unattended agent is running it. Signing in with Google is optional and
only adds a private reading history and the ability to recommend a work for the catalog; the
daily rotation itself never changes based on who's looking.

Read it at [readoneoneone.com](https://readoneoneone.com).