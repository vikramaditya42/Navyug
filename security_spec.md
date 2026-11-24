# NAVYUG Security Specification (Phase 0 TDD)

## 1. Data Invariants
1. **User Profile Isolation**: `/users/{userId}` can only be read, created, updated, or deleted by the authenticated, email-verified user whose `request.auth.uid == userId`. No blanket reads or listing of user profiles.
2. **Pledge Ownership & Integrity**: `/pledges/{pledgeId}` records require `userId == request.auth.uid`, valid field sizes (`citizenName` 2–80, `location` 2–80, `commitment` 10–240), and `createdAt == request.time`. Only the owning user can read, list (filtered by `userId == request.auth.uid`), or delete their pledges.
3. **Policy Idea Integrity**: `/ideas/{ideaId}` documents must have `visibility == 'public'`, `authorId == request.auth.uid`, `upvotesCount == 0` on create, `createdAt == request.time`, and strict string/number bounds.
4. **Atomic Upvote Synchronization**: A user can only increment `upvotesCount` on `/ideas/{ideaId}` by `+1` in the same atomic batch that creates `/ideas/{ideaId}/votes/{uid}` (and decrement by `-1` when deleting their vote). Authors can only edit their own `pitch` and `blueprint` fields without altering `upvotesCount` or `authorId`.
5. **Path Variable & Payload Exhaustion Guards**: Every single-document operation validates `isValidId(...)` (`<= 128` chars, `^[a-zA-Z0-9_\-]+$`), every string enforces `.size()`, and every array enforces `.size() <= 12` plus type checking.

## 2. The Dirty Dozen Malicious Payloads
1. **Shadow Field Injection on User Profile**: Creating `/users/u1` with extra field `isAdmin: true`. -> Must return `PERMISSION_DENIED`.
2. **Cross-User Profile Read (PII Leak)**: User `u2` attempting `get` on `/users/u1`. -> Must return `PERMISSION_DENIED`.
3. **Identity Spoofing on Pledge Create**: User `u1` creating `/pledges/p1` with `userId: "u2"`. -> Must return `PERMISSION_DENIED`.
4. **Client Timestamp Tampering on Pledge**: User `u1` creating `/pledges/p1` with backdated `createdAt`. -> Must return `PERMISSION_DENIED`.
5. **Cross-User Pledge List Scraping**: User `u2` querying `/pledges` without matching `userId == u2`. -> Must return `PERMISSION_DENIED`.
6. **Pre-Inflated Upvotes on Idea Create**: User `u1` creating `/ideas/i1` with `upvotesCount: 9999`. -> Must return `PERMISSION_DENIED`.
7. **Unverified Email Write**: Authenticated user with `email_verified: false` creating `/ideas/i1`. -> Must return `PERMISSION_DENIED`.
8. **Non-Atomic Upvote Inflation**: User `u2` updating `/ideas/i1` with `upvotesCount: existing + 1` without creating `/ideas/i1/votes/u2`. -> Must return `PERMISSION_DENIED`.
9. **Multi-Increment Upvote Abuse**: User `u2` updating `/ideas/i1` with `upvotesCount: existing + 5` even with vote doc. -> Must return `PERMISSION_DENIED`.
10. **Value Poisoning on Idea Update**: Author `u1` updating `pitch` with a 5000-char string or boolean. -> Must return `PERMISSION_DENIED`.
11. **Oversized Array Injection**: User `u1` updating `savedPolicyIds` with 50 items or non-string element `[123]`. -> Must return `PERMISSION_DENIED`.
12. **ID Poisoning**: Attempting to create `/pledges/<200-char-invalid-id!@#>` with invalid characters. -> Must return `PERMISSION_DENIED`.
