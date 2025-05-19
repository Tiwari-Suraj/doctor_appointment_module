import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { fetchDoctors } from "../redux/slices/doctorSlice";
import { useDispatch, useSelector } from "react-redux";

function Myapoinment() {
  const backendUrl = useSelector((state) => state.user.backendUrl);
  const token = useSelector((state) => state.user.token);
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();

  const months = [
    "",
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

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error("Failed to fetch appointments");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to fetch appointments");
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        // Remove cancelled appointment from UI
        setAppointments((prev) =>
          prev.map((item) => {
            if (item._id === appointmentId) {
              return { ...item, cancelled: true };
            }
            return item;
          })
        );
        dispatch(fetchDoctors());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Cancellation failed");
    }
  };

  const handlePayOnline = () => {
    toast.error("They are dummy use");
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My Appointments
      </p>
      <div>
        {appointments.length > 0 ? (
          appointments.map((item, index) => (
            <div
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
              key={index}
            >
              <div>
                <img
                  className="w-32 bg-indigo-50"
                  src={item.docData?.image || ""}
                  alt={item.docData?.name || "Doctor"}
                />
              </div>
              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">
                  {item.docData?.name || "No name"}
                </p>
                <p>{item.docData?.speciality || "No speciality"}</p>
                <p className="text-zinc-700 font-medium mt-1">Address:</p>
                <p className="text-xs">{item.docData?.address?.line1 || ""}</p>
                <p className="text-xs">{item.docData?.address?.line2 || ""}</p>
                <p className="text-sm mt-1">
                  <span className="text-sm text-neutral-700 font-medium">
                    Date & Time
                  </span>{" "}
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>
              <div className="flex flex-col gap-2 justify-end">
                {!item.cancelled && (
                  <>
                    <button
                      onClick={handlePayOnline}
                      className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-primary hover:text-white transition-all duration-300"
                    >
                      Pay Online
                    </button>
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-700 hover:text-white transition-all duration-300"
                    >
                      Cancel appointment
                    </button>
                  </>
                )}
                {item.cancelled && (
                  <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                    Appointment Cancelled
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 mt-6">
            You have no appointments.
          </p>
        )}
      </div>
    </div>
  );
}

export default Myapoinment;
