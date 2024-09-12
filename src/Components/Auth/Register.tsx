import { Link } from "react-router-dom";
import Heading from "../Global/Heading";
import Input from "../Global/Input";
import Select from "../Global/Select";
import Layout from "../Onboarding/Layout";
import { useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";

const Register = () => {
  const { register } = useAuth(); // Your custom hook for handling registration

  // Options for role and gender
  const role = [
    { value: "developer", label: "Developer" },
    { value: "graphics designer", label: "Graphics Designer" },
    { value: "ui designer", label: "UI Designer" },
    { value: "ux writer", label: "UX Writer" },
    { value: "copywriter", label: "Copy Writer" },
    { value: "others", label: "Others" },
  ];

  const gender = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "LGBTQ", label: "LGBTQ" },
  ];

  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    role: "",
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation logic
    if (!form.name) {
      toast.error("Tech name is required!");
    } else if (!form.email) {
      toast.error("Email is required!");
    } else if (!form.gender) {
      toast.error("Gender is required!");
    } else if (!form.role) {
      toast.error("Niche is required!");
    } else if (!form.password) {
      toast.error("Password is required!");
    } else if (form.password.length < 8) {
      toast.error("Password must have a minimum of 8 characters!");
    } else {
      toast.promise(
        register(form.email, form.password, form.name, form.role, form.gender), // Assuming this returns a promise
        {
          loading: "Creating account...",
          success: `Welcome, ${form.name}!`,
          error: "Failed to create account. Please try again.",
        }
      );
    }
  };

  return (
    <Layout>
      <div className="main my-6">
        <Heading
          title="Create an Account"
          subtitle="To contribute to the community, sign up first!"
        />

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full md:w-[480px] mx-auto bg-light border border-line p-4 rounded-2xl shadow-lg my-6"
        >
          {/* Tech Name Input */}
          <Input
            id="name"
            label="Tech Name"
            type="text"
            placeholder="Enter your tech name..."
            bg_color="bg-secondary"
            value={form.name}
            onChange={handleChange}
          />

          {/* Email Input */}
          <Input
            id="email"
            label="E-mail Address"
            type="email"
            placeholder="Enter your e-mail address..."
            bg_color="bg-secondary"
            value={form.email}
            onChange={handleChange}
          />

          {/* Gender Select */}
          <Select
            id="gender"
            label="Select Gender"
            options={gender}
            bg_color="bg-secondary"
            value={form.gender}
            onChange={handleChange}
          />

          {/* Role Select */}
          <Select
            id="role"
            label="Select Your Niche"
            options={role}
            bg_color="bg-secondary"
            value={form.role}
            onChange={handleChange}
          />

          {/* Password Input */}
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="> 7 characters"
            bg_color="bg-secondary"
            value={form.password}
            onChange={handleChange}
          />

          {/* Submit Button */}
          <button type="submit" className="btn-primary h-10 rounded-lg">
            Register
          </button>

          {/* Link to login page */}
          <p className="text-sm text-center font-medium text-sub">
            Already have an account?{" "}
            <Link to="/login" className="text-main font-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
