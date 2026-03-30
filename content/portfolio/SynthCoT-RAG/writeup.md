---
title: "SynthCoT-RAG"
date: "2024"
github: "https://github.com/PaulLin1/SynthCoT-RAG"
tags: ["Personal Project"]
---

# SynthCoT-RAG

A pipeline for improving multi-label text classification using **synthetic chain-of-thought reasoning** and **retrieval-augmented generation**.

This project began as part of my participation in [SemEval-2025 Task 11: Bridging the Gap in Text-Based Emotion Detection](https://arxiv.org/abs/2503.07269). The final pipeline included an ensemble with a Graph Neural Network inspired by [EmoGraph](https://arxiv.org/abs/2008.09378). Unfortunately, I did not have time to create a proper submission, nor did I have any paper writing experience at the time. The original competition repository can be found [here](https://github.com/PaulLin1/semeval-2025).


## Overview

1. Take a labeled training dataset (CSV format)
2. Generate **synthetic chain-of-thought explanations** for each training example using an LLM
3. Encode and store examples + reasoning in a **FAISS vector database**
4. At inference time, retrieve the most semantically similar examples as few-shot context
5. Prompt an LLM with retrieved reasoning to predict emotion labels