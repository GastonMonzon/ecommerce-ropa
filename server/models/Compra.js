const { Schema, model, models } = require("mongoose");

const orderSchema = new Schema(
	{
		userId: { type: String, required: true },
		products: [
			{ productId: { type: String }, quantity: { type: Number, default: 1 } }
		],
		subtotal: { type: Number, required: true },
		total: { type: Number, required: true },
		shipping: { type: Object, required: true },
		delivery_status: { type: String, default: "pending" },
		payment_status: { type: String, required: true }
	},
	{ timestamps: true }
);

const Compra = models.Compra || model("Compra", orderSchema);
module.exports = Compra;
