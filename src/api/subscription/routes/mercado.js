const { createSubscription } = require("../controllers/mercado");

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/generate_subscription",
      handler: async (ctx) => {
        try {
          const preferenceResponse = await createSubscription(ctx);
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
