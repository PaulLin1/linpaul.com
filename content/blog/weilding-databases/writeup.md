---
title: Weilding Databases
date: '2026'
tags:
  - Software
---
# Production/Large Scale Databases
A majority of my time at BigCommerce was spent working on AWS Cloud Infrastructure & Automation. The projects I worked on aimed to do fast, large-scale data migrations from different services BigCommerce used like SalesForce to S3. Besides looking at the proposed system architecture, I also spent a lot of time looking at data. But since the data was extremely large, sometimes with 1M+ fields, I usually looked at data schemas and headers, not the data itself. I learned how to ensure correctness through logging and error handling, instead of eye test and visualizations.

Another experience I had working with large scale data was when I did computer vision research at the ECODE Lab. There, we primarily used the ImageNet dataset for out experiments, which contains 1 million training images. I learned similarly lessons to the ones I learned at BigCommerce, like logging with tdqm and error handling in SLURM, but also on how to use visualizations. This included traditional graphs made with matplotlib as well as more abstract visualizations like t-SNE graphs. 

# Middle Sized Databases

The first time I worked with a mid-sized database was when I made a carpool manager app for my friend. The app allowed people to sign up for rides to a club and be matched with a driver. The data was stored and queried in a PostgreSQL database. There, I learned how to build a schema from scratch, handling different driver, recipient, and ride fields. 

Another experience I had with mid-sized databases was when I made a recreation of Silk with 100k images stored in a Neon PostgreSQL database and a R2 bucket. Despite not being the same size as my production databases, I learned a lot of the same lessons. I made a robust pipeline to dump the data into the databases that ensured correctness.

# Small Databases
The area of databases I have the most expertise in is small databases. I became especially familiar with Notion when I was a member of my school's AI Club Board. There we had an RDS in Notion that filtered members based on their attendance and participation in the club. I made automation pipelines in Zapier to integrate into Notion. I was heavily limited by the views and tools Notion had for filtering and joins. Looking back at it the schema was quite flawed. It was a monolith database where everything from board member candidates to member churn was all in one table, and we could only filter instead of joining. However, I learned how to work with limited tools.

I have quite the opposite problem with Obsidian. Right now I use Obsidian for a lot of my productivity tools and use the YAML fields for filtering and joins. However, the possibilities are quite endless with Obsidians code integrations through custom plugins. Unlike SQL, there are quite a lot of hacky ways to do things and I starting to realize that the most comprehensive schema may not be the best. For example, while building Orbit, I realized that different hobbies could be session based or time based hobbies. There are so many ways to support this. Right now I am learning more about schema and improving them.
