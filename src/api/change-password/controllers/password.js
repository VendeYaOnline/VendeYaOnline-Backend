const bcrypt = require("bcryptjs");

module.exports = {
  changePassword: async (ctx) => {
    try {
      const { email, newPassword } = ctx.request.body;

      if (!email || !newPassword) {
        return ctx.badRequest("Email y nueva contraseña son requeridos.");
      }

      // Buscar el usuario por correo electrónico
      const user = await strapi
        .query("plugin::users-permissions.user")
        .findOne({ where: { email } });

      if (!user) {
        return ctx.notFound("Usuario no encontrado.");
      }

      // Encriptar la nueva contraseña
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Actualizar la contraseña del usuario
      await strapi.query("plugin::users-permissions.user").update({
        where: { id: user.id },
        data: { password: hashedPassword },
      });

      ctx.send({ message: "Contraseña cambiada exitosamente." });
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
      return ctx.badRequest("Error al cambiar la contraseña.");
    }
  },
};
