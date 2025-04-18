import React from 'react'
import Navbar from './Navbar'
import NotesList from '../components/ShowAllNotes'

const ShowAllNotesPages = () => {
    const sampleNotes = [
        {
            id: 1,
            title: 'Meeting Notes',
            content: 'Discussion about Q4 projections and team goals...',
            date: '2023-11-15',
            tags: ['work', 'meeting'],
            isFavorite: true
        },
        {
            id: 2,
            title: 'Personal Goals',
            content: '1. Learn new language\n2. Travel to 3 countries\n3. Read 20 books',
            date: '2023-11-14',
            tags: ['personal'],
            isFavorite: false
        },
        {
            id: 3,
            title: 'Personal Goals',
            content: '1. Learn new language\n2. Travel to 3 countries\n3. Read 20 books',
            date: '2023-11-14',
            tags: ['personal'],
            isFavorite: false
        },
        {
            id: 4,
            title: 'Personal Goals',
            content: '1. Learn new language\n2. Travel to 3 countries\n3. Read 20 books',
            date: '2023-11-14',
            tags: ['personal'],
            isFavorite: false
        }
    ];
    return (
        <div>
            <Navbar></Navbar>
            <NotesList notes={sampleNotes}></NotesList>
        </div>
    )
}

export default ShowAllNotesPages