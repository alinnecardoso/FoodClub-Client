import { Table } from "antd";
import { ICompanyOrder } from "../../../../interfaces/CompanyOrder";
import columns from "../hooks/RestaurantOrdersColumns";

interface RestaurantOrdersTableProps {
  companyOrders: ICompanyOrder[] | undefined;
}

const RestaurantOrdersTable = ({ companyOrders }: RestaurantOrdersTableProps) => {
  return (
    <div style={{ width: "100%", paddingLeft: "5vh" }}>
      <Table dataSource={companyOrders} columns={columns} rowKey="_id" style={{ width: "100%" }} />
    </div>
  );
};

export default RestaurantOrdersTable;
