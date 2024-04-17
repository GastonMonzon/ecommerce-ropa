const { Schema, model, models } = require("mongoose");

const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: String,
	image: String,
	createdAt: {
		type: Date,
		immutable: true,
		default: () => Date.now()
	},
	updatedAt: {
		type: Date,
		default: () => Date.now()
	},
	favorites: {
		type: [Schema.Types.Mixed],
		default: []
	},
	purchases: [{ type: Schema.Types.ObjectId, ref: "Compra" }]
});

// La lógica aqui evita que se cree un nuevo modelo cada vez que una ruta lo llama
// Mongoose pluraliza automáticamente a "Usuarios" (pero solo se vera reflejado en MongoDB)
const Usuario = models.Usuario || model("Usuario", UserSchema);
module.exports = Usuario;