import { useState, useEffect } from "react";
import { Save, Check, Users, Trophy, Award, Music, BookOpen } from "lucide-react";
import { useAdmin } from "../../context/AdminContext";

export function AdminCampusLife() {
  const { settings, updateSettings } = useAdmin();
  const [form, setForm] = useState(settings.campusLife || {
    sportsGala: { year: "2026", highlights: [] },
    annualFunction: { year: "2026", chiefGuest: { name: "", title: "" }, highlights: [], awards: [] },
    studentSocieties: [],
    culturalEvents: [],
    studentCouncil: { year: "2026", members: [] }
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (settings.campusLife) {
      setForm(settings.campusLife);
    }
  }, [settings.campusLife]);

  const handleSave = async () => {
    await updateSettings({ ...settings, campusLife: form });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800" style={{ fontFamily: "Playfair Display, serif" }}>Campus Life Settings</h1>
          <p className="text-gray-500 text-sm mt-0.5">Manage all Campus Life and Student activities data</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-[#006B3F] hover:bg-[#003D1F] text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          {saved ? <><Check className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Changes</>}
        </button>
      </div>

      {saved && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-lg p-3 mb-5 text-sm">
          <Check className="w-4 h-4" /> Settings saved successfully!
        </div>
      )}

      <div className="space-y-6">
        {/* Student Council */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-gray-800 flex items-center gap-2"><Users className="w-4 h-4 text-[#006B3F]" /> Student Council</h2>
            <button
              onClick={() => {
                const updated = { ...form };
                updated.studentCouncil.members.push({ position: "Member", name: "", program: "" });
                setForm(updated);
              }}
              className="text-sm bg-[#006B3F] text-white px-3 py-1.5 rounded hover:bg-[#003D1F]"
            >
              Add Member
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-700 mb-1">Year</label>
            <input
              value={form.studentCouncil.year}
              onChange={e => setForm({...form, studentCouncil: {...form.studentCouncil, year: e.target.value}})}
              className="w-1/4 border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#006B3F]"
            />
          </div>
          <div className="space-y-3">
            {form.studentCouncil.members.map((member, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input placeholder="Position" value={member.position} onChange={e => { const updated = {...form}; updated.studentCouncil.members[i].position = e.target.value; setForm(updated); }} className="w-1/3 border border-gray-300 rounded px-2 py-1.5 text-sm" />
                <input placeholder="Name" value={member.name} onChange={e => { const updated = {...form}; updated.studentCouncil.members[i].name = e.target.value; setForm(updated); }} className="w-1/3 border border-gray-300 rounded px-2 py-1.5 text-sm" />
                <input placeholder="Program" value={member.program} onChange={e => { const updated = {...form}; updated.studentCouncil.members[i].program = e.target.value; setForm(updated); }} className="w-1/3 border border-gray-300 rounded px-2 py-1.5 text-sm" />
                <button onClick={() => { const updated = {...form}; updated.studentCouncil.members.splice(i, 1); setForm(updated); }} className="text-red-500 text-sm px-2">X</button>
              </div>
            ))}
          </div>
        </div>

        {/* Sports Gala */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-gray-800 flex items-center gap-2"><Trophy className="w-4 h-4 text-[#006B3F]" /> Sports Gala Highlights</h2>
            <button
              onClick={() => {
                const updated = { ...form };
                updated.sportsGala.highlights.push({ title: "New Highlight", details: [] });
                setForm(updated);
              }}
              className="text-sm bg-[#006B3F] text-white px-3 py-1.5 rounded hover:bg-[#003D1F]"
            >
              Add Highlight
            </button>
          </div>
          <div className="space-y-4">
            {form.sportsGala.highlights.map((hlt, i) => (
              <div key={i} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <input value={hlt.title} onChange={e => { const updated = {...form}; updated.sportsGala.highlights[i].title = e.target.value; setForm(updated); }} className="font-bold border border-gray-300 rounded px-2 py-1 text-sm" />
                  <button onClick={() => { const updated = {...form}; updated.sportsGala.highlights.splice(i, 1); setForm(updated); }} className="text-red-500 text-sm">Remove</button>
                </div>
                <textarea
                  value={hlt.details.join('\n')}
                  onChange={e => { const updated = {...form}; updated.sportsGala.highlights[i].details = e.target.value.split('\n'); setForm(updated); }}
                  placeholder="Details (one per line)"
                  rows={2}
                  className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Annual Function */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
           <h2 className="font-bold text-gray-800 flex items-center gap-2 mb-4"><Award className="w-4 h-4 text-[#006B3F]" /> Annual Function</h2>
           <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Chief Guest Name</label>
                <input value={form.annualFunction.chiefGuest.name} onChange={e => setForm({...form, annualFunction: {...form.annualFunction, chiefGuest: {...form.annualFunction.chiefGuest, name: e.target.value}}})} className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Chief Guest Title</label>
                <input value={form.annualFunction.chiefGuest.title} onChange={e => setForm({...form, annualFunction: {...form.annualFunction, chiefGuest: {...form.annualFunction.chiefGuest, title: e.target.value}}})} className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm" />
              </div>
           </div>
           
           <div className="mb-4">
              <label className="block text-xs font-medium text-gray-700 mb-1">Highlights (One per line)</label>
              <textarea
                value={form.annualFunction.highlights.join('\n')}
                onChange={e => setForm({...form, annualFunction: {...form.annualFunction, highlights: e.target.value.split('\n')}})}
                rows={4}
                className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
              />
           </div>

           <div className="flex justify-between items-center mb-2">
            <label className="block text-xs font-medium text-gray-700">Awards Distributed</label>
            <button onClick={() => { const u = {...form}; u.annualFunction.awards.push({category:"", value:""}); setForm(u); }} className="text-xs text-[#006B3F]">Add Award</button>
           </div>
           <div className="space-y-2">
             {form.annualFunction.awards.map((awd, i) => (
                <div key={i} className="flex gap-2">
                  <input placeholder="Category" value={awd.category} onChange={e => { const u = {...form}; u.annualFunction.awards[i].category = e.target.value; setForm(u); }} className="w-1/2 border border-gray-300 rounded px-2 py-1.5 text-sm" />
                  <input placeholder="Value" value={awd.value} onChange={e => { const u = {...form}; u.annualFunction.awards[i].value = e.target.value; setForm(u); }} className="w-1/2 border border-gray-300 rounded px-2 py-1.5 text-sm" />
                  <button onClick={() => { const u = {...form}; u.annualFunction.awards.splice(i, 1); setForm(u); }} className="text-red-500 px-2">X</button>
                </div>
             ))}
           </div>
        </div>

        {/* Cultural Events */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-gray-800 flex items-center gap-2"><Music className="w-4 h-4 text-[#006B3F]" /> Cultural Events</h2>
            <button
              onClick={() => {
                const updated = { ...form };
                updated.culturalEvents.push({ event: "New Event", date: "", desc: "" });
                setForm(updated);
              }}
              className="text-sm bg-[#006B3F] text-white px-3 py-1.5 rounded hover:bg-[#003D1F]"
            >
              Add Event
            </button>
          </div>
          <div className="space-y-3">
            {form.culturalEvents.map((evt, i) => (
              <div key={i} className="p-3 border border-gray-200 rounded-lg space-y-2">
                <div className="flex gap-2">
                  <input placeholder="Event Name" value={evt.event} onChange={e => { const updated = {...form}; updated.culturalEvents[i].event = e.target.value; setForm(updated); }} className="flex-1 border border-gray-300 rounded px-2 py-1.5 text-sm" />
                  <input placeholder="Date (e.g. March 23)" value={evt.date} onChange={e => { const updated = {...form}; updated.culturalEvents[i].date = e.target.value; setForm(updated); }} className="w-1/3 border border-gray-300 rounded px-2 py-1.5 text-sm" />
                  <button onClick={() => { const updated = {...form}; updated.culturalEvents.splice(i, 1); setForm(updated); }} className="text-red-500 px-2">X</button>
                </div>
                <input placeholder="Description" value={evt.desc} onChange={e => { const updated = {...form}; updated.culturalEvents[i].desc = e.target.value; setForm(updated); }} className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm" />
              </div>
            ))}
          </div>
        </div>
        
        {/* Student Societies */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-gray-800 flex items-center gap-2"><BookOpen className="w-4 h-4 text-[#006B3F]" /> Student Societies</h2>
            <button
              onClick={() => {
                const updated = { ...form };
                updated.studentSocieties.push({ name: "New Society", desc: "", activities: [] });
                setForm(updated);
              }}
              className="text-sm bg-[#006B3F] text-white px-3 py-1.5 rounded hover:bg-[#003D1F]"
            >
              Add Society
            </button>
          </div>
          <div className="space-y-4">
            {form.studentSocieties.map((soc, i) => (
              <div key={i} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <input value={soc.name} onChange={e => { const updated = {...form}; updated.studentSocieties[i].name = e.target.value; setForm(updated); }} className="font-bold border border-gray-300 rounded px-2 py-1 text-sm" />
                  <button onClick={() => { const updated = {...form}; updated.studentSocieties.splice(i, 1); setForm(updated); }} className="text-red-500 text-sm">Remove</button>
                </div>
                <textarea
                  value={soc.desc}
                  onChange={e => { const updated = {...form}; updated.studentSocieties[i].desc = e.target.value; setForm(updated); }}
                  placeholder="Description"
                  rows={2}
                  className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm mb-2"
                />
                <textarea
                  value={soc.activities.join('\n')}
                  onChange={e => { const updated = {...form}; updated.studentSocieties[i].activities = e.target.value.split('\n'); setForm(updated); }}
                  placeholder="Activities (one per line)"
                  rows={2}
                  className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
