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
exports.insertVerse = async (req, res) => {
    const { book, chapter, verse, text, translation } = req.body;
    try {
      const newVerse = new Verse({ book, chapter, verse, text, translation });
      await newVerse.save();
      res.json(newVerse);
    } catch (err) {
      res.status(500).send('Erro no servidor');
    }
  };
  