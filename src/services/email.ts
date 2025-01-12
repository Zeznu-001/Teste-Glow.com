export const sendEmail = async (
  to: string,
  subject: string,
  message: string
): Promise<void> => {
  // In a real application, you would integrate with an email service
  // For now, we'll just log the email
  console.log('Sending email:', { to, subject, message });
};