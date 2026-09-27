"use strict";

function normalizeText(value) {
  return String(value ?? "").trim();
}

function normalizeEmail(value) {
  return normalizeText(value).toLowerCase();
}

function dedupeKey(lead) {
  const email = normalizeEmail(lead.email);
  if (email) return `email:${email}`;
  return [
    normalizeText(lead.name).toLowerCase(),
    normalizeText(lead.company).toLowerCase(),
    normalizeText(lead.message).toLowerCase(),
  ].join("|");
}

function scoreLead(lead) {
  const message = normalizeText(lead.message).toLowerCase();
  const budget = Number(lead.budget ?? 0);
  let score = 0;

  if (budget >= 500) score += 4;
  else if (budget >= 100) score += 2;

  if (/urgent|asap|this week|ready to start/.test(message)) score += 3;
  if (/automation|integration|api|workflow|website|bug|fix/.test(message)) score += 2;
  if (normalizeEmail(lead.email)) score += 1;

  const label = score >= 7 ? "hot" : score >= 4 ? "warm" : "cold";
  return { score, label };
}

function triageLeads(leads) {
  const seen = new Set();
  const accepted = [];
  const rejected = [];

  for (const raw of leads) {
    const lead = {
      name: normalizeText(raw.name),
      email: normalizeEmail(raw.email),
      company: normalizeText(raw.company),
      message: normalizeText(raw.message),
      budget: Number(raw.budget ?? 0),
    };

    if (!lead.message) {
      rejected.push({ reason: "missing_message", lead });
      continue;
    }

    const key = dedupeKey(lead);
    if (seen.has(key)) {
      rejected.push({ reason: "duplicate", lead });
      continue;
    }
    seen.add(key);

    accepted.push({ ...lead, ...scoreLead(lead) });
  }

  return {
    accepted: accepted.sort((a, b) => b.score - a.score),
    rejected,
    summary: {
      received: leads.length,
      accepted: accepted.length,
      rejected: rejected.length,
      hot: accepted.filter((x) => x.label === "hot").length,
      warm: accepted.filter((x) => x.label === "warm").length,
      cold: accepted.filter((x) => x.label === "cold").length,
    },
  };
}

module.exports = { triageLeads, scoreLead, dedupeKey };
