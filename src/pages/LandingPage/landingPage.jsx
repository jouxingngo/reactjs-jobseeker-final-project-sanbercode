import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobTenure, setJobTenure] = useState("");
  const [salaryMin, setSalaryMin] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "https://final-project-api-alpha.vercel.app/api/jobs"
        );
        setJobs(response.data);
        setFilteredJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs", error);
      }
    };

    fetchJobs();
  }, []);

  const filterJobs = () => {
    let result = jobs;

    if (search) {
      result = result.filter((job) =>
        job.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (jobType) {
      result = result.filter((job) => job.job_type === jobType);
    }

    if (jobTenure) {
      result = result.filter((job) => job.job_tenure === jobTenure);
    }

    if (salaryMin) {
      result = result.filter((job) => job.salary_min >= salaryMin);
    }

    setFilteredJobs(result);
  };

  useEffect(() => {
    filterJobs();
  }, [search, jobType, jobTenure, salaryMin]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-blue-950 text-white text-center py-16 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold">Temukan Pekerjaan Impianmu</h1>
        <p className="text-lg mt-3">
          Jelajahi ribuan peluang kerja sesuai minat dan keahlianmu.
        </p>
      </div>

      {/* Search & Filter Section */}
      <div className="bg-white p-6 mt-6 shadow-md rounded-lg">
        <input
          type="text"
          placeholder="Cari pekerjaan berdasarkan judul..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Pilih Job Type</option>
            <option value="Remote">Remote</option>
            <option value="On-site">On-site</option>
            <option value="Hybrid">Hybrid</option>
          </select>

          <select
            value={jobTenure}
            onChange={(e) => setJobTenure(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Pilih Tenure</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
          </select>

          <input
            type="number"
            value={salaryMin}
            onChange={(e) => setSalaryMin(e.target.value)}
            placeholder="Minimal Gaji"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Job Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredJobs.map((job) => (
          <div
            key={job._id}
            className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
          >
            <img
              src={job.company_image_url}
              alt={job.company_name}
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {job.title}
              </h2>
              <p className="text-gray-600 text-sm">{job.company_name}</p>
              <p className="text-gray-600 text-sm">{job.company_city}</p>
              <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                {job.job_description}
              </p>
              <div className="mt-4">
                <span className="text-blue-600 font-semibold">
                  {job.job_type}
                </span>
                <span className="ml-4 text-gray-600">{job.job_tenure}</span>
                <div className="mt-2">
                  <span className="font-bold">Gaji:</span> Rp {job.salary_min} -
                  Rp {job.salary_max}
                </div>
              </div>
              <Link
                to={`/list-job-vacancy/form/${job._id}`}
                state={{ job }}
                className="block text-center font-medium text-white px-4 py-2 bg-blue-500 hover:bg-blue-700 transition duration-300 rounded-md mt-4"
              >
                Lihat Detail
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
