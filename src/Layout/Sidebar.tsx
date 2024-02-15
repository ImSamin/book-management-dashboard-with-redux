import {
  PlusCircleIcon,
  PresentationChartBarIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div className="  sm:hidden  md:hidden lg:block">
      {" "}
      <Card
        placeholder={""}
        className="sticky  h-full w-full rounded-none max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 "
      >
        <div className="mb-2 p-4"></div>
        <List placeholder={""}>
          <Link className="text-blue-700" to="add-product">
            <ListItem className="text-blue-700" placeholder={""}>
              <ListItemPrefix placeholder={""}>
                <PlusCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Add-Product
            </ListItem>
          </Link>

          <Link to="/products" className="text-blue-700">
            <ListItem className="text-blue-700" placeholder={""}>
              <ListItemPrefix placeholder={""}>
                <TableCellsIcon className="h-5 w-5" />
              </ListItemPrefix>
              Products
            </ListItem>
          </Link>
          <Link to="/history" className="text-blue-700">
            <ListItem className="text-blue-700" placeholder={""}>
              <ListItemPrefix placeholder={""}>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              Sales History
            </ListItem>
          </Link>
        </List>
      </Card>
    </div>
  );
};

export default Sidebar;
