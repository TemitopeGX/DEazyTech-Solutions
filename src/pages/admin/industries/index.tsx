import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import AdminLayout from "@/components/admin/AdminLayout";
import Link from "next/link";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import Image from "next/image";

interface Industry {
  id: number;
  name: string;
  description: string;
  image_url: string;
  expertise: string[];
  created_at: string;
}

const IndustriesManagement = () => {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchIndustries();
  }, []);

  const fetchIndustries = async () => {
    try {
      const { data, error } = await supabase
        .from("industries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setIndustries(data || []);
    } catch (error: any) {
      toast.error(error.message || "Error fetching industries");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this industry?"))
      return;

    try {
      const { error } = await supabase.from("industries").delete().eq("id", id);

      if (error) throw error;

      toast.success("Industry deleted successfully");
      setIndustries(industries.filter((industry) => industry.id !== id));
    } catch (error: any) {
      toast.error(error.message || "Error deleting industry");
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Industries Management
          </h1>
          <Link href="/admin/industries/new">
            <button className="flex items-center gap-2 bg-gradient-to-r from-[#ff096c] to-[#8a0faf] text-white py-2 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity">
              <FaPlus className="w-4 h-4" />
              Add New Industry
            </button>
          </Link>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8a0faf] mx-auto"></div>
          </div>
        ) : industries.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow">
            <p className="text-gray-600">
              No industries found. Add your first industry!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry) => (
              <div
                key={industry.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="h-48 relative">
                  <Image
                    src={
                      industry.image_url || "/images/placeholder-industry.jpg"
                    }
                    alt={industry.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-xl font-bold text-white">
                      {industry.name}
                    </h2>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {industry.description}
                  </p>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-700">
                      Areas of Expertise:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {industry.expertise.map((item, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Added on{" "}
                      {new Date(industry.created_at).toLocaleDateString()}
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/admin/industries/${industry.id}/edit`}>
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <FaEdit className="w-5 h-5" />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(industry.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <FaTrash className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default IndustriesManagement;
