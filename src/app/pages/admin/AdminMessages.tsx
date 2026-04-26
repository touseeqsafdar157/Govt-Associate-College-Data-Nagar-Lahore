import { useState } from "react";
import { Mail, MailOpen, Trash2, Search, CheckCircle, AlertCircle } from "lucide-react";
import { useAdmin } from "../../context/AdminContext";
import { Skeleton } from "../../components/ui/skeleton";

export function AdminMessages() {
  const { messages, deleteMessage, markMessageRead, loading } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredMessages = messages.filter(
    (m) =>
      (m.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (m.email?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (m.subject?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  const handleMarkAsRead = async (id: string) => {
    await markMessageRead(id);
  };

  const handleDelete = async (id: string) => {
    await deleteMessage(id);
    if (selectedMessage === id) {
      setSelectedMessage(null);
    }
    setDeleteId(null);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800" style={{ fontFamily: "Playfair Display, serif" }}>Contact Messages</h1>
          <p className="text-gray-500 text-sm mt-0.5">Manage messages sent from the Contact Us page</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
        {/* Messages List */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden h-full">
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006B3F] focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="overflow-y-auto flex-1">
            {loading ? (
              <div className="space-y-0">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="p-4 border-b border-gray-100 space-y-2">
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-2 w-2 rounded-full" />
                    </div>
                    <Skeleton className="h-3 w-3/4" />
                    <Skeleton className="h-2 w-1/4 mt-2" />
                  </div>
                ))}
              </div>
            ) : filteredMessages.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <p className="text-sm">No messages found.</p>
              </div>
            ) : (
              filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => {
                    setSelectedMessage(msg.id);
                    if (msg.status === "unread") handleMarkAsRead(msg.id);
                  }}
                  className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${selectedMessage === msg.id ? "bg-green-50" : "hover:bg-gray-50"}`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <h3 className={`text-sm ${msg.status === "unread" ? "font-bold text-gray-900" : "font-medium text-gray-700"}`}>
                      {msg.name}
                    </h3>
                    {msg.status === "unread" && (
                      <span className="w-2 h-2 bg-[#006B3F] rounded-full shrink-0 mt-1.5" />
                    )}
                  </div>
                  <p className={`text-xs mb-1 truncate ${msg.status === "unread" ? "font-semibold text-gray-800" : "text-gray-600"}`}>
                    {msg.subject}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-400">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Message Details */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden h-full">
          {loading ? (
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <Skeleton className="h-8 w-2/3" />
                <div className="flex gap-4">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-40" />
                </div>
                <Skeleton className="h-3 w-32" />
              </div>
              <div className="space-y-2 mt-8">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          ) : selectedMessage ? (
            (() => {
              const msg = messages.find((m) => m.id === selectedMessage);
              if (!msg) return null;
              return (
                <>
                  <div className="p-6 border-b border-gray-100 flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-2">{msg.subject}</h2>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-gray-600">
                        <span className="font-medium text-gray-800">{msg.name}</span>
                        <span className="hidden sm:inline">•</span>
                        <a href={`mailto:${msg.email}`} className="text-[#006B3F] hover:underline">{msg.email}</a>
                        {msg.phone && (
                          <>
                            <span className="hidden sm:inline">•</span>
                            <a href={`tel:${msg.phone}`} className="text-[#006B3F] hover:underline">{msg.phone}</a>
                          </>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        Received on {new Date(msg.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setDeleteId(msg.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Message"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="p-6 overflow-y-auto flex-1">
                    <div className="whitespace-pre-wrap text-gray-700 text-sm leading-relaxed">
                      {msg.message}
                    </div>
                  </div>
                </>
              );
            })()
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8">
              <MailOpen className="w-16 h-16 mb-4 opacity-20" />
              <p>Select a message to read</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3"/>
            <h3 className="font-bold text-gray-800 mb-1">Delete Message?</h3>
            <p className="text-gray-500 text-sm mb-5">Are you sure you want to delete this message? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(deleteId)} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-semibold">Delete</button>
              <button onClick={() => setDeleteId(null)} className="flex-1 border border-gray-300 py-2 rounded-lg text-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

