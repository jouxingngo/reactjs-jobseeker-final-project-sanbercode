import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
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

  return (
    <div className="min-h-full">
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard Admin
          </h1>
        </div>
      </header>
      <main>
        <Link to={"/dashboard/list-job-vacancy"}>
          <div className="mx-auto  px-4 py-6 sm:px-6 lg:px-8  gap-6">
            <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-2xl">🏢</span>
                <h2 className="text-2xl font-bold">
                  Total Pekerjaan : {data.length}
                </h2>
              </div>
              <p className="text-sm">Data Pekerjaan</p>
            </div>
          </div>
        </Link>
      </main>
    </div>
  );
};

export default AdminDashboard;
