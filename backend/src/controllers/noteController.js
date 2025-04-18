const Note = require('../model/noteModel')


// 1-Add note
exports.addNote = async (req, res) => {
    try {
        const { title, content, hashtags } = req.body;
        const userId = req.body.userId || req.params.userId;

        const newNote = new Note({
            title,
            content,
            hashtags,
            userId
        });

        await newNote.save();
        res.status(201).json({ message: "Note created successfully", note: newNote });
    } catch (error) {
        res.status(500).json({ message: "Error creating note", error: error.message });
    }
};

// 2-Edit note
exports.editNote = async (req, res) => {
    try {
        const { id } = req.params;
        const updateNote = await Note.findByIdAndUpdate(id, req.body, { new: true })

        if (!updateNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ message: "Note updated successfully", note: updateNote });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating note", error: error.message });
        console.log(error)
    }
}

// 3-delte note
exports.deleteNote = async (req, res) => {
    try {
        const { id } = req.params
        const deletedNote = await Note.findByIdAndDelete(id)

        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json({ message: "Note deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting note", error: error.message });
        console.log(error)
    }
}

// 4-Get All notes
exports.getAllNotes = async (req, res) => {
    try {
        const userId = req.params.userId;
        const notes = await Note.find({ userId }).sort({ date: -1 });
        res.status(200).json(notes);
        console.log(userId)
        console.log(notes)
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching notes", error: error.message });
        console.log(error)
    }
}


// 4. View Note by ID
exports.getNoteById = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findById(id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: "Error fetching note", error: error.message });
    }
};