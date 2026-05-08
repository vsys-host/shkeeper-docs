---
title: Docker and Standalone Deployment (SHKeeper)
---

## Overview

SHKeeper supports deployment via **Kubernetes as the primary and recommended method**.  
Although Docker images exist in the project, full standalone Docker support is not officially documented or maintained for production use.

---

## Why Docker (Standalone) is not officially documented

The main reason is deployment complexity:

- Updates and upgrades are harder to manage without Kubernetes
- Multi-service architecture requires orchestration (crypto pods, databases, fullnodes)
- Dependency management is simplified in Kubernetes Helm charts

Because of this, there are currently:
- ❌ No official full Docker-only production guide
- ❌ No standalone “all-in-one docker run” setup

---

## Current supported Docker usage

There is a **minimal development setup** available:

- `docker-compose` example exists
- Includes SHKeeper + Tron (Nile Testnet)
- Intended for development/testing only

Example reference:
- Minimal dev setup (see issue discussion #64 in repository)

---

## Recommended deployment method

### Production (recommended)
Use Kubernetes + Helm:

- Full support for all blockchains
- Automatic scaling and updates
- Proper separation of services (crypto pods, DB, fullnodes)

---

### Development (optional)
Use docker-compose:

- Limited functionality
- Suitable only for local testing
- Not recommended for production workloads

---

## Standalone (bare-metal or manual Docker)

There is currently **no official guide** for:

- pure Docker installation without Kubernetes
- full multi-chain production setup using only Docker
- self-managed orchestration of all SHKeeper components

---

## Roadmap / Community request

A request for a **base-system installation guide** was raised by the community.

The development team confirmed:

- the request has been accepted
- a guide may be published in the future
- it will likely describe:
  - base system setup
  - manual configuration
  - optional advanced Docker usage based on Kubernetes architecture

---

## Summary

- Kubernetes (Helm) → **official and recommended**
- Docker-compose → **development only**
- Standalone Docker → **not officially supported yet**
- Documentation improvements for base setup → **planned / in progress**

---