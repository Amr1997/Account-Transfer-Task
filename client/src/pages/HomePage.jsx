import React from "react";
import FileUploadForm from "../components/FileUploadForm";
import AccountsTable from "../components/AccountsTable";

const HomePage = () => {
  return (
    <div>
      <h1>Accounts Manager</h1>
      <div style={{ marginBottom: 32 }}>
        <FileUploadForm />
      </div>
      <AccountsTable />
    </div>
  );
};
export default HomePage;