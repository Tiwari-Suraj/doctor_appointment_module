import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDashdata } from "../../redux/slices/doctorSlice";

const DoctorDashboard = () => {
  const dToken = useSelector((state) => state.doctor.dToken);
  const dashData = useSelector((state) => state.doctor.dashData);

  const dispatch = useDispatch();

  useEffect(() => {
    if (dToken) {
      dispatch(getDashdata());
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

  const getStatusColor = (status) => {
    if (status.cancelled) return "bg-red-100 text-red-800";
    if (status.isCompleted) return "bg-green-100 text-green-800";
    return "bg-blue-100 text-blue-800";
  };

  const getStatusText = (status) => {
    if (status.cancelled) return "Cancelled";
    if (status.isCompleted) return "Completed";
    return "Confirmed";
  };

  if (!dashData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-teal-700"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-teal-700 mb-2">Dashboard</h1>
        <p className="text-gray-600 mb-6">
          Welcome back! Here's your practice overview.
        </p>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <DashboardCard
            title="Total Earnings"
            value={`₹${dashData.earnings}`}
            color="green"
          />
          <DashboardCard
            title="Total Appointments"
            value={dashData.appointments}
            color="blue"
          />
          <DashboardCard
            title="Total Patients"
            value={dashData.patients}
            color="purple"
          />
        </div>

        {/* Latest Appointments */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Latest Appointments
            </h2>
            <p className="text-gray-600 text-sm">Recent bookings and updates</p>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {dashData.latestAppointments?.map((a) => (
                  <tr key={a._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-teal-700">
                      {a.userData.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {formatDate(a.slotDate)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {a.slotTime}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(
                          a
                        )}`}
                      >
                        {getStatusText(a)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile List */}
          <div className="md:hidden divide-y divide-gray-200">
            {dashData.latestAppointments?.map((a) => (
              <div key={a._id} className="p-4">
                <div className="font-semibold text-teal-700">
                  {a.userData.name}
                </div>
                <div className="text-sm text-gray-600">
                  {formatDate(a.slotDate)} at {a.slotTime}
                </div>
                <span
                  className={`mt-2 inline-block text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(
                    a
                  )}`}
                >
                  {getStatusText(a)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value, color }) => {
  const colorMap = {
    green: "border-green-500 bg-green-100 text-green-600",
    blue: "border-blue-500 bg-blue-100 text-blue-600",
    purple: "border-purple-500 bg-purple-100 text-purple-600",
  };

  return (
    <div
      className="bg-white p-6 rounded-lg shadow border-l-4"
      style={{ borderColor: colorMap[color]?.split(" ")[0] }}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
        <div className={`p-2 rounded-full ${colorMap[color]}`}>
          <div className="w-6 h-6 rounded-full bg-current opacity-60"></div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
