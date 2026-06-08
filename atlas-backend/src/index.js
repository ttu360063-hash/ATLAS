const express = require('express');
const cors = require('cors');
const chatRoutes = require('./routes/chat');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.use('/atlas', chatRoutes);

app.listen(PORT, () => {
  console.log(`ATLAS Backend rodando na porta ${PORT}`);
});
