import { Link } from "react-router-dom";

const doctors = [
  {
    name: "Dr. Aayush Mehra",
    specialty: "Cosmetic Dentistry",
    image: "/images/aayush.png",
  },
  {
    name: "Dr. Rohan Kapoor",
    specialty: "Orthodontics",
    image: "/images/rohan.png",
  },
  {
    name: "Dr. Neha Sharma",
    specialty: "Pediatric Dentistry",
    image: "/images/neha.png",
  },
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col justify-between">
      {/* Navbar with Logo */}
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          DentCare
        </Link>
      </header>

      <main className="flex-1 py-16 px-6 md:px-20 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">
          About Us
        </h1>
        <div className="space-y-6 text-lg leading-relaxed">
          <p>
            Welcome to our dental care website, where we are dedicated to
            providing comprehensive oral health services. Our mission is to
            deliver exceptional care and create a positive dental experience for
            every patient who visits us.
          </p>
          <p>
            We offer a wide range of services — from routine check-ups and
            preventive care to cosmetic dentistry and specialized treatments.
            Our team of skilled doctors and professionals are equipped with the
            latest techniques and technologies to provide personalized and
            effective dental solutions.
          </p>
          <p>
            Our passionate team is here to guide you on your journey to a
            healthy and radiant smile. Whether you're looking for information,
            need to schedule an appointment, or want to connect with us, we make
            it easy through our user-friendly contact options.
          </p>
          <p>
            Don’t just take our word for it — our satisfied patients speak
            volumes through their heartfelt testimonials. We value their
            feedback and are honored by the trust they place in us.
          </p>
          <p>
            Join our dental care community and experience the excellence we
            bring to oral health. DentCare is more than a clinic — it’s a
            commitment to your confident smile.
          </p>
        </div>

        <h2 className="text-3xl font-bold mt-16 mb-8 text-center text-blue-600">
          Meet Our Doctors
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {doctors.map((doc, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-2xl p-4 text-center border border-gray-200 hover:shadow-lg transition"
            >
              <img
                src={doc.image}
                alt={doc.name}
                className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-blue-700">
                {doc.name}
              </h3>
              <p className="text-gray-600">{doc.specialty}</p>
            </div>
          ))}
        </div>
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

export default AboutUs;
