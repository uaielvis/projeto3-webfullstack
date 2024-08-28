import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
  const [book, setBook] = useState('');
  const [chapter, setChapter] = useState('');
  const [verse, setVerse] = useState('');
  const [translation, setTranslation] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/verses', {
        params: { book, chapter, verse, translation },
        headers: { 'x-auth-token': token },
      });
      setResults(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Livro"
          value={book}
          onChange={(e) => setBook(e.target.value)}
        />
        <input
          type="text"
          placeholder="Capítulo"
          value={chapter}
          onChange={(e) => setChapter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Versículo"
          value={verse}
          onChange={(e) => setVerse(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tradução"
          value={translation}
          onChange={(e) => setTranslation(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            {result.book} {result.chapter}:{result.verse} ({result.translation}) - {result.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
