---
name: rooted-master
description: Master skill for Rooted etymology app. Handles content pipeline, visualizations, admin tools, and share cards. Use for any Rooted-related task.
---

# Rooted Master Skill

I coordinate all Rooted functionality. Based on your request, I'll use the appropriate specialized skill:

## Available Skills

- **etymology-content-pipeline**: For word ingestion and JSON generation
- **etymology-visualizations**: For creating React components
- **rooted-admin-tools**: For database and approval workflows
- **rooted-share-cards**: For generating social media images

## Routing Logic

The individual skills are located in the `/skills` directory. I use the following routing logic to determine which skill to use:

1. If request mentions "word processing", "ingest", "transform", or "JSON schema" → Use content pipeline
2. If request mentions "visualization", "D3", "map", "tree", "timeline", or "grid" → Use visualizations
3. If request mentions "admin", "approve", "schedule", or "database" → Use admin tools
4. If request mentions "share", "quote card", "social media", or "badge" → Use share cards

When I identify the right skill, I'll explicitly invoke it by reading its SKILL.md file.