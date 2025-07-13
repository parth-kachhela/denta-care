import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/Footer";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact Form Submitted:", formData);
    // Send data to backend here
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col justify-between">
      {/* Navbar with Logo */}
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          DentCare
        </Link>
      </header>

      <main className="flex-1 py-16 px-6 md:px-20 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">
          Contact Us
        </h1>
        <p className="text-center mb-10 text-lg text-gray-600">
          Have a question or need to schedule an appointment? Send us a message
          and our team will get back to you shortly.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              rows={4}
              required
            />
          </div>
          <Button type="submit" className="w-full text-lg cursor-pointer">
            Send Message
          </Button>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default ContactUs;
