import { motion } from 'framer-motion';
import { PencilIcon, TrashIcon, BookmarkIcon, ClockIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { BookmarkSlashIcon } from '@heroicons/react/24/solid';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSingleNote, readSingleNote } from '../redux/action/noteCrud';

const NoteCard = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { singleNoteData } = useSelector(
        (state) => state.note
    );

    console.log(singleNoteData)

    // using context api here
    const { deletePopup, setDeletePopup } = useContext(AuthContext)

    console.log(deletePopup)

    const navigate = useNavigate()
    const formattedDate = new Date(singleNoteData.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    const handleDelete = async () => {
        dispatch(deleteSingleNote(id, navigate));
    };

    useEffect(() => {
        dispatch(readSingleNote(id));
    }, [dispatch, id]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
            {/* Header Section is here */}
            <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                        <DocumentTextIcon className="w-6 h-6 text-indigo-500" />
                        {singleNoteData.title}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <ClockIcon className="w-4 h-4" />
                        <span>{formattedDate}</span>
                    </div>
                </div>

                <button
                    // onClick={onToggleFavorite}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    {singleNoteData.isFavorite ? (
                        <BookmarkSlashIcon className="w-6 h-6 text-yellow-500" />
                    ) : (
                        <BookmarkIcon className="w-6 h-6 text-gray-400 hover:text-yellow-500" />
                    )}
                </button>
            </div>

            {/* Content Section */}
            <div className="prose max-w-none mb-8 text-gray-700">
                {singleNoteData?.content?.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 last:mb-0">
                        {paragraph}
                    </p>
                ))}
            </div>

            {/* Tags */}
            {singleNoteData.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                    {singleNoteData.tags.map(tag => (
                        <span
                            key={tag}
                            className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}

            {/* Attachments Grid */}
            {singleNoteData.attachments?.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                    {singleNoteData.attachments.map((attachment, index) => (
                        <div
                            key={index}
                            className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative group"
                        >
                            <img
                                src={attachment}
                                alt={`Attachment ${index + 1}`}
                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://via.placeholder.com/150';
                                }}
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    ))}
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 border-t border-gray-100 pt-6">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    // onClick={onEdit}
                    className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"

                >
                    {/* <PencilIcon className="w-5 h-5" />
                    <span className="font-medium" onClick={() => navigate('/edit-card')}>Edit</span> */}
                </motion.button>

                <motion.button
                    onClick={() => setDeletePopup(true)} // instead of just onDelete
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                    <TrashIcon className="w-5 h-5" />
                    <span className="font-medium">Delete</span>
                </motion.button>

            </div>

            {/* Floating Status */}
            {singleNoteData.status && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    {singleNoteData.status}
                </div>
            )}

            {
                deletePopup && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="absolute inset-0"></div>
                        <div className="bg-white p-6 rounded-lg border-2 z-10">
                            <p className="text-lg mb-4">
                                Are you sure you want to delete this item?
                            </p>
                            <div className="flex justify-end">
                                <button
                                    onClick={() => {
                                        handleDelete()
                                        setDeletePopup(false);
                                    }}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => setDeletePopup(false)}
                                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

        </motion.div>
    );
};

export default NoteCard;