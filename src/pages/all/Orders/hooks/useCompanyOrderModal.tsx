import { Checkbox, TableProps } from "antd";
import { IIndividualOrder } from "../../../../interfaces/IndividualOrder";


const useCompanyOrderModalColumns = () => {
  const columns: TableProps<IIndividualOrder>["columns"] = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      width: "25%",
    },
    {
      title: "Quantidade",
      dataIndex: "quantity",
      key: "quantity",
      width: "25%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "25%",
    },
    {
      title: "Ações",
      key: "actions",
      render: () => <><Checkbox onChange={() => { }}>Pronto</Checkbox></>,
      width: "25%", // manter alinhamento
    },
  ];

  return {
    columns,
  };
};

export default useCompanyOrderModalColumns;
