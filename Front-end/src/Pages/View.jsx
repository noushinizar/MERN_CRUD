import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function View() {
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState(null); // To track the item being edited
  const [updatedDetails, setUpdatedDetails] = useState({
    name: '',
    price: '',
    quantity: '',
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/viewitems');
      setItems(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/items/${id}`);
      setItems(items.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEdit = (item) => {
    setEditItem(item._id);
    setUpdatedDetails({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/api/items/${editItem}`, updatedDetails);
      setItems(
        items.map((item) =>
          item._id === editItem ? { ...item, ...updatedDetails } : item
        )
      );
      setEditItem(null);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

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
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? (
                items.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-100 border-b border-gray-200"
                  >
                    {editItem === item._id ? (
                      <>
                        <td className="py-2 px-4">
                          <input
                            type="text"
                            value={updatedDetails.name}
                            onChange={(e) =>
                              setUpdatedDetails({ ...updatedDetails, name: e.target.value })
                            }
                            className="border rounded px-2 py-1"
                          />
                        </td>
                        <td className="py-2 px-4">
                          <input
                            type="text"
                            value={updatedDetails.price}
                            onChange={(e) =>
                              setUpdatedDetails({ ...updatedDetails, price: e.target.value })
                            }
                            className="border rounded px-2 py-1"
                          />
                        </td>
                        <td className="py-2 px-4">
                          <input
                            type="text"
                            value={updatedDetails.quantity}
                            onChange={(e) =>
                              setUpdatedDetails({
                                ...updatedDetails,
                                quantity: e.target.value,
                              })
                            }
                            className="border rounded px-2 py-1"
                          />
                        </td>
                        <td className="py-2 px-4 flex gap-2">
                          <button
                            onClick={handleUpdate}
                            className="bg-green-500 text-white px-4 py-2 rounded"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditItem(null)}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="py-2 px-4">{item.name}</td>
                        <td className="py-2 px-4">{item.price}</td>
                        <td className="py-2 px-4">{item.quantity}</td>
                        <td className="py-2 px-4 flex gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                          >
                            Delete
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
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
