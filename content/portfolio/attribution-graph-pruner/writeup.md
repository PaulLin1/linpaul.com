---
title: "Attribution Graph Pruner"
date: "2025"
tags: ["Coursework"]
---

Using Evolutionary Graph Pruning to Improve Transcoder-Based Interpretability of LLMs was my final project for the graduate level course CSE 848: Computational Evolution. I worked with my friend from AI Club, Uzair Mohammed. Around the beginning of the semester, I became interested in AI interpretability. Luckily, Uzair was experienced with the topic, with multiple ongoing research projects. When the teacher announced that the final project would be an open ended project related to computational evolution, I knew that I had to twist it in some way to work on an interpretability problem with Uzair.

What resulted was an evolutionary algorithm to prune attribution graphs for LLM's. Attribution graph's are currently one of the clearest ways to explain the inputs of a model to the models. They allow users to see which nodes and layers had the biggest influence on the results. To get the graph, the entire model is loaded and greedily pruned to show which where that influence occured. Our algorithm takes the graph and uses a multi-objective evolutionary algorithm to simplify this process. The result is a cleaner attribution graph that makes distinguishing node importance more easily.

To read our full report, click [here](https://drive.google.com/file/d/1lvKREHI47p0W_Fzw7p9lUAw8tECPdcic/view).