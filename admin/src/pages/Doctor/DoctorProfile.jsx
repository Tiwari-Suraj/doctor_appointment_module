// import React from "react";
// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {getProfileData} from "../../redux/slices/doctorSlice";

// const DoctorProfile = () => {
//   const dToken = useSelector((state) => state.doctor.dToken);
//   const profileData = useSelector((state) => state.doctor.profileData);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (dToken) {
//       dispatch(getProfileData());
//     }
//   }, [dToken, dispatch]);
//   console.log({profileData});
//   return <div>DoctorProfile</div>;
// };

// export default DoctorProfile;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfileData } from "../../redux/slices/doctorSlice";
import { MdLocationOn, MdEmail } from "react-icons/md";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";

const DoctorProfile = () => {
  const dToken = useSelector((state) => state.doctor.dToken);
  const profileData = useSelector((state) => state.doctor.profileData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (dToken) {
      dispatch(getProfileData());
    }
  }, [dToken, dispatch]);

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getSlotsBookedCount = () => {
    return Object.values(profileData?.slots_booked || {}).reduce(
      (total, slots) => total + slots.length,
      0
    );
  };

  if (!profileData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen sm:p-6 bg-gray-50 py-8 px-4">
      <div className="max-w-2xl  mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="bg-teal-700 px-6 py-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <img
                  src={profileData.image || "/placeholder.jpg"}
                  alt={profileData.name}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <div
                  className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-2 border-white ${
                    profileData.available ? "bg-green-600" : "bg-red-500"
                  }`}
                ></div>
              </div>

              <div className="text-center md:text-left text-white">
                <h1 className="text-3xl font-bold mb-2">{profileData.name}</h1>
                <p className="text-blue-100 text-lg mb-2">
                  {profileData.speciality}
                </p>
                <p className="text-blue-100">{profileData.degree}</p>
                <div className="flex items-center justify-center md:justify-start gap-2 mt-3">
                  {profileData.available ? (
                    <IoMdCheckmark className="w-5 h-5 text-green-300" />
                  ) : (
                    <IoMdClose className="w-5 h-5 text-red-300" />
                  )}
                  <span className="text-blue-200">
                    {profileData.available ? "Available" : "Not Available"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Quick Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Quick Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaClock className="w-5 h-5 text-blue-600" />
                <div>
                  <span className="text-gray-600">Experience:</span>
                  <span className="ml-2 font-medium">
                    {profileData.experience}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-green-600 text-xl font-bold">₹</div>
                <div>
                  <span className="text-gray-600">Consultation Fee:</span>
                  <span className="ml-2 font-medium">₹{profileData.fees}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaCalendarAlt className="w-5 h-5 text-purple-600" />
                <div>
                  <span className="text-gray-600">Total Bookings:</span>
                  <span className="ml-2 font-medium">
                    {getSlotsBookedCount()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Contact & Location
            </h2>
            <div className="space-y-4">
              <div>
                <span className="text-gray-600">Email:</span>
                <p className="font-medium text-blue-600 mt-1 flex items-center gap-2">
                  <MdEmail className="w-4 h-4" />
                  {profileData.email}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <MdLocationOn className="w-5 h-5 text-red-600 mt-1" />
                <div>
                  <span className="text-gray-600">Address:</span>
                  <p className="font-medium mt-1">
                    {profileData.address?.line1}
                    <br />
                    {profileData.address?.line2}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">About</h2>
          <p className="text-gray-700 leading-relaxed">{profileData.about}</p>
        </div>

        {/* Bookings Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Bookings
          </h2>
          {Object.keys(profileData.slots_booked || {}).length > 0 ? (
            <div className="space-y-3">
              {Object.entries(profileData.slots_booked).map(([date, slots]) => (
                <div
                  key={date}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800">
                      {date.replace(/_/g, "/")}
                    </span>
                    <span className="text-sm text-gray-600">
                      {slots.length}{" "}
                      {slots.length === 1 ? "appointment" : "appointments"}
                    </span>
                  </div>
                  {slots.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {slots.map((slot, index) => (
                        <span
                          key={index}
                          className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                        >
                          {slot}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No bookings found</p>
          )}
        </div>

        {/* Meta */}
        <div className="bg-gray-100 rounded-lg p-4 mt-6">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Profile ID: {profileData._id}</span>
            <span>Created: {formatDate(profileData.date)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
