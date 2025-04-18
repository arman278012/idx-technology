const express = require("express")
const { addNote, editNote, deleteNote, getAllNotes, getNoteById } = require("../controllers/noteController")

const router = express.Router()

router.post('/add-note', addNote)
router.patch('/edit-note/:id', editNote)
router.delete('/delete-note/:id', deleteNote)
router.get('/get-all-notes/:userId', getAllNotes)
router.get('/get-single-note/:id', getNoteById)

module.exports = router