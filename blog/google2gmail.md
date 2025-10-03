---
title: Converting google account to gmail account calendaring weirdness
---

I do email/calendar with a gmail account and a domain with a registrar that
does wild card forwarding and gmail sending aliases.
I don't think I can escape google because of the network effect on calendaring.

For reasons, I needed to change what gmail account was behind everything, so I
tried creating a non-gmail google account with an email at my domain.

I ran into calendaring issues when people not in the google ecosystem invited
me to things, because my old gmail account would receive the calendar event,
and would try to put it on the old gmail account calendar, not my domain email
google account calendar.


So I converted the google account to a gmail account.

The calendar page stopped loading, saying
```
Uncaught (in promise) Error: Mismatch between primary calendar $gmailUser@gmail.com and user email $domainEmail.
```
Waiting half an hour fixed it.

I had to enable "Allow responding to invitations forwarded through alternative
email addresses" because the primary account email had changed.
