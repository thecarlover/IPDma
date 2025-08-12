import React from 'react';

const UpdateReceptionistForm = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border-t-4 border-blue-400">
        <h2 className="text-2xl font-semibold text-blue-700 mb-6 text-center">
          Update Receptionist
        </h2>
        <form className="space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter full name"
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-400 focus:border-blue-400 px-4 py-2"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-400 focus:border-blue-400 px-4 py-2"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md shadow-md transition-all duration-300"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateReceptionistForm;
