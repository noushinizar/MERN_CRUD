const express = require('express');
const app = express();
const cors = require('cors');
const Item = require('./Model/Item'); // Assuming this is a Mongoose model
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

// Delete item route
app.delete('/api/items/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await Item.findByIdAndDelete(id); // Delete item by ID
    if (deletedItem) {
      res.json({ status: 'ok', message: 'Item deleted successfully' });
    } else {
      res.status(404).json({ status: 'error', message: 'Item not found' });
    }
  } catch (err) {
    res.status(500).json({ status: 'error', error: 'Failed to delete item' });
    console.error('Error occurred:', err);
  }
});

// Update item route
app.put('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, quantity } = req.body;

  try {
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { name, price, quantity },
      { new: true } // Return the updated document
    );

    if (updatedItem) {
      res.json({ status: 'ok', updatedItem });
    } else {
      res.status(404).json({ status: 'error', message: 'Item not found' });
    }
  } catch (err) {
    res.status(500).json({ status: 'error', error: 'Failed to update item' });
    console.error('Error occurred:', err);
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on 3000');
});
