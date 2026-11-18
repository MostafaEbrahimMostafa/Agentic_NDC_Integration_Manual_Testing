// Minimal JSON Schema (draft-07 subset) validator, no dependencies.
// Supports: $ref (#/$defs/... and #/definitions/...), type (incl. arrays and "integer"), enum, const,
// pattern, minLength, maxLength, minimum, required, properties, additionalProperties (bool|schema),
// items, minItems, format "date-time", allOf, anyOf, if/then/else.
// Returns an array of { path, msg }. Values are never echoed for const checks (they may be secrets).
'use strict';

function typeOf(v) {
  if (v === null) return 'null';
  if (Array.isArray(v)) return 'array';
  if (typeof v === 'number') return Number.isInteger(v) ? 'integer' : 'number';
  return typeof v;
}
const typeMatches = (t, v) => { const a = typeOf(v); return t === a || (t === 'number' && a === 'integer'); };
const ISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:?\d{2})$/;

function resolveRef(root, ref) {
  if (!ref.startsWith('#/')) throw new Error('Only local $ref supported: ' + ref);
  return ref.slice(2).split('/').reduce((o, k) => (o ? o[k] : undefined), root);
}

function validate(schema, value, root, at, errs) {
  root = root || schema; at = at || '$'; errs = errs || [];
  if (schema === true || schema === undefined) return errs;
  if (schema === false) { errs.push({ path: at, msg: 'not allowed' }); return errs; }
  if (schema.$ref) {
    const target = resolveRef(root, schema.$ref);
    if (!target) { errs.push({ path: at, msg: 'schema $ref not found: ' + schema.$ref }); return errs; }
    validate(target, value, root, at, errs);
  }
  if (schema.type) {
    const ts = Array.isArray(schema.type) ? schema.type : [schema.type];
    if (!ts.some(t => typeMatches(t, value))) { errs.push({ path: at, msg: `expected ${ts.join('|')}, got ${typeOf(value)}` }); return errs; }
  }
  if (schema.const !== undefined && JSON.stringify(value) !== JSON.stringify(schema.const)) errs.push({ path: at, msg: 'must equal ' + JSON.stringify(schema.const) });
  if (schema.enum && !schema.enum.some(e => JSON.stringify(e) === JSON.stringify(value))) errs.push({ path: at, msg: `must be one of ${schema.enum.join(' | ')} (got ${JSON.stringify(value)})` });
  if (typeof value === 'string') {
    if (schema.minLength !== undefined && value.trim().length < schema.minLength) errs.push({ path: at, msg: schema.minLength === 1 ? 'must not be empty' : `shorter than ${schema.minLength}` });
    if (schema.maxLength !== undefined && value.length > schema.maxLength) errs.push({ path: at, msg: `longer than ${schema.maxLength} characters (${value.length})` });
    if (schema.pattern && !new RegExp(schema.pattern).test(value)) errs.push({ path: at, msg: `does not match ${schema.pattern}` });
    if (schema.format === 'date-time' && (!ISO.test(value) || isNaN(Date.parse(value)))) errs.push({ path: at, msg: 'not an ISO-8601 date-time' });
  }
  if (typeof value === 'number' && schema.minimum !== undefined && value < schema.minimum) errs.push({ path: at, msg: `less than ${schema.minimum}` });
  if (Array.isArray(value)) {
    if (schema.minItems !== undefined && value.length < schema.minItems) errs.push({ path: at, msg: `needs at least ${schema.minItems} item(s)` });
    if (schema.items) value.forEach((v, i) => validate(schema.items, v, root, `${at}[${i}]`, errs));
  }
  if (typeOf(value) === 'object') {
    (schema.required || []).forEach(k => { if (value[k] === undefined) errs.push({ path: `${at}.${k}`, msg: 'required field missing' }); });
    const props = schema.properties || {};
    for (const [k, v] of Object.entries(value)) {
      if (props[k] !== undefined) validate(props[k], v, root, `${at}.${k}`, errs);
      else if (schema.additionalProperties === false) errs.push({ path: `${at}.${k}`, msg: 'unexpected field' });
      else if (typeof schema.additionalProperties === 'object') validate(schema.additionalProperties, v, root, `${at}.${k}`, errs);
    }
  }
  (schema.allOf || []).forEach(s => validate(s, value, root, at, errs));
  if (schema.anyOf && !schema.anyOf.some(s => validate(s, value, root, at, []).length === 0)) errs.push({ path: at, msg: 'matches none of the allowed shapes' });
  if (schema.if) {
    const ok = validate(schema.if, value, root, at, []).length === 0;
    if (ok && schema.then) validate(schema.then, value, root, at, errs);
    if (!ok && schema.else) validate(schema.else, value, root, at, errs);
  }
  return errs;
}

module.exports = { validate, typeOf };
