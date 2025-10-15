// ==========================
// ✉️ TEMPLATE DE ACTIVACIÓN
// ==========================
const emailTemplate = `
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Activación de cuenta</title>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f4f7fb;
        margin: 0;
        padding: 0;
      }
      .container {
        background-color: #ffffff;
        max-width: 600px;
        margin: 40px auto;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      }
      .header {
        background-color: #C69C6D;
        color: white;
        text-align: center;
        padding: 20px;
      }
      .content {
        padding: 30px 25px;
        text-align: center;
        color: #333;
      }
      .content h2 {
        margin-top: 0;
        color: #C69C6D;
      }
      .btn {
        display: inline-block;
        margin-top: 20px;
        background-color: #C69C6D;
        color: white;
        text-decoration: none;
        padding: 12px 25px;
        border-radius: 8px;
        font-weight: bold;
        transition: background-color 0.2s ease-in-out;
      }
      .btn:hover {
        background-color: #1e4f8a;
      }
      .footer {
        font-size: 13px;
        color: #777;
        text-align: center;
        padding: 20px;
        background-color: #f1f5f9;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Bienvenido a Cafetería Galileo</h1>
      </div>
      <div class="content">
        <h2>Activa tu cuenta</h2>
        <p>Hola <strong>{{name}}</strong>, gracias por registrarte en <b>Cafetería Galileo</b>.</p>
        <p>Haz clic en el siguiente botón para activar tu cuenta:</p>
        <a href="{{activationLink}}" class="btn">Activar cuenta</a>
        <p style="margin-top: 25px; font-size: 14px; color: #555;">
          Este enlace expirará en 1 hora. Si no realizaste esta solicitud, ignora este mensaje.
        </p>
      </div>
      <div class="footer">
        Cafetería Galileo. Todos los derechos reservados.
      </div>
    </div>
  </body>
</html>
`;


// ============================
// 🔐 TEMPLATE DE RESET PASSWORD
// ============================
const resetPasswordTemplate = `
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Restablecer contraseña</title>
    <style>
      body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fb; margin:0; padding:0; }
      .container { max-width:600px; margin:40px auto; padding:20px; background:#fff; border-radius:12px; box-shadow:0 4px 10px rgba(0,0,0,0.1);}
      .btn { display:inline-block; padding:12px 25px; background:#b89a59; color:#fff; border-radius:8px; text-decoration:none; font-weight:bold; }
      .btn:hover { background:#a4874d; }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Restablecer contraseña</h2>
      <p>Haz clic en el botón para restablecer tu contraseña. El enlace expirará en 15 minutos.</p>
      <a href="{{resetLink}}" class="btn">Restablecer contraseña</a>
    </div>
  </body>
</html>
`;


// ✅ Exportamos ambos templates
module.exports = { emailTemplate, resetPasswordTemplate };