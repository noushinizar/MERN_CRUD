import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function View() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/viewitems') // Corrected endpoint
      .then((response) => setItems(response.data.items)) // Extract items from response
      .catch((error) => console.error(error));
  }, []);
  console.log(items);

  return (
    <div className="min-h-screen bg-gray-400 p-20">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-black-800 mb-8">
          Inventory
        </h1>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Price</th>
                <th className="py-2 px-4 text-left">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? (
                items.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-100 border-b border-gray-200"
                  >
                    <td className="py-2 px-4">{item.name}</td>
                    <td className="py-2 px-4">{item.price}</td>
                    <td className="py-2 px-4">{item.quantity}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="py-4 px-4 text-center text-gray-500"
                  >
                    No items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
