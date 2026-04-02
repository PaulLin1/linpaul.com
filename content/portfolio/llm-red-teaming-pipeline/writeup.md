---
title: "LLM Red Teaming Pipeline"
date: "2026"
tags: ["Personal Project"]
---

# LLM Red Teaming Pipeline

A pipeline that automatically decomposes AI safety concerns into concrete failure modes, generates adversarial tests, and produces summaries that can be used to train lightweight classifiers. The classifiers act as a fast, cost-effective guardrail, allowing companies to mitigate risks quickly without retraining.

I became interested in LLM security after watching [Nicholas Carlini's talk, Black-hat LLMs](https://www.youtube.com/watch?v=1sd26pWhfmg). While the talk focuses on using LLM's for non AI security applications, what stuck out to me was the growing automation capabilities of LLM. Just a couple years ago, I rememebr Jason Liu giving talks on instructor and how to get structored output. Now most LLM's are able to one shot complex problems and generate their findings clearly. This led me to reinvision projects like my [SemEval 2025 submission](https://linpaul.com/portfolio/SynthCoT-RAG) and my use of LLM's for increasingly hard coding problems have shown me that LLM's are powerful. Additionally, I started to think about AutoML, but extended to full pipelines. Instead of just optimizing models, entire workflows can now be automated by AI.

## Architecture
The idea is inspired by [OBLITERATUS](https://github.com/elder-plinius/OBLITERATUS). I have been following Pliny the Prompter's work in X for a while and find his end prompts really interesting. However, I only started looking into the tools he uses. Despite OBLITERATUS being a white box attack, I learned a lot about model jailbreaking from it. In my project, I implemented his chain of SUMMON, PROBE, DISTILL, EXCISE, VERIFY, and REBIRTH. I built upon this chain by adding a stage for generating novel prompts, another stage for building upon attacks, and replacing the retraining stage (REBIRTH) with a summary.

## Future Work

The core functionality is in place, but there are several directions for improvement. I hope to take this project and apply the pipeline to real-world systems like customer support bots. I also plan on making a 'deep' version that leverages evolutionary algorithm, like the one used in [HackEvolve](https://github.com/puripuriprince/hackEvolve), to generate more diverse and sophisticated attacks. Right now, the pipeline only iterates on promising attacks, but I want to make it so it can be run for days while still producing interesting results. Lastly, I want to be able to patch the model with the learnings. I had a logistic classifier using the examples as a quick safe guard. It worked, but it was very brittle is at only helped against a few examples.