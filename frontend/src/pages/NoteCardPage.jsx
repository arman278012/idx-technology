import React from 'react'
import Navbar from './Navbar'
import NoteCard from '../components/showSingleNote'
import { useSelector } from 'react-redux';

const NoteCardPage = () => {
    const { singleNoteData } = useSelector((state) => state.note);
    console.log(singleNoteData)

    return (
        <div>
            <Navbar></Navbar>
            <div className="note-cards-container">
                <NoteCard />
            </div>

        </div>
    )
}

export default NoteCardPage