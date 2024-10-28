// src/app/api/getItems.js
import dbConnect from './dbConnect';
import Item from './ItemModel';

const handler = async (req, res) => {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const items = await Item.find();
      return res.status(200).json(items);
    } catch (error) {
      console.error("Error fetching items:", error);
      return res.status(500).json({ error: 'Failed to fetch items' });
    }
  } else if (req.method === 'POST') {
    const { name, price, category, imageUrl, addOns } = req.body;
    if (!name || !price || !category || !imageUrl) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    try {
      const newItem = new Item({ name, price, category, imageUrl, addOns: addOns || [] });
      await newItem.save();
      return res.status(201).json(newItem);
    } catch (error) {
      console.error("Error adding item:", error);
      return res.status(500).json({ error: 'Failed to add item' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;