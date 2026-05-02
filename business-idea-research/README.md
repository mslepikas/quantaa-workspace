# business-idea-research

Local research pipeline for finding business ideas around:
- network engineering
- homelab and automation
- SDN
- wireless and satellite communications
- off-grid solar
- battery storage

## Files
- `collector.py`: runs curl-based search capture, stores metadata in SQLite, writes daily report
- `research.db`: SQLite database of collected results
- `raw/`: raw HTML search captures
- `reports/`: generated daily markdown reports
- `PLAN.md`: saved plan for ongoing discussion and refinement

## Run manually
```bash
python3 /home/mslepikas/.openclaw/workspace/business-idea-research/collector.py
```
