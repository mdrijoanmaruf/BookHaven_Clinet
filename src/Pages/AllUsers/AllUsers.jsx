import React, { useEffect, useState } from "react";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/users");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched users data:", data); 
        setUsers(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Helper function to get user's display name
  const getUserDisplayName = (user) => {
    return (
      user.name ||
      user.username ||
      user.firstName ||
      user.displayName ||
      (user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : null) ||
      user.email?.split("@")[0] ||
      "Unknown User"
    );
  };

  // Helper function to get user's initials
  const getUserInitials = (user) => {
    const displayName = getUserDisplayName(user);
    if (displayName === "Unknown User") return "U";

    const nameParts = displayName.split(" ");
    if (nameParts.length >= 2) {
      return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    }
    return displayName.charAt(0).toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        All Users ({users.length})
      </h1>

      {users.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          <p className="text-xl">No users found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user._id || user.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {getUserInitials(user)}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {getUserDisplayName(user)}
                  </h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>

              <div className="space-y-2">
                {user.role && (
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-600">Role:</span>
                    <span
                      className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === "admin"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </div>
                )}

                {user.createdAt && (
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-600">Joined:</span>
                    <span className="ml-2 text-sm text-gray-800">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                )}

                {user.phone && (
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-600">Phone:</span>
                    <span className="ml-2 text-sm text-gray-800">{user.phone}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.status || "Active"}
                  </span>

                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View
                    </button>
                    <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllUsers;
