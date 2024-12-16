import React, { useState } from "react";
import FileUploadForm from "../components/FileUploadForm";
import AccountsTable from "../components/AccountsTable";

const HomePage = () => {
  const [refetch, setRefetch] = useState(false);

  const handleFileUploadSuccess = () => {
    setRefetch((prev) => !prev);
  };

  return (
    <div>
      <h1>Accounts Manager</h1>
      <div style={{ marginBottom: 32 }}>
        <FileUploadForm onUploadSuccess={handleFileUploadSuccess} />
      </div>
      <AccountsTable refetch={refetch} />
    </div>
  );
};

export default HomePage;
