# Personal Records Storage System

> **Location:** Ponte Vedra Beach, FL (tornado/hurricane zone)
> **Hardware:** NVIDIA GB10 (DGX Spark / GB10 desktop, 128 GB unified memory)
> **Last Updated:** 2026-04-28

---

## 1. Document Categories

### Medical Records
- **Keep for:** Lifetime
- Examples: Vaccination records, blood type, allergies, chronic conditions, insurance cards, disability paperwork, advance directives, organ donor cards
- **Format:** Both scanned PDFs (primary) and physical originals (backup)

### Tax Records
- **Keep for:** 7 years minimum (per IRS recommendation; 10 years is safer)
- Examples: Federal/state returns (Form 1040, schedules, W-2s, 1099s), K-1s, depreciation schedules, investment cost basis, real estate closing docs
- **Format:** Scanned PDFs + originals

### Estate Documents
- **Keep for:** Lifetime (or until updated)
- Examples: Wills, trusts, POA (financial + medical), HIPAA authorizations, living wills, beneficiary designations, property deeds, titles, marriage/divorce decrees
- **Format:** Scanned PDFs + originals (executed/notarized originals in a fire document pouch)

### Insurance & Financial Records
- **Keep for:** 7 years + policy duration
- Examples: Home/auto/health/life policies, brokerage statements, bank records, loan docs
- **Format:** Scanned PDFs + originals

---

## 2. Physical Storage — Fireproof + Tornado/Hurricane

### The Hard Truth

No single consumer safe is **UL rated for both fire (1700°F+)** AND **tornado/hurricane impact** (ICC-500 / FEMA P-361). These are fundamentally different test regimes:

- **Fire safes** insulate with gypsum/ceramic cement — they'll crack and shatter in tornado impact
- **Storm shelters** are built from 1/4"+ steel plate — they offer zero fire insulation

**Solution: Two-layer approach.**

### Layer 1 — Interior Document Fire Safe (Documents + Electronics)

This is your first line of defense — protects papers and electronics from house fires and flood.

| Model | Fire Rating | Water Rating | Price | Where to Buy |
|-------|------------|-------------|-------|-------------|
| **SentrySafe SFW205EVB** (2 cu.ft.) | UL: 1 hr @ 1700°F | ETL: 24 hr @ 8" water | **~$400–500** | [SentrySafe.com](https://www.sentrysafe.com/product/sfw205evb), Home Depot, Amazon |
| SentrySafe CHW20142 (fire + waterproof, larger) | UL: 1 hr @ 1700°F | ETL: 24 hr @ 8" water | **~$500–600** | Home Depot, Amazon |

**Recommendation: SentrySafe SFW205EVB**
- 6 live-locking bolts, pry-resistant hinge bar, solid steel construction
- Digital keypad with backup key, UL fire classified + ETL water verified
- Lifetime warranty + $50,000 fire protection guarantee on contents
- 125 lbs — heavy enough to deter theft
- Can also store your emergency SSD inside (waterproof protects the drive)
- Place it elevated (on a shelf or platform) above potential flood levels

> **Alternative premium option:** If you want more interior space for larger items, the SentrySafe CHW20142 at ~$550 offers the same UL/ETL ratings in a larger cabinet form factor.

### Layer 2 — Tornado/Hurricane Impact Protection

For the Ponte Vedra Beach area (Zone AE/VE, high-wind + flooding), use these strategies:

**Option A: Anchor the SentrySafe** ($20–40)
- Bolt the SentrySafe SFW205EVB to a concrete floor or structural stud wall using a concrete anchor kit (e.g., Hilti KWIK HS2 or Simpson Strong-Tie wedge anchors)
- Place it in your most structurally protected interior room (closet, bathroom, hallway with no exterior walls)
- This prevents the safe from becoming a projectile during tornado wind shear

**Option B: Storm Shelter / Safe Room** ($15,000–50,000+)
- Install an ICC-500 / FEMA P-361 rated safe room or storm shelter
- Sportsman Steel Safes offers above-ground and in-ground storm shelters starting ~$15K installed
- This protects the entire safe (not just its contents) from debris impact and extreme wind
- Only recommended if you're building new or doing major renovation

**Option C: FEMA P-3240 Compliant Closet** ($500–2,000)
- Reinforce an interior closet per FEMA P-3200/P-3240 guidelines
- Add 7/16" OSB sheathing on walls, reinforced door, heavy-duty hinges
- Place the SentrySafe inside
- This is the most cost-effective tornado protection for existing homes

**Option D: Metal Document Pouch Inside the Safe** ($30–80)
- Place all paper documents in a fire-rated document pouch (e.g., **SentrySafe DPK017** or **Honeywell Fireproof Pouch** rated to 1500°F)
- Even if the safe shell is compromised by impact, the pouch provides an extra thermal/impact barrier for critical originals
- Keep the executed/w notarized originals of your will, trusts, and POAs in the pouch

### Implementation Priority (for Mark's home)

1. **Buy SentrySafe SFW205EVB** (~$450) — order today
2. **Anchor it to floor/wall** with concrete anchors (~$40 materials)
3. **Place in an interior closet** on the lowest floor possible
4. **Add a fire-rated document pouch** inside for will/trust originals ($50)
5. If budget allows, add a **FEMA-compliant reinforced closet** (~$1,000–2,000)

---

## 3. Local LLM System for Document Indexing & Querying

### Hardware: NVIDIA GB10 (DGX Spark or GB10 Desktop)

| Spec | Value |
|------|-------|
| GPU | GB10 Blackwell (sm_121 / SM120 architecture) |
| Memory | 128 GB unified HBM (GPU + CPU share) |
| Storage | Internal SSD (expand via USB-C / additional drives) |
| Network | 10GbE, Wi-Fi 7 |
| OS | DGX OS (Ubuntu 24.04) |

### Recommended Model Stack

#### Primary Query Model — Qwen3 (235B A22B MoE) or Llama 4 Scout

With 128 GB unified memory on GB10, you have excellent capacity. Here's the tiered approach:

| Model | Parameters | Quantized Size | Use Case |
|-------|-----------|---------------|----------|
| **Qwen3-32B (Q4_K_M)** | 32B | ~20 GB | ✅ **Primary workhorse** — excellent for document QA, fast, fits comfortably |
| **Qwen3-235B A22B (Q4_K_M)** | 235B (22B active) | ~140 GB | Too big for single-shot, but can be used with vLLM's tensor parallelism across multiple GPUs if you have more than one GB10 |
| **Llama 4 Scout (22B)** | 22B | ~14 GB | ✅ **Alternative primary** — strong reasoning, smaller footprint, leaves headroom |
| **Llama 4 Maverick (171B)** | 171B | ~100 GB (Q4_K_M) | ✅ **Fits!** — excellent QA/complex reasoning, uses ~75% of memory |
| **Qwen2.5-72B (Q4_K_M)** | 72B | ~43 GB | ✅ **Fits easily** — very strong all-rounder, good RAG candidate |
| **Phi-4 (14B)** | 14B | ~9 GB | ✅ Fastest inference — good for quick lookups, low-latency queries |

**Recommendation: Llama 4 Maverick (171B, Q4_K_M) as primary, Phi-4 (14B) as fast fallback.**

The 171B model at Q4 quantization fits in 128 GB with room for context windows. It delivers superior document comprehension for complex queries (estate planning nuances, tax code interpretation). The Phi-4 provides instant responses for simple lookups.

#### Embedding Model (for RAG vector search)

| Model | Size | Use |
|-------|------|-----|
| **nomic-embed-text** (v1.5) | ~274 MB | ✅ **Best choice** — excellent retrieval quality, tiny footprint, runs entirely in RAM |
| `BAAI/bge-large-en-v1.5` | ~1.3 GB | Alternative if you need slightly higher quality |

### RAG Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Document Ingestion                     │
│  PDF/DOCX/TXT → LayoutParser/MinerU → Chunks           │
│  (OCR via PaddleOCR for scanned docs)                   │
└─────────────────────────┬───────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────┐
│                   Vector Store                           │
│  ChromaDB (embedded) or Qdrant (Docker)                 │
│  Collection: personal-records                           │
│  Embedding: nomic-embed-text (on CPU, fast)            │
└─────────────────────────┬───────────────────────────────┘
                          │  top_k=5–10 context chunks
┌─────────────────────────▼───────────────────────────────┐
│                   Query Engine                           │
│  vLLM server (port 8000) + RAG pipeline                │
│  Primary: Llama 4 Maverick 171B Q4_K_M                 │
│  Fallback: Phi-4 14B                                  │
│  Context window: 32K–128K tokens                       │
│  System prompt: "You are a personal records assistant.  │
│   Answer only from the provided context documents. If   │
│   you don't know, say so."                             │
└─────────────────────────────────────────────────────────┘
```

### Setup Steps

```bash
# 1. vLLM Installation on DGX Spark (Blackwell GB10)
# Use the community installer with GB10-specific patches:
git clone https://github.com/eelbaz/dgx-spark-vllm-setup.git
cd dgx-spark-vllm-setup
./install.sh --install-dir ~/llm-workspace

# 2. Activate the environment
cd ~/llm-workspace
source vllm_env.sh

# 3. Download Llama 4 Maverick (171B Q4_K_M) — ~100 GB
ollama pull llama4-maverick
# Or via vLLM directly:
python -c "
from vllm import LLM
llm = LLM(model='meta-llama/Llama-4-Maverick-171B-Instruct-FP8', 
          gpu_memory_utilization=0.9,
          quantization='fp8')
"
# Alternative: Qwen2.5-72B (smaller, faster, still excellent)
python -c "
from vllm import LLM
llm = LLM(model='Qwen/Qwen2.5-72B-Instruct-GPTQ-INT4',
          gpu_memory_utilization=0.85,
          quantization='gptq')
"

# 4. Start vLLM server
python -m vllm.entrypoints.api_server \
  --model 'meta-llama/Llama-4-Maverick-171B-Instruct-FP8' \
  --quantization fp8 \
  --gpu-memory-utilization 0.9 \
  --max-model-len 32768 \
  --host 0.0.0.0 \
  --port 8000

# 5. Set up vector store (ChromaDB - simplest, no Docker needed)
pip install chromadb sentence-transformers langchain-community pypdf
python -c "
import chromadb
from sentence_transformers import SentenceTransformer

client = chromadb.PersistentClient(path='/home/mark/vectordb/personal-records')
collection = client.get_or_create_collection(
    name='personal-records',
    embedding_function=SentenceTransformer('nomic-ai/nomic-embed-text-v1.5'),
    metadata={'hnsw:space': 'cosine'}
)
print('Vector store ready!')
"

# 6. Document ingestion script (chunk and embed)
# Install: pip install pypdf layoutparser unstructured
# Run: python ingest_documents.py /home/mark/documents/

# 7. RAG query wrapper
# Python API combining vLLM + ChromaDB:
# query → retrieve top_k chunks from ChromaDB via nomic-embed-text
# → format as context
# → send to vLLM via OpenAI-compatible API at localhost:8000
# → return answer
```

### Alternative: Use Dify for a GUI Frontend

[Dify](https://dify.ai) has a [dedicated guide for DGX Spark](https://dify.ai/blog/deploying-private-ai-agents-with-dify-on-nvidia-dgx-spark):

```bash
# Deploy Dify with Docker (pre-installed on DGX Spark)
git clone https://github.com/langgenius/dify.git
cd dife/docker
docker compose -f docker/docker-compose.yaml up -d

# Access at http://localhost:3000
# Configure RAG pipeline, document sources, and LLM backend (vLLM)
# Dify handles the vector store (Milvus/Qdrant), embedding, and retrieval
```

### Hardware Setup Notes

- **Placement:** Keep DGX Spark with clearance on all sides; ambient temp < 30°C (86°F)
- **Thermal:** Watch for throttling during sustained RAG workloads — clean metal foam vents monthly
- **Networking:** Use 10GbE wired connection for fast document uploads
- **Power:** UPS recommended (APC Back-UPS 1500VA, ~$200) to protect both GB10 and SentrySafe electronics
- **Storage:** Add a 2TB external NVMe SSD for document storage and model weights (~$150–200)

---

## 4. Encrypted Cloud Backup

### Strategy: 3-2-1 Rule with Zero-Knowledge Encryption

| Copy | Where | Encryption | Purpose |
|------|-------|-----------|---------|
| **1. Primary** | DGX Spark local SSD | LUKS2 full-disk encryption | Fast access, daily queries |
| **2. Encrypted cloud #1** | Proton Drive (Switzerland) | Zero-knowledge (built-in) | Disaster recovery, off-site |
| **3. Encrypted cloud #2** | Sync.com (Canada) | Zero-knowledge, AES-256 | Redundant cloud backup |
| **4. Encrypted cloud #3** | pCloud (Switzerland) | Zero-knowledge (Crypto folder) | Third-party redundancy |

### Recommended Providers

| Provider | Price (Annual) | Encryption | Jurisdiction | Notes |
|----------|---------------|-----------|-------------|-------|
| **Proton Drive** | ~$96/yr (2 TB) | Zero-knowledge (built-in) | Switzerland 🇨🇭 | Best overall; seamless Proton ecosystem |
| **Sync.com** | ~$78/yr (2 TB) | Zero-knowledge, AES-256 | Canada 🇨🇦 | Excellent for document sharing; client-side encryption |
| **pCloud** | ~$39.99 lifetime | Crypto folder (zero-knowledge) | Switzerland 🇨🇭 | Lifetime option available; good value |

### Implementation

```bash
# Step 1: Organize documents locally
mkdir -p /home/mark/documents/{medical, taxes, estate, insurance}

# Step 2: Encrypt with GPG before uploading (defense-in-depth)
gpg --encrypt --recipient mark@quantaa.com /home/mark/documents/estate/will.pdf
gpg --encrypt --recipient mark@quantaa.com /home/mark/documents/taxes/2025/1040.pdf

# Step 3: Sync to Proton Drive (command-line via proton-api or webDAV)
# Option A: proton-drive CLI (if available)
proton-drive upload encrypted-backup/

# Option B: WebDAV mount
# sudo apt install davfs2
sudo mount -t davfs https://mail.proton.me/webdav /mnt/proton-drive \
  -o uid=$(id -u),gid=$(id -g),username=your_email,password=your_app_key

# Step 4: Automate with cron (daily sync)
crontab -e
# Add: 0 3 * * * rsync -avz --delete /home/mark/documents/ /mnt/proton-drive/personal-records/
```

### Key Management

- **GPG master key:** Store on a dedicated USB token (e.g., YubiKey 5 NFC, ~$60)
- **Encryption passphrase:** Write down and store in the SentrySafe document pouch
- **Recovery keys:** Store copies with trusted contacts or in your estate trust

---

## 5. Offline Grab-and-Go (Emergency Preparedness)

### The "Go Bag" for Digital Records

| Item | Specification | Cost | Purpose |
|------|-------------|------|---------|
| **SSD** | Samsung T9 2TB USB 3.2 (2,000 MB/s) | ~$170 | Primary emergency drive |
| **SSD (secondary)** | SanDisk Extreme Pro 1TB | ~$100 | Backup drive (never store in same bag) |
| **Battery** | Anker 737 Power Bank (24,000 mAh) | ~$100 | Charge phones + GB10 via USB-C PD |
| **Case** | Pelican 1510 or hard waterproof case | ~$70 | Impact protection |
| **Paper backup** | Fire document pouch inside safe | ~$30 | Physical copies of critical docs |

### What Goes on the SSD

```
grab-and-go/
├── documents/
│   ├── will.pdf
│   ├── trust.pdf
│   ├── poa_financial.pdf
│   ├── poa_medical.pdf
│   ├── advance_directive.pdf
│   ├── property_deeds/
│   ├── tax_returns/
│   │   ├── 2024/
│   │   ├── 2023/
│   │   ├── 2022/
│   │   └── ...
│   └── medical/
│       ├── vaccination_records.pdf
│       ├── insurance_cards.pdf
│       └── blood_type.pdf
├── models/
│   ├── nomic-embed-text-v1.5.onnx        # ~274 MB — vector embedding
│   └── phi-4.gguf                          # ~8–9 GB — offline LLM inference
└── tools/
    ├── README.md                           # Setup instructions
    └── query_script.py                     # Offline RAG query script
```

### Running Locally Off-Grid

```bash
# On the GB10 or any laptop with the USB drive:
# 1. Plug in the SSD
# 2. Run the local RAG stack (no internet needed):

# Embed documents (if not already embedded):
python -c "
from sentence_transformers import SentenceTransformer
import chromadb

model = SentenceTransformer('/mount/SSD/models/nomic-embed-text-v1.5')
client = chromadb.PersistentClient(path='/mount/SSD/chromadb')
collection = client.get_or_create_collection('grab-and-go')
# ... index documents
"

# Query documents (no cloud, no internet):
python -c "
import requests
response = requests.post('http://localhost:8000/v1/completions', json={
    'model': '/mount/SSD/models/phi-4.gguf',
    'prompt': 'Where is my will stored? What is my blood type?',
    'max_tokens': 500,
    'stream': False
})
print(response.json()['choices'][0]['text'])
"
```

### Lightning Package (go-bag checklist)

- [ ] Grab-and-go SSD (documents + model)
- [ ] GPG keys on YubiKey
- [ ] Paper copies of will + POA (in fire pouch)
- [ ] ID/passport/wallet (already in go-bag)
- [ ] USB-C power bank (charged)
- [ ] List of important contacts + account numbers
- [ ] Cash ($200–500 in small bills)
- [ ] First aid kit

---

## 6. Maintenance Schedule

| Task | Frequency | Notes |
|------|-----------|-------|
| **Update document index** | Weekly | Re-run ingestion script on new docs |
| **GPG backup to cloud** | Weekly | Auto-sync via cron at 3 AM daily |
| **Verify cloud sync** | Monthly | Check all 3 providers have latest data |
| **Test grab-and-go SSD** | Quarterly | Boot from SSD, verify all docs load |
| **GPG key check** | Quarterly | Verify keys still work, not expired |
| **Safe inspection** | Annually | Check anchoring, seal integrity, keypad batteries |
| **Document purge** | Annually | Remove superseded docs (>7 years for tax) |
| **Model update** | Quarterly | Update LLM/vector models to latest versions |
| **Power bank charge** | Monthly | Keep charged for emergencies |

---

## 7. Cost Summary

| Item | Cost |
|------|------|
| SentrySafe SFW205EVB | ~$450 |
| Concrete anchor kit | ~$40 |
| Fire document pouch | ~$50 |
| Samsung T9 2TB SSD | ~$170 |
| SanDisk Extreme Pro 1TB | ~$100 |
| Anker 737 Power Bank | ~$100 |
| Pelican case | ~$70 |
| YubiKey 5 NFC | ~$60 |
| GPG setup (free) | $0 |
| Proton Drive (2 TB/yr) | $96 |
| Sync.com (2 TB/yr) | $78 |
| pCloud lifetime | $39.99 |
| **Total one-time** | **~$1,050** |
| **Total annual** | **~$214/year** |

---

## 8. Quick Start — This Week

1. **Order SentrySafe SFW205EVB** — [SentrySafe.com](https://www.sentrysafe.com/product/sfw205evb) or Home Depot (~$450)
2. **Order Samsung T9 2TB SSD** — for grab-and-go drive (~$170)
3. **Set up Proton Drive** account — free tier to start, upgrade to 2 TB ($96/yr)
4. **Create GPG key** and YubiKey (~$60)
5. **Organize documents** into `/home/mark/documents/` with subdirectories
6. **Scan all originals** and store PDFs alongside originals
7. **Install vLLM** on GB10 using the DGX Spark setup script
8. **Set up ChromaDB** vector store for document indexing
9. **Ingest documents** and test queries
10. **Build the grab-and-go SSD** with critical documents + Phi-4 model

---

*This plan protects Mark's most sensitive documents against fire, tornado/hurricane, flood, hardware failure, and loss of connectivity — using local/private solutions with encrypted cloud redundancy.*
