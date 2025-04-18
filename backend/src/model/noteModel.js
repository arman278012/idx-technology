const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    hashtags: {
        type: [String],
        default: [],
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
