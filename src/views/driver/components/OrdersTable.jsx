import React, { useState } from "react";
import Card from "components/card";
import Progress from "components/progress";
import { MdSearch } from "react-icons/md";
import OrderDetailsModal from "./OrderDetailsModal";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper();

function OrdersTable(props) {
  const { tableData } = props;
  const [sorting, setSorting] = React.useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  const columns = [
    columnHelper.accessor("action", {
      id: "action",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">ACTIONS</p>
      ),
      cell: (info) => (
        <button 
          className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 p-2 text-white hover:bg-brand-600 active:bg-brand-700"
          onClick={() => handleOpenModal(info.row.original)}
        >
          <MdSearch className="h-4 w-4" />
        </button>
      ),
    }),
    columnHelper.accessor("order", {
      id: "order",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">ORDER</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          #{info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">STATUS</p>
      ),
      cell: (info) => (
        <div className="flex items-center">
          <div
            className={`h-2.5 w-2.5 rounded-full mr-2 ${
              info.getValue() === "Completed"
                ? "bg-green-500"
                : info.getValue() === "In Progress"
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
          ></div>
          <p className="text-sm font-medium text-navy-700 dark:text-white">
            {info.getValue()}
          </p>
        </div>
      ),
    }),
    columnHelper.accessor("customer", {
      id: "customer",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">CUSTOMER</p>
      ),
      cell: (info) => (
        <p className="text-sm font-medium text-navy-700 dark:text-white">
          {info.getValue()[0]}
        </p>
      ),
    }),
    columnHelper.accessor("address", {
      id: "address",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">ADDRESS</p>
      ),
      cell: (info) => (
        <p className="text-sm font-medium text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("distance", {
      id: "distance",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">DISTANCE (KM)</p>
      ),
      cell: (info) => (
        <p className="text-sm font-medium text-navy-700 dark:text-white">
          {info.getValue()} km
        </p>
      ),
    }),
  ];

  const [data] = React.useState(() => [...tableData]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <>
      <Card extra={"w-full h-full sm:overflow-auto px-6"}>
        <div className="mt-4 overflow-x-scroll xl:overflow-x-hidden">
          <table className="w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="!border-px !border-gray-400">
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        onClick={header.column.getToggleSortingHandler()}
                        className={`cursor-pointer border-b border-gray-200 pb-2 pr-2 pt-4 text-start ${
                          header.id === 'action' ? 'w-[60px]' : ''
                        }`}
                      >
                        <div className="items-center justify-between text-xs text-gray-200">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {table
                .getRowModel()
                .rows.slice(0, 10)
                .map((row) => {
                  return (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <td
                            key={cell.id}
                            className={`border-white/0 py-3 pr-2 ${
                              cell.column.id === 'action' ? 'w-[60px] min-w-[60px]' : 
                              cell.column.id === 'order' ? 'w-[80px] min-w-[80px]' :
                              cell.column.id === 'status' ? 'w-[120px] min-w-[120px]' :
                              'min-w-[120px]'
                            }`}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal de detalhes */}
      <OrderDetailsModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        orderData={selectedOrder} 
      />
    </>
  );
}

export default OrdersTable; 