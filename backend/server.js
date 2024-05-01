require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY; // Set this in your .env file

/* Will use this for api later */

// Route to fetch recipe information
app.get('search-ingredients', async (req, res) => { // recieves request, and responds to requester
    const { query } = req.params; // gets paramn for requester, food name
    try {
        const response = await axios.get(`https://api.spoonacular.com/food/ingredients/search?query=${query}&apiKey=${SPOONACULAR_API_KEY}`);
        res.json(response.data);
    } catch (error) {
        console.error('Failed to fetch image:', error);
        res.status(500).json({ message: 'Failed to fetch recipes', error: error.response.data });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
