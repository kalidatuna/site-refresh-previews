# n8n Lead Intake Reliability Demo

A credential-free portfolio sample for a common automation job: receive a website lead, normalize it, validate required fields, create a deterministic fingerprint for downstream deduplication, and route stronger commercial intent.

## What it shows

- POST webhook intake
- whitespace and email normalization
- basic email and message validation
- deterministic lead fingerprint
- simple, inspectable priority routing
- no external APIs, paid services, or credentials

This is a portfolio sample, not a client production deployment.

## Files

- `workflow.json`: importable n8n workflow
- `logic.test.mjs`: standalone tests for the Code node logic

## Example input

```json
{
  "name": "Ana",
  "email": "ANA@EXAMPLE.COM",
  "company": "Acme",
  "message": "Need a Shopify checkout API integration quote",
  "source": "website"
}
```

The sample normalizes the email, validates the payload, produces the fingerprint `ana@example.com|acme`, and routes this example as `priority`.

## Validation

The standalone logic tests cover a priority lead, invalid input, and a normal lead. Run them with:

```bash
node logic.test.mjs
```

For a real deployment, the next step is to connect validated output to the client's actual CRM, sheet, database, email, Slack, or other destination, then add persistent duplicate checks and retry/error handling around that system.