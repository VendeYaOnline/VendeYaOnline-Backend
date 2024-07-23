const { MercadoPagoConfig, Preference } = require("mercadopago");

const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN,
});
const preference = new Preference(client);

module.exports = {
  createPreference: async (ctx) => {
    try {
      const { products, token, user_id, email } = ctx.request.body;
      const { to, subject, client, service, price, date } = email;

      //* Crea una nueva preferencia de pago con los datos del producto
      const result = await preference.create({
        body: {
          items: products,
          back_urls: {
            success:
              "https://vende-ya-online.vercel.app/checkout?status=success&id=vobrL9XhukPXOev",
            pending:
              "https://vende-ya-online.vercel.app/checkout?status=pending&id=d3pQSuU7uHCnfZn",
            failure:
              "https://vende-ya-online.vercel.app/checkout?status=failure&id=E1ETwTlgVmRmGOK",
          },
          auto_return: "approved",
          payment_methods: {
            installments: 12,
          },
          notification_url: `https://vende-ya-online.vercel.app/api/webhooks/mercado-pago?filename=${user_id}&token=${token}&user_id=${user_id}&to=${to}&subject=${subject}&client=${client}&service=${service}&price=${price}&date=${date}`,
        },
      });

      const { id, sandbox_init_point } = result;
      return { id, sandbox_init_point };
    } catch (error) {
      console.error("Error al crear la preferencia de pago:", error);
      return ctx.badRequest("Error al crear la preferencia de pago");
    }
  },
};
