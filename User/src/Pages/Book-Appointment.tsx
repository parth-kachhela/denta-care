import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "@/custom-calendar.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Footer from "@/components/ui/Footer";

// Dummy data
const blockedDates = ["2025-08-15", "2025-08-20"];
const appointmentsPerDay: Record<string, number> = {
  "2025-08-10": 5,
  "2025-08-12": 20,
  "2025-08-14": 30,
  "2025-08-17": 25,
};

const BookAppointment = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    helpWith: "",
    message: "",
    date: "", // selected from calendar
    time: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const today = new Date();

  // Get YYYY-MM-DD from Date
  const getDateString = (date: Date): string =>
    date.toISOString().split("T")[0];

  const isSunday = (date: Date) => date.getDay() === 0;

  // Class assignment for each tile
  const getTileClass = ({ date }: { date: Date }) => {
    const d = getDateString(date);
    if (
      blockedDates.includes(d) ||
      isSunday(date) ||
      appointmentsPerDay[d] >= 30
    ) {
      return "bg-red-500 text-white rounded-lg";
    } else if (appointmentsPerDay[d] >= 20) {
      return "bg-orange-400 text-white rounded-lg";
    } else {
      return "bg-green-500 text-white rounded-lg";
    }
  };

  const handleDateSelect = (date: Date) => {
    const d = getDateString(date);
    if (
      blockedDates.includes(d) ||
      isSunday(date) ||
      (appointmentsPerDay[d] || 0) >= 30
    ) {
      setError("This date is not available. Please choose another.");
      setFormData((prev) => ({ ...prev, date: "" }));
    } else {
      setError("");
      setFormData((prev) => ({ ...prev, date: d }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.date || error) return;
    setLoading(true);
    try {
      // Send data to backend here
      alert("Appointment sent! We'll contact you soon.");
      navigate("/");
    } catch (err) {
      console.error("Submit failed:", err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col justify-between">
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          DentCare
        </Link>
      </header>

      <main className="flex-1 py-10 px-6 md:px-16">
        <h1 className="text-3xl font-bold text-center mb-10">
          Book an Appointment
        </h1>

        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8"
        >
          {/* Left side – form */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <Input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
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
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Help With
              </label>
              <Input
                type="text"
                name="helpWith"
                value={formData.helpWith}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Select Time Slot
              </label>
              {!formData.date ? (
                <p className="text-gray-500 text-sm">
                  Please select a date first
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "9:00–10:00",
                    "10:00–11:00",
                    "11:00–12:00",
                    "12:00–1:00",
                    "3:00–4:00",
                    "4:00-5:00",
                  ].map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, time: slot }))
                      }
                      className={`border rounded-md px-3 py-2 text-sm font-medium ${
                        formData.time === slot
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right side – calendar */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Select Appointment Date
            </label>
            <Calendar
              minDate={today}
              onClickDay={handleDateSelect}
              tileClassName={getTileClass}
              //calendarType="US"
            />

            {formData.date && (
              <p className="mt-2 text-green-600 font-medium">
                Selected: {formData.date}
              </p>
            )}

            {error && (
              <p className="text-red-600 font-semibold mt-2">{error}</p>
            )}
          </div>

          <div className="col-span-2">
            <Button
              type="submit"
              className="w-full text-lg flex items-center justify-center gap-2 mt-6"
              disabled={loading || !!error || !formData.date}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5" />
                  Submitting...
                </>
              ) : (
                "Submit Appointment"
              )}
            </Button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default BookAppointment;
