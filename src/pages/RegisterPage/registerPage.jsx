import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    image_url: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    image_url: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors((prevErrors) => {
      let newErrors = { ...prevErrors };
      if (name === "name") {
        if (value.trim() === "") {
          newErrors.name = "Nama tidak boleh kosong";
        } else {
          newErrors.name = "";
        }
      } else if (name === "image_url") {
        if (value.trim() === "") {
          newErrors.image_url = "Image URL tidak boleh kosong";
        } else {
          newErrors.image_url = "";
        }
      } else if (name === "email") {
        if (!value.match(/\S+@\S+\.\S+/)) {
          newErrors.email = "Format email tidak valid";
        } else {
          newErrors.email = "";
        }
      } else if (name === "password") {
        if (value.trim() === "") {
          newErrors.password = "Password tidak boleh kosong";
        } else if (value.length < 8) {
          newErrors.password = "Password harus lebih dari 8 karakter";
        } else {
          newErrors.password = "";
        }
      }
      return newErrors;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi manual saat submit
    const validationErrors = validate();
    setErrors(validationErrors);

    // Jika ada error, jangan lanjutkan
    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);
      const response = await axios.post(
        "https://final-project-api-alpha.vercel.app/api/auth/register",
        formData
      );
      // Tindakan setelah sukses
      console.log(response);
      navigate("/admin/login");
    } catch (error) {
      console.log(`Data gagal ditambahkan: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    const errors = {};

    // Validasi nama
    if (!formData.name.trim()) {
      errors.name = "Nama tidak boleh kosong";
    }

    // Validasi image_url
    if (!formData.image_url.trim()) {
      errors.image_url = "Image URL tidak boleh kosong";
    }

    // Validasi email
    if (!formData.email.match(/\S+@\S+\.\S+/)) {
      errors.email = "Format email tidak valid";
    }

    // Validasi password
    if (!formData.password.trim()) {
      errors.password = "Password tidak boleh kosong";
    } else if (formData.password.length < 8) {
      errors.password = "Password harus lebih dari 8 karakter";
    }

    return errors;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInput}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              type="text"
              name="image_url"
              value={formData.image_url}
              onChange={handleInput}
            />
            {errors.image_url && (
              <p className="text-red-500 text-sm mt-1">{errors.image_url}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInput}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInput}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors ${
              !formData.email || !formData.password
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-600">
          Belum mempunyai akun?
          <Link
            className="text-indigo-600 hover:text-indigo-500 font-medium"
            to={"/admin/login"}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
