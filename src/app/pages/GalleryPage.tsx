import { useState } from "react";
import { X } from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import gatePhoto from "../../imports/WhatsApp_Image_2026-04-07_at_11.52.03_AM_(1).jpeg";
import courtyardPhoto from "../../imports/WhatsApp_Image_2026-04-07_at_11.52.03_AM.jpeg";

const CATEGORIES = ["All", "Events", "Facilities", "Sports", "Academic", "Campus", "General"];

export function GalleryPage() {
  const { gallery, events } = useAdmin();
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<null | { url: string; title: string }>(null);

  // Merge admin gallery with static college photos
  const allPhotos = [
    { id: "static-1", title: "College Gate", url: gatePhoto, category: "Campus" },
    { id: "static-2", title: "College Courtyard", url: courtyardPhoto, category: "Campus" },
    ...gallery,
  ];

  const filtered = activeCategory === "All" ? allPhotos : allPhotos.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-white">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-[#003D1F] to-[#006B3F] text-white py-14 sm:py-20">
        <div className="container mx-auto px-4">
          <span className="text-[#C8A951] text-sm font-semibold uppercase tracking-widest">Memories & Moments</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2" style={{ fontFamily: "Playfair Display, serif" }}>
            Photo Gallery
          </h1>
          <p className="text-green-200 mt-2">Capturing excellence, achievement & campus life</p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-[#F8FCF9] py-6 sticky top-[60px] z-10 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 sm:px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-[#006B3F] text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-lg">No photos in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {filtered.map((photo) => (
                <div
                  key={photo.id}
                  className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer bg-gray-100 shadow-sm hover:shadow-xl transition-all"
                  onClick={() => setLightbox({ url: photo.url, title: photo.title })}
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003D1F]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <div>
                      <p className="text-white text-sm font-semibold leading-tight">{photo.title}</p>
                      <span className="text-[#C8A951] text-xs">{photo.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <div onClick={(e) => e.stopPropagation()} className="max-w-4xl max-h-[85vh] overflow-hidden rounded-xl">
            <img
              src={lightbox.url}
              alt={lightbox.title}
              className="max-w-full max-h-[80vh] object-contain"
            />
            <p className="text-white text-center mt-3 font-semibold">{lightbox.title}</p>
          </div>
        </div>
      )}

      {/* Stats Strip */}
      <section className="bg-gradient-to-r from-[#003D1F] to-[#006B3F] py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-white">
            {[
              { val: `${allPhotos.length}`, label: "Total Photos" },
              { val: `${events.length}`, label: "Events Covered" },
              { val: "5+", label: "Years Archive" },
            ].map(({ val, label }) => (
              <div key={label}>
                <p className="text-3xl font-bold text-[#C8A951]">{val}</p>
                <p className="text-green-200 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
