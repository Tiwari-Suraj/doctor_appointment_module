import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllDoctors, changeAvailability } from "../../redux/slices/adminSlice";

const DoctorsList = () => {
  const doctors = useSelector((state) => state.admin.doctors);
  const aToken = useSelector((state) => state.admin.aToken);

  const dispatch = useDispatch(); 

  useEffect(() => {
    if (aToken) {
      dispatch(getAllDoctors());
    }
  }, [aToken, dispatch]);

  return (
    <div className="m-5 max-h-[90vh] overflow-y-auto">
      <div>
        <h1 className="text-xl font-semibold text-teal-700 mb-4">
          All Doctors
        </h1>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {doctors.map((item, index) => (
            <div
              className="border border-indigo-200 rounded-xl overflow-hidden cursor-pointer group transition-shadow hover:shadow-md"
              key={index}
            >
              <img
                className="w-full h-40 object-cover bg-indigo-50 group-hover:bg-teal-700 transition-all duration-300"
                src={item.image}
                alt={item.name}
              />
              <div className="p-4">
                <p className="text-gray-800 text-lg font-semibold truncate">
                  {item.name}
                </p>
                <p className="text-gray-500 text-sm truncate">
                  {item.speciality}
                </p>
                <div className="mt-3 flex items-center gap-2 text-sm">
                  <input
                    onChange={() => dispatch(changeAvailability(item._id))}
                    type="checkbox"
                    checked={item.available}
                    className="accent-indigo-600"
                  />
                  <label className="text-gray-700">Available</label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorsList;
