const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD
  }
});

const sendResetPasswordEmail = async (to, resetToken) => {
  const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Reset Your Password - Fund Tracker',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #2196F3; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Fund Tracker</h1>
        </div>
        
        <div style="padding: 20px; background-color: #f9f9f9;">
          <h2 style="color: #333;">Password Reset Request</h2>
          
          <p style="color: #666; line-height: 1.6;">
            We received a request to reset your password. If you didn't make this request, you can safely ignore this email.
          </p>
          
          <p style="color: #666; line-height: 1.6;">
            To reset your password, click the button below. This link will expire in 1 hour.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" 
               style="background-color: #2196F3; 
                      color: white; 
                      padding: 12px 24px; 
                      text-decoration: none; 
                      border-radius: 4px;
                      display: inline-block;">
              Reset Password
            </a>
          </div>
          
          <p style="color: #666; line-height: 1.6;">
            If the button doesn't work, you can also copy and paste this link into your browser:
          </p>
          
          <p style="background-color: #eee; 
                    padding: 10px; 
                    border-radius: 4px; 
                    word-break: break-all;">
            ${resetLink}
          </p>
          
          <p style="color: #666; line-height: 1.6; margin-top: 30px;">
            For security reasons, this link will expire in 1 hour. If you need to reset your password after that, please request a new reset link.
          </p>
        </div>
        
        <div style="text-align: center; padding: 20px; color: #666;">
          <p style="margin: 0;">
            This is an automated email. Please do not reply to this message.
          </p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send reset password email');
  }
};

module.exports = {
  sendResetPasswordEmail
};
