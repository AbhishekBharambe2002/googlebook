import React, { useState, useEffect } from 'react';
import Card from './Card';

const BookmarkPage = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const storedBookmarks = localStorage.getItem('bookmarks');
    if (storedBookmarks) {
      setBookmarks(JSON.parse(storedBookmarks));
    }
  }, []);

  const removeBookmark = (id) => {
    const updatedBookmarks = bookmarks.filter((bookmark) => bookmark.id !== id);
    setBookmarks(updatedBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Bookmarks</h1>
      <div className="flex flex-wrap justify-center">
        {bookmarks.map((bookmark) => (
          <div key={bookmark.id} className="max-w-xs rounded overflow-hidden shadow-sm m-2">
            <img
              className="object-contain h-64 w-full"
              src={bookmark.volumeInfo.imageLinks?.smallThumbnail}
              alt={bookmark.volumeInfo.title}
            />
            <div className="px-6 py-4">
              <div className="font-bold text-base mb-2 break-words">{bookmark.volumeInfo.title}</div>
              <p className="text-gray-700 text-base">{bookmark.saleInfo?.listPrice?.amount}</p>
            </div>
            <button
              onClick={() => removeBookmark(bookmark.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full absolute bottom-0 right-0 m-4"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookmarkPage;
