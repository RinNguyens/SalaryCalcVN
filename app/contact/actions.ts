'use server';

import { z } from 'zod';

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  subject: z.string().min(1, 'Vui lòng chọn chủ đề'),
  message: z.string().min(10, 'Nội dung phải có ít nhất 10 ký tự'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export async function submitContactForm(data: ContactFormData) {
  try {
    // Validate data
    const validated = contactSchema.parse(data);

    // TODO: Send email using your email service
    // Example: SendGrid, Resend, Nodemailer, etc.

    // For now, just log (replace with actual email sending)
    console.log('Contact form submitted:', validated);

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // TODO: Save to database if needed
    // await db.contact.create({ data: validated });

    // TODO: Send notification to admin
    // await sendAdminNotification(validated);

    return {
      success: true,
      message: 'Tin nhắn đã được gửi thành công!'
    };

  } catch (error) {
    console.error('Contact form error:', error);

    if (error instanceof z.ZodError) {
      const issues = error.issues;
      return {
        success: false,
        error: issues[0]?.message || 'Dữ liệu không hợp lệ'
      };
    }

    return {
      success: false,
      error: 'Có lỗi xảy ra. Vui lòng thử lại sau.'
    };
  }
}
