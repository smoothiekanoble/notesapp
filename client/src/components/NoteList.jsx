import NoteItem from './NoteItem';

const NoteList = ({ notes, onDelete, onUpdate }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map((note) => (
        <NoteItem key={note.note_id} note={note} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </div>
  );
};

export default NoteList;
