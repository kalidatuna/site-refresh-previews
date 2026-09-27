function normalizeLead(body = {}) {
  const clean = (v) => typeof v === 'string' ? v.trim() : '';
  const name = clean(body.name);
  const email = clean(body.email).toLowerCase();
  const company = clean(body.company);
  const message = clean(body.message);
  const source = clean(body.source) || 'unknown';
  const emailOk = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
  const errors = [];
  if (!emailOk) errors.push('valid email is required');
  if (message.length < 10) errors.push('message must be at least 10 characters');
  const fingerprint = [email, company.toLowerCase()].filter(Boolean).join('|');
  const intentText = (message + ' ' + (body.service || '')).toLowerCase();
  const priorityTerms = ['quote','estimate','integration','automation','website','shopify','api','booking','checkout'];
  const matchedTerms = priorityTerms.filter((term) => intentText.includes(term));
  return { valid: errors.length === 0, errors, lead: { name, email, company, message, source }, fingerprint, routing: matchedTerms.length >= 2 ? 'priority' : 'standard', matched_terms: matchedTerms };
}

const cases = [
  { input: { name: ' Ana ', email: 'ANA@EXAMPLE.COM ', company: ' Acme ', message: 'Need a Shopify checkout API integration quote', source: 'website' }, valid: true, route: 'priority' },
  { input: { email: 'bad', message: 'short' }, valid: false, route: 'standard' },
  { input: { email: 'joe@example.com', message: 'I need some help with my site please' }, valid: true, route: 'standard' }
];

for (const [index, testCase] of cases.entries()) {
  const output = normalizeLead(testCase.input);
  if (output.valid !== testCase.valid || output.routing !== testCase.route) throw new Error('case ' + (index + 1) + ' failed: ' + JSON.stringify(output));
  console.log('case ' + (index + 1) + ': ok');
}