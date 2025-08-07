import { useState } from 'react';

const NoteItem = ({ data, width }) => {
  const { note, onDelete, onUpdate } = data;
  const { note_id, title, body, created_at } = note;
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedBody, setEditedBody] = useState(body);

  const handleUpdate = () => {
    onUpdate(note_id, { title: editedTitle, body: editedBody, pinned: note.pinned });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTitle(title);
    setEditedBody(body);
  };

  const ActionButton = ({ onClick, children, className, title }) => (
    <button
      onClick={onClick}
      className={`p-2 rounded-full transition-colors duration-200 ${className}`}
      title={title}
    >
      {children}
    </button>
  );

  return (
    <div
      style={{ width }}
      className={`bg-white dark:bg-secondary-800 rounded-lg flex flex-col justify-between transition-all duration-300 mb-4
      ${
        note.pinned
          ? 'shadow-xl shadow-accent-500/20 dark:shadow-accent-400/20 border border-accent-500/50'
          : 'shadow-md hover:shadow-lg'
      }`}
    >
      {isEditing ? (
        <div className="p-4 flex flex-col space-y-4">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full px-3 py-2 text-lg font-medium border border-secondary-300 rounded-md focus:ring-2 focus:ring-primary-500 dark:bg-secondary-700 dark:border-secondary-600 dark:text-white"
          />
          <textarea
            value={editedBody}
            onChange={(e) => setEditedBody(e.target.value)}
            rows="5"
            className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:ring-2 focus:ring-primary-500 dark:bg-secondary-700 dark:border-secondary-600 dark:text-white"
          ></textarea>
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleUpdate}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="inline-flex justify-center py-2 px-4 border border-secondary-300 shadow-sm text-sm font-medium rounded-md text-secondary-700 bg-white hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-secondary-600 dark:hover:bg-secondary-500 dark:text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="p-5">
            <h3 className="font-bold text-lg text-secondary-900 dark:text-white mb-1">{title}</h3>
            <p className="text-secondary-600 dark:text-secondary-400 text-sm mb-3">
              {new Date(created_at).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
            </p>
            <p className="text-secondary-800 dark:text-secondary-300 whitespace-pre-wrap leading-relaxed">{body}</p>
          </div>
          <div className="bg-secondary-50 dark:bg-secondary-800/50 px-5 py-2 flex justify-end items-center space-x-2 rounded-b-lg">
            <ActionButton
              onClick={() => onUpdate(note.note_id, { ...note, pinned: !note.pinned })}
              className={note.pinned ? 'text-accent-500 bg-accent-500/10' : 'text-secondary-400 hover:text-accent-500 hover:bg-accent-500/10'}
              title={note.pinned ? 'Unpin' : 'Pin'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.44 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            </ActionButton>
            <ActionButton
              onClick={() => setIsEditing(true)}
              className="text-secondary-400 hover:text-primary-500 hover:bg-primary-500/10"
              title="Edit"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z" /></svg>
            </ActionButton>
            <ActionButton
              onClick={() => onDelete(note_id)}
              className="text-secondary-400 hover:text-red-500 hover:bg-red-500/10"
              title="Delete"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </ActionButton>
          </div>
        </>
      )}
    </div>
  );
};

export default NoteItem;