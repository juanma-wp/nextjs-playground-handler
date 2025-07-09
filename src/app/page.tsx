import UserList from "./components/UserList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900">WordPress Users</h1>
            </div>
            <div className="text-sm text-gray-500">
              Powered by wordpress-playground-handler
            </div>
          </div>
        </div>
      </header>

      <main className="py-8">
        <UserList />
      </main>
    </div>
  );
}
