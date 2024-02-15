import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Spinner,
  Tab,
  Tabs,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useGetSaleHistoryQuery } from "../../redux/feature/SaleHistory/saleHistoryApi";
import { addSale } from "../../redux/feature/SaleHistory/saleHistorySlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import DatePicker from "./DatePicker";

interface SaleHistory {
  id: string;
  buyerName: string;
  productName: string;
  quantity: number;
  saleDate: string;
}

const TABS = [
  {
    label: "Daily",
    value: "daily",
  },
  {
    label: "Weekly",
    value: "weekly",
  },
  {
    label: "Monthly",
    value: "monthly",
  },
  {
    label: "Yearly",
    value: "yearly",
  },
];

const TABLE_HEAD: string[] = ["Buyer", "Product", "Quantity", "Sale Date"];

export const SalesHistoryTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { saleHistory, startDate } = useAppSelector(
    (state) => state.historySales
  );
  const [selectedTab, setSelectedTab] = useState<string>("monthly");

  const { data, isLoading } = useGetSaleHistoryQuery({
    interval: selectedTab,
    startDate,
  });

  useEffect(() => {
    if (data) {
      dispatch(addSale(data.data));
    }
  }, [data, dispatch]);

  if (isLoading) {
    return (
      <div className="mx auto shadow-lg p-2 bg-white rounded-lg h-svh flex w-full justify-center items-center ">
        <Spinner className="h-16 w-16 text-blue-700/50" />
      </div>
    );
  }

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  return (
    <Card placeholder={""} className="h-full w-full ">
      <CardHeader
        placeholder={""}
        floated={false}
        shadow={false}
        className="rounded-none"
      >
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography placeholder={""} variant="h5" color="blue-gray">
              Sales History
            </Typography>
            <Typography
              placeholder={""}
              color="gray"
              className="mt-1 font-normal"
            >
              See information about all Sales
            </Typography>
          </div>
        </div>
        <div className="flex items-center justify-center flex-col  gap-4 my-5 md:flex-row">
          <Tabs value={selectedTab} className="w-full md:w-max">
            <TabsHeader placeholder={""}>
              {TABS.map(({ label, value }) => (
                <Tab
                  placeholder={""}
                  key={value}
                  value={value}
                  onClick={() => handleTabChange(value)}
                >
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <DatePicker />
          </div>
        </div>
      </CardHeader>
      <CardBody placeholder={""} className="overflow-scroll px-2 flex ">
        <table className="mt-4 w-full min-w-max table-auto text-left  ">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    placeholder={""}
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {saleHistory.map(
              (
                { id, buyerName, productName, quantity, saleDate }: SaleHistory,
                index: number
              ) => {
                const date: string = moment(saleDate).format("YYYY-MM-DD");
                const isLast: boolean = index === saleHistory.length - 1;
                const classes: string = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            placeholder={""}
                            variant="h6"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {buyerName}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          placeholder={""}
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {productName}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        placeholder={""}
                        variant="small"
                        color="blue-gray"
                        className="font-normal ml-5"
                      >
                        {quantity}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        placeholder={""}
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {date}
                      </Typography>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter
        placeholder={""}
        className="flex items-center justify-between border-t border-blue-gray-50 p-4"
      >
        <Typography
          placeholder={""}
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button placeholder={""} variant="outlined" size="sm">
            Previous
          </Button>
          <Button placeholder={""} variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
