const express = require('express');
const app = express();
const cors = require('cors');
const Item = require('./Model/Item');
const connectDB = require('./db.js');

app.use(cors());
app.use(express.json());
connectDB();

// Add item route
app.post('/api/additem', async (req, res) => {
    const { name, price, quantity } = req.body;

    try {
        const newItem = await Item.create({ name, price, quantity });
        res.json({ status: 'ok', newItem });
    } catch (err) {
        res.status(500).json({ status: 'error', error: 'Database error occurred' });
        console.error('Error occurred:', err);
    }
});

// View all items route
app.get('/api/viewitems', async (req, res) => {
    try {
        const items = await Item.find(); // Retrieve all items from the database
        res.json({ status: 'ok', items });
    } catch (err) {
        res.status(500).json({ status: 'error', error: 'Failed to fetch items' });
        console.error('Error occurred:', err);
    }
});

app.listen(3000, () => {
    console.log('server started on 3000');
});
