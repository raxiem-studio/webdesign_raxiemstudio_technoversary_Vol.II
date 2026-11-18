# Email templates

`contact-notification.html` is the email the JEJAK inbox receives when someone sends the Contact form. It is sent through [EmailJS](https://www.emailjs.com/). Open `contact-notification.preview.html` in a browser to see it with sample data.

## Setup (once)

1. Create a free EmailJS account.
2. **Email Services → Add New Service → Gmail.** Connect the Gmail account that should send the notification. Copy the **Service ID**.
3. **Email Templates → Create New Template**, then set:

   | Field | Value |
   |---|---|
   | Subject | `[JEJAK] {{topic}} — {{name}}` |
   | To Email | `{{to_email}}` |
   | From Name | `JEJAK Contact` |
   | Reply To | `{{email}}` |

   In **Content**, switch to the code editor (`<>`), delete the default content, and paste all of `contact-notification.html`. Save, then copy the **Template ID**.
4. **Account → General**: copy the **Public Key**.
5. In the project root, copy `.env.example` to `.env.local` and fill in the three values. Restart `npm run dev`.
6. Optional but recommended: **Account → Security → Allowed origins**. Add the production domain so the keys only work from the JEJAK site.

On the hosting platform, set the same three `VITE_EMAILJS_*` variables before building.

## Variables the site sends

| Variable | Content |
|---|---|
| `{{name}}` | Sender's name |
| `{{email}}` | Sender's email, also used for Reply To |
| `{{topic}}` | Chosen topic |
| `{{message}}` | Message text, line breaks kept |
| `{{sent_at}}` | Send time in WIB, e.g. "Rabu, 18 November 2026 pukul 14.04 WIB" |
| `{{to_email}}` | `raxiemstudio@gmail.com` (from `src/data/contact.js`) |

Keep double braces. EmailJS escapes them, so a sender cannot inject HTML into the email.
