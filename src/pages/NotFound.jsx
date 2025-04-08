import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-lg text-gray-600 mt-2">
        Halaman yang kamu cari tidak ditemukan.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default NotFound;
