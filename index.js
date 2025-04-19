const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Set EJS as the view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

// Home route - random cocktail
app.get('/', async (req, res) => {
    try {
        const { data: cocktail } = await axios.get(`${API_URL}/random.php`);
        res.render('index', { cocktail: cocktail.drinks ? cocktail : null });
    } catch (error) {
        console.error('Error fetching cocktail data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Search route - based on cocktail name
app.get('/cocktail-search', async (req, res) => {
    try {
        const { data: cocktail } = await axios.get(`${API_URL}/search.php?s=${req.query.cocktail}`);
        res.render('index', { cocktail: cocktail.drinks ? cocktail : null });
    } catch (error) {
        console.error('Error fetching cocktail data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
