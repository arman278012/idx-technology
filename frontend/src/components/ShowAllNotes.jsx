import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    PlusIcon,
    MagnifyingGlassIcon,
    DocumentTextIcon,
    BookmarkIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import NoteCard from './showSingleNote'; // Ensure this component is created properly
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { readAllNotes } from '../redux/action/noteCrud';

const NotesList = ({ notes }) => {
    const [selectedNote, setSelectedNote] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    const { allnotes, addNoteLoading } = useSelector((state) => state.note);

    const filteredNotes = notes?.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    console.log(allnotes)

    useEffect(() => {
        dispatch(readAllNotes(userId));
    }, [dispatch, userId]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                        <DocumentTextIcon className="w-8 h-8 text-indigo-500" />
                        My Notes
                    </h1>

                    <div className="relative w-full sm:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search notes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        />
                    </div>
                </div>

                {/* Notes Grid */}
                {!selectedNote && (
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {allnotes?.map(note => (
                            <motion.div
                                key={note.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white/80 backdrop-blur-lg rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                            // onClick={() => setSelectedNote(note)}
                            >
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                                        {note.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                                        {note.content}
                                    </p>
                                    <p className="text-sm text-blue-600 line-clamp-3 mb-4">
                                        {note.hashtags[0]}
                                    </p>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">
                                            {new Date(note.date).toLocaleDateString()}
                                        </span>
                                        {note.isFavorite && (
                                            <BookmarkIcon className="w-5 h-5 text-yellow-500" />
                                        )}
                                    </div>
                                    <div className='flex gap-10 justify-center'>
                                        <button
                                            onClick={() => navigate(`/edit-note/${note._id}`)}
                                            className='bg-blue-500 rounded-md px-5 py-1 text-white'>Edit</button>
                                        <button
                                            onClick={() => navigate(`/note-detials/${note._id}`)}
                                            className='bg-blue-500 rounded-md px-5 py-1 text-white'>Details</button>
                                    </div>

                                    {note.tags?.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {note.tags?.map(tag => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Note Details Modal */}
                <AnimatePresence>
                    {selectedNote && (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                            onClick={() => setSelectedNote(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.95 }}
                                animate={{ scale: 1 }}
                                className="relative w-full max-w-3xl bg-white rounded-2xl shadow-xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <NoteCard
                                    note={selectedNote}
                                    onEdit={() => setSelectedNote(null)}
                                    onDelete={() => setSelectedNote(null)}
                                    onToggleFavorite={() => { }}
                                />
                                <button
                                    onClick={() => setSelectedNote(null)}
                                    className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <XMarkIcon className="w-6 h-6 text-gray-500" />
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Empty State */}
                {filteredNotes?.length === 0 && !selectedNote && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="mb-4 text-gray-400">
                            <DocumentTextIcon className="w-16 h-16 mx-auto" />
                        </div>
                        <p className="text-xl text-gray-600">No notes found</p>
                        <p className="text-gray-500 mt-2">
                            {searchQuery ? 'Try different search terms' : 'Create your first note'}
                        </p>
                    </motion.div>
                )}

                {/* Floating Action Button */}
                {!selectedNote && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="fixed bottom-8 right-8 p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
                        onClick={() => navigate('/add-new-note')}
                    >
                        <PlusIcon className="w-8 h-8" />
                    </motion.button>
                )}
            </div>
        </div>
    );
};

export default NotesList;
