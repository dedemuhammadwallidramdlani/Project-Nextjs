import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        {/* Form login */}
        <Link 
          href="/dashboard" 
          className="block w-full bg-blue-600 text-white py-2 px-4 rounded text-center mt-4 hover:bg-blue-700"
        >
          Login
        </Link>
      </div>
    </div>
  );
}