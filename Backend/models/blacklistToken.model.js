const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const blacklistTokenSchema = new Schema({
	token: {
		type: String,
		required: true,
		unique: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 24 * 60 * 60,
	},
});

module.exports = model("BlacklistToken", blacklistTokenSchema);
