import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllAppointments } from "../../redux/slices/adminSlice";

const AllAppoinment = () => {
  const aToken = useSelector((state) => state.admin.aToken);
  const appointments = useSelector((state) => state.admin.appointments);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (aToken) {
      dispatch(getAllAppointments());
      getAllAppointments();
    }
  }, [aToken, dispatch]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [day, month, year] = dateStr.split("_");
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${day} ${months[parseInt(month, 10) - 1]}, ${year}`;
  };

  const filteredAppointments = appointments?.filter((appointment) => {
    const patientName = appointment.userData?.name?.toLowerCase() || "";
    const patientEmail = appointment.userData?.email?.toLowerCase() || "";
    const searchLower = searchQuery.toLowerCase();

    const matchesSearch =
      searchQuery === "" ||
      patientName.includes(searchLower) ||
      patientEmail.includes(searchLower);

    if (!matchesSearch) return false;

    switch (selectedFilter) {
      case "upcoming":
        return !appointment.cancelled && !appointment.isCompleted;
      case "completed":
        return appointment.isCompleted;
      case "cancelled":
        return appointment.cancelled;
      default:
        return true;
    }
  });

  const getBadgeColor = (appointment) => {
    if (appointment.cancelled) return "bg-red-100 text-red-800";
    if (appointment.isCompleted) return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };

  const getStatusText = (appointment) => {
    if (appointment.cancelled) return "Cancelled";
    if (appointment.isCompleted) return "Pending";
    return "Booked";
  };

  if (!appointments || appointments.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-700">
          No appointments found
        </h2>
        <p className="text-gray-500 mt-2">
          You don't have any appointments yet
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-teal-700 mb-6">
        All Appointments
      </h1>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-3 md:space-y-0">
        <div className="flex space-x-3">
          <button
            className={`px-3 py-1 rounded ${
              selectedFilter === "all"
                ? "bg-teal-700 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setSelectedFilter("all")}
          >
            All
          </button>
          <button
            className={`px-3 py-1 rounded ${
              selectedFilter === "upcoming"
                ? "bg-teal-700 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setSelectedFilter("upcoming")}
          >
            Upcoming
          </button>

          <button
            className={`px-3 py-1 rounded ${
              selectedFilter === "cancelled"
                ? "bg-red-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setSelectedFilter("cancelled")}
          >
            Cancelled
          </button>
        </div>

        <input
          type="text"
          placeholder="Search by patient name or email"
          className="border border-gray-300 rounded px-3 py-1 w-full md:w-64"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Age
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAppointments.map((appointment, index) => (
                <tr key={appointment._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={appointment.userData?.image}
                        alt={appointment.userData?.name}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {appointment.userData?.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {appointment.userData?.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {appointment.userData?.dob
                      ? new Date().getFullYear() -
                        new Date(appointment.userData.dob).getFullYear()
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(appointment.slotDate)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {appointment.slotTime}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={appointment.docData?.image}
                        alt={appointment.docData?.name}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {appointment.docData?.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {appointment.docData?.speciality}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{appointment.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getBadgeColor(
                        appointment
                      )}`}
                    >
                      {getStatusText(appointment)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden divide-y divide-gray-200">
          {filteredAppointments.map((appointment, index) => (
            <div
              key={appointment._id}
              className="p-4 flex flex-col space-y-2 border-b last:border-b-0"
            >
              <div className="flex items-center space-x-4">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src={appointment.userData?.image}
                  alt={appointment.userData?.name}
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {appointment.userData?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {appointment.userData?.email}
                  </p>
                </div>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-600">
                  Age
                </span>
                <p className="text-sm text-gray-800">
                  {appointment.userData?.dob
                    ? new Date().getFullYear() -
                      new Date(appointment.userData.dob).getFullYear()
                    : "N/A"}
                </p>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-600">
                  Date & Time
                </span>
                <p className="text-sm text-gray-800">
                  {formatDate(appointment.slotDate)} at {appointment.slotTime}
                </p>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-600">
                  Doctor
                </span>
                <p className="text-sm text-gray-800">
                  {appointment.docData?.name}
                </p>
                <p className="text-xs text-gray-500">
                  {appointment.docData?.speciality}
                </p>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-600">
                  Fee
                </span>
                <p className="text-sm text-gray-800">₹{appointment.amount}</p>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-600">
                  Status
                </span>
                <span
                  className={`inline-block px-2 py-1 text-xs font-semibold rounded ${getBadgeColor(
                    appointment
                  )}`}
                >
                  {getStatusText(appointment)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllAppoinment;
