import React, { useState } from 'react';

const Card = ({ book }) => {
  console.log(book);
  const [selectedItem, setSelectedItem] = useState(null);
  const [bookmarks, setBookmarks] = useState(() => {
    const storedBookmarks = localStorage.getItem('bookmarks');
    return storedBookmarks ? JSON.parse(storedBookmarks) : [];
  });

  const toggleDescription = (item) => {
    setSelectedItem(item === selectedItem ? null : item);
  };

  const bookmarkItem = (item) => {
    const isBookmarked = bookmarks.some((bookmark) => bookmark.id === item.id);
    if (!isBookmarked) {
      const updatedBookmarks = [...bookmarks, item];
      setBookmarks(updatedBookmarks);
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    }
  };

  let thumbnail = book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail;
  let money = book.saleInfo.listPrice && book.saleInfo.listPrice.amount;

  // Check if thumbnail is not undefined before rendering the card
  if (!thumbnail) {
    return null;
  }

  return (
    <div
      className="max-w-xs rounded overflow-hidden shadow-sm m-2"
      onClick={() => toggleDescription(book)}
    >
      <img className="object-contain h-64 w-full" src={thumbnail} alt={book.volumeInfo.title} />
      <div className="px-6 py-4">
        <div className="font-bold text-base mb-2 break-words">{book.volumeInfo.title}</div>
        <p className="text-gray-700 text-base">{money}</p>
      </div>

      {selectedItem === book && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img className="object-contain h-64 w-full" src={thumbnail} alt={book.volumeInfo.title} />
            <div className="font-bold text-xl mb-2">{book.volumeInfo.title}</div>
            <p className="text-gray-700 text-xs">{book.volumeInfo.description}</p>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click event from firing
                bookmarkItem(book);
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full absolute bottom-0 right-0 m-4"
            >
              Bookmark
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
