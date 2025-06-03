import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    helpWith: "",
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
    console.log("Appointment Submitted:", formData);
    // Here you would send the form data to the backend
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col justify-between">
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          DentCare
        </Link>
      </header>

      <main className="flex-1 py-16 px-6 md:px-16">
        <h1 className="text-3xl font-bold text-center mb-10">
          Book an Appointment
        </h1>
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <Input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Mobile Number
            </label>
            <Input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              What can we help you with?
            </label>
            <Input
              type="text"
              name="helpWith"
              value={formData.helpWith}
              onChange={handleChange}
              placeholder="Describe your concern or service needed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Anything you want to tell us?
            </label>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Share any additional details"
              rows={4}
            />
          </div>
          <Button type="submit" className="w-full text-lg cursor-pointer">
            Submit Appointment
          </Button>
        </form>
      </main>

      <footer className="bg-blue-100 py-8 px-6 text-center text-sm">
        <p className="font-semibold text-lg mb-2">DentCare</p>
        <p>123 Smile Avenue, Toothville, CA 94000</p>
        <p>Email: contact@dentcare.com | Phone: (123) 456-7890</p>
        <p className="mt-2">© 2025 DentCare. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default BookAppointment;
