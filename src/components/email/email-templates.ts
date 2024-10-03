export const getVerifyEmailTemplate = (url: string) => ({
  subject: "Verify your email",
  text: `Click on the link below to verify your email\n${url}`,
  html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Email Verification</title>
    <style>
      /* General Reset for Responsive Design */
      body, table, td, a {
        text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      table, td {
        border-spacing: 0;
        border-collapse: collapse;
        padding: 0;
      }
      img {
        display: block;
        border: 0;
        height: auto;
        line-height: 100%;
        outline: none;
        text-decoration: none;
        max-width: 100%;
      }
      body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        background-color: #f4f4f4;
      }
      /* Mobile Styles */
      @media screen and (max-width: 600px) {
        .email-container {
          width: 100% !important;
          padding: 10px !important;
        }
        h1 {
          font-size: 24px !important;
        }
        p {
          font-size: 16px !important;
        }
        .button {
          width: 100% !important;
          padding: 12px 0 !important;
        }
      }
    </style>
  </head>
  <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
    <!-- Container for the email -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4;">
      <tr>
        <td align="center" style="padding: 20px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" class="email-container" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <tr>
              <td style="padding: 20px; text-align: center;">
                <h1 style="font-size: 28px; color: #333333; margin-bottom: 20px;">Verify Your Email Address</h1>
                <p style="font-size: 18px; color: #666666; margin-bottom: 20px;">Please confirm your email address by clicking the button below:</p>
                <a href="${url}" class="button" style="display: inline-block; padding: 15px 25px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 18px;">Verify Email</a>

                <!-- Add a plaintext link fallback -->
                <p style="font-size: 14px; color: #666666; margin-top: 20px;">If you cannot see the button, click or copy and paste the following link in your browser:</p>
                <a href="${url}" style="font-size: 14px; color: #007bff; text-decoration: underline;">${url}</a>
                <!-- Security expiration notice -->
                <p style="font-size: 14px; color: #666666; margin-top: 20px;">For security reasons, this link will expire in 30 minutes.</p>
                <p style="font-size: 14px; color: #999999; margin-top: 20px;">If you did not sign up for this account, you can ignore this email.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`,
});

export const getForgotPasswordEmailTemplate = (url: string) => ({
  subject: "Reset your password",
  text: `Click on the link reset your password\n${url}`,
  html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Email Verification</title>
    <style>
      /* General Reset for Responsive Design */
      body, table, td, a {
        text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      table, td {
        border-spacing: 0;
        border-collapse: collapse;
        padding: 0;
      }
      img {
        display: block;
        border: 0;
        height: auto;
        line-height: 100%;
        outline: none;
        text-decoration: none;
        max-width: 100%;
      }
      body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        background-color: #f4f4f4;
      }
      /* Mobile Styles */
      @media screen and (max-width: 600px) {
        .email-container {
          width: 100% !important;
          padding: 10px !important;
        }
        h1 {
          font-size: 24px !important;
        }
        p {
          font-size: 16px !important;
        }
        .button {
          width: 100% !important;
          padding: 12px 0 !important;
        }
      }
    </style>
  </head>
  <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
    <!-- Container for the email -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4;">
      <tr>
        <td align="center" style="padding: 20px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" class="email-container" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <tr>
              <td style="padding: 20px; text-align: center;">
                <h1 style="font-size: 28px; color: #333333; margin-bottom: 20px;">Reset your password</h1>
                <p style="font-size: 18px; color: #666666; margin-bottom: 20px;">Please reset your password by clicking the button below:</p>
                <a href="${url}" class="button" style="display: inline-block; padding: 15px 25px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 18px;">Reset Password</a>

                <!-- Add a plaintext link fallback -->
                <p style="font-size: 14px; color: #666666; margin-top: 20px;">If you cannot see the button, click or copy and paste the following link in your browser:</p>
                <a href="${url}" style="font-size: 14px; color: #007bff; text-decoration: underline;">${url}</a>
                <!-- Security expiration notice -->
                <p style="font-size: 14px; color: #666666; margin-top: 20px;">For security reasons, this link will expire in 30 minutes.</p>
                <p style="font-size: 14px; color: #999999; margin-top: 20px;">If you did not request a password reset, kindly ignore this email.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`,
});
