/**
 * Netlify Function: submission-created
 * Auto-triggered when a Netlify Form receives a submission.
 * Sends a styled auto-reply email via Resend.
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = 'signal@blockcontrol.ca';
const FROM_NAME = 'Operator';

export async function handler(event) {
  // Parse the submission payload
  const { payload } = JSON.parse(event.body);
  const { email, name } = payload.data;

  // Only send auto-reply if we have an email address
  if (!email) {
    return { statusCode: 200, body: 'No email provided, skipping auto-reply.' };
  }

  const html = buildEmailHtml(name);

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${FROM_NAME} <${FROM_EMAIL}>`,
        to: [email],
        subject: 'SIGNAL RECEIVED // BLOCKCONTROL',
        html,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Resend error:', err);
      return { statusCode: response.status, body: err };
    }

    return { statusCode: 200, body: 'Auto-reply sent.' };
  } catch (error) {
    console.error('Function error:', error);
    return { statusCode: 500, body: 'Failed to send auto-reply.' };
  }
}

function buildEmailHtml(name) {
  const greeting = name ? name.toUpperCase() : 'OPERATOR';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#05090a;font-family:'Courier New',Courier,monospace;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#05090a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="padding:20px 24px;border:1px solid rgba(61,242,208,0.22);border-bottom:none;border-radius:6px 6px 0 0;background-color:#0a1517;">
              <p style="margin:0;font-size:11px;letter-spacing:3px;color:#1f8d7c;">
                BLOCKCONTROL // AUTO-REPLY
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px 24px;border:1px solid rgba(61,242,208,0.22);border-top:none;border-bottom:none;background-color:#0a1517;">

              <!-- Terminal output -->
              <div style="background-color:rgba(0,0,0,0.5);border:1px solid rgba(61,242,208,0.12);border-radius:4px;padding:16px 18px;margin-bottom:24px;">
                <p style="margin:0 0 8px;font-size:13px;color:#3df2d0;line-height:1.8;">
                  <span aria-hidden="true">&gt;</span> TRANSMISSION RECEIVED
                </p>
                <p style="margin:0 0 8px;font-size:13px;color:#3df2d0;line-height:1.8;">
                  <span aria-hidden="true">&gt;</span> RECIPIENT: ${greeting}
                </p>
                <p style="margin:0 0 8px;font-size:13px;color:#3df2d0;line-height:1.8;">
                  <span aria-hidden="true">&gt;</span> SIGNAL STRENGTH: ████████████ STRONG
                </p>
                <p style="margin:0 0 8px;font-size:13px;color:#cfe7e3;line-height:1.8;">
                  <span aria-hidden="true">&gt;</span> STATUS: QUEUED FOR REVIEW
                </p>
                <p style="margin:0;font-size:13px;color:#ff4f7a;line-height:1.8;">
                  <span aria-hidden="true">&gt;</span> STANDBY FOR OPERATOR RESPONSE
                </p>
              </div>

              <!-- Message -->
              <p style="margin:0 0 16px;font-size:14px;color:#cfe7e3;line-height:1.7;">
                Thanks for your form submission, I'll get back to you shortly.
              </p>
              <p style="margin:0;font-size:14px;color:#7fa39d;line-height:1.7;">
                In the meantime, feel free to poke around the site if you haven't already.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 24px;border:1px solid rgba(61,242,208,0.22);border-top:none;border-radius:0 0 6px 6px;background-color:#0a1517;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:10px;letter-spacing:2px;color:#4f6b67;">
                    <a href="https://www.blockcontrol.ca" style="color:#3df2d0;text-decoration:none;">WWW.BLOCKCONTROL.CA</a>
                  </td>
                  <td align="right" style="font-size:10px;letter-spacing:2px;color:#4f6b67;">
                    AUTO-REPLY // DO NOT RESPOND
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
