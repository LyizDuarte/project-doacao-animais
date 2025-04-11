const app = require("./server");

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Servidor rodando localmente na porta ${PORT}`);
});
