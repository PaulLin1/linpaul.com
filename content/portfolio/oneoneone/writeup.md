---
title: "oneoneone"
date: "2026"
tags: ["Full Stack"]
---

oneoneone is a daily reading site. Every day it picks one poem, one essay, and one short
story, and everyone who visits sees the same three, the same way every Wordle player gets
the same puzzle. There's no feed, no personalization, no algorithm tuned to what you already
read. The picks come from a fixed, deterministic rotation, so the same date always produces
the same three works for every reader. The site has account settings for tracking and suggesting, but a user can use the site without ever signing up.

The idea comes from something Ray Bradbury recommended to aspiring writers. For a thousand nights, read one short story, one poem, and one essay before bed, on purpose
picking things dense enough with imagery and ideas. He credited that routine with a lot of his own writing. oneoneone runs that same routine automatically and makes it public, using public domain works pulled from Project Gutenberg, Wikisource, and similar archives, each one checked before it goes
live. Under the hood it's a Next.js app on Neon Postgres, with a scheduled pipeline that finds new
candidate works, checks their rights status, and reviews them, all through the same code path
whether a human or an unattended agent is running it

Read it at [readoneoneone.com](https://readoneoneone.com).