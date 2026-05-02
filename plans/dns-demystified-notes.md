# DNS Demystified — Notes from YouTube Video
## "DNS Demystified: Everything You Should Know for Faster Internet!" (49PhEUZVjzQ)
Date captured: 2026-05-02

---

## What is DNS?
DNS (Domain Name System) is the phonebook of the internet. It translates human-readable domain names (like google.com) into IP addresses (like 142.250.185.78) that computers use to locate each other.

## Key Concepts

### 1. Domain Name Hierarchy (from right to left)
```
com (TLD - Top Level Domain)
google (SLD - Second Level Domain)
www (Subdomain)
```
- **TLDs:** .com, .org, .net, .edu, .gov, .io, .ai, country codes (.us, .uk, .ca)
- **SLDs:** The registered name (google, quantaa)
- **Subdomains:** mail.google, api.google, dns.quantaa.ai

### 2. DNS Record Types (the most important ones)
| Record | What it does | Example |
|--------|-------------|---------|
| **A** | Domain → IPv4 address | `google.com → 142.250.185.78` |
| **AAAA** | Domain → IPv6 address | `google.com → 2607:f8b0:4004:800::200e` |
| **CNAME** | Domain → Another domain (alias) | `www.google.com → google.com` |
| **MX** | Mail server for the domain | `MX 10 mail.google.com` |
| **NS** | Nameserver for the domain | `NS ns1.quantaa.ai` |
| **TXT** | Text records (SPF, DKIM, verification) | `v=spf1 include:google.com ~all` |
| **PTR** | Reverse lookup (IP → domain) | `78.185.250.142.in-addr.arpa` |
| **SRV** | Service location | `_sip._tcp.quantaa.ai` |
| **SOA** | Start of Authority (zone metadata) | Primary NS, refresh interval, etc. |

### 3. The DNS Lookup Process (Step by Step)
```
Browser → DNS Resolver → Root Server → TLD Server → Authoritative NS → Answer
```

1. **Browser cache:** Checks if it already knows the IP
2. **OS cache:** Checks the local DNS cache (DNS resolver on your machine)
3. **Recursive Resolver (DNS Resolver):** Usually your ISP's DNS or a public one (8.8.8.8, 1.1.1.1)
   - If cached, returns it immediately
   - If not, starts the journey:
4. **Root Nameserver (.)** → "I don't know google.com, but I know who runs .com" → points to TLD nameservers
5. **TLD Nameserver (.com)** → "I don't know google.com, but I know who has the zone file" → points to authoritative nameserver
6. **Authoritative Nameserver** → "Yes! google.com = 142.250.185.78" → returns the answer
7. **Resolver caches** the result (TTL-based) → returns to your browser
8. **Browser** connects to the IP address

### 4. Recursive vs Authoritative
- **Recursive resolver:** Does the legwork — follows the chain on your behalf
- **Authoritative nameserver:** Holds the actual DNS records for a domain

### 5. DNS Caching & TTL
- **TTL (Time to Live):** How long the resolver caches a record (in seconds)
  - Low TTL (60s): Fast changes, frequent updates
  - High TTL (86400s = 24h): Stable records, less DNS traffic
- Caching is why DNS feels fast after the first lookup

### 6. DNS Propagation
- When you change DNS records, it takes time to update across all resolvers worldwide
- Not a "server" propagating — each resolver refreshes at its own TTL
- Can take anywhere from minutes to 48 hours (usually 1-4 hours)

### 7. DNSSEC (DNS Security Extensions)
- Cryptographically signs DNS records to prevent tampering/spoofing
- Chain of trust: Root → TLD → Domain
- Prevents DNS spoofing/cache poisoning attacks

### 8. Types of DNS Attacks
- **DNS Spoofing/Cache Poisoning:** Feeding false DNS data to a resolver
- **DDoS on DNS:** Flooding DNS servers with requests
- **DNS Tunneling:** Hiding data inside DNS queries
- **Domain Hijacking:** Taking over a domain through registrar exploitation

### 9. Fast DNS Resolvers (Public Options)
| Provider | Primary | Secondary |
|----------|---------|-----------|
| **Google** | 8.8.8.8 | 8.8.4.4 |
| **Cloudflare** | 1.1.1.1 | 1.0.0.1 |
| **Quad9** | 9.9.9.9 | 149.112.112.112 |
| **OpenDNS** | 208.67.222.222 | 208.67.220.220 |
| **Quad101** | 101.6.6.6 | 101.6.7.7 |

### 10. How to Make DNS Faster
- Use a fast public DNS resolver (Cloudflare 1.1.1.1 is fastest)
- Lower TTL on critical records
- Use DNS-over-HTTPS (DoH) or DNS-over-TLS (DoT) for encrypted queries
- Cache DNS at the OS/application level
- Use CDN (Cloudflare, etc.) with anycast DNS

### 11. Key Ports & Protocols
- **DNS:** UDP port 53 (default), TCP port 53 (for large responses)
- **DNS-over-TLS (DoT):** TCP port 853
- **DNS-over-HTTPS (DoH):** HTTPS port 443
- **DNS-over-QUIC (DoQ):** UDP port 853

### 12. Registering a Domain
1. Choose a registrar (GoDaddy, Namecheap, Cloudflare, Porkbun)
2. Search availability
3. Register (annual fee, usually $8-20 for .com)
4. Configure DNS records through registrar's panel or a DNS provider
5. Wait for propagation

### 13. The "Address Book" Analogy
Think of DNS like your phone contacts:
- You know your friend's name (domain name)
- You don't memorize their phone number (IP address)
- Your phonebook (DNS) translates name → number
- If your friend moves (changes servers), the phonebook gets updated

---

## Connection to Quantaa
For a company focused on off-grid solar/battery telecom solutions (GB10 appliance):
- DNS is critical for device management APIs
- Fast DNS = faster remote monitoring of remote sites
- DNSSEC for securing IoT device communications
- Consider DoH/DoT for privacy in field-deployed equipment

---

*Video reference: "DNS Demystified: Everything You Should Know for Faster Internet!"*
*https://youtu.be/49PhEUZVjzQ*
