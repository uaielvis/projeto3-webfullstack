/* const Verse = require('../models/Verse');

  // Função de controle para buscar um versículo usando query parameters
  exports.searchVerse = async (req, res) => {
    const { book, chapter, verse, translation } = req.query;
    try {
      // Cria a consulta com base nos parâmetros de consulta fornecidos
      const query = { book, chapter, verse, translation };
      // Busca os versículos no banco de dados que correspondem à consulta
      const verses = await Verse.find(query);
      // Retorna os versículos encontrados como resposta
      res.json(verses);
    } catch (err) {
      // Retorna um erro se houver uma falha na busca
      res.status(500).send('Erro no servidor');
    }
  };
  
  // Função de controle para inserir um novo versículo
  exports.insertVerse = async (req, res) => {
    const { book, chapter, verse, text, translation } = req.body;
    try {
      // Cria uma nova instância do modelo Verse com os dados fornecidos
      const newVerse = new Verse({ book, chapter, verse, text, translation });
      // Salva o novo versículo no banco de dados
      await newVerse.save();
      // Retorna o novo versículo inserido como resposta
      res.json(newVerse);
    } catch (err) {
      // Retorna um erro se houver uma falha na inserção
      res.status(500).send('Erro no servidor');
    }
  };
  
  exports.insertVerse = async (req, res) => {
    const { book, chapter, verse, text, translation } = req.body;
  
    // Verificação de preenchimento de campos
    if (!book || !chapter || !verse || !text || !translation) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
  
    try {
      const newVerse = new Verse({ book, chapter, verse, text, translation });
      await newVerse.save();
      res.json(newVerse);
    } catch (err) {
      res.status(500).send('Erro no servidor');
    }
  };
  */

  const Verse = require('../models/Verse');

// Função de controle para buscar um versículo usando query parameters
exports.searchVerse = async (req, res) => {
  const { book, chapter, verse, translation } = req.query;
  try {
    // Cria a consulta com base nos parâmetros de consulta fornecidos
    const query = { book, chapter, verse, translation };
    // Busca os versículos no banco de dados que correspondem à consulta
    const verses = await Verse.find(query);
    // Retorna os versículos encontrados como resposta
    res.json(verses);
  } catch (err) {
    // Retorna um erro se houver uma falha na busca
    res.status(500).send('Erro no servidor');
  }
};

// Função de controle para inserir um novo versículo
exports.insertVerse = async (req, res) => {
  const { book, chapter, verse, text, translation } = req.body;

  // Verificação de preenchimento de campos
  if (!book || !chapter || !verse || !text || !translation) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  try {
    // Verifica se o versículo já existe no banco de dados
    const existingVerse = await Verse.findOne({ book, chapter, verse, translation });
    if (existingVerse) {
      return res.status(409).json({ message: 'Versículo já existe.' });
    }

    // Cria uma nova instância do modelo Verse com os dados fornecidos
    const newVerse = new Verse({ book, chapter, verse, text, translation });
    // Salva o novo versículo no banco de dados
    await newVerse.save();
    // Retorna o novo versículo inserido como resposta
    res.json(newVerse);
  } catch (err) {
    // Retorna um erro se houver uma falha na inserção
    res.status(500).send('Erro no servidor');
  }
};
