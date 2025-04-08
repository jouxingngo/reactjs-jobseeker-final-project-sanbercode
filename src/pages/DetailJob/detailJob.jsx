import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DetailJob = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://final-project-api-alpha.vercel.app/api/jobs/${id}`
        );
        setData(response.data);
      } catch (error) {
        setError("Error fetching data");
        console.error("Error Fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading)
    return <p className="text-center text-gray-500">Loading job details...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      {/* Gambar Perusahaan */}
      {data.company_image_url && (
        <div className="flex justify-center mb-4">
          <img
            src={data.company_image_url}
            alt={`${data.company_name} logo`}
            className="w-40 h-40 object-contain"
          />
        </div>
      )}

      {/* Nama Pekerjaan */}
      <h2 className="text-3xl font-bold text-center mb-2">{data.title}</h2>

      {/* Nama Perusahaan & Lokasi */}
      <p className="text-lg text-gray-700 text-center mb-4">
        <strong>{data.company_name}</strong> - {data.company_city}
      </p>

      {/* Detail Pekerjaan */}
      <div className="border-t border-gray-200 py-4 text-gray-600">
        <p>
          <strong>Salary:</strong> Rp {data.salary_min.toLocaleString()} - Rp{" "}
          {data.salary_max.toLocaleString()}
        </p>
        <p>
          <strong>Job Type:</strong> {data.job_type}
        </p>
        <p>
          <strong>Tenure:</strong> {data.job_tenure}
        </p>
        <p>
          <strong>Status:</strong> {data.job_status === 1 ? "Open" : "Closed"}
        </p>
      </div>

      {/* Deskripsi Pekerjaan */}
      <div className="mt-4">
        <h3 className="text-xl font-semibold">Job Description:</h3>
        <p className="text-gray-800 leading-relaxed">{data.job_description}</p>
      </div>

      {/* Kualifikasi Pekerjaan */}
      <div className="mt-4">
        <h3 className="text-xl font-semibold">Qualifications:</h3>
        <p className="text-gray-800 leading-relaxed">
          {data.job_qualification}
        </p>
      </div>
    </div>
  );
};

export default DetailJob;
