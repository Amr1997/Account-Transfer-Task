import React, { useEffect, useState } from "react";
import { Table, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const AccountsTable = ({ refetch }) => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axiosInstance.get("/accounts/");
        setAccounts(response.data);
      } catch (error) {
        message.error("Failed to fetch accounts.");
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, [refetch]); // Refetch data whenever `refetch` changes

  const columns = [
    {
      title: "Account Number",
      dataIndex: "account_number",
      key: "account_number",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      render: (text) => `$${text}`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Button
          type="link"
          onClick={() => navigate(`/account/${record.account_number}`)}
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <Table
      dataSource={accounts}
      columns={columns}
      loading={loading}
      rowKey="account_number"
    />
  );
};

export default AccountsTable;
