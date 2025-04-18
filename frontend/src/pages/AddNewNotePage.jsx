import React from 'react'
import Navbar from './Navbar'
import NoteEditor from '../components/AddNewNote'

const AddNewNotePage = () => {
    return (
        <div>
            <Navbar></Navbar>
            <NoteEditor />
        </div>
    )
}

export default AddNewNotePage