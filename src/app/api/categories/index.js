import dbConnect from '../dbConnect';
import Item from '../ItemModel';

export default async function handler(req, res) {
  await dbConnect();

  try {
    // Find all items and group them by category
    const items = await Item.find({});
    
    // Group items by category
    const itemsByCategory = items.reduce((acc, item) => {
      const category = item.category || "Other";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});

    res.status(200).json(itemsByCategory);
  } catch (error) {
    res.status(500).json({ error: "Error fetching items" });
  }
}
