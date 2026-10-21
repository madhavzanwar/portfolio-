---
title: Gemini RAG Pipeline Studio
year: 2026
role: AI Systems Architect & Full-Stack Engineer
tags: [Google Gemini API, Retrieval-Augmented Generation, ChromaDB, FastAPI, React]
link: https://github.com/madhavzanwar/ai-odyssey-rag
banner: /works/covers/maker.jpg
---

## Overview

Developed during the **AI Odyssey 2026** challenge, the **Gemini RAG Pipeline Studio** is an enterprise-grade document intelligence workbench that indexes heterogenous unstructured technical documentation and produces verified, context-grounded citations with zero hallucination.

### Key Capabilities
- **Semantic Chunking:** Context-aware semantic segmentation for technical PDF manuals, code snippets, and research publications.
- **Hybrid Retrieval:** Dense vector retrieval using Google Gemini embeddings cross-referenced with BM25 sparse keyword ranking.
- **Grounding Verification:** Automated attribution checker that validates whether every single sentence generated is directly verifiable from the source chunks.

### Technical Stack
- **Foundation LLM:** Google Gemini 1.5 Pro & Gemini Flash
- **Vector Database:** ChromaDB with Cosine distance indexing
- **Backend API:** FastAPI (Python 3.12) with asynchronous streaming endpoints
- **Frontend UI:** React, Tailwind CSS, Lucide icons, SSE streaming
