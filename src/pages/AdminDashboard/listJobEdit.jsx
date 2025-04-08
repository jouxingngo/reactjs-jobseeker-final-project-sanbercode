import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const ListJobEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [errors, setErrors] = useState({
    title: "",
    job_description: "",
    job_qualification: "",
    salary_min: "",
    salary_max: "",
    company_name: "",
    company_city: "",
    company_image_url: "",
  });

  const [formData, setFormData] = useState({
    title: "",
    job_description: "",
    job_qualification: "",
    job_status: 1,
    salary_min: "",
    salary_max: "",
    job_type: "Remote",
    job_tenure: "Full-time",
    company_name: "",
    company_city: "",
    company_image_url: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://final-project-api-alpha.vercel.app/api/jobs/${id}`
        );
        setFormData(response.data);
      } catch (error) {
        console.error("Error Fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(name, value);

    setErrors((prevErrors) => {
      let newErrors = { ...prevErrors };

      if (name === "title") {
        newErrors.title =
          value.trim() === "" ? "Judul pekerjaan tidak boleh kosong" : "";
      } else if (name === "job_description") {
        newErrors.job_description =
          value.trim() === "" ? "Deskripsi pekerjaan tidak boleh kosong" : "";
      } else if (name === "job_qualification") {
        newErrors.job_qualification =
          value.trim() === "" ? "Kualifikasi pekerjaan tidak boleh kosong" : "";
      } else if (name === "salary_min") {
        newErrors.salary_min =
          value.trim() === "" ? "Gaji minimal tidak boleh kosong" : "";
      } else if (name === "salary_max") {
        newErrors.salary_max =
          value.trim() === "" ? "Gaji maksimal tidak boleh kosong" : "";
      } else if (name === "company_name") {
        newErrors.company_name =
          value.trim() === "" ? "Nama perusahaan tidak boleh kosong" : "";
      } else if (name === "company_city") {
        newErrors.company_city =
          value.trim() === "" ? "Kota perusahaan tidak boleh kosong" : "";
      }

      return newErrors;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("token");
      await axios.put(
        `https://final-project-api-alpha.vercel.app/api/jobs/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/dashboard/list-job-vacancy");
    } catch (error) {
      console.error(
        "Gagal mengedit data:",
        error.response?.data || error.message
      );
      console.log("Form Data yang dikirim:", formData);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">
        Edit Data Pekerjaan
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Judul Pekerjaan
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-2">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Deskripsi Pekerjaan
          </label>
          <textarea
            name="job_description"
            value={formData.job_description}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            rows="4"
            required
          />
          {errors.job_description && (
            <p className="text-red-500 text-xs mt-2">
              {errors.job_description}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Kualifikasi Pekerjaan
          </label>
          <input
            type="text"
            name="job_qualification"
            value={formData.job_qualification}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
          {errors.job_qualification && (
            <p className="text-red-500 text-xs mt-2">
              {errors.job_qualification}
            </p>
          )}
        </div>

        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Gaji Min
            </label>
            <input
              type="number"
              name="salary_min"
              value={formData.salary_min}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {errors.salary_min && (
              <p className="text-red-500 text-xs mt-2">{errors.salary_min}</p>
            )}
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Gaji Max
            </label>
            <input
              type="number"
              name="salary_max"
              value={formData.salary_max}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {errors.salary_max && (
              <p className="text-red-500 text-xs mt-2">{errors.salary_max}</p>
            )}
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="w-1/3">
            <label className="block text-sm font-medium text-gray-700">
              Jenis Pekerjaan
            </label>
            <select
              name="job_type"
              value={formData.job_type}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Remote">Remote</option>
              <option value="On-site">On-site</option>
            </select>
          </div>

          <div className="w-1/3">
            <label className="block text-sm font-medium text-gray-700">
              Tenure Pekerjaan
            </label>
            <select
              name="job_tenure"
              value={formData.job_tenure}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
            </select>
          </div>

          <div className="w-1/3">
            <label className="block text-sm font-medium text-gray-700">
              Status Lowongan
            </label>
            <select
              name="job_status"
              value={formData.job_status}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={1}>Dibuka</option>
              <option value={0}>Ditutup</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nama Perusahaan
          </label>
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
          {errors.company_name && (
            <p className="text-red-500 text-xs mt-2">{errors.company_name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Kota Perusahaan
          </label>
          <input
            type="text"
            name="company_city"
            value={formData.company_city}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
          {errors.company_city && (
            <p className="text-red-500 text-xs mt-2">{errors.company_city}</p>
          )}
        </div>

        <div className="flex  space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              URL Gambar Perusahaan
            </label>
            <input
              type="url"
              name="company_image_url"
              value={formData.company_image_url}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {errors.company_image_url && (
              <p className="text-red-500 text-xs mt-2">
                {errors.company_image_url}
              </p>
            )}
          </div>

          {/* Menampilkan gambar jika URL valid */}
          {formData.company_image_url && !errors.company_image_url && (
            <div className="flex-1">
              <img
                src={formData.company_image_url}
                alt="Gambar Perusahaan"
                className="h-auto rounded-lg"
                style={{ width: "100%" }}
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
};

export default ListJobEdit;
