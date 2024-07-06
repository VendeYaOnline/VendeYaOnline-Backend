const { createPreference } = require("../controllers/mercado");

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/generate_preference",
      handler: async (ctx) => {
        try {
          const preferenceResponse = await createPreference(ctx);
          return preferenceResponse;
        } catch (error) {
          console.error("Error al crear la preferencia de pago:", error);
          return ctx.badRequest("Error al crear la preferencia de pago");
        }
      },
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
