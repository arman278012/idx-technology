import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PencilIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { readSingleNote, updateSingleNote } from '../redux/action/noteCrud';

const EditCard = () => {
    const [note, setNote] = useState({
        title: '',
        content: '',
        hashtags: ''
    });
    const [isExpanded, setIsExpanded] = useState(true);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { singleNoteData } = useSelector((state) => state.note);

    // Load single note from backend
    useEffect(() => {
        dispatch(readSingleNote(id));
    }, [dispatch, id]);

    // Update local state when note data is fetched
    useEffect(() => {
        if (singleNoteData) {
            setNote({
                title: singleNoteData.title || '',
                content: singleNoteData.content || '',
                hashtags: singleNoteData.hashtags || ''
            });
        }
    }, [singleNoteData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateSingleNote(id, {
            title: note.title,
            content: note.content,
            hashtags: note.hashtags
        }, navigate));
        setIsExpanded(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4 flex items-start justify-center">
            <motion.div
                className={`w-full max-w-2xl ${isExpanded ? 'mt-20' : 'mt-40'} transition-all`}
                animate={isExpanded ? { scale: 1 } : { scale: 0.9 }}
            >
                <motion.div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden" whileHover={{ scale: 1.02 }}>
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-3xl font-bold text-gray-800">
                                Edit Note
                            </h2>
                            <motion.button
                                type="button"
                                onClick={() => setIsExpanded(!isExpanded)}
                                whileHover={{ rotate: 90 }}
                                className="p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 transition-colors"
                            >
                                <PencilIcon className="w-6 h-6 text-indigo-600" />
                            </motion.button>
                        </div>

                        {isExpanded && (
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <PencilIcon className="w-5 h-5 text-indigo-500" />
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        value={note.title}
                                        onChange={(e) => setNote({ ...note, title: e.target.value })}
                                        placeholder="Note title..."
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400 transition-all"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <DocumentTextIcon className="w-5 h-5 text-indigo-500" />
                                        Content
                                    </label>
                                    <textarea
                                        value={note.content}
                                        onChange={(e) => setNote({ ...note, content: e.target.value })}
                                        placeholder="Start writing your thoughts..."
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400 min-h-[200px] max-h-[500px] resize-y transition-all"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Hashtags</label>
                                    <input
                                        type="text"
                                        value={note.hashtags}
                                        onChange={(e) => setNote({ ...note, hashtags: e.target.value })}
                                        placeholder="#react #coding #notes"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400 transition-all"
                                    />
                                </div>

                                <div className="flex justify-end gap-4">
                                    <motion.button
                                        type="button"
                                        onClick={() => setIsExpanded(false)}
                                        whileHover={{ x: -5 }}
                                        className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                                    >
                                        Save Note
                                    </motion.button>
                                </div>
                            </div>
                        )}
                    </form>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default EditCard;
