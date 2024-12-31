import React from 'react';
import Navbar from '../Components/Navbar';
import ItemForm from '../Components/Form';
import axios from 'axios';

export default function Home() {
  const handleFormSubmit = async (data) => {
    console.log('Form Data Submitted:', data);

    try {
      // Sending data to the backend using Axios
      const response = await axios.post('http://localhost:3000/api/additem', data);
      if (response.data.status === 'ok') {
        alert('Item added successfully!');
      } else {
        alert(`Error: ${response.data.error}`);
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
      alert('An error occurred while adding the item. Please try again.');
    }
  };

  return (
    <>
      <div
        className="relative h-screen w-screen bg-cover bg-center"
        style={{ backgroundImage: "url('https://www.echelonedge.com/wp-content/uploads/2023/05/Network-Inventory-Management.png')" }}
      >
        <Navbar />
        {/* <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center"></div> */}
        <h1 className="text-black font-sans text-center text-7xl font-bold pt-20">
          Best way to manage your inventory
        </h1>
        <div className="pt-32">
          <h1 className="text-2xl font-bold text-center text-black pb-5">Add New Item</h1>
          <ItemForm onSubmit={handleFormSubmit} />
        </div>
      </div>
    </>
  );
}
