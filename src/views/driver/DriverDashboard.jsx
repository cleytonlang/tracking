import React from "react";
import tableDataOrders from "./variables/tableDataOrders.json";
import OrdersTable from "./components/OrdersTable";

const DriverDashboard = () => {
  return (
    <div className="mt-3 flex flex-col gap-5 p-4">
      <div>
        <OrdersTable tableData={tableDataOrders} />
      </div>
    </div>
  );
};

export default DriverDashboard; 