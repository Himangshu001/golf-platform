export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-4">
        Golf Charity Platform
      </h1>

      <p className="text-gray-400 mb-6">
        Play. Win. Give Back.
      </p>

      <div className="flex gap-4">
        <a href="/login">
          <button className="bg-blue-500 px-6 py-2 rounded-lg">
            Login
          </button>
        </a>

        <a href="/signup">
          <button className="bg-green-500 px-6 py-2 rounded-lg">
            Signup
          </button>
        </a>
      </div>
    </main>
  );
}