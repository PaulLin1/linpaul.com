---
title: Orbit
date: '2026'
tags: []
languages:
  - React
  - TypeScript
---
Your interests are always in motion. Some take center stage, while others drift away. Bring them back into orbit.

## Background

Orbit is a to-do list Obsidian plugin which prioritizes your items based on time spent on them. I have a lot of different hobbies and want to stay on top of all of them. Before, I tried spacing the activities out, but it was hard to track and I often went weeks without noticing I was forgetting one. Another approach I tried, was making each of them a part of my daily routine, but I only had so much time to allot to each one and I was never able to reach flow state with 15 minute daily sessions. Orbit solves all those problems by using a queue algorithm to prioritize activities based on when they were done. The smart algorithm also lets me prioritize activities so those that require more attention are placed higher.

## Process

I started the plugin by cloning a plugin template repo and placing it in my Obsidian vault. This had basic funcitonality and showed how to build views. Next, I prototyped a basic UI. The idea of naming it Orbit was based around how my activities revolve around me. This inspired me to use the analogy to build a three tier system. Each activity is put into a tier based on an algorithm that judges their weekly progress. This algorithm takes into account progress as well as priority. For example coding is more important to me than coffee making, so even if I did an hour more of coding, it should still be higher priority than coffee.

But how did I choose my goals and priority for each activity. That's were the stats dropdown comes in. The stats allow me to tune my goals and plans based on how I have done in the past. This allows me to get a realistic understanding of how much time I have to allocate. During my first week, I logged 40 hours across all acitvities compared to my goal of 70. I realized 70 was too much. So a tool in my stats region tuned my goals to be based on a 40 hour weekly total while maintaing priority.

## Outcome

I have been using Orbit as a part of my workflow for a month now. It has allowed me to stay on track of all my hobbies and I never feel fear that I am not allocating enough time for one. For example, I have gotten more into music production. This has always been a hard hobby to maintain because I do it rarely, but it requires a big chunk of time to get into the zone. With Orbit, I know how many hours left of music production I can do without eaeatingten into my higher proiroty hobbies like reading and coding.

I am currently working on making Orbit an Obsidian community plugin.
