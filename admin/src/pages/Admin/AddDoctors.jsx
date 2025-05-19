import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

const AddDoctors = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const backendUrl = useSelector((state) => state.admin.backendURL);
  const aToken = useSelector((state) => state.admin.aToken);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!docImg) return toast.error("Image Not Selected");

    try {
      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setExperience("1 Year");
        setFees("");
        setAbout("");
        setSpeciality("General physician");
        setDegree("");
        setAddress1("");
        setAddress2("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-6xl mx-auto">
        {/* Mobile top bar with hamburger */}
        <div className="md:hidden mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Add Doctor</h1>
          <div style={{ width: 40 }}></div> {/* Placeholder */}
        </div>

        <form
          onSubmit={onSubmitHandler}
          className="w-full bg-white rounded-lg shadow p-6 overflow-y-auto max-h-[80vh]"
        >
          {/* Form title only on desktop because mobile shows in top bar */}
          <h2 className="text-2xl text-teal-700 font-semibold mb-4 hidden md:block">
            Add Doctor
          </h2>

          <div className="flex items-center gap-4 mb-6 text-gray-700">
            <label htmlFor="doc-img" className="cursor-pointer">
              <img
                className="w-16 h-16 object-cover rounded-full bg-gray-100"
                src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                alt="Doctor Upload"
              />
            </label>
            <input
              type="file"
              id="doc-img"
              hidden
              onChange={(e) => setDocImg(e.target.files[0])}
            />
            <p className="text-sm">Upload Doctor Picture</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Column */}
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm mb-1">Doctor Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Enter name"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Doctor Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Doctor Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Enter password"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Experience</label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i} value={`${i + 1} Year`}>{`${
                      i + 1
                    } Year`}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">Fees</label>
                <input
                  type="number"
                  value={fees}
                  onChange={(e) => setFees(e.target.value)}
                  required
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Enter fees"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm mb-1">Speciality</label>
                <select
                  value={speciality}
                  onChange={(e) => setSpeciality(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                >
                  {[
                    "General physician",
                    "Gynecologist",
                    "Dermatologist",
                    "Pediatricians",
                    "Neurologist",
                    "Gastroenterologist",
                  ].map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">Education</label>
                <input
                  type="text"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  required
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Enter education"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Address Line 1</label>
                <input
                  type="text"
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                  required
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Address line 1"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Address Line 2</label>
                <input
                  type="text"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                  required
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Address line 2"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm mb-2">About Doctor</label>
            <textarea
              rows="4"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full border px-4 py-2 rounded"
              placeholder="Write about the doctor"
              required
            ></textarea>
          </div>

          <div className="mt-6 text-right">
            <button
              type="submit"
              className="bg-teal-700 hover:bg-teal-800 transition px-8 py-3 text-white font-semibold rounded-full"
            >
              Add Doctor
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddDoctors;
