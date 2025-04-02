'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ContactFormProps {
  onBackClick: () => void;
}

export default function ContactForm({ onBackClick }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      email: '',
      message: ''
    };
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // In production, this would make an API call to your Next.js API route
      // For this demo, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full bg-bg-dark border border-accent-purple border-opacity-20 rounded p-3 text-text-light focus:border-accent-purple focus:outline-none transition-all duration-300";
  const errorClasses = "text-red-400 text-sm mt-1";
  
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  if (isSubmitted) {
    return (
      <motion.div 
        className="text-center py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-5xl text-accent-purple mb-6">
          <i className="fas fa-check-circle"></i>
        </div>
        <h3 className="text-2xl font-bold mb-4">Thank You!</h3>
        <p className="text-text-dim mb-8">Your message has been sent successfully. I&apos;ll get back to you soon!</p>
        <button 
          className="btn"
          onClick={onBackClick}
        >
          Back to Contact
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center mb-8">
        <button 
          className="mr-4 text-text-dim hover:text-accent-purple transition-colors duration-300"
          onClick={onBackClick}
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <h3 className="text-2xl font-bold">Get In Touch</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-text-dim mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={inputClasses}
            disabled={isSubmitting}
          />
          {errors.name && <p className={errorClasses}>{errors.name}</p>}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-text-dim mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClasses}
            disabled={isSubmitting}
          />
          {errors.email && <p className={errorClasses}>{errors.email}</p>}
        </div>
        
        <div>
          <label htmlFor="subject" className="block text-text-dim mb-2">Subject (Optional)</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={inputClasses}
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-text-dim mb-2">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className={inputClasses}
            disabled={isSubmitting}
          ></textarea>
          {errors.message && <p className={errorClasses}>{errors.message}</p>}
        </div>
        
        <button
          type="submit"
          className="btn w-full flex justify-center items-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin mr-2">
                <i className="fas fa-spinner"></i>
              </span>
              Sending...
            </>
          ) : 'Send Message'}
        </button>
      </form>
    </motion.div>
  );
}