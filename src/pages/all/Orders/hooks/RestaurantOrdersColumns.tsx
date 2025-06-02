import { TableProps, Tag } from "antd";
import { ICompanyOrder } from "../../../../interfaces/CompanyOrder";
import { OrderStatus } from "../../../../enums/enums";

const statusColors: Record<OrderStatus, string> = {
  [OrderStatus.Pendente]: "gold",
  [OrderStatus.Confirmado]: "blue",
  [OrderStatus.Preparando]: "orange",
  [OrderStatus.Completado]: "green",
  [OrderStatus.Cancelado]: "red",
};

const columns: TableProps<ICompanyOrder>["columns"] = [
  {
    title: "Código",
    dataIndex: "code",
    key: "code",
    render: (text) => (
      <a className="ellipsis-text" style={{ maxWidth: "100px" }}>
        {text}
      </a>
    ),
    width: "15%",
  },
  {
    title: "Empresa",
    dataIndex: "company",
    key: "company",
    width: "35%",
    render: (company) => <p style={{ fontWeight: "bold" }}>{company.name}</p>,
  },
  {
    title: "Pedido em",
    dataIndex: "createdAt",
    key: "createdAt",
    width: "25%",
    render: (value: string) => {
      const date = new Date(value);
      return date.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: "25%",
    render: (text: OrderStatus) => (
      <Tag color={statusColors[text] || "default"} style={{ fontWeight: "bold" }}>
        {text}
      </Tag>
    ),
  },
];

export default columns;
