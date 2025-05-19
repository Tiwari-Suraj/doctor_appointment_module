import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAppointments } from "../../redux/slices/doctorSlice";

const DoctorAppointments = () => {
  const dToken = useSelector((state) => state.doctor.dToken);
  const appointments = useSelector((state) => state.doctor.appointments); 
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (dToken) {
      dispatch(getAppointments());
    }
  }, [dToken, dispatch]);

  const formatDate = (dateStr) => {
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
    return `${day} ${months[parseInt(month) - 1]}, ${year}`;
  };

  const filteredAppointments = appointments?.filter((appointment) => {
    const patientName = appointment.userData.name.toLowerCase();
    const patientEmail = appointment.userData.email.toLowerCase();
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
    if (appointment.isCompleted) return "bg-green-100 text-green-800";
    if (appointment.payment) return "bg-blue-100 text-blue-800";
    return "bg-yellow-100 text-yellow-800";
  };

  const getStatusText = (appointment) => {
    if (appointment.cancelled) return "Cancelled";
    if (appointment.isCompleted) return "Completed";
    if (appointment.payment) return "Confirmed";
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
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-teal-700 mb-4">My Appointments</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={appointment.userData.image}
                        alt={appointment.userData.name}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {appointment.userData.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {appointment.userData.email}
                        </div>
                      </div>
                    </div>
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
                    <span
                      className={`px-2 inline-flex text-xs font-semibold rounded-full ${getBadgeColor(
                        appointment
                      )}`}
                    >
                      {getStatusText(appointment)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{appointment.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {!appointment.isCompleted && !appointment.cancelled && (
                      <button className="text-green-600 hover:text-green-900">
                        Complete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden divide-y divide-gray-200">
          {filteredAppointments.map((appointment) => (
            <div key={appointment._id} className="p-4 flex flex-col space-y-2">
              <div className="flex items-center space-x-4">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src={appointment.userData.image}
                  alt={appointment.userData.name}
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {appointment.userData.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {appointment.userData.email}
                  </p>
                </div>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-600">
                  Date
                </span>
                <p className="text-sm text-gray-800">
                  {formatDate(appointment.slotDate)} at {appointment.slotTime}
                </p>
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
              <div>
                <span className="block text-sm font-medium text-gray-600">
                  Fee
                </span>
                <p className="text-sm text-gray-800">₹{appointment.amount}</p>
              </div>
              <div>
                {!appointment.isCompleted && !appointment.cancelled && (
                  <button className="text-green-600 hover:text-green-900 text-sm font-medium">
                    Complete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointments;
