import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, AlertCircle } from "lucide-react";
import { toast } from "react-hot-toast";
import { expertsApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import DashboardLayout from "@/components/layouts/DashboardLayout";

interface Expert {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  specialties: string[];
  social_links: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

const ExpertsPage = () => {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteExpertId, setDeleteExpertId] = useState<number | null>(null);

  useEffect(() => {
    fetchExperts();
  }, []);

  const fetchExperts = async () => {
    try {
      const response = await expertsApi.getAll();
      console.log("Fetched experts response:", response);
      setExperts(response.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching experts:", error);
      toast.error("Failed to fetch experts");
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteExpertId) return;

    try {
      await expertsApi.delete(deleteExpertId);
      toast.success("Expert deleted successfully");
      fetchExperts();
    } catch (error) {
      console.error("Error deleting expert:", error);
      toast.error("Failed to delete expert");
    } finally {
      setDeleteExpertId(null);
    }
  };

  return (
    <DashboardLayout>
      <Head>
        <title>Manage Experts - DEAZY Tech Solutions Dashboard</title>
      </Head>

      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Experts</h1>
            <p className="text-gray-600 mt-1">
              Add, edit, or remove team experts and their profiles.
            </p>
          </div>
          <Link href="/dashboard_deazytech/experts/new">
            <Button className="bg-gradient-to-r from-[#ff096c] to-[#8a0faf] text-white">
              <Plus className="h-5 w-5 mr-2" />
              Add New Expert
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading experts...</div>
        ) : experts.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <div className="flex justify-center mb-4">
              <AlertCircle className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Experts Found
            </h3>
            <p className="text-gray-600 mb-6">
              Start by adding your first team expert.
            </p>
            <Link href="/dashboard_deazytech/experts/new">
              <Button className="bg-gradient-to-r from-[#ff096c] to-[#8a0faf] text-white">
                <Plus className="h-5 w-5 mr-2" />
                Add New Expert
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experts.map((expert) => (
              <motion.div
                key={expert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
              >
                <div className="relative h-48">
                  {expert.image ? (
                    <Image
                      src={`http://localhost:8000/storage/${expert.image}`}
                      alt={expert.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {expert.name}
                  </h3>
                  <p className="text-[#8a0faf] font-medium mb-3">
                    {expert.role}
                  </p>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {expert.bio}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {expert.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/dashboard_deazytech/experts/edit/${expert.id}`}
                      className="flex-1"
                    >
                      <Button
                        variant="outline"
                        className="w-full border-gray-200 hover:bg-gray-50"
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={() => setDeleteExpertId(expert.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AlertDialog
        open={!!deleteExpertId}
        onOpenChange={() => setDeleteExpertId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              expert profile and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default ExpertsPage;
