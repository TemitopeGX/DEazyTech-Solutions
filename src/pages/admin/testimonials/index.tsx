import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/admin/AdminLayout";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { HiPencil, HiTrash, HiPlus } from "react-icons/hi";
import { toast } from "react-hot-toast";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
  created_at: string;
}

const TestimonialsPage = () => {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const q = query(
        collection(db, "testimonials"),
        orderBy("created_at", "desc")
      );
      const querySnapshot = await getDocs(q);
      const testimonialsData = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Testimonial)
      );

      setTestimonials(testimonialsData);
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
      await deleteDoc(doc(db, "testimonials", id));
      setTestimonials(
        testimonials.filter((testimonial) => testimonial.id !== id)
      );
      toast.success("Testimonial deleted successfully");
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      toast.error("Failed to delete testimonial");
    }
  };

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

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={testimonial.image || "/images/placeholder.png"}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="mb-2">
                  <h3 className="text-lg font-medium text-gray-900">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                  {testimonial.content}
                </p>
                <div className="flex items-center justify-end space-x-2">
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
      </div>
    </AdminLayout>
  );
};

export default TestimonialsPage;
