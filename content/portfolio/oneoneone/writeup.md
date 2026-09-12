---
title: "oneoneone"
date: "2026"
tags: ["Full Stack"]
---

oneoneone is a daily reading site inspired by a section of a talk from Ray Bradbury. His advice to asprigin writers it for a thousand nights, read one short story, one poem, and one essay before bed. He credited that routine with a lot of his own writing and helping him come up with imagery. The site replicates this by picking each of the aforementioned texts from quality writers from open source domains. This allows you, the reader, to focus on reading and soaking in the material rather than having to choose what to read. When I first started this routine, I found myself going through analysis paralysis, wondering if the material I picked was useful enough. However, that is not the point of this routine. Rather, you should act a sponge and soak up any material given to you. Because of this the site is simple without bells and whistles. While developing, I added a lot of extra features, like a randomizer so you can change the material presented to you and an option for users to suggest pieces. These are useful, but I think they distract from the main purpose of habitual reading.

Another quirk is that every person recieves the same material. At first, I was scared that this would lead to monoculture of people consuming the same material every day. But realistically, I think if a community builds around this site, it would be small and serving the same material can lead to good discussion.

Under the hood it's a Next.js app on Neon Postgres, with a scheduled pipeline that finds new
candidate works, checks their rights status, and reviews them. Additionally, a portrait of the writer and a short description of the work is presented.

You can try it at [readoneoneone.com](https://readoneoneone.com), or see
the code [on GitHub](https://github.com/PaulLin1/oneoneone).