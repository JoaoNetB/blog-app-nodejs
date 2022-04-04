const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const admin = require("./routes/admin");
const path = require("path");
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname + "/public")));

app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/admin', admin);

mongoose.connect("mongodb://localhost/blogapp").then(() => {
    console.log("Aplicação conectada ao MongoDB!");
}).catch((err) => {
    console.log(`Erro ao se conectar ao MongoDB: ${err}`);
});

const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}!`);
});