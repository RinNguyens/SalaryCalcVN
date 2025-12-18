import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    // Send to admin
    await resend.emails.send({
      from: 'SalaryLens Contact <noreply@salarylens.com>',
      to: 'support@salarylens.com',
      subject: `[Contact Form] ${data.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1E40AF;">New Contact Form Submission</h2>

          <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>From:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Subject:</strong> ${data.subject}</p>
          </div>

          <div style="background: white; padding: 20px; border: 1px solid #E5E7EB; border-radius: 8px;">
            <h3>Message:</h3>
            <p style="white-space: pre-wrap;">${data.message}</p>
          </div>

          <p style="color: #6B7280; font-size: 12px; margin-top: 20px;">
            Sent from SalaryLens Contact Form
          </p>
        </div>
      `,
    });

    // Send confirmation to user
    await resend.emails.send({
      from: 'SalaryLens <noreply@salarylens.com>',
      to: data.email,
      subject: 'Cảm ơn bạn đã liên hệ với SalaryLens',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1E40AF;">Xin chào ${data.name}!</h2>

          <p>Cảm ơn bạn đã liên hệ với SalaryLens. Chúng tôi đã nhận được tin nhắn của bạn và sẽ phản hồi sớm nhất có thể.</p>

          <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Thông tin bạn đã gửi:</h3>
            <p><strong>Chủ đề:</strong> ${data.subject}</p>
            <p style="white-space: pre-wrap;"><strong>Nội dung:</strong><br>${data.message}</p>
          </div>

          <p>Thời gian phản hồi dự kiến: <strong>2-4 giờ làm việc</strong></p>

          <p style="color: #6B7280; font-size: 12px; margin-top: 30px;">
            Trân trọng,<br>
            Đội ngũ SalaryLens
          </p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
}
