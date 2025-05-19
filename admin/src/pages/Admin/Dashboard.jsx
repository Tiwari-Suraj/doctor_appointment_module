import React, { useEffect } from "react";
import {
  FaUserMd,
  FaCalendarCheck,
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { getDashData } from "../../redux/slices/adminSlice";
import axios from "axios";

const AdminDashboard = () => {
  const aToken = useSelector((state) => state.admin.aToken);
  const dashData = useSelector((state) => state.admin.dashData);
  const backendUrl = useSelector((state) => state.admin.backendUrl);  
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (aToken) dispatch(getDashData());
  }, [aToken, dispatch]);

  const handleCancelAppointment = (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      dispatch(cancelAppointment(id));
    }
  };

  if (!dashData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token: aToken } }
      );
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Cancellation failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-teal-700">Admin Dashboard</h1>
      </header>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Total Doctors"
          value={dashData.doctors || 0}
          icon={<FaUserMd className="text-blue-500" size={28} />}
          color="bg-blue-100"
        />
        <StatsCard
          title="Total Appointments"
          value={dashData.appointments || 0}
          icon={<FaCalendarCheck className="text-green-500" size={28} />}
          color="bg-green-100"
        />
        <StatsCard
          title="Total Patients"
          value={dashData.patients || 0}
          icon={<FaUsers className="text-purple-500" size={28} />}
          color="bg-purple-100"
        />
      </div>

      {/* Latest Appointments */}
      <section className="bg-white rounded-lg shadow p-4 md:p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Latest Appointments
        </h2>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Fee
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dashData.latestAppointments?.map((appt) => (
                <tr key={appt._id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={appt.docData.image}
                        alt={appt.docData.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">
                          {appt.docData.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {appt.docData.speciality}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={appt.userData.image}
                        alt={appt.userData.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">
                          {appt.userData.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {appt.userData.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{formatDate(appt.slotDate)}</td>
                  <td className="px-4 py-3">{appt.slotTime}</td>
                  <td className="px-4 py-3">₹{appt.amount}</td>
                  <td className="px-4 py-3">
                    {appt.cancelled ? (
                      <StatusBadge type="cancelled" />
                    ) : appt.isCompleted ? (
                      <StatusBadge type="completed" />
                    ) : (
                      <StatusBadge type="scheduled" />
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {!appt.cancelled && !appt.isCompleted && (
                      <button
                        onClick={() => handleCancelAppointment(appt._id)}
                        className="text-red-600 hover:text-red-800 font-semibold"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile layout */}
        <div className="md:hidden divide-y divide-gray-200">
          {dashData.latestAppointments?.map((appt) => (
            <div
              key={appt._id}
              className="p-4 space-y-2 border-b last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <img
                  src={appt.docData.image}
                  alt={appt.docData.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">
                    {appt.docData.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {appt.docData.speciality}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <img
                  src={appt.userData.image}
                  alt={appt.userData.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">
                    {appt.userData.name}
                  </p>
                  <p className="text-xs text-gray-500">{appt.userData.email}</p>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-700">
                Date: {formatDate(appt.slotDate)} at {appt.slotTime}
              </p>
              <p className="text-sm text-gray-700">Fee: ₹{appt.amount}</p>
              <div>
                <StatusBadge
                  type={
                    appt.cancelled
                      ? "cancelled"
                      : appt.isCompleted
                      ? "completed"
                      : "scheduled"
                  }
                />
              </div>
              {!appt.cancelled && !appt.isCompleted && (
                <button
                  onClick={() => handleCancelAppointment(appt._id)}
                  className="text-red-600 hover:text-red-800 font-semibold mt-1"
                >
                  Cancel
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const StatsCard = ({ title, value, icon, color }) => (
  <div
    className={`${color} rounded-lg shadow p-6 flex justify-between items-center`}
  >
    <div>
      <p className="text-gray-600 font-medium">{title}</p>
      <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
    <div className="p-3 bg-white rounded-full shadow">{icon}</div>
  </div>
);

const StatusBadge = ({ type }) => {
  switch (type) {
    case "cancelled":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800">
          <FaTimesCircle className="mr-1" /> Cancelled
        </span>
      );
    case "completed":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
          <FaCheckCircle className="mr-1" /> Completed
        </span>
      );
    case "scheduled":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
          Scheduled
        </span>
      );
    default:
      return null;
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const [day, month, year] = dateString.split("_");
  const date = new Date(`${year}-${month}-${day}`);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export default AdminDashboard;
