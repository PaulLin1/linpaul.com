---
title: "Social Media Sandbox"
date: "2026"
tags: ["Full Stack", "AI"]
layout: "case-study"
aspect: "9/5"
---

A sandbox for experimenting with different ways of representing media on social platforms, which started as a rebuild of Silk.

## Background

I've spent a lot of time browsing Silk, a platform where people collect and organize images, links, and text into curated channels, like mood boards. I wanted to understand how it worked by rebuilding it. Using mock data from the Are.na API, I recreated Silk's core pieces: the feed, magic search, and channels. From there, the project drifted into its own thing.

## Process

### Feed

The feed is a masonry, Pinterest-style layout with infinite scroll, built in React from the ingested Are.na blocks. Color tags distinguish different types of content. I also added a second layout called Ambient, which presents images from the feed at random without the need to scroll. It's especially useful for channels where you want to take in the mood rather than browse item by item.

### Search

Every image is embedded with a fine-tuned CLIP model and stored in Postgres with pgvector, indexed with HNSW for fast approximate nearest-neighbor search. Magic search embeds a text query into that same space and ranks images by cosine similarity instead of keyword matching. A search for something like "quiet industrial interiors" returns images that look like that description, rather than ones tagged with those words.

### Channels

Channels are the organizational layer inherited from Are.na: curated groups of blocks that give the sandbox structure beyond a flat feed. They're the entry point for browsing through someone else's curation rather than by search or similarity.

### Graph

The same embedding space that powers search also powers a graph view, where each image is a node connected to its nearest visual neighbors. You can pan around and wander from one image to the next by similarity, rather than clicking back and forth through channels. The interaction is inspired by spiral.soot and by t-SNE graphs I used on a computer vision research project. It's a way of making an embedding space something you can walk through instead of just query.

## Under the hood

An ingest pipeline pulls channels, blocks, and connections from the Are.na API. Images are served from R2, and the layout is optimized for both mobile and desktop. The ambient mode was first developed for my personal website and ported over here.

## Next

For practicality, I'm limiting myself to the initial set of Are.na data I pulled, and plan to keep adding new ways of representing that same set of media.

Live at [micro-silk.fly.dev](https://micro-silk.fly.dev). Code on [GitHub](https://github.com/PaulLin1/micro-silk).
