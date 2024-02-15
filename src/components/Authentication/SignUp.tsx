import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../../redux/feature/auth/loginApi";
import toast, { Toaster } from "react-hot-toast";

interface FormData {
  name: string;
  username: string;
  password: string;
}

export const SignUp: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const navigate = useNavigate();

  const [createUser] = useCreateUserMutation();

  const onSubmit: SubmitHandler<FormData> = async (signUpData) => {
    const isCreateUser = await createUser(signUpData);
    if ("data" in isCreateUser && isCreateUser.data) {
      navigate("/login");
    } else {
      toast.error("Sign Up Failed");
    }
  };

  return (
    <div className=" h-screen flex justify-center items-center">
      <Toaster />
      <Card placeholder={""} color="transparent" shadow={true} className="p-8">
        <Typography placeholder={""} variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography placeholder={""} color="gray" className="mt-1 font-normal">
          Enter your details to Sign Up.
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
              Your Name
            </Typography>
            <Input
              crossOrigin={""}
              size="lg"
              placeholder="Name"
              {...register("name", { required: true })}
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
            Sign UP
          </Button>

          <Typography
            placeholder={""}
            color="gray"
            className="mt-4 text-center font-normal"
          >
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-gray-900">
              Sign In
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
};
