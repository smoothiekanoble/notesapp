import NoteItem from './NoteItem';

const NoteList = ({ notes, onDelete, onUpdate }) => {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
      {notes.map((note) => (
        <div key={note.note_id} className="break-inside-avoid mb-4">
          <NoteItem note={note} onDelete={onDelete} onUpdate={onUpdate} />
        </div>
      ))}
    </div>
  );
};

export default NoteList;
