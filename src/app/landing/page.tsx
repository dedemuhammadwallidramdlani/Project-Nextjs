import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white py-4 shadow-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <span className="font-bold text-2xl text-blue-600">Logo</span>
          <Link 
            href="/dashboard" 
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6 max-w-3xl mx-auto leading-tight">
          Selamat Datang di <span className="text-blue-600">Aplikasi Kami</span>
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600">
          Solusi terbaik untuk kebutuhan bisnis Anda
        </p>
        <Link
          href="/dashboard"
          className="bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition inline-block"
        >
          Login untuk Memulai
        </Link>
      </section>
    </div>
  );
}