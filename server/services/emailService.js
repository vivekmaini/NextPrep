const nodemailer = require("nodemailer");

const isSmtpConfigured = Boolean(
  process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_USER && process.env.SMTP_PASS
);

const transporter = isSmtpConfigured
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
  : null;

async function sendVerificationEmail({ email, otp }) {
  if (!transporter) {
    // Local development fallback. Never enable this in a production environment.
    console.info(`[dev] Verification code for ${email}: ${otp}`);
    return;
  }

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.SMTP_USER,
    to: email,
    subject: "Verify your NextPrep email",
    text: `Your NextPrep verification code is ${otp}. It expires in 10 minutes.`,
  });
}

async function sendPasswordResetEmail({ email, otp }) {
  if (!transporter) {
    // Local development fallback. Never enable this in a production environment.
    console.info(`[dev] Password reset code for ${email}: ${otp}`);
    return;
  }

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.SMTP_USER,
    to: email,
    subject: "Reset your NextPrep password",
    text: `Your NextPrep password reset code is ${otp}. It expires in 10 minutes. If you did not request this, you can safely ignore this email.`,
  });
}

module.exports = { sendVerificationEmail, sendPasswordResetEmail };
