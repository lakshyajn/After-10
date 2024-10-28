import dbConnect from '../../../dbConnect';
import Item from '../../../models/Item';

export default async function handler(req, res) {
  await dbConnect();

  try {
    const itemsByCategory = await Item.aggregate([
      {
        $group: {
          _id: "$category",
          items: {
            $push: {
              _id: "$_id",
              name: "$name",
              price: "$price",
              imageUrl: "$imageUrl",
              inStock: "$inStock",
              addOns: "$addOns",
            },
          },
        },
      },
    ]);

    res.status(200).json(itemsByCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items by category', error: error.message });
  }
}