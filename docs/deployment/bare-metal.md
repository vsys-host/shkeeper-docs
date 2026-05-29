---
# id is optional; using filename-based id. Keep frontmatter simple.
title: Bare Metal
---

## Bare Metal Deployment

**SHKeeper** can be deployed on **bare metal servers** for maximum performance and full control over your infrastructure. This setup is recommended for high-traffic environments or when running multiple fullnodes alongside SHKeeper.

### Recommended Server Specifications

| Use Case                          | CPU       | RAM   | Storage           | Notes                                    |
|----------------------------------|-----------|-------|-----------------|-----------------------------------------|
| Basic SHKeeper (few coins)        | 4 cores   | 8GB   | 100GB SSD        | Enough to monitor BTC, ETH, TRX, BNB    |
| Fullnode + SHKeeper (all coins)  | 16 cores  | 64GB  | 2×4TB NVMe       | Supports BTC, ETH, TRX, BNB, XRP, USDT |
| Lightweight / shared nodes        | 8 cores   | 16GB  | 200GB SSD        | Connects to external shared nodes       |

### Deployment Notes

- Install Docker or container runtime to run SHKeeper services.  
- Consider Kubernetes with Helm charts for scaling multiple services.  
- Use SSD or NVMe storage for blockchain data and fast I/O.  
- Ensure reliable network connection and adequate bandwidth, especially for fullnodes.  

> ℹ️ Bare metal deployment gives you **full control over performance, resources, and network security**. SHKeeper still runs in **watch-only payment-processing mode** on your instance (monitors deposits; wallet keys encrypted, not plain text). See [Overview — Watch-only mode](/docs/basics/overview#watch-only-mode--private-keys).
