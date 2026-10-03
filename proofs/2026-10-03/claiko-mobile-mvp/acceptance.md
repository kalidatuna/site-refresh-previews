# Claiko Android MVP acceptance plan

Public brief covered by this sample:

- Customer booking app.
- Companion / driver side.
- Basic admin panel.
- Ride booking and management.
- Pickup to exact destination handoff.

Proposed fixed scope at INR 25,000:

1. Rider can create a booking with pickup, exact destination, and handoff notes.
2. Each booking receives a unique ride ID and persists after app restart.
3. Companion / driver can see an assigned ride, accept it, and move it through agreed statuses.
4. Admin can list active rides, inspect exact destination details, assign or reassign a companion, and update status.
5. Rider and companion views show the same current ride state after refresh.
6. Android APK installs on a test device and the booking to handoff path completes without a blocker crash.
7. Source and setup notes are handed over with the accepted APK.

Suggested delivery milestones:

- Milestone 1: agreed data model, booking flow, and companion assignment working against test data.
- Milestone 2: admin panel, persisted ride state, APK QA, and source handoff.

Items that should stay outside this INR 25,000 MVP unless the buyer explicitly adds them: live navigation, payment processing, background GPS tracking, production SMS/WhatsApp, KYC, and App Store/iOS delivery.
