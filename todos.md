# Todo List

- [ ] **Whisper transcription endpoint**: Add Whisper logic to server at `http://localhost:44444/transcribe`
  - Currently returns byte count only, needs actual transcription
  - Audio files at `/home/mslepikas/.openclaw/media/inbound/file_*.ogg`

- [ ] **Linux monitor on port 8000**: Start the app
  - Currently not responding in health checks
  - Located at `~/geekpi-dashboard/linux-monitor-system`

- [x] **Model prioritization**: Implement model fallback chain in OpenClaw config
  - Fastest: `phi3:latest`
  - Medium: `qwen3.5:latest`
  - Large: `qwen3:14b`
  - Largest: `nemotron-3-super:120b`
  - Fallback to: `openai/gpt-5.4`

- [x] **GeekPi dashboard on port 8081**: Bring back online
  - Fixed server to serve `index.html` inline
  - Black/orange theme confirmed working

- [ ] **OpenClaw update**: Apply npm update to version 2026.4.12
  - Currently available, needs manual update

- [ ] **Security fixes**: Address security audit warnings
  - Enable sandboxing for small models
  - Fix credentials dir permissions (chmod 700)
  - Configure trusted proxies if behind reverse proxy

- [ ] **Daily memory logs**: Continue writing daily work to `memory/YYYY-MM-DD.md`
  - Track progress on all above items

- [ ] **Hyundai Tucson USB upgrade**: Upgrade USB system in the Hyundai Tucson
- [ ] **Transcription integration**: Either pull Whisper model locally or use Hugging Face API
  - Local preferred for privacy
  - Hugging Face as backup option
