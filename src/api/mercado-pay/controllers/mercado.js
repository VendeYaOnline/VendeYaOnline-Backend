const { MercadoPagoConfig, Preference } = require("mercadopago");

const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN,
});
const preference = new Preference(client);

module.exports = {
  createPreference: async (ctx) => {
    try {
      const { products, token, user_id } = ctx.request.body;

      //* Crea una nueva preferencia de pago con los datos del producto
      const result = await preference.create({
        body: {
          items: products,
          back_urls: {
            success:
              "https://vendeyaonline.com/pay?status=success&id=vobrL9XhukPXOev",
            pending:
              "https://vendeyaonline.com/pay?status=pending&id=d3pQSuU7uHCnfZn",
            failure:
              "https://vendeyaonline.com/pay?status=failure&id=E1ETwTlgVmRmGOK",
          },
          auto_return: "approved",
          payment_methods: {
            installments: 3,
          },
          notification_url: `https://vendeyaonline.com/api/webhooks/mercado-pay?filename=${user_id}&token=${token}&user_id=${user_id}`,
        },
      });

      const { id, init_point } = result;
      return { id, init_point };
    } catch (error) {
      console.error("Error al crear la preferencia de pago:", error);
      return ctx.badRequest("Error al crear la preferencia de pago");
    }
  },
};
