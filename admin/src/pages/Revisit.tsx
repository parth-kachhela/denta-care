"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";

interface Visit {
  id: string;
  disease: string;
  diagnosis: string;
  solution: string;
  visitDate: string;
}

interface Patient {
  id: string;
  fullName: string;
  address: string;
  contact: string;
  createdAt: string;
  visits: Visit[];
}

const Revisit = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    disease: "",
    diagnosis: "",
    solution: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const { patientId } = useParams();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await axios.get(`${backendUrl}/patients/${patientId}`);
        //@ts-ignore
        setPatient(res.data);
      } catch (err) {
        console.error("Error fetching patient:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPatient();
  }, [backendUrl, patientId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${backendUrl}/visits`, {
        patientId,
        disease: formData.disease,
        diagnosis: formData.diagnosis,
        solution: formData.solution,
      });
      setSuccessMessage("Visit recorded successfully!");
      setFormData({ disease: "", diagnosis: "", solution: "" });
    } catch (err) {
      console.error("Error recording visit:", err);
    }
  };

  if (loading)
    return <p className="text-center mt-10">Loading patient info...</p>;

  if (!patient) return <p className="text-center mt-10">Patient not found.</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-4 py-2 bg-white shadow mb-6">
        <div
          className="flex items-center gap-3 cursor-pointer"
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

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">
          Patient Details
        </h2>
        <div className="grid md:grid-cols-3 gap-4 text-sm mb-6">
          <p>
            <strong>Full Name:</strong> {patient.fullName}
          </p>
          <p>
            <strong>Contact:</strong> {patient.contact}
          </p>
          <p>
            <strong>Address:</strong> {patient.address}
          </p>
        </div>

        <h3 className="text-xl font-semibold mb-2">Previous Visits</h3>
        {patient.visits.length === 0 ? (
          <p className="text-sm text-gray-500 mb-4">
            No previous visits recorded.
          </p>
        ) : (
          <ul className="space-y-3 mb-6">
            {patient.visits.map((visit) => (
              <li
                key={visit.id}
                className="bg-gray-100 p-4 rounded-md text-sm border border-gray-200"
              >
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(visit.visitDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Disease:</strong> {visit.disease}
                </p>
                <p>
                  <strong>Diagnosis:</strong> {visit.diagnosis}
                </p>
                <p>
                  <strong>Solution:</strong> {visit.solution}
                </p>
              </li>
            ))}
          </ul>
        )}

        <h3 className="text-xl font-semibold mb-2">Add New Visit</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="disease"
            placeholder="Disease"
            value={formData.disease}
            onChange={handleChange}
            required
          />
          <Input
            name="diagnosis"
            placeholder="Diagnosis"
            value={formData.diagnosis}
            onChange={handleChange}
            required
          />
          <Input
            name="solution"
            placeholder="Solution"
            value={formData.solution}
            onChange={handleChange}
            required
          />
          <Button type="submit" className="w-full">
            Submit Visit
          </Button>
          {successMessage && (
            <p className="text-green-600 text-sm mt-2 text-center">
              {successMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Revisit;
