import { useState, useEffect } from 'react';
import NoteList from './NoteList';

const NotesPage = ({ token }) => {
  const [notes, setNotes] = useState([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteBody, setNewNoteBody] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchNotes = async () => {
    try {
      const response = await fetch('/api/notes', {
        headers: { 'x-auth-token': token },
      });
      const data = await response.json();
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
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({ title: newNoteTitle, body: newNoteBody }),
      });
      const newNote = await response.json();
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
      await fetch(`/api/notes/${id}`, {
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
      const response = await fetch(`/api/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(updatedData),
      });
      const updatedNote = await response.json();
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
      <NoteList
        notes={notes.filter(
          (note) =>
            note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.body.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        onDelete={deleteNote}
        onUpdate={updateNote}
      />
    </>
  );
};

export default NotesPage;
