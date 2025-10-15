import nodemailer from "nodemailer";

/**
 * @param {string} to 
 * @param {string} subject 
 * @param {string} html 
 */
export async function sendActivationEmail(to, subject, html) {
  try {
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    // Envía correo
    const info = await transporter.sendMail({
      from: '"Cafetería Galileo" <no-reply@galileo.edu>',
      to,
      subject,
      html,
    });

    console.log("Correo enviado:", info.messageId);
    console.log("info:", nodemailer.getTestMessageUrl(info));
    return info;
  } catch (err) {
    console.error("Error al enviar correo:", err);
    throw err;
  }
}

export async function sendResetPasswordEmail(to, subject, html) {
   
  try {
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    // Envía correo
    const info = await transporter.sendMail({
      from: '"Cafetería Galileo" <no-reply@galileo.edu>',
      to,
      subject,
      html,
    });

    console.log("Correo enviado:", info.messageId);
    console.log("info:", nodemailer.getTestMessageUrl(info));
    return info;
  } catch (err) {
    console.error("Error al enviar correo:", err);
    throw err;
  }
}