import mailjet from 'node-mailjet';

const mailjetClient = mailjet.apiConnect(
  process.env.MAILJET_API_KEY!,
  process.env.MAILJET_API_SECRET!
);

interface MailjetMessage {
  From: { Email: string; Name: string };
  To: Array<{ Email: string }>;
  TemplateID?: number;
  TemplateLanguage?: boolean;
  Variables?: Record<string, string>;
  Subject?: string;
  TextPart?: string;
  HTMLPart?: string;
}

export async function sendOtpEmail(to: string, otp: string) {
  const fromEmail = process.env.MAILJET_SENDER_EMAIL!;
  const templateId = process.env.MAILJET_OTP_TEMPLATE_ID;

  try {
    const messageData: MailjetMessage = {
      From: {
        Email: fromEmail,
        Name: 'Gpmanch',
      },
      To: [
        {
          Email: to,
        },
      ],
    };

    // Use Mailjet template if template ID is provided
    if (templateId) {
      messageData.TemplateID = parseInt(templateId);
      messageData.TemplateLanguage = true;
      messageData.Variables = {
        otp: otp
      };
    }

    const result = await mailjetClient.post('send', { version: 'v3.1' }).request({
      Messages: [messageData],
    });
    return result.body;
  } catch (error) {
    console.error('Mailjet send error:', error);
    throw new Error('Failed to send OTP email');
  }
}
