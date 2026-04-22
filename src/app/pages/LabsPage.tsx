import { Microscope, Beaker, Cpu, BookOpen, Trophy, Coffee, MapPin, Smartphone } from "lucide-react";

export function LabsPage() {
  return (
    <div className="bg-white">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-[#006B3F] to-[#004d2d] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Labs & Facilities
          </h1>
          <p className="text-xl text-[#C8A951]">State-of-the-art infrastructure for holistic development</p>
        </div>
      </section>

      {/* Laboratory Facilities */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#006B3F] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Laboratory Facilities
          </h2>
          <div className="w-20 h-1 bg-[#C8A951] mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Physics Lab */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-[#006B3F] to-[#004d2d] flex items-center justify-center">
                <Microscope className="w-24 h-24 text-white opacity-75" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#006B3F] mb-4">Physics Laboratory</h3>
                <p className="text-gray-600 mb-4">Fully equipped physics lab with modern apparatus for practical demonstrations and experiments.</p>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Equipment Available:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li>Oscilloscope, Spectrometer, Newton's Rings apparatus</li>
                    <li>Electrical measurement instruments</li>
                    <li>Mechanics and optics experiment kits</li>
                    <li>Digital multimeters and power supplies</li>
                  </ul>
                </div>

                <div className="flex items-center justify-between text-sm border-t pt-4">
                  <span className="text-gray-600">Capacity: <strong>40 students</strong></span>
                  <span className="text-gray-600">Instructor: <strong>Mr. Faisal Abbas</strong></span>
                </div>
              </div>
            </div>

            {/* Chemistry Lab */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-[#006B3F] to-[#004d2d] flex items-center justify-center">
                <Beaker className="w-24 h-24 text-white opacity-75" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#006B3F] mb-4">Chemistry Laboratory</h3>
                <p className="text-gray-600 mb-4">Well-ventilated chemistry lab with complete safety equipment and modern glassware.</p>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Equipment Available:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li>Analytical balance, pH meters, burettes</li>
                    <li>Distillation and titration apparatus</li>
                    <li>Fume hoods and safety equipment</li>
                    <li>Complete reagent and chemical stock</li>
                  </ul>
                </div>

                <div className="flex items-center justify-between text-sm border-t pt-4">
                  <span className="text-gray-600">Capacity: <strong>40 students</strong></span>
                  <span className="text-gray-600">Instructor: <strong>Ms. Rabia Noor</strong></span>
                </div>
              </div>
            </div>

            {/* Biology Lab */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-[#006B3F] to-[#004d2d] flex items-center justify-center">
                <svg className="w-24 h-24 text-white opacity-75" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#006B3F] mb-4">Biology Laboratory</h3>
                <p className="text-gray-600 mb-4">Comprehensive biology lab with microscopy facilities and preserved specimens.</p>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Equipment Available:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li>Compound and dissecting microscopes (30 units)</li>
                    <li>Prepared slides and specimen collection</li>
                    <li>Dissection kits and models</li>
                    <li>Charts and anatomical models</li>
                  </ul>
                </div>

                <div className="flex items-center justify-between text-sm border-t pt-4">
                  <span className="text-gray-600">Capacity: <strong>40 students</strong></span>
                  <span className="text-gray-600">Instructor: <strong>Dr. Sarah Malik</strong></span>
                </div>
              </div>
            </div>

            {/* Computer Lab */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-[#006B3F] to-[#004d2d] flex items-center justify-center">
                <Cpu className="w-24 h-24 text-white opacity-75" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#006B3F] mb-4">Computer Laboratory</h3>
                <p className="text-gray-600 mb-4">Modern computer lab with latest hardware and software for practical learning.</p>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Equipment Available:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li>60 Dell computers with Core i5 processors</li>
                    <li>High-speed internet (100 Mbps)</li>
                    <li>Windows, Linux, programming software</li>
                    <li>Projector and multimedia system</li>
                  </ul>
                </div>

                <div className="flex items-center justify-between text-sm border-t pt-4">
                  <span className="text-gray-600">Capacity: <strong>60 students</strong></span>
                  <span className="text-gray-600">Instructor: <strong>Mr. Adnan Malik</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Library */}
      <section className="py-16 bg-[#F8F9FA]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#006B3F] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            College Library
          </h2>
          <div className="w-20 h-1 bg-[#C8A951] mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <BookOpen className="w-16 h-16 text-[#006B3F] mb-4" />
              <h3 className="text-2xl font-bold text-[#006B3F] mb-4">Library Resources</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-3">
                  <span className="text-gray-700">Total Books:</span>
                  <span className="font-bold text-[#C8A951] text-xl">15,000+</span>
                </div>
                <div className="flex justify-between items-center border-b pb-3">
                  <span className="text-gray-700">Journals & Magazines:</span>
                  <span className="font-bold text-[#C8A951] text-xl">50+</span>
                </div>
                <div className="flex justify-between items-center border-b pb-3">
                  <span className="text-gray-700">Newspapers (Daily):</span>
                  <span className="font-bold text-[#C8A951] text-xl">8</span>
                </div>
                <div className="flex justify-between items-center border-b pb-3">
                  <span className="text-gray-700">Digital Resources:</span>
                  <span className="font-bold text-[#C8A951] text-xl">Available</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Seating Capacity:</span>
                  <span className="font-bold text-[#C8A951] text-xl">200</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-[#006B3F] mb-4">Library Timings</h3>
              <div className="space-y-3">
                <div className="bg-[#F8F9FA] p-4 rounded">
                  <p className="font-semibold text-gray-800 mb-2">Monday - Friday</p>
                  <p className="text-gray-600">8:00 AM - 5:00 PM</p>
                </div>
                <div className="bg-[#F8F9FA] p-4 rounded">
                  <p className="font-semibold text-gray-800 mb-2">Saturday</p>
                  <p className="text-gray-600">8:00 AM - 2:00 PM</p>
                </div>
                <div className="bg-[#F8F9FA] p-4 rounded">
                  <p className="font-semibold text-gray-800 mb-2">Sunday</p>
                  <p className="text-gray-600">Closed</p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-[#006B3F] text-white rounded">
                <p className="text-sm mb-1">Librarian</p>
                <p className="font-bold">Mr. Khalid Javed</p>
                <p className="text-sm mt-2">M.A. Library Science, 20 years experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sports Facilities */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#006B3F] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Sports Facilities
          </h2>
          <div className="w-20 h-1 bg-[#C8A951] mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Trophy, title: "Cricket Ground", desc: "Full-size cricket ground with proper pitch and practice nets" },
              { icon: Trophy, title: "Volleyball Court", desc: "2 professional volleyball courts with floodlights" },
              { icon: Trophy, title: "Badminton Courts", desc: "4 indoor badminton courts in sports complex" },
              { icon: Trophy, title: "Table Tennis", desc: "6 table tennis tables in indoor games room" },
              { icon: Trophy, title: "Football Field", desc: "Standard football field for matches and practice" },
              { icon: Trophy, title: "Athletics Track", desc: "400m running track around the football field" },
            ].map((facility, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center">
                <facility.icon className="w-12 h-12 mx-auto mb-4 text-[#C8A951]" />
                <h3 className="text-xl font-bold text-[#006B3F] mb-2">{facility.title}</h3>
                <p className="text-gray-600 text-sm">{facility.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Facilities */}
      <section className="py-16 bg-[#F8F9FA]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#006B3F] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Other Facilities
          </h2>
          <div className="w-20 h-1 bg-[#C8A951] mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, title: "Seminar Hall", desc: "AC hall with 500 seating capacity, projector, and sound system" },
              { icon: MapPin, title: "Parking Area", desc: "Spacious parking for 200+ vehicles with security" },
              { icon: Coffee, title: "Canteen", desc: "Hygienic canteen serving affordable meals and snacks" },
              { icon: Smartphone, title: "Prayer Area", desc: "Separate prayer rooms for male and female students" },
              { icon: Trophy, title: "Medical Room", desc: "First-aid facility with qualified medical staff" },
              { icon: Cpu, title: "CCTV Surveillance", desc: "24/7 security monitoring across campus" },
              { icon: BookOpen, title: "Common Rooms", desc: "Separate common rooms for boys and girls" },
              { icon: MapPin, title: "Green Spaces", desc: "Well-maintained lawns and garden areas" },
            ].map((facility, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <facility.icon className="w-10 h-10 mb-3 text-[#006B3F]" />
                <h3 className="font-bold text-[#006B3F] mb-2">{facility.title}</h3>
                <p className="text-sm text-gray-600">{facility.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
