import React from 'react';
import Widget from "components/widget/Widget";
import { MdBarChart, MdDashboard } from "react-icons/md";

const columns = [
    { title: 'ID do Pedido', field: 'orderId' },
    { title: 'Cliente', field: 'client' },
    { title: 'Valor', field: 'amount' },
    { title: 'Status', field: 'status' }
];

const data = [
    { orderId: 1, client: 'João Silva', amount: 'R$ 200,00', status: 'Em processamento' },
    // Adicione mais dados conforme necessário
];

const Orders = () => {
    return (
        <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Earnings"}
          subtitle={"$340.5"}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Sales"}
          subtitle={"$574.34"}
        />
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={"Your Balance"}
          subtitle={"$1,000"}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"New Tasks"}
          subtitle={"145"}
        />
      </div>
    );
};

export default Orders;
