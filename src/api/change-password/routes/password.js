const { changePassword } = require("../controllers/password");

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/change_password",
      handler: async (ctx) => {
        try {
          const response = await changePassword(ctx);
          return response;
        } catch (error) {
          console.error("Error al cambiar la contraseña:", error);
          return ctx.badRequest("Error al cambiar la contraseña");
        }
      },
      config: {
        auth: false, // Asegúrate de que no requiere autenticación
        policies: [],
        middlewares: [],
      },
    },
  ],
};
