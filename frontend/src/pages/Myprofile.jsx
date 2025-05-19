import { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../redux/slices/userSlice";

const Myprofile = () => {
  const dispatch = useDispatch();
  const { userData, token } = useSelector((state) => state.user);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!userData) {
      dispatch(fetchUserProfile());
    }
  }, [userData, dispatch]);

  // Local state to hold editable fields separately
  const [editData, setEditData] = useState({
    name: "",
    phone: "",
    address: { line1: "", line2: "" },
    gender: "",
    dob: "",
    email: "",
  });

  // When userData changes or edit mode toggled, sync local editData
  useEffect(() => {
    if (userData) {
      setEditData({
        name: userData.name || "",
        phone: userData.phone || "",
        address: {
          line1: userData.address?.line1 || "",
          line2: userData.address?.line2 || "",
        },
        gender: userData.gender || "",
        dob: userData.dob || "",
        email: userData.email || "",
      });
    }
  }, [userData, isEdit]);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();

      formData.append("userId", userData._id); // make sure backend expects this
      formData.append("name", editData.name);
      formData.append("phone", editData.phone);
      formData.append("address", JSON.stringify(editData.address));
      formData.append("gender", editData.gender);
      formData.append("dob", editData.dob);
      formData.append("email", editData.email);

      if (image) {
        formData.append("image", image);
      }

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        {
          headers: {
            token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        // await loadUserProfileData();
        await dispatch(fetchUserProfile());
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    userData && (
      <div className="max-w-lg flex flex-col gap-2 text-sm">
        {isEdit ? (
          <label htmlFor="image">
            <div className="inline-block relative cursor-pointer">
              <img
                className="w-36 rounded opacity-75 "
                src={image ? URL.createObjectURL(image) : userData.image}
                alt="Profile"
              />
              <img
                className="w-10 absolute bottom-12 right-12"
                src={image ? "" : assets.upload_icon}
                alt="Upload Icon"
              />
            </div>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        ) : (
          <img className="w-28 rounded" src={userData.image} alt="Profile" />
        )}

        {/* Name */}
        {isEdit ? (
          <input
            className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
            type="text"
            value={editData.name}
            onChange={(e) =>
              setEditData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <p className="font-medium text-3xl text-neutral-800 mt-2">
            {userData.name}
          </p>
        )}

        <hr className="bg-zinc-400 h-[1px] border-none" />

        {/* Contact Information */}
        <div>
          <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium">Email:</p>
            {isEdit ? (
              <input
                className="bg-gray-100 max-w-52"
                type="email"
                value={editData.email}
                onChange={(e) =>
                  setEditData((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            ) : (
              <p className="text-blue-500">{userData.email}</p>
            )}

            <p className="font-medium">Phone:</p>
            {isEdit ? (
              <input
                className="bg-gray-100 max-w-52"
                type="text"
                value={editData.phone}
                onChange={(e) =>
                  setEditData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p className="text-blue-400">{userData.phone}</p>
            )}

            <p className="font-medium">Address:</p>
            {isEdit ? (
              <p>
                <input
                  className="bg-gray-50"
                  type="text"
                  value={editData.address.line1}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                />
                <br />
                <input
                  className="bg-gray-50"
                  type="text"
                  value={editData.address.line2}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                />
              </p>
            ) : (
              <p className="text-gray-500">
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
            )}
          </div>
        </div>

        {/* Basic Information */}
        <div>
          <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium">Gender:</p>
            {isEdit ? (
              <select
                className="max-w-20 bg-gray-100"
                value={editData.gender}
                onChange={(e) =>
                  setEditData((prev) => ({ ...prev, gender: e.target.value }))
                }
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-400">{userData.gender}</p>
            )}

            <p className="font-medium">Birthday:</p>
            {isEdit ? (
              <input
                className="max-w-28 bg-gray-100"
                type="date"
                value={editData.dob}
                onChange={(e) =>
                  setEditData((prev) => ({ ...prev, dob: e.target.value }))
                }
              />
            ) : (
              <p className="text-gray-400">{userData.dob}</p>
            )}
          </div>
        </div>

        <div className="mt-10">
          {isEdit ? (
            <button
              className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
              onClick={updateUserProfileData}
            >
              Save information
            </button>
          ) : (
            <button
              className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default Myprofile;
