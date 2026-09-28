---
title: "Flower Computational Design"
date: "2026"
tags: ["Design"]
layout: "case-study"
aspect: "3/2"
---

A set of modular tools for computational design, built around a generative flower primitive that can be composed, simulated, and transformed into different visual systems.

## Background

After seeing the cover design for [Homer Radio](https://music.apple.com/us/curator/homer-radio/1620058858), which features speakers arranged in intricate patterns, I became interested in computational design again. I had briefly encountered the field in a class on evolutionary computation (CSE 848 at Michigan State University), which led to small projects of my own, like boid simulations and neural architecture graphs. Seeing computational systems used as a serious design tool changed how I thought about them. It showed me that computation could be at the forefront of visual design rather than simply supporting it.

That led me to the work of John Maeda, particularly Design by Numbers. I was fascinated by how simple rules could produce work that felt organic, and Florada especially stood out to me.

## Process

I started by building a system that generates flowers from a set of parameters. From there, I combined it with ideas from evolutionary computation, experimenting with boid-like simulations where flowers move through a space while rotating and responding to one another. This was also influenced by the work of [Danny Cole for Loukeman](https://www.instagram.com/p/DXh8y86jqTf/?img_index=1).

Eventually, I restructured the repository into a collection of modular tools, where individual systems can be combined to create different compositions and behaviors. The flower is the core primitive. Around it, I've built several ways of composing and transforming it, including a collage view and a rotational view.

## Outcome

The goal is less about producing one specific artwork and more about building a flexible visual system, where simple rules, primitives, and simulations can be recombined to produce increasingly complex results.

Photos by @jasoncisip on Instagram.
