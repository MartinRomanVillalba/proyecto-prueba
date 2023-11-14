require('dotenv').config();
const express = require("express");
const path = require("path");
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

const app = express();

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser())
app.use(methodOverride('_method'))
app.use(expressSession({
    secret: process.env.SECRET
}))

const mainRoutes = require('./routes/main');
const productsRouter = require('./routes/products');


app.use('/', mainRoutes)
app.use('/products', productsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`);
});

module.exports = app