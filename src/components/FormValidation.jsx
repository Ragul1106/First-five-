import React, { useState } from 'react';
import 'animate.css';

const FormValidation = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!nameRegex.test(formData.name)) {
      newErrors.name = 'Name must contain only letters';
    }

    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }

    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Enter a valid 10-digit phone number';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '' });
      setErrors({});
    } else {
      setErrors(validationErrors);
      setSubmitted(false);
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', phone: '' });
    setErrors({});
    setSubmitted(false);
  };

  return (
    <div className="text-center animate__animated animate__fadeIn">
      <h2 className="mb-4">🧭 Enhanced Form Validation</h2>
      <form
        onSubmit={handleSubmit}
        className="mx-auto p-4 border rounded bg-light shadow animate__animated animate__fadeInUp"
        style={{ maxWidth: '400px' }}
        noValidate
      >
        {/* Name */}
        <div className="mb-3 text-start">
          <label className="form-label fw-bold">Name</label>
          <input
            type="text"
            name="name"
            className={`form-control ${errors.name ? 'is-invalid animate__animated animate__shakeX' : formData.name ? 'is-valid' : ''}`}
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., John Doe"
            aria-describedby="nameHelp"
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        {/* Email */}
        <div className="mb-3 text-start">
          <label className="form-label fw-bold">Email</label>
          <input
            type="email"
            name="email"
            className={`form-control ${errors.email ? 'is-invalid animate__animated animate__shakeX' : formData.email ? 'is-valid' : ''}`}
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        {/* Phone */}
        <div className="mb-3 text-start">
          <label className="form-label fw-bold">Phone</label>
          <input
            type="tel"
            name="phone"
            className={`form-control ${errors.phone ? 'is-invalid animate__animated animate__shakeX' : formData.phone ? 'is-valid' : ''}`}
            value={formData.phone}
            onChange={handleChange}
            placeholder="10-digit number"
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>

        {/* Buttons */}
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary fw-bold">Submit</button>
          <button type="button" onClick={handleReset} className="btn btn-outline-secondary fw-bold">Reset</button>
        </div>

        {/* Success Message */}
        {submitted && (
          <div className="alert alert-success mt-4 animate__animated animate__bounceIn">
            ✅ Form submitted successfully!
          </div>
        )}
      </form>
    </div>
  );
};

export default FormValidation;
