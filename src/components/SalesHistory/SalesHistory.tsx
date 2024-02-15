import React from "react";

import Container from "../Container";
import { SalesHistoryTable } from "./SalesHistoryTable";

const SalesHistory: React.FC = () => {
  return (
    <Container>
      <div className="w-full ">
        <div className=" p-2 w">
          <SalesHistoryTable />
        </div>
      </div>
    </Container>
  );
};

export default SalesHistory;
