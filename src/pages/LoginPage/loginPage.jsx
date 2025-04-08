import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to={"/admin/dashboard"} />;
  }

  const { login, loading, user, errorAuth } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors((prevErrors) => {
      let newErrors = { ...prevErrors };

      if (name === "email") {
        if (!value.match(/\S+@\S+\.\S+/)) {
          newErrors.email = "Format email tidak valid";
        } else {
          newErrors.email = "";
        }
      } else if (name === "password") {
        if (value.trim() === "") {
          newErrors.password = "Password tidak boleh kosong";
        } else {
          newErrors.password = "";
        }
      }

      return newErrors;
    });

    console.log({ [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    await login(email, password);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Login
          </h2>
          <center>
            {errorAuth && <p style={{ color: "red" }}>{errorAuth}</p>}{" "}
          </center>
          {/* Menampilkan error */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="your@email.com"
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
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="••••••••"
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
              disabled={!formData.email || !formData.password}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-600">
            Belum mempunyai akun?
            <Link
              className="text-indigo-600 hover:text-indigo-500 font-medium"
              to={"/admin/register"}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
