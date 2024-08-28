const Verse = require('../models/Verse');

exports.searchVerse = async (req, res) => {
  const { book, chapter, verse, translation } = req.query;
  try {
    const query = { book, chapter, verse, translation };
    const verses = await Verse.find(query);
    res.json(verses);
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
};
