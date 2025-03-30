import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import AdminLayout from "@/components/admin/AdminLayout";
import Link from "next/link";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import Image from "next/image";

interface Service {
  id: number;
  title: string;
  description: string;
  icon_url: string;
  features: string[];
  created_at: string;
}

const ServicesManagement = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setServices(data || []);
    } catch (error: any) {
      toast.error(error.message || "Error fetching services");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this service?"))
      return;

    try {
      const { error } = await supabase.from("services").delete().eq("id", id);

      if (error) throw error;

      toast.success("Service deleted successfully");
      setServices(services.filter((service) => service.id !== id));
    } catch (error: any) {
      toast.error(error.message || "Error deleting service");
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Services Management
          </h1>
          <Link href="/admin/services/new">
            <button className="flex items-center gap-2 bg-gradient-to-r from-[#ff096c] to-[#8a0faf] text-white py-2 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity">
              <FaPlus className="w-4 h-4" />
              Add New Service
            </button>
          </Link>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8a0faf] mx-auto"></div>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow">
            <p className="text-gray-600">
              No services found. Add your first service!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                      <Image
                        src={service.icon_url || "/images/placeholder-icon.png"}
                        alt={service.title}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {service.title}
                    </h2>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/services/${service.id}/edit`}>
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <FaEdit className="w-5 h-5" />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FaTrash className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {service.description}
                </p>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700">
                    Features:
                  </h3>
                  <ul className="space-y-1">
                    {service.features.map((feature, index) => (
                      <li
                        key={index}
                        className="text-sm text-gray-600 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-[#8a0faf] rounded-full"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 text-sm text-gray-500">
                  Added on {new Date(service.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ServicesManagement;
