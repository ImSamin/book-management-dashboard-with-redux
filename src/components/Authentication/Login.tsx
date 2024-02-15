import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import {
  useLoginMutation,
  useVerifyTokenMutation,
} from "../../redux/feature/auth/loginApi";
import {
  setName,
  setToken,
  setUsername,
} from "../../redux/feature/auth/loginSlice";
import { useAppDispatch } from "../../redux/hooks";

interface FormData {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login] = useLoginMutation();
  const [verifyToken] = useVerifyTokenMutation();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const loginResponse = await login(data);

      if ("data" in loginResponse && loginResponse.data) {
        const token = loginResponse.data.data.accessToken;

        const verifyResponse = await verifyToken({ token });
        if ("data" in verifyResponse && verifyResponse.data) {
          localStorage.setItem("token", token);
          dispatch(setToken(token));
          dispatch(setUsername(verifyResponse.data.data.username));
          dispatch(setName(verifyResponse.data.data.name));

          navigate("/products");

          console.log(verifyResponse.data);
        } else {
          toast.error("Login failed");
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-900">
      <Toaster />
      <Card placeholder={""} shadow={true} className="p-8">
        <Typography placeholder={""} variant="h4" color="blue-gray">
          Sign In
        </Typography>
        <Typography placeholder={""} color="gray" className="mt-1 font-normal">
          Enter your details to Sign In.
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography
              placeholder={""}
              variant="h6"
              color="blue-gray"
              className="-mb-3"
            >
              Your Username
            </Typography>
            <Input
              crossOrigin={""}
              size="lg"
              placeholder="Username"
              {...register("username", { required: true })}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography
              placeholder={""}
              variant="h6"
              color="blue-gray"
              className="-mb-3"
            >
              Password
            </Typography>
            <Input
              crossOrigin={""}
              type="password"
              size="lg"
              placeholder="********"
              {...register("password", { required: true })}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Button placeholder={""} type="submit" className="mt-6" fullWidth>
            Login
          </Button>
          <Typography
            placeholder={""}
            color="gray"
            className="mt-4 text-center font-normal"
          >
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-gray-900">
              Sign Up
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
};

export default Login;
