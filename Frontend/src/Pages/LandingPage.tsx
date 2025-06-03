import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Smile, PhoneCall, Users, Stethoscope } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="bg-blue-100 py-20 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to DentCare
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-6">
          We offer a wide range of services delivered by a team of skilled
          doctors and professionals to ensure your optimal oral health and
          confident smile.
        </p>
        <Button
          className="text-lg cursor-pointer"
          onClick={() => {
            navigate("/book");
          }}
        >
          Book Appointment
        </Button>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 md:px-16 bg-white">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-4">
              Comprehensive Dental Services
            </h2>
            <p className="mb-4">
              From routine check-ups and preventive care to cosmetic dentistry
              and specialized treatments, our team is equipped with the latest
              technologies to deliver personalized and effective care.
            </p>
            <p>
              We create a welcoming environment and are committed to making
              every dental visit a positive experience.
            </p>
            <Button
              className="mt-4 text-sm cursor-pointer"
              onClick={() => {
                navigate("/about");
              }}
            >
              About Us
            </Button>
          </div>
          <img
            src="/images/team.png"
            alt="Dental Team"
            className="rounded-2xl shadow-md w-full"
          />
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-100 py-16 px-6 md:px-16 text-center">
        <h2 className="text-3xl font-semibold mb-10">Our Services</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="flex flex-col items-center p-6">
              <Stethoscope className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-lg font-medium mb-2">Routine Check-ups</h3>
              <p className="text-sm">
                Ensure your oral health is on track with regular dental visits.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-6">
              <Smile className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-lg font-medium mb-2">Cosmetic Dentistry</h3>
              <p className="text-sm">
                Enhance your smile with our range of cosmetic treatments.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-6">
              <Users className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-lg font-medium mb-2">Expert Doctors</h3>
              <p className="text-sm">
                A skilled team providing modern, caring treatment options.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-6">
              <PhoneCall className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-lg font-medium mb-2">Consult Experts</h3>
              <p className="text-sm">
                Speak with professionals for tailored dental care advice.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6 md:px-16 bg-white">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Patient Testimonials
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <p className="italic">
                "DentCare gave me the best experience. The staff is incredibly
                kind and professional!"
              </p>
              <p className="font-semibold mt-4">— Sarah M.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="italic">
                "Highly recommend their cosmetic dentistry services. My smile
                has never looked better!"
              </p>
              <p className="font-semibold mt-4">— James L.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-blue-50 py-16 px-6 md:px-16 text-center">
        <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
        <p className="mb-6 max-w-xl mx-auto">
          Have questions or need to schedule an appointment? Use our contact
          form and our team will assist you shortly.
        </p>
        <Button
          className="text-lg cursor-pointer"
          onClick={() => {
            navigate("/contect");
          }}
        >
          Go to Contact Form
        </Button>
      </section>
    </div>
  );
};

export default LandingPage;
