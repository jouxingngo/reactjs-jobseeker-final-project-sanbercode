import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const JobList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://final-project-api-alpha.vercel.app/api/jobs/"
        );
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log("Error Fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id, name) => {
    if (
      window.confirm(
        `Apakah Anda yakin ingin menghapus data pekerjaan  "${name}"?`
      )
    ) {
      const token = Cookies.get("token");
      try {
        await axios.delete(
          `https://final-project-api-alpha.vercel.app/api/jobs/${id}`,
          { headers: { Authorization: "Bearer " + Cookies.get("token") } }
        );
        setData((prevData) => prevData.filter((job) => job._id !== id));
      } catch (error) {
        console.log(
          `terjadi kesalahan saat menghapus data: ${name}, ID: ${id}`
        );
        console.log(token);
      }
    }
  };

  const isEmpty = data.length === 0;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Data Pekerjaan</h1>

      <button className="px-3 py-2 bg-blue-600 text-white font-semibold text-sm mb-3 rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400">
        <Link to={"/dashboard/list-job-vacancy/form"}>Tambah Data +</Link>
      </button>

      {loading && <div className="text-center text-gray-500">Loading...</div>}

      {isEmpty && !loading && (
        <div className="text-center text-gray-500">
          Tidak ada data pekerjaan.
        </div>
      )}

      {!loading && !isEmpty && (
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Job Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Qualification
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Salary
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((job) => (
                <tr key={job._id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 flex items-center">
                    <img
                      src={job.company_image_url}
                      alt={job.company_name}
                      className="w-8 h-8 rounded-full mr-3"
                    />
                    <span>{job.company_name}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {job.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {job.job_description}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {job.job_qualification}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(job.salary_min)}{" "}
                    -{" "}
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(job.salary_max)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {job.company_city}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {job.job_type}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {job.job_status === 1 ? "Open" : "Closed"}
                  </td>
                  <td className="px-6  py-4">
                    <button className="font-medium text-sm mb-1 text-white px-4 py-2 bg-blue-500 hover:bg-blue-600 transition duration-300 rounded-md">
                      <Link
                        to={`/list-job-vacancy/form/${job._id}`}
                        state={{ job }}
                      >
                        Detail
                      </Link>
                    </button>
                    <button
                      onClick={() => handleDelete(job._id, job.title)}
                      className="font-medium mb-1 text-sm text-white px-4 py-2 bg-red-500 hover:bg-red-600 transition duration-300 rounded-md"
                    >
                      Hapus
                    </button>
                    <button className="font-medium text-sm mb-1 text-white px-4 py-2 bg-yellow-500 hover:bg-yellow-600 transition duration-300 rounded-md">
                      <Link
                        to={`/list-job-vacancy/edit/${job._id}`}
                        state={{ job }}
                      >
                        Edit
                      </Link>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default JobList;
