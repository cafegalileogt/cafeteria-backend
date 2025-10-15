// resetPassword.js (solo HTML del email)
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
    <a href="http://localhost:3000/reset-password.html?token={{token}}" class="btn">Restablecer contraseña</a>    </div>
  </body>
</html>
`;

module.exports = { resetPasswordTemplate };