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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      {/* Navbar */}
      <nav className="flex justify-between items-center mb-10 px-4 py-2 bg-white shadow rounded-xl max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="w-10 h-10" />
          <span className="text-xl font-semibold text-blue-600">
            DentalCare Admin
          </span>
        </div>
      </nav>

      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        All Patients
      </h2>

      <div className="max-w-md mx-auto mb-6">
        <Input
          placeholder="Search by full name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="shadow"
        />
      </div>

      {loading ? (
        <p className="text-center">Loading patients...</p>
      ) : filteredPatients.length === 0 ? (
        <p className="text-center">No matching patients found.</p>
      ) : (
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-x-auto shadow-md">
            <table className="min-w-full text-sm text-left border-spacing-4">
              <thead className="bg-blue-100 text-blue-700 border-spacing-2">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Address</th>
                  <th className="px-4 py-2">Contact</th>
                  <th className="px-4 py-2">Joined</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="border-b hover:bg-blue-50">
                    <td className="px-4 py-2">{patient.fullName}</td>
                    <td className="px-4 py-2">{patient.address}</td>
                    <td className="px-4 py-2">{patient.contact}</td>
                    <td className="px-4 py-2">
                      {new Date(patient.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      <Button
                        className="text-xs cursor-pointer"
                        onClick={() => navigate(`/visit-again/${patient.id}`)}
                      >
                        Visit Again
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AllPatients;
