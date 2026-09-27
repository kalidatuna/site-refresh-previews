"use strict";

const assert = require("node:assert/strict");
const { triageLeads } = require("./lead_triage");

const input = [
  {
    name: "Maya",
    email: "MAYA@EXAMPLE.COM ",
    company: "Northwind",
    message: "Urgent API automation fix, ready to start this week.",
    budget: 800,
  },
  {
    name: "Maya duplicate",
    email: "maya@example.com",
    company: "Northwind",
    message: "Same person, duplicate submission.",
    budget: 800,
  },
  {
    name: "Lee",
    email: "lee@example.com",
    company: "Studio",
    message: "Need a website fix.",
    budget: 150,
  },
  {
    name: "Empty",
    email: "empty@example.com",
    company: "None",
    message: "   ",
    budget: 0,
  },
];

const result = triageLeads(input);

assert.equal(result.summary.received, 4);
assert.equal(result.summary.accepted, 2);
assert.equal(result.summary.rejected, 2);
assert.equal(result.summary.hot, 1);
assert.equal(result.summary.warm, 1);
assert.equal(result.accepted[0].email, "maya@example.com");
assert.equal(result.accepted[0].label, "hot");
assert.equal(result.accepted[1].label, "warm");
assert.deepEqual(
  result.rejected.map((x) => x.reason).sort(),
  ["duplicate", "missing_message"]
);

console.log("lead_triage tests passed");
