import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
// import './styles.css'; // Import the CSS file containing the animation

const AdminPanel = () => {
  const [forms, setForms] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [activeIndex, setActiveIndex] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const itemRefs = useRef({});

  useEffect(() => {
    axios.get('https://form-6scp.onrender.com/api/forms')
      .then(response => {
        setForms(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the form data!', error);
      });
  }, []);

  const handleAccordionToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleEditClick = (e, id, form) => {
    e.stopPropagation();
    setEditId(id);
    setEditFormData(form);
  };

  const handleChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (id) => {
    axios.put(`https://form-6scp.onrender.com/api/forms/${id}`, editFormData)
      .then(() => {
        setForms(forms.map(form => form._id === id ? editFormData : form));
        setEditId(null);
        setActiveIndex(null);
      })
      .catch(error => {
        console.error('There was an error updating the form!', error);
      });
  };

  const handleDelete = (id,event) => {
    event.stopPropagation();
    if (window.confirm('Are you sure you want to delete this form?')) {
      setDeletingId(id);

      // Apply the shredder animation
      if (itemRefs.current[id]) {
        itemRefs.current[id].classList.add('shredding');
      }

      // Delay the deletion to allow the animation to play
      setTimeout(() => {
        axios.delete(`https://form-6scp.onrender.com/api/forms/${id}`)
          .then(() => {
            setForms(forms.filter(form => form._id !== id));
            setDeletingId(null);
          })
          .catch(error => {
            console.error('There was an error deleting the form!', error);
          });
      }, 1000); // Adjust the timeout to match the animation duration
    }
  };

  return (
    <div className="p-4 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
      {forms.map((form, index) => (
        <div key={form._id} className="mb-4 border rounded-md shadow-sm bg-white">
          <div
            className="p-4 cursor-pointer flex justify-between items-center border-b"
            onClick={() => handleAccordionToggle(index)}
            ref={el => { itemRefs.current[form._id] = el; }}
          >
            <h3 className="text-lg font-semibold">{form.name}</h3>
            <div className="flex space-x-2">
              {editId === form._id ? (
                <button
                  onClick={() => handleSave(form._id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={(event) => handleEditClick(event, form._id, form)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button>
              )}
              <button
                onClick={(event) => handleDelete(form._id, event)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
          <div
            className={`transition-max-height duration-500 ease-in-out ${activeIndex === index ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}
          >
            <div className="p-4">
              {editId === form._id ? (
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="email">Email:</label>
                    <input 
                      type="text" 
                      id="email" 
                      name="email" 
                      value={editFormData.email} 
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="contactNo">Contact No:</label>
                    <input 
                      type="text" 
                      id="contactNo" 
                      name="contactNo" 
                      value={editFormData.contactNo} 
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="address">Address:</label>
                    <input 
                      type="text" 
                      id="address" 
                      name="address" 
                      value={editFormData.address} 
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="service">Service:</label>
                    <input 
                      type="text" 
                      id="service" 
                      name="service" 
                      value={editFormData.service} 
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="companyName">Company Name:</label>
                    <input 
                      type="text" 
                      id="companyName" 
                      name="companyName" 
                      value={editFormData.companyName} 
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="priority">Priority:</label>
                    <select 
                      id="priority" 
                      name="priority" 
                      value={editFormData.priority} 
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="academicLevel">Academic Level:</label>
                    <input 
                      type="text" 
                      id="academicLevel" 
                      name="academicLevel" 
                      value={editFormData.academicLevel} 
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="followUpDate">Follow Up Date:</label>
                    <input 
                      type="date" 
                      id="followUpDate" 
                      name="followUpDate" 
                      value={new Date(editFormData.followUpDate).toISOString().split('T')[0]} 
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <p className="mb-2"><strong>Email:</strong> {form.email}</p>
                  <p className="mb-2"><strong>Contact No:</strong> {form.contactNo}</p>
                  <p className="mb-2"><strong>Address:</strong> {form.address}</p>
                  <p className="mb-2"><strong>Service:</strong> {form.service}</p>
                  <p className="mb-2"><strong>Requirement:</strong>  <span dangerouslySetInnerHTML={{ __html: form.requirementEditor }} /></p>
                  <p className="mb-2"><strong>Company Name:</strong> {form.companyName}</p>
                  <p className="mb-2"><strong>Priority:</strong> {form.priority}</p>
                  <p className="mb-2"><strong>Academic Level:</strong> {form.academicLevel}</p>
                  <p className="mb-2"><strong>Follow Up Date:</strong> {new Date(form.followUpDate).toLocaleDateString()}</p>
                  <p className="mb-2"><strong>Query Created Date:</strong> {new Date(form.queryCreatedDate).toLocaleDateString()}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;
