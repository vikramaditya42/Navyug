import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateCountdown,
  filterAndSortIdeas,
  generateIdeasCsv,
  generatePolicyBriefText,
  getIndicatorProgress,
  validateIdeaInput,
  validatePledgeInput,
} from './navyugLogic';
import { POLICY_BRIEFS, SEED_POLICY_IDEAS } from '../data/navyugData';

test('calculateCountdown computes exact days, hours, minutes, seconds', () => {
  const target = Date.UTC(2047, 7, 15, 0, 0, 0);
  const twoDaysThreeHours = target - (2 * 86400 + 3 * 3600 + 14 * 60 + 25) * 1000;
  const res = calculateCountdown(twoDaysThreeHours, target);
  assert.deepEqual(res, {
    days: 2,
    hours: 3,
    minutes: 14,
    seconds: 25,
    isComplete: false,
  });
});

test('calculateCountdown clamps to zero when target passed', () => {
  const res = calculateCountdown(2000, 1000);
  assert.equal(res.isComplete, true);
  assert.equal(res.days, 0);
  assert.equal(res.seconds, 0);
});

test('getIndicatorProgress calculates percentage cleanly and caps at 100', () => {
  assert.equal(getIndicatorProgress(4.06, 30.0), 13.5);
  assert.equal(getIndicatorProgress(0.685, 0.905), 75.7);
  assert.equal(getIndicatorProgress(35, 30), 100);
  assert.equal(getIndicatorProgress(0, 30), 0);
});

test('filterAndSortIdeas sorts by upvotes and filters by pillar', () => {
  const top = filterAndSortIdeas(SEED_POLICY_IDEAS, 'all', 'top');
  assert.equal(top[0].id, 'seed-1');
  assert.equal(top[top.length - 1].id, 'seed-4');

  const onlyAi = filterAndSortIdeas(SEED_POLICY_IDEAS, '07:00', 'top');
  assert.equal(onlyAi.length, 1);
  assert.equal(onlyAi[0].id, 'seed-2');
});

test('generateIdeasCsv escapes commas and quotes safely', () => {
  const csv = generateIdeasCsv([
    {
      ...SEED_POLICY_IDEAS[0],
      pitch: 'Deploy "smart" hubs, solar cold rooms',
    },
  ]);
  const lines = csv.split('\n');
  assert.equal(lines.length, 2);
  assert.ok(lines[1].includes('"Deploy ""smart"" hubs, solar cold rooms"'));
});

test('generatePolicyBriefText includes title and official portal', () => {
  const txt = generatePolicyBriefText(POLICY_BRIEFS[0], 'en');
  assert.ok(txt.includes('National Education Policy'));
  assert.ok(txt.includes('https://www.education.gov.in'));
});

test('validatePledgeInput enforces firebase-blueprint boundaries', () => {
  assert.ok(validatePledgeInput({ citizenName: 'A', location: 'Jaipur', commitment: 'Upskill 5 youth in AI today.' }));
  assert.ok(validatePledgeInput({ citizenName: 'Aarav', location: 'X', commitment: 'Upskill 5 youth in AI today.' }));
  assert.ok(validatePledgeInput({ citizenName: 'Aarav', location: 'Jaipur', commitment: 'Too short' }));
  assert.equal(
    validatePledgeInput({
      citizenName: 'Aarav Sharma',
      location: 'Jaipur, Rajasthan',
      commitment: 'Upskill 5 youth in AI & digital literacy for Viksit Bharat.',
    }),
    null
  );
});

test('validateIdeaInput enforces firebase-blueprint boundaries', () => {
  assert.ok(
    validateIdeaInput({
      authorName: 'A',
      age: 20,
      state: 'Assam',
      pillarCode: '07:00 · AI & Semicon',
      pitch: 'Valid long pitch for 2047 mission.',
      blueprint: 'Step 1, Step 2, Step 3 blueprint details.',
    })
  );
  assert.ok(
    validateIdeaInput({
      authorName: 'Priya Das',
      age: 10,
      state: 'Assam',
      pillarCode: '07:00 · AI & Semicon',
      pitch: 'Valid long pitch for 2047 mission.',
      blueprint: 'Step 1, Step 2, Step 3 blueprint details.',
    })
  );
  assert.equal(
    validateIdeaInput({
      authorName: 'Priya Das',
      age: 23,
      state: 'Assam',
      pillarCode: '07:00 · AI & Semicon',
      pitch: 'Create offline multilingual STEM voice kits for rural schools.',
      blueprint: '1. Train open models. 2. Flash solar tablets. 3. Partner with DIET hubs.',
    }),
    null
  );
});
