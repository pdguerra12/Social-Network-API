const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const reactionSchema = new Schema({
	reactionId: {
		type: Schema.Types.ObjectId,
		default: () => new Types.ObjectId(),
	},
	reactionBody: {
		type: String,
		required: true,
		maxLength: 280,
	},
	username: {
		type: String,
		required: "Username required",
		trim: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		// 'get' below gets the data and cleans it up to look more presentable.
		get: (createdAtVal) => dateFormat(createdAtVal),
	},
});

const thoughtSchema = new Schema(
	{
		thoughtText: {
			type: String,
			required: true,
			maxLength: 280,
			minLength: 1,
			trim: true,
		},

		createdAt: {
			type: Date,
			default: Date.now,
			get: (createdAtVal) => dateFormat(createdAtVal),
		},
		username: {
			type: String,
			required: "Username required",
			trim: true,
		},
		reactions: [reactionSchema],
	},
	{
		toJSON: {
			virtuals: true,
			getters: true,
		},
		id: false,
	}
);

thoughtSchema.virtual("reactionCount").get(function () {
	return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
