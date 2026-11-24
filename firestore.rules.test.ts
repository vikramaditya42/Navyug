import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const rulesPath = path.resolve(process.cwd(), 'firestore.rules');
const rulesText = fs.readFileSync(rulesPath, 'utf8');

test('firestore.rules enforces default-deny global catch-all and rules_version 2', () => {
  assert.ok(rulesText.includes("rules_version = '2';"));
  assert.ok(rulesText.includes('match /{document=**}'));
  assert.ok(rulesText.includes('allow read, write: if false;'));
});

test('firestore.rules enforces email_verified on writes and strict PII isolation on /users', () => {
  assert.ok(rulesText.includes('request.auth.token.email_verified == true'));
  assert.ok(rulesText.includes('match /users/{userId}'));
  assert.ok(rulesText.includes('allow list: if false;'));
  assert.ok(rulesText.includes('isOwner(userId)'));
});

test('firestore.rules enforces validation helpers, affectedKeys, and atomic upvotes on /ideas', () => {
  assert.ok(rulesText.includes('function isValidUserProfile(data)'));
  assert.ok(rulesText.includes('function isValidPledge(data)'));
  assert.ok(rulesText.includes('function isValidPolicyIdea(data)'));
  assert.ok(rulesText.includes('function isValidIdeaVote(data, ideaId, voteUserId)'));
  assert.ok(rulesText.includes('existsAfter(/databases/$(database)/documents/ideas/$(ideaId)/votes/$(request.auth.uid))'));
  assert.ok(rulesText.includes('getAfter(/databases/$(database)/documents/ideas/$(ideaId)).data.upvotesCount'));
});

test('firestore.rules enforces secure list queries without blanket isSignedIn list reads', () => {
  assert.ok(!rulesText.includes('allow list: if isSignedIn();'));
  assert.ok(rulesText.includes('allow list: if isSignedIn() && existing().userId == request.auth.uid;'));
  assert.ok(rulesText.includes("allow list: if isSignedIn() && existing().visibility == 'public';"));
});
