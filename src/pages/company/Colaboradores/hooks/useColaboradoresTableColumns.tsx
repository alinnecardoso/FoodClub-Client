import React from 'react';
import { ColumnsType } from 'antd/es/table';
import { PencilSimpleLine, Trash } from '@phosphor-icons/react';
import { Avatar, Space } from 'antd';

type Colaborador = {
  _id: string;
  image?: string;
  name: string;
  email: string;
};

type Props = {
  onEdit?: (record: Colaborador) => void;
  onDelete?: (record: Colaborador) => void;
};

const useColaboradoresTableColumns = ({ onEdit, onDelete }: Props) => {
  const columns: ColumnsType<Colaborador> = [
    {
      title: 'Código',
      dataIndex: '_id',
      key: 'code',
      render: (_id: string) => _id.slice(0, 5),
    },
    {
      title: 'Imagem',
      dataIndex: 'image',
      key: 'image',
      render: (image?: string) => <Avatar src={image} alt="colaborador" />,
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <PencilSimpleLine
            size={24}
            style={{ cursor: 'pointer' }}
            onClick={() => onEdit?.(record)}
          />
          <Trash
            size={24}
            style={{ cursor: 'pointer', color: 'red' }}
            onClick={() => onDelete?.(record)}
          />
        </Space>
      ),
    },
  ];

  return columns;
};

export default useColaboradoresTableColumns;
