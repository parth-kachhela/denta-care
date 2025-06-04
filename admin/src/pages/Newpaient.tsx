"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const NewPatient = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    contact: "",
    disease: "",
    diagnosis: "",
    solution: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");

    try {
      await axios.post(`${backendUrl}/patients`, {
        fullName: formData.fullName,
        address: formData.address,
        contact: formData.contact,
        disease: formData.disease,
        diagnosis: formData.diagnosis,
        solution: formData.solution,
      });

      setSuccessMessage("New patient added successfully!");
      setFormData({
        fullName: "",
        address: "",
        contact: "",
        disease: "",
        diagnosis: "",
        solution: "",
      });
    } catch (err) {
      console.error("Error adding new patient:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-4 py-2 bg-white shadow mb-4">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src="/logo.png" alt="Logo" className="w-10 h-10" />
          <span className="text-xl font-semibold text-blue-600">
            DentalCare Clinic
          </span>
        </div>
        <Button variant="ghost" onClick={() => navigate("/")}>
          Back
        </Button>
      </nav>

      {/* Form Section */}
      <div className="flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 text-center">
              Add New Patient
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Full Name</Label>
                <Input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label>Address</Label>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label>Contact</Label>
                <Input
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                />
              </div>
              <hr className="my-4" />
              <div>
                <Label>Disease</Label>
                <Input
                  name="disease"
                  value={formData.disease}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label>Diagnosis</Label>
                <Input
                  name="diagnosis"
                  value={formData.diagnosis}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label>Solution</Label>
                <Input
                  name="solution"
                  value={formData.solution}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                onClick={() => navigate("/")}
                className="w-full mt-4"
              >
                {loading ? "Submitting..." : "Add Patient"}
              </Button>
              {successMessage && (
                <p className="text-green-600 text-sm text-center mt-2">
                  {successMessage}
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewPatient;
