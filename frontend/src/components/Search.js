import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
  const [book, setBook] = useState('');
  const [chapter, setChapter] = useState('');
  const [verse, setVerse] = useState('');
  const [translation, setTranslation] = useState('João Ferreira de Almeida');
  const [result, setResult] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:5000/api/verses', {
        params: {
          book,
          chapter,
          verse,
          translation
        }
      });
      setResult(response.data.map(v => v.text).join(', ')); // Mostra todos os textos encontrados
    } catch (err) {
      console.error(err);
      setResult('Erro ao buscar o versículo.');
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <input type="text" placeholder="Livro" value={book} onChange={(e) => setBook(e.target.value)} />
      <input type="number" placeholder="Capítulo" value={chapter} onChange={(e) => setChapter(e.target.value)} />
      <input type="number" placeholder="Versículo" value={verse} onChange={(e) => setVerse(e.target.value)} />
      <select value={translation} onChange={(e) => setTranslation(e.target.value)}>
        <option value="João Ferreira de Almeida">João Ferreira de Almeida</option>
        <option value="World English Bible">World English Bible</option>
        <option value="King James Version">King James Version</option>
        <option value="American Standard Version">American Standard Version</option>
      </select>
      <button type="submit">Buscar</button>
      <p>Resultado: {result}</p>
    </form>
  );
};

export default Search;

