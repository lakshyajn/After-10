// src/app/admin/AllItems.js
import React from "react";
import Card from "../../components/Card1_s";
import { items } from "../../../data/Items";

export default function AllItems() {
  return (
    <div className="all-items">
      <h2>All Items</h2>
      <div className="items-grid">
        {items.map((item) => (
          <div key={item.id} className="item-card">
            <Card
              id={item.id}
              pic={item.pic}
              price={item.price}
              addOnOptions={item.addOnOptions}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
