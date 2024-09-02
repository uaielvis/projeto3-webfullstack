import React, { useState } from 'react';
import axios from 'axios';

const Insert = () => {
  const [book, setBook] = useState('');
  const [chapter, setChapter] = useState('');
  const [verse, setVerse] = useState('');
  const [text, setText] = useState('');
  const [translation, setTranslation] = useState('João Ferreira de Almeida');
  const [result, setResult] = useState('');

  const handleInsert = async (e) => {
    e.preventDefault();

    if (!book || !chapter || !verse || !text) {
      setResult('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/verses', {
        book,
        chapter,
        verse,
        text,
        translation
      });
      setResult('Versículo inserido com sucesso!');
    } catch (err) {
      console.error(err);
      setResult('Erro ao inserir o versículo.');
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
        type="number"
        placeholder="Capítulo"
        value={chapter}
        onChange={(e) => setChapter(e.target.value)}
      />
      <input
        type="number"
        placeholder="Versículo"
        value={verse}
        onChange={(e) => setVerse(e.target.value)}
      />
      <textarea
        placeholder="Texto"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select
        value={translation}
        onChange={(e) => setTranslation(e.target.value)}
      >
        <option value="João Ferreira de Almeida">João Ferreira de Almeida</option>
        <option value="World English Bible">World English Bible</option>
        <option value="King James Version">King James Version</option>
        <option value="American Standard Version">American Standard Version</option>
      </select>
      <button type="submit">Inserir</button>
      <p>{result}</p>
    </form>
  );
};

export default Insert;
