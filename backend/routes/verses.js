const express = require('express');
const router = express.Router();

// Rota para buscar um versículo
router.get('/:livro/:capitulo/:versiculo', (req, res) => {
  const { livro, capitulo, versiculo } = req.params;
  // Simulação de busca no banco de dados (ou API)
  const versiculoTexto = `Simulação de texto para ${livro} ${capitulo}:${versiculo}`;
  res.json({ texto: versiculoTexto });
});

module.exports = router;
