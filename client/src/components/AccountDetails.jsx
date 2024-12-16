import React, { useEffect, useState } from "react";
import { Card, Form, InputNumber, Select, Button, message } from "antd";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const AccountDetails = () => {
  const { accountNumber } = useParams();
  const [account, setAccount] = useState(null);
  const [allAccounts, setAllAccounts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await axiosInstance.get(`/accounts/${accountNumber}/`);
        setAccount(response.data);
      } catch (error) {
        message.error("Failed to fetch account details.");
      }
    };

    const fetchAllAccounts = async () => {
      try {
        const response = await axiosInstance.get("/accounts/");
        setAllAccounts(response.data);
      } catch (error) {
        message.error("Failed to fetch accounts list.");
      }
    };

    fetchAccount();
    fetchAllAccounts();
  }, [accountNumber]);

  const handleTransfer = async (values) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/transfer/", {
        from_account: accountNumber,
        to_account: values.to_account,
        amount: values.amount,
      });
      message.success(response.data.message);
      setAccount(response.data.from_account);
    } catch (error) {
      message.error(error.response?.data?.error || "Transfer failed.");
    } finally {
      setLoading(false);
    }
  };

  if (!account) return null;

  return (
    <div>
      <Card title="Account Details">
        <p><strong>Account Number:</strong> {account.account_number}</p>
        <p><strong>Name:</strong> {account.name}</p>
        <p><strong>Balance:</strong> ${account.balance}</p>
      </Card>

      <Card title="Transfer Money" style={{ marginTop: 16 }}>
        <Form onFinish={handleTransfer} layout="vertical">
          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true, message: "Please enter an amount" }]}
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="to_account"
            label="Transfer To"
            rules={[{ required: true, message: "Please select an account" }]}
          >
            <Select
              showSearch
              placeholder="Select an account"
              optionFilterProp="children"
            >
              {allAccounts
                .filter((acc) => acc.account_number !== accountNumber)
                .map((acc) => (
                  <Select.Option key={acc.account_number} value={acc.account_number}>
                    {acc.name} ({acc.account_number})
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Transfer
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AccountDetails;
