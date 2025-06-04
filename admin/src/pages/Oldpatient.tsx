"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface Patient {
  id: string;
  fullName: string;
  address: string;
  contact: string;
  createdAt: string;
}

const AllPatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get(`${backendUrl}/patients`);
        //@ts-ignore
        setPatients(res.data);
      } catch (err) {
        console.error("Error fetching patients:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [backendUrl]);

  const filteredPatients = patients.filter((p) =>
    p.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-4 py-2 bg-white shadow mb-6">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src="/logo.png" alt="Logo" className="w-10 h-10" />
          <span className="text-xl font-semibold text-blue-600">
            DentalCare Admin
          </span>
        </div>
        <Button variant="ghost" onClick={() => navigate("/")}>
          Back
        </Button>
      </nav>

      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        All Patients
      </h2>

      <div className="max-w-md mx-auto mb-8 px-4">
        <Input
          placeholder="Search by full name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="shadow"
        />
      </div>

      {loading ? (
        <p className="text-center text-lg text-gray-600">Loading patients...</p>
      ) : filteredPatients.length === 0 ? (
        <p className="text-center text-gray-500">No matching patients found.</p>
      ) : (
        <div className="grid gap-4 max-w-4xl mx-auto px-4 pb-10">
          {filteredPatients.map((patient) => (
            <Card
              key={patient.id}
              className="p-4 shadow-md hover:shadow-xl transition duration-300 border border-blue-100"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-blue-700 mb-1">
                    {patient.fullName}
                  </h3>
                  <p className="text-sm text-gray-600">📍 {patient.address}</p>
                  <p className="text-sm text-gray-600">📞 {patient.contact}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Joined on:{" "}
                    {new Date(patient.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Button
                  className="text-xs mt-2"
                  onClick={() => navigate(`/visit-again/${patient.id}`)}
                >
                  Visit Again
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPatients;
