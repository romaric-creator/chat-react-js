const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes pour la connexion et l'enregistrement
app.use('/api', require('./routes/auth'));
app.get('/',(req,res) =>{
  res.status(201).json({ message: 'welcome' });
});
const PORT =  5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
