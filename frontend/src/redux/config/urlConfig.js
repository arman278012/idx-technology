import axios from 'axios'
import { notebookUrl } from './config'

function getNoteBookUrl() {
    let noteBook = axios.create(notebookUrl)
    const noteBookToken = localStorage.getItem("notes-token");

    if (noteBookToken)
        noteBook.defaults.headers.common["note-token"] = noteBookToken;
    return noteBook
}

export const noteBook = getNoteBookUrl()