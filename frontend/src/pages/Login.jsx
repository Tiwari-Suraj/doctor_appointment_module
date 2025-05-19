import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setToken, fetchUserProfile } from "../redux/slices/userSlice";

const Login = () => {
  const backendUrl = useSelector((state) => state.user.backendUrl); 
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [state, SetState] = useState("Sign Up");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [name, SetName] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!backendUrl) {
      toast.error("Backend URL is not configured."); 
      return;
    }

    try {
      if (state === "Sign Up") {
        // 🛠️ Incorrect: was missing proper backend path in context if context wasn't wrapped
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          password,
          email,
        });

        if (data.token) {
          localStorage.setItem("token", data.token);
          dispatch(setToken(data.token));
          dispatch(fetchUserProfile());
          toast.success("Registered successfully!");
          navigate("/"); // ✅ add navigate on success
        } else {
          toast.error(data.message || "Registration failed");
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          password,
          email,
        });

        if (data.token) {
          localStorage.setItem("token", data.token);
          dispatch(setToken(data.token));
          dispatch(fetchUserProfile());
          toast.success("Login successful!");
          navigate("/"); // ✅ add navigate on success
        } else {
          toast.error(data.message || "Login failed");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // 🛠️ Incorrect: You had this outside of the condition, causing redirect even without login
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[50vh] flex items-center">
      <div className="flex flex-col gap-5 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "sign up" : "log in"} to book
          appointment
        </p>

        {state === "Sign Up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              onChange={(e) => SetName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => SetEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => SetPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-md text-base"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => SetState("Login")}
              className="text-primary underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <span
              onClick={() => SetState("Sign Up")}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
