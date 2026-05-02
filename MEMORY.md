# MEMORY.md - Long-term memory

- 2026-04-05: First conversation. Initially set identity as Clawd for user Angus. Corrected: user is Mark, assistant name is Angus. User prefers local LLM with Ollama only. User in America/New_York timezone.
i live in Fiddler's Marsh in ponte vedra beach florida zip code 32082
i am a minnesota viking fan, a tampa bay lightning fan

- 2026-04-12: Fixed GeekPi 4-monitor setup. USB-C-2.3, HDMI-0, USB-C-0, USB-C-2.1 all connected after switching one display path to an HDMI-to-DP cable. HDMI-0 is primary. Screen resolution 4920x1920.
- 2026-04-12: Built and debugged a local GeekPi dashboard in `~/geekpi-dashboard`, ending on port 8081 with a black/orange themed `index.html`. Important lesson: the server file and the standalone HTML got out of sync, so future web fixes should verify what file is actually being served before styling changes.
- 2026-04-12: OpenClaw has both Ollama and OpenAI configured in `~/.openclaw/openclaw.json`. User preference is hybrid use: keep Ollama as the normal/local default, use OpenAI only when needed for stronger web design help.
- 2026-04-13: Finalized hybrid model direction in OpenClaw config: use local Ollama first for normal work, with OpenAI as fallback/selective help for harder web design tasks. Current model setting is `ollama/qwen3:14b` primary with `openai/gpt-5.4` as fallback.
- 2026-04-13: Switching rule: default to local Ollama for normal tasks. Switch to OpenAI when the user explicitly asks, or when the task is web design/UI polish/creative front-end work and local model quality is not good enough. After the OpenAI-heavy task, return to local-first by default.
- 2026-04-13: User shorthand: when Mark says "big brain," treat that as an instruction to use OpenAI for the current task, then return to local-first afterward unless told otherwise.
- 2026-04-13: Health-check trigger: if Mark asks "How do you feel, Angus?" or similar, treat that as a request to run the local health check script and report system/OpenClaw status.

memory/yyyy-mm-dd.md
compaction.memoryFlush.enabled
memorySearch.experimental.sessionMemory

- 2026-04-29: Business research pipeline operational. Scout (Researcher) role active for daily market intelligence:
  - Off-grid solar/battery telecom solutions leading signal (1,629 points)
  - AT&T $250B 5G/fiber/satellite investment news
  - 1,021 unique URLs tracked daily
  - GB10 as demo lab/monitoring appliance opportunity identified

