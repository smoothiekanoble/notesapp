import { useState, useEffect } from 'react';
import NoteList from './NoteList';
import { fetchApi } from '../utils/api';

const NotesPage = ({ token }) => {
  const [notes, setNotes] = useState([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteBody, setNewNoteBody] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchNotes = async () => {
    try {
      const data = await fetchApi('/api/notes', {
        headers: { 'x-auth-token': token },
      });
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchNotes();
    }
  }, [token]);

  const addNote = async (e) => {
    e.preventDefault();
    try {
      const newNote = await fetchApi('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({ title: newNoteTitle, body: newNoteBody }),
      });
      const newNotes = [newNote, ...notes];
      newNotes.sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return new Date(b.created_at) - new Date(a.created_at);
      });
      setNotes(newNotes);
      setNewNoteTitle('');
      setNewNoteBody('');
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await fetchApi(`/api/notes/${id}`, {
        method: 'DELETE',
        headers: { 'x-auth-token': token },
      });
      setNotes(notes.filter((note) => note.note_id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const updateNote = async (id, updatedData) => {
    try {
      const updatedNote = await fetchApi(`/api/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(updatedData),
      });
      const newNotes = notes.map((note) =>
        note.note_id === id ? { ...note, ...updatedNote } : note
      );
      newNotes.sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return new Date(b.created_at) - new Date(a.created_at);
      });
      setNotes(newNotes);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pinnedNotes = filteredNotes.filter((note) => note.pinned);
  const unpinnedNotes = filteredNotes.filter((note) => !note.pinned);

  return (
    <>
      <form onSubmit={addNote} className="mb-12">
        <div className="shadow-lg sm:rounded-lg sm:overflow-hidden bg-white dark:bg-secondary-800">
          <div className="py-6 px-4 space-y-4 sm:p-6">
            <input
              type="text"
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              placeholder="Title"
              className="w-full px-4 py-2 text-lg font-medium border-none focus:ring-0 dark:bg-secondary-800 dark:text-white dark:placeholder-secondary-400"
              required
            />
            <textarea
              value={newNoteBody}
              onChange={(e) => setNewNoteBody(e.target.value)}
              placeholder="Take a note..."
              rows="3"
              className="w-full px-4 py-2 border-none focus:ring-0 dark:bg-secondary-800 dark:text-white dark:placeholder-secondary-400"
              required
            ></textarea>
          </div>
          <div className="px-4 py-4 bg-secondary-50 dark:bg-secondary-800/50 text-right sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-secondary-800"
            >
              Add Note
            </button>
          </div>
        </div>
      </form>

      {pinnedNotes.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xs font-semibold text-secondary-500 dark:text-secondary-400 uppercase tracking-wider mb-3">Pinned</h2>
          <NoteList
            notes={pinnedNotes}
            onDelete={deleteNote}
            onUpdate={updateNote}
          />
        </div>
      )}

      {unpinnedNotes.length > 0 && (
        <div>
          {pinnedNotes.length > 0 && (
             <h2 className="text-xs font-semibold text-secondary-500 dark:text-secondary-400 uppercase tracking-wider mb-3">Others</h2>
          )}
          <NoteList
            notes={unpinnedNotes}
            onDelete={deleteNote}
            onUpdate={updateNote}
          />
        </div>
      )}
    </>
  );
};

export default NotesPage;
