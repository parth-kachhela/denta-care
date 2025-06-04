import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, UserPlus, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Appointment {
  id: string;
  fullName: string;
  mobileNumber: string;
  helpWith: string;
  message?: string;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [btnLoder, setBtnLoder] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "pending" | "completed" | "cancelled"
  >("pending");
  const navitage = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(`${backendUrl}/get`);
        //@ts-ignore
        setAppointments(res.data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [backendUrl]);

  const updateStatus = async (id: string, status: Appointment["status"]) => {
    try {
      setBtnLoder(true);
      await axios.put(`${backendUrl}/appointments/${id}/status`, { status });
      setAppointments((prev) =>
        prev.map((appt) => (appt.id === id ? { ...appt, status } : appt))
      );
    } catch (err) {
      console.error("Error updating status:", err);
    } finally {
      setBtnLoder(false);
    }
  };

  const filteredAppointments = appointments.filter(
    (appt) => appt.status === activeTab
  );

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-4 hidden md:block">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">DentCare</h2>
        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full flex items-center gap-2"
            onClick={() => {
              navitage("/add");
            }}
          >
            <UserPlus className="h-4 w-4" /> New Patient
          </Button>
          <Button variant="outline" className="w-full flex items-center gap-2">
            <Users className="h-4 w-4" /> Old Patient
          </Button>
        </div>
        <div className="mt-8">
          <img
            src="/clinic.png"
            alt="Clinic"
            className="rounded-xl shadow-md"
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6">
        <header className="text-center py-4 mb-6">
          <h1 className="text-4xl font-bold text-blue-600">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage clinic activity and appointments
          </p>
        </header>

        <div className="flex gap-4 justify-center mb-6">
          <Button
            variant={activeTab === "pending" ? "default" : "outline"}
            onClick={() => setActiveTab("pending")}
          >
            Pending
          </Button>
          <Button
            variant={activeTab === "completed" ? "default" : "outline"}
            onClick={() => setActiveTab("completed")}
          >
            Completed
          </Button>
          <Button
            variant={activeTab === "cancelled" ? "default" : "outline"}
            onClick={() => setActiveTab("cancelled")}
          >
            Cancelled
          </Button>
        </div>

        {loading ? (
          <p className="text-center">Loading appointments...</p>
        ) : filteredAppointments.length === 0 ? (
          <p className="text-center text-gray-500">
            No appointments found in this category.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAppointments.map((appt) => (
              <Card key={appt.id} className="shadow-md">
                <CardContent className="p-6 space-y-2">
                  <p>
                    <strong>Name:</strong> {appt.fullName}
                  </p>
                  <p>
                    <strong>Mobile:</strong> {appt.mobileNumber}
                  </p>
                  <p>
                    <strong>Help With:</strong> {appt.helpWith}
                  </p>
                  <p>
                    <strong>Message:</strong> {appt.message || "N/A"}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(appt.createdAt).toLocaleString()}
                  </p>

                  {appt.status === "pending" && (
                    <div className="flex gap-3 mt-3">
                      <Button
                        onClick={() => updateStatus(appt.id, "completed")}
                        disabled={btnLoder}
                      >
                        {btnLoder ? (
                          <>
                            <Loader2 className="animate-spin h-5 w-5" />{" "}
                            Loading...
                          </>
                        ) : (
                          "Mark as Completed"
                        )}
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => updateStatus(appt.id, "cancelled")}
                        disabled={btnLoder}
                      >
                        {btnLoder ? (
                          <>
                            <Loader2 className="animate-spin h-5 w-5" />{" "}
                            Loading...
                          </>
                        ) : (
                          "Cancel"
                        )}
                      </Button>
                    </div>
                  )}

                  {appt.status === "completed" &&
                    appt.treatment?.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-semibold">Treatment History:</h4>
                        {appt.treatment.map((t, i) => (
                          <div key={i} className="ml-4 text-sm">
                            <p>
                              <strong>Date:</strong>{" "}
                              {new Date(t.date).toLocaleDateString()}
                            </p>
                            <p>
                              <strong>Diagnosis:</strong> {t.diagnosis}
                            </p>
                            <p>
                              <strong>Treatment:</strong> {t.treatmentGiven}
                            </p>
                            <p>
                              <strong>Notes:</strong> {t.notes}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
