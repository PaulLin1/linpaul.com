---
title: "Social Media Sandbox"
date: "2026"
tags: ["Full Stack", "AI"]
layout: "case-study"
aspect: "9/5"
---

## Starting point

I'd spent a lot of time browsing an app called Silk and wanted to understand how it worked by rebuilding it. It's a platform where people collect and organize images, links, and text into curated channels like mood boards. To gather mock data, I pulled from the Are.na API to recreate Silk's core pieces: the feed, magic search, and channels, before the project drifted into its own thing, a sandbox for experimenting with different ways of representing media for social media.

## Feed

The feed is a masonry, Pinterest-style layout with infinite scroll, built in React off the ingested Are.na blocks. Color tags are used to define different types of contents. I added another feed layout called Ambient, which randomly presents images in your feed without the need to scroll. I think this is especially useful for channels where you want to ingest a mood of channel without scrolling.

## Search

Every image block gets embedded with a fine-tuned CLIP model and stored in Postgres with pgvector, indexed with HNSW for fast approximate nearest-neighbor search. "Magic search" embeds a text query into that same space and ranks images by cosine similarity instead of keyword matching, so a search for something like "quiet industrial interiors" returns images that look like that description rather than ones tagged with those words.

## Channels

Channels are the organizational layer inherited from Are.na, curated groups of blocks that give the sandbox structure beyond a flat feed. They're the entry point for browsing by someone else's curation rather than by search or similarity.

## Graph

The same embedding space that powers search also powers a dynamic graph view where any image becomes a node connected to its nearest visual neighbors. You can pan around and wander from one image to the next by similarity, rather than clicking back and forth through channels. The interaction is inspired by spiral.soot and by t-SNE graphs I'd used on a computer vision research project, a way of making an embedding space something you can walk through instead of just query.

## Under the hood

A scraper/ingest pipeline pulls channels, blocks, and connections from the Are.na API, images are served off R2, and the app is deployed on Vercel. The formatting is optimized for mobile as well as desktop. One recent addition was an ambient mode, first developed for my personal website and ported over here.

## Where it's headed

Again, I'm restricting myself to the initial Are.na data I pulled, for practicality, but plan to keep adding new ways of representing that same set of media.

You can try it at [https://micro-silk.fly.dev](https://micro-silk.fly.dev), or see
the code [on GitHub](https://github.com/PaulLin1/micro-silk).