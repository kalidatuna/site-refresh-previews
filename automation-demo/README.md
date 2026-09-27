# Automation proof: lead intake and triage

Small dependency-free Node.js example for a common automation job:

1. normalize webhook-style lead input;
2. reject empty records;
3. deduplicate by normalized email;
4. score leads using budget, urgency and technical intent;
5. return deterministic hot/warm/cold routing plus a summary.

The scoring function is intentionally transparent. In a client workflow, the same deterministic checks can run before an optional LLM step so malformed or duplicate data never reaches paid APIs.

## Run

```bash
node test.js
```

Expected output:

```text
lead_triage tests passed
```

No credentials, external APIs or paid services are required.
