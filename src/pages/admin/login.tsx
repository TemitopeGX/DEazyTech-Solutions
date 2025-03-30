import { useState } from "react";
import { useRouter } from "next/router";
import { Formik, Form, Field, FormikErrors, FormikTouched } from "formik";
import * as Yup from "yup";
import { supabase } from "@/lib/supabase";
import { toast } from "react-toastify";
import Image from "next/image";
import { motion } from "framer-motion";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const AdminLogin = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (values: LoginFormValues) => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      console.log("Attempting login with email:", values.email);

      // First, sign out to clear any existing sessions
      await supabase.auth.signOut();

      // Attempt to sign in
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) throw error;

      if (data.session) {
        console.log("Login successful, session obtained");

        // Set the session cookie
        const response = await fetch("/api/auth/set-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            event: "SIGNED_IN",
            session: data.session,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to set session cookie");
        }

        toast.success("Login successful!");

        // Force a hard navigation to /admin
        window.location.href = "/admin";
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-r from-[#15181e] to-[#4e10d3] flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="mx-auto mb-6 w-[200px] h-[50px] relative">
            <Image
              src="/images/logo-2.png"
              alt="DEAZY Tech Solutions"
              width={200}
              height={50}
              priority
              style={{ objectFit: "contain" }}
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Admin Login</h1>
          <p className="text-gray-600 mt-2">Sign in to manage your website</p>
        </div>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({
            errors,
            touched,
          }: {
            errors: FormikErrors<LoginFormValues>;
            touched: FormikTouched<LoginFormValues>;
          }) => (
            <Form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-[#8a0faf] focus:border-[#8a0faf]"
                  placeholder="admin@example.com"
                />
                {errors.email && touched.email && (
                  <div className="text-red-600 text-sm mt-1">
                    {errors.email}
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-[#8a0faf] focus:border-[#8a0faf]"
                  placeholder="••••••••"
                />
                {errors.password && touched.password && (
                  <div className="text-red-600 text-sm mt-1">
                    {errors.password}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#ff096c] to-[#8a0faf] text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </motion.div>
  );
};

export default AdminLogin;
