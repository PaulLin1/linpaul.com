---
title: "Evolutionary Attribution Graph Pruner"
date: "2025"
tags: ["Research", "AI"]
---

An evolutionary algorithm for pruning attribution graphs in LLMs, built as the final project for CSE 848: Computational Evolution, a graduate course at Michigan State University. I worked on it with Uzair Mohammed, a friend from AI Club.

## Background

Around the beginning of that semester, I became interested in AI interpretability. Uzair was already experienced with the topic and had multiple ongoing research projects. When the professors announced that the final project would be open-ended and related to computational evolution, I wanted to find a way to apply it to an interpretability problem so we could work on it together.

## Process

Attribution graphs are currently one of the clearest ways to explain the relationship between a model's inputs and outputs. They show which nodes and layers had the biggest influence on a result. To produce one, the entire model is loaded and the graph is greedily pruned to show where that influence occurred.

Our algorithm takes that graph and uses a multi-objective evolutionary algorithm to simplify the pruning process.

## Outcome

The result is a cleaner attribution graph that makes it easier to distinguish which nodes matter.

Full report on [Google Drive](https://drive.google.com/file/d/1lvKREHI47p0W_Fzw7p9lUAw8tECPdcic/view).
