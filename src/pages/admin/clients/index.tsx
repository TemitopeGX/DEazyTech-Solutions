import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/admin/AdminLayout";
import Image from "next/image";
import Link from "next/link";
import { HiPencil, HiTrash, HiPlus, HiSearch } from "react-icons/hi";
import { toast } from "react-hot-toast";
import {
  Client,
  getAllClients,
  deleteClient,
} from "@/lib/services/clientService";
import { formatDate } from "@/lib/utils";

const ClientsPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState<Client[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "client" | "partner">("all");

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const allClients = await getAllClients();
      setClients(allClients);
    } catch (error) {
      console.error("Error fetching clients:", error);
      toast.error("Failed to fetch clients");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this client?")) {
      return;
    }

    try {
      await deleteClient(id);
      toast.success("Client deleted successfully");
      fetchClients();
    } catch (error) {
      console.error("Error deleting client:", error);
      toast.error("Failed to delete client");
    }
  };

  const filteredClients = clients.filter((client) => {
    const matchesSearch = client.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || client.category === filter;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#8a0faf]"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Clients & Partners
            </h1>
            <p className="mt-1 text-gray-600">
              Manage your client and partner logos
            </p>
          </div>
          <Link
            href="/admin/clients/add"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#ff096c] to-[#8a0faf] rounded-lg hover:opacity-90"
          >
            <HiPlus className="w-5 h-5 mr-2" />
            Add Client/Partner
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative max-w-md flex-1">
            <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8a0faf] focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            {["all", "client", "partner"].map((option) => (
              <button
                key={option}
                onClick={() =>
                  setFilter(option as "all" | "client" | "partner")
                }
                className={`px-4 py-2 text-sm font-medium rounded-lg ${
                  filter === option
                    ? "bg-gradient-to-r from-[#ff096c] to-[#8a0faf] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-50 relative">
                <Image
                  src={client.logo}
                  alt={client.name}
                  fill
                  className="object-contain p-4"
                />
              </div>
              <div className="p-4">
                <div className="mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {client.name}
                  </h3>
                  <a
                    href={client.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#ff096c] hover:text-[#8a0faf]"
                  >
                    Visit Website
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {client.category.charAt(0).toUpperCase() +
                      client.category.slice(1)}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => router.push(`/admin/clients/${client.id}`)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <HiPencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(client.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <HiTrash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Added {formatDate(client.created_at)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No clients or partners found</p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="mt-2 text-[#ff096c] hover:text-[#8a0faf]"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ClientsPage;
