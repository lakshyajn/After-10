import Card from "./Card1_s"; // Import Card1_s.js

export default function Card1({ categoryName, items }) {
  return (
    <div id={categoryName} className="category-section">
      <h2 className="text-xl font-bold mb-4">{categoryName}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <Card
            key={item._id}
            id={item._id}
            name={item.name}
            pic={item.imageUrl}
            price={item.price}
            addOns={item.addOns}
          />
        ))}
      </div>
    </div>
  );
}