import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  getAllIndustries,
  deleteIndustry,
  Industry,
} from "@/services/industryService";
import AdminLayout from "@/components/admin/AdminLayout";
import { toast } from "react-hot-toast";

export default function IndustriesPage() {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchIndustries();
  }, []);

  const fetchIndustries = async () => {
    try {
      const data = await getAllIndustries();
      setIndustries(data);
    } catch (error) {
      console.error("Error fetching industries:", error);
      toast.error("Failed to fetch industries");
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/industries/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this industry?")) {
      try {
        await deleteIndustry(id);
        toast.success("Industry deleted successfully");
        fetchIndustries();
      } catch (error) {
        console.error("Error deleting industry:", error);
        toast.error("Failed to delete industry");
      }
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Industries</h1>
          <button
            onClick={() => router.push("/admin/industries/new")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add New Industry
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {industries.map((industry) => (
                <tr key={industry.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {industry.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">
                      {industry.description.length > 100
                        ? `${industry.description.substring(0, 100)}...`
                        : industry.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(industry.id)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(industry.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
