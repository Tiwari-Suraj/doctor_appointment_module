import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";
import { fetchDoctors } from "../redux/slices/doctorSlice";
import { useDispatch, useSelector } from "react-redux";

const Apoinment = () => {
  const { docId } = useParams();

  const backendUrl = useSelector((state) => state.user.backendUrl);
  const token = useSelector((state) => state.user.token);
  const doctors = useSelector((state) => state.doctors.doctors);
  const currencySymbol = useSelector((state) => state.user.currencySymbol);  

  const dispatch = useDispatch();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState();
  const navigate = useNavigate();

  const dayOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const getAvailableSlots = () => {
    setDocSlots([]);
    let today = new Date();
    let allSlots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0); // 9:00 PM

      if (i === 0) {
        let currentHour = currentDate.getHours();
        currentDate.setHours(currentHour >= 10 ? currentHour + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() >= 30 ? 30 : 0);
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = `${day}_${month}_${year}`;
        const slotBooked = docInfo.slots_booked?.[slotDate] || [];

        if (!slotBooked.includes(formattedTime)) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      allSlots.push(timeSlots);
    }

    setDocSlots(allSlots);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }

    try {
      const date = docSlots[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = `${day}_${month}_${year}`;
      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        dispatch(fetchDoctors());
        navigate("/my-apoinment");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to book appointment.");
    }
  };

  useEffect(() => {
    if (doctors && doctors.length > 0) {
      const doc = doctors.find((doc) => String(doc._id) === String(docId));
      setDocInfo(doc || null);
    }
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  return (
    docInfo && (
      <div>
        {/* Doctor Details */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt={docInfo.name}
            />
          </div>

          <div className="flex-1 border border-gray-400 rounded-lg p-8 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience} yrs
              </button>
            </div>
            <div className="mt-3">
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900">
                About <img className="w-3" src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 mt-1">{docInfo.about}</p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Appointment fee:{" "}
              <span className="text-gray-900">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* Booking Slots */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking slots</p>

          {/* Days */}
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docSlots.map((items, index) => {
              const slotDate = new Date();
              slotDate.setDate(slotDate.getDate() + index);
              const day = dayOfWeek[slotDate.getDay()];
              const date = slotDate.getDate();

              return (
                <div
                  onClick={() => items.length > 0 && setSlotIndex(index)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer transition ${
                    slotIndex === index && items.length > 0
                      ? "bg-primary text-white"
                      : "border border-gray-600 text-gray-700"
                  } ${
                    items.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  key={index}
                >
                  <p>{day}</p>
                  <p>{date}</p>
                </div>
              );
            })}
          </div>

          {/* Time slots */}
          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {docSlots[slotIndex]?.length > 0 ? (
              docSlots[slotIndex].map((items, index) => (
                <p
                  onClick={() => setSlotTime(items.time)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer transition ${
                    items.time === slotTime
                      ? "bg-primary text-white"
                      : "text-gray-400 border border-gray-300"
                  }`}
                  key={index}
                >
                  {items.time.toLowerCase()}
                </p>
              ))
            ) : (
              <p className="text-sm text-gray-500 italic">
                No slots available for this day.
              </p>
            )}
          </div>

          <button
            onClick={bookAppointment}
            className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6"
            disabled={!slotTime}
          >
            Book an Appointment
          </button>
        </div>

        {/* Related Doctors */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Apoinment;
