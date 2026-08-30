---
title: "Micro Silk"
date: "2026"
tags: ["Full Stack", "AI", "Search"]
---

Micro Silk is a personal project built on top of Are.na, a platform where
people collect and organize images, links, and text into curated "channels."
I'd spent a lot of time browsing an app called Silk and wanted to make my own version of it. Using the new Are.na API, I got similar data that I used to experiment. I recreated the masonry feed (kind of like Pinterest-style feed), magic search, and channels from Silk. I also added a dynamic graph view using embeddings inspired by spiral.soot and t-SNE graphs I used for a computer vision research project.

Under the hood, every image block gets embedded with a fine-tuned CLIP model
and stored in Postgres with pgvector, indexed with HNSW for fast
approximate nearest-neighbor search. That embedding space powers two
features: a "magic search" bar that embeds a text query and ranks images by
cosine similarity instead of keyword matching, and an "explore" mode that
turns any image into a node in a pannable graph of its nearest visual
neighbors, so you can wander from one image to the next by similarity rather
than by clicking back and forth through channels.

The rest is a fairly standard full-stack setup. React on the
frontend with an infinite-scroll feed, a scraper/ingest pipeline that pulls
channels, blocks, and connections from the Are.na API, and images served off
R2. It's deployed on Vercel.

You can try it at [https://micro-silk-pi.vercel.app/](https://micro-silk-pi.vercel.app/), or see
the code [on GitHub](https://github.com/PaulLin1/micro-silk).