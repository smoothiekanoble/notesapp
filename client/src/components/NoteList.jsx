import { Masonry } from 'masonic';
import NoteItem from './NoteItem';

const NoteList = ({ notes, onDelete, onUpdate }) => {
  const items = notes.map(note => ({ note, onDelete, onUpdate }));

  return (
    <Masonry
      items={items}
      columnGutter={16}
      columnWidth={300}
      overscanBy={5}
      render={NoteItem}
    />
  );
};

export default NoteList;
