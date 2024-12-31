import React, { useState } from 'react';

export default function ItemForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required.';
    if (!formData.price || isNaN(formData.price) || formData.price <= 0)
      tempErrors.price = 'Valid price is required.';
    if (!formData.quantity || isNaN(formData.quantity) || formData.quantity <= 0)
      tempErrors.quantity = 'Valid quantity is required.';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData); // Call the parent component's submit handler
      setFormData({ name: '', price: '', quantity: '' }); // Reset form
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg border border-white/30">
      <div className="mb-4">
        <label className="block text-white font-medium mb-2" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-transparent border border-white/50 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-white font-medium mb-2" htmlFor="price">
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-transparent border border-white/50 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
        />
        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-white font-medium mb-2" htmlFor="quantity">
          Quantity
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-transparent border border-white/50 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
        />
        {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-violet-700 text-white font-bold py-2 px-4 rounded hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Submit
      </button>
    </form>
  );
}
