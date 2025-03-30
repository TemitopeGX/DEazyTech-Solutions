import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { HiPencil, HiTrash, HiPlus, HiSearch, HiStar } from "react-icons/hi";
import { toast } from "react-hot-toast";

interface Testimonial {
  id: string;
  client_name: string;
  company: string;
  role: string;
  image: string;
  review: string;
  rating: number;
  created_at: string;
}

const TestimonialsPage = () => {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      toast.error("Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?"))
      return;

    try {
      const { error } = await supabase
        .from("testimonials")
        .delete()
        .eq("id", id);
      if (error) throw error;

      setTestimonials(
        testimonials.filter((testimonial) => testimonial.id !== id)
      );
      toast.success("Testimonial deleted successfully");
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      toast.error("Failed to delete testimonial");
    }
  };

  const filteredTestimonials = testimonials.filter((testimonial) => {
    const searchString = searchQuery.toLowerCase();
    return (
      testimonial.client_name.toLowerCase().includes(searchString) ||
      testimonial.company.toLowerCase().includes(searchString) ||
      testimonial.review.toLowerCase().includes(searchString)
    );
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
            <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
            <p className="mt-1 text-gray-600">
              Manage client testimonials and reviews
            </p>
          </div>
          <Link
            href="/admin/testimonials/add"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#ff096c] to-[#8a0faf] rounded-lg hover:opacity-90"
          >
            <HiPlus className="w-5 h-5 mr-2" />
            Add Testimonial
          </Link>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search testimonials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8a0faf] focus:border-transparent"
          />
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="relative h-12 w-12 flex-shrink-0">
                    <Image
                      src={testimonial.image || "/images/placeholder.png"}
                      alt={testimonial.client_name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900 truncate">
                      {testimonial.client_name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, index) => (
                      <HiStar
                        key={index}
                        className={`w-5 h-5 ${
                          index < testimonial.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 line-clamp-4">
                    {testimonial.review}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-end space-x-2">
                  <button
                    onClick={() =>
                      router.push(`/admin/testimonials/${testimonial.id}`)
                    }
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <HiPencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(testimonial.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <HiTrash className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTestimonials.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No testimonials found</p>
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

export default TestimonialsPage;
