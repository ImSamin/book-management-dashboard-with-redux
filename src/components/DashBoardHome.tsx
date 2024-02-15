import { Card, Typography } from "@material-tailwind/react";
import { useAppSelector } from "../redux/hooks";

const DashBoardHome = () => {
  const { name } = useAppSelector((state) => state.login);
  return (
    <div className="h-lvh flex justify-center items-center">
      <Card
        placeholder={""}
        className="h-screen w-full p-8 items-center"
        shadow={true}
      >
        <Typography placeholder={""} variant="h1">
          Welcome To Dashboard Mr.{name}
        </Typography>
      </Card>
    </div>
  );
};

export default DashBoardHome;
