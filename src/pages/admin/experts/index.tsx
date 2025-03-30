import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { HiPencil, HiTrash, HiPlus, HiSearch } from "react-icons/hi";
import { toast } from "react-hot-toast";

interface Expert {
  id: string;
  name: string;
  role: string;
  expertise: string[];
  image: string;
  bio: string;
  experience: string;
  created_at: string;
}

const ExpertsPage = () => {
  const router = useRouter();
  const [experts, setExperts] = useState<Expert[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExpertise, setSelectedExpertise] = useState("all");

  useEffect(() => {
    fetchExperts();
  }, []);

  const fetchExperts = async () => {
    try {
      const { data, error } = await supabase
        .from("experts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setExperts(data || []);
    } catch (error) {
      console.error("Error fetching experts:", error);
      toast.error("Failed to load experts");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this expert?")) return;

    try {
      const { error } = await supabase.from("experts").delete().eq("id", id);
      if (error) throw error;

      setExperts(experts.filter((expert) => expert.id !== id));
      toast.success("Expert deleted successfully");
    } catch (error) {
      console.error("Error deleting expert:", error);
      toast.error("Failed to delete expert");
    }
  };

  const filteredExperts = experts.filter((expert) => {
    const matchesSearch =
      expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expert.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expert.bio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesExpertise =
      selectedExpertise === "all" ||
      expert.expertise.includes(selectedExpertise);
    return matchesSearch && matchesExpertise;
  });

  const expertiseList = [
    "all",
    ...new Set(experts.flatMap((expert) => expert.expertise)),
  ];

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
            <h1 className="text-2xl font-bold text-gray-900">Expert Team</h1>
            <p className="mt-1 text-gray-600">
              Manage your expert team members
            </p>
          </div>
          <Link
            href="/admin/experts/add"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#ff096c] to-[#8a0faf] rounded-lg hover:opacity-90"
          >
            <HiPlus className="w-5 h-5 mr-2" />
            Add Expert
          </Link>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search experts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8a0faf] focus:border-transparent"
            />
          </div>

          {/* Expertise Filter */}
          <select
            value={selectedExpertise}
            onChange={(e) => setSelectedExpertise(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8a0faf] focus:border-transparent"
          >
            {expertiseList.map((expertise) => (
              <option key={expertise} value={expertise}>
                {expertise.charAt(0).toUpperCase() + expertise.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Experts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperts.map((expert) => (
            <div
              key={expert.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={expert.image || "/images/placeholder.png"}
                  alt={expert.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {expert.name}
                    </h3>
                    <p className="text-sm text-gray-600">{expert.role}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {expert.expertise.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs font-medium text-[#8a0faf] bg-purple-50 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                  {expert.bio}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {expert.experience} Years Experience
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => router.push(`/admin/experts/${expert.id}`)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <HiPencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(expert.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <HiTrash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredExperts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No experts found</p>
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

export default ExpertsPage;
