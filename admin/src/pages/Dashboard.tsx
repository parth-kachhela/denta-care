import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Appointment {
  id: string;
  fullName: string;
  mobileNumber: string;
  helpWith: string;
  message?: string;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  treatment?: Treatment[];
}

interface Treatment {
  diagnosis: string;
  treatmentGiven: string;
  notes: string;
  date: string;
}

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "pending" | "completed" | "cancelled"
  >("pending");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(`${backendUrl}/get`);
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
      await axios.put(`${backendUrl}/appointments/${id}/status`, { status });
      setAppointments((prev) =>
        prev.map((appt) => (appt.id === id ? { ...appt, status } : appt))
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const filteredAppointments = appointments.filter(
    (appt) => appt.status === activeTab
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="text-center py-4 mb-6">
        <h1 className="text-4xl font-bold text-blue-600">
          DentCare Admin Dashboard
        </h1>
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
        <p className="text-center">No appointments found in this category.</p>
      ) : (
        <div className="grid gap-4">
          {filteredAppointments.map((appt) => (
            <Card key={appt.id}>
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

                {appt.status === "pending" && (
                  <div className="flex gap-3 mt-3">
                    <Button onClick={() => updateStatus(appt.id, "completed")}>
                      Mark as Completed
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => updateStatus(appt.id, "cancelled")}
                    >
                      Cancel
                    </Button>
                  </div>
                )}

                {appt.status === "completed" && appt.treatment?.length > 0 && (
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
    </div>
  );
};

export default AdminDashboard;
