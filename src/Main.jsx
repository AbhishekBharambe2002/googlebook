import React, { useState } from 'react';
import Card from './Card';
import axios from 'axios';

const Main = () => {
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState('');
  const [data, setData] = useState([]);

  const searchBook = () => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${search}+subject:${subject}&key=AIzaSyBFy2MRODwuVUHDrJJYl67PNmWrevoKKFs&maxResults=40`
      )
      .then((res) => setData(res.data.items))
      .catch((err) => console.log(err));
  };

  return (
    <div className="main-container">
      <div className="flex justify-center">
        <div className="relative">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="w-100 sm:w-64 py-2 px-3 sm:px-4 rounded-xl border-2 border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Enter Book Name...."
          />
          <button
            onClick={() => {
              searchBook(search);
              searchBook(subject);
            }}
            className="absolute right-0 top-0 mt-2 mr-3"
            aria-label="Search"
          >
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.2-5.2" />
              <circle cx={10} cy={10} r={8} />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <div className="relative">
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            type="text"
            className="w-100 sm:w-64 py-2 px-3 sm:px-4 rounded-xl border-2 border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="filter Category"
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center cards-container">
        {data.map((item) => (
          <Card key={item.id} book={item} />
        ))}
      </div>
    </div>
  );
};

export default Main;
