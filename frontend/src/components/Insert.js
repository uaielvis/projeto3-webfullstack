import React, { useState } from 'react';
import axios from 'axios';

const Insert = () => {
  const [book, setBook] = useState('');
  const [chapter, setChapter] = useState('');
  const [verse, setVerse] = useState('');
  const [text, setText] = useState('');
  const [translation, setTranslation] = useState('');

  const handleInsert = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        '/api/verses',
        { book, chapter, verse, text, translation },
        { headers: { 'x-auth-token': token } }
      );
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleInsert}>
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
        placeholder="Texto"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tradução"
        value={translation}
        onChange={(e) => setTranslation(e.target.value)}
      />
      <button type="submit">Inserir</button>
    </form>
  );
};

export default Insert;
