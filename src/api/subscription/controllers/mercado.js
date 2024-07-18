const { MercadoPagoConfig, PreApproval } = require("mercadopago");

const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN,
});
const preapproval = new PreApproval(client);

module.exports = {
  createSubscription: async (ctx) => {
    try {
      const { plan, email } = ctx.request.body;

      const subscription = await preapproval.create({
        body: {
          payer_email: email,
          reason: plan === "web" ? "Página web" : "Tienda online",
          auto_recurring: {
            frequency: 1,
            frequency_type: "months",
            transaction_amount: plan === "web" ? 1600 : 80000,
            currency_id: "COP",
          },
          back_url:
            "https://vende-ya-online.vercel.app/checkout?id=4EmuiW2J4wTmYRr",
        },
      });

      const { init_point } = subscription;
      return { subscription_url: init_point };
    } catch (error) {
      console.error("Error al crear la suscripción:", error);
      return ctx.badRequest("Error al crear la suscripción");
    }
  },
};
