// src/components/Form.js
import React, { useState,useRef } from 'react';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import success from './success.gif';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNo: '',
    address: '',
    service: '',
    requirementEditor: '',
    companyName: '',
    website: '',
    allocatedTo: '',
    priority: 'Low',
    academicLevel: '',
    tag: '',
    followUpDate: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setFormData({
      ...formData,
      requirementEditor: data,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous error message
    try {
      const response = await axios.post('https://form-6scp.onrender.com/api/submit-form', formData);
      setIsSubmitted(true); // Trigger success animation

      setFormData({
        name: '',
        email: '',
        contactNo: '',
        address: '',
        service: '',
        requirementEditor: '',
        companyName: '',
        website: '',
        allocatedTo: '',
        priority: 'Low',
        academicLevel: '',
        tag: '',
        followUpDate: '',
      });
      setTimeout(() => {
        setIsSubmitted(false); // Hide success animation after 4 seconds
        if (formRef.current) {
            formRef.current.reset(); // Reset the form fields
          }
        setFormData({ // Reset the form fields
          name: '',
          email: '',
          contactNo: '',
          address: '',
          service: '',
          requirementEditor: '',
          companyName: '',
          website: '',
          allocatedTo: '',
          priority: 'Low',
          academicLevel: '',
          tag: '',
          followUpDate: '',
        });
      }, 4000); // Duration of the animation
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('Error submitting form. Please try again later.');
    }
  };

  return (
    <>
    {isSubmitted && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <img
            src={success}
            alt="Success"
            className="w-full h-auto object-contain"
          />
        </div>
      )}
    <div className="max-w-3xl mx-auto p-6 glassmorphism">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Submit Form</h1>
      

      
      <form onSubmit={handleSubmit} className="form-container outline-none" ref={formRef} >
        {/* Name */}
        <div className="input-container">
          <input
            type="text"
            name="name"
            className='focus:none'
            value={formData.name}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <label>Name</label>
        </div>

        {/* Email */}
        <div className="input-container">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <label>Email</label>
        </div>

        {/* Contact No. */}
        <div className="input-container">
          <input
            type="text"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <label>Contact No.</label>
        </div>

        {/* Address */}
        <div className="input-container">
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <label>Address</label>
        </div>

        {/* Service */}
        <div className="input-container">
          <input
            type="text"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <label>Service</label>
        </div>

        {/* Requirement Editor */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Requirement Editor</label>
          <CKEditor
            editor={ClassicEditor}
            data={formData.requirementEditor}
            onChange={handleEditorChange}
            className="border border-gray-300 rounded-md"
            style={{ height: '400px' }}
          />
        </div>

        {/* Company Name */}
        <div className="input-container">
          <select
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            className="w-full p-3 border-2 border-gray-300 "
          >
            <option value="">Select Company</option>
            <option value="Element K">Element K</option>
            <option value="Emarketz">Emarketz</option>
            <option value="FFLSPL">FFLSPL</option>
            <option value="HrBulb">HrBulb</option>
          </select>
          <label>Company Name</label>
        </div>

        {/* Website */}
        <div className="input-container">
          <select
            name="website"
            value={formData.website}
            onChange={handleChange}
            required
            className="w-full p-3 border-2 border-gray-300  "
          >
            <option value="">Select Website</option>
            <option value="elkindia.com">elkindia.com</option>
            <option value="emarketz.net">emarketz.net</option>
            <option value="fflspl.com">fflspl.com</option>
            <option value="thehrbulb.com">thehrbulb.com</option>
          </select>
          <label>Website</label>
        </div>

        {/* Allocated To */}
        <div className="input-container">
          <select
            name="allocatedTo"
            value={formData.allocatedTo}
            onChange={handleChange}
            required
            className="w-full p-3 border-2 border-gray-300 "
          >
            <option value="">Select User</option>
            <option value="user1">User 1</option>
            <option value="user2">User 2</option>
            <option value="user3">User 3</option>
          </select>
          <label>Allocated To</label>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Priority</label>
          <div className="flex gap-4">
            <div className="priority-option">
              <input
                type="radio"
                id="low"
                name="priority"
                value="Low"
                checked={formData.priority === 'Low'}
                onChange={handleChange}
                className="low"
              />
              <label htmlFor="low" className="text-gray-700">Low</label>
            </div>
            <div className="priority-option">
              <input
                type="radio"
                id="medium"
                name="priority"
                value="Medium"
                checked={formData.priority === 'Medium'}
                onChange={handleChange}
                className="medium"
              />
              <label htmlFor="medium" className="text-gray-700">Medium</label>
            </div>
            <div className="priority-option">
              <input
                type="radio"
                id="high"
                name="priority"
                value="High"
                checked={formData.priority === 'High'}
                onChange={handleChange}
                className="high"
              />
              <label htmlFor="high" className="text-gray-700">High</label>
            </div>
          </div>
        </div>

        {/* Academic Level */}
        <div className="input-container">
          <input
            type="text"
            name="academicLevel"
            value={formData.academicLevel}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <label>Academic Level</label>
        </div>

        {/* Tag */}
        <div className="input-container">
          <input
            type="text"
            name="tag"
            value={formData.tag}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <label>Tag</label>
        </div>

        {/* Follow Up Date */}
        <div className="input-container">
          <input
            type="date"
            name="followUpDate"
            value={formData.followUpDate}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <label>Follow Up Date</label>
        </div>

       
        <button type="submit" className='button'>Submit</button>
      </form>
    </div>
    </>
  );
};

export default Form;
