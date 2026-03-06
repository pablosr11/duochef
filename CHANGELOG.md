# Changelog

All notable changes to this repository are documented in this file.

This project loosely follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added
- CrewAI-based autonomous “company” scaffolding (CEO, Engineer, Marketing).
- OpenRouter LLM configuration with LiteLLM support (`crewai[litellm]`).
- File-based state system under `company_state/` (backlog, product specs, logs, product folders).
- Web research tool for CEO/Marketing via DuckDuckGo search.
- In-repo implementation plan in `PLAN.md`.
- Runtime state changelog appended each cycle to `company_state/changelog.md`.
- Added a changelog entry template section to keep future updates consistent.

### Changed
- Updated `main.py` to append a runtime changelog entry after each cycle.
- Updated `main.py` to support `OPENAI_MODEL_FALLBACKS` (primary + fallbacks) and retry a cycle with another model on common OpenRouter failures.

### Fixed
- Fixed recursion bug in `company/state_io.py` state initialization.

## Changelog entry template (copy/paste)

```md
## [Unreleased]

### Added
- 

### Changed
- 

### Fixed
- 

### Removed
- 

### Security
- 
```

