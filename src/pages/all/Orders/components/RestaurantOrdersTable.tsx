import { Card, Table } from "antd";
import { ICompanyOrder } from "../../../../interfaces/CompanyOrder";
import columns from "../hooks/RestaurantOrdersColumns";

interface RestaurantOrdersTableProps {
  companyOrders: ICompanyOrder[] | undefined;
}

const RestaurantOrdersTable = ({ companyOrders }: RestaurantOrdersTableProps) => {

  return (
    <Card >
      <Table dataSource={companyOrders} columns={columns} rowKey="_id" />
    </Card>
  );
};

export default RestaurantOrdersTable;
