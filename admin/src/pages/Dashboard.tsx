import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

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

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Clinic Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-1">Total Appointments</h3>
              <p className="text-2xl font-bold text-blue-600">
                {appointments.length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-1">Doctors</h3>
              <p className="text-2xl font-bold text-blue-600">5</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-1">Clinic Location</h3>
              <p className="text-base">123 Smile Avenue, Toothville</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Appointments List</h2>
        {loading ? (
          <p>Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          <div className="grid gap-4">
            {appointments.map((appt: any, index) => (
              <Card key={index}>
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
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
