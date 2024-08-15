import React from "react";

import * as XLSX from "xlsx";

const JsonToExcelConverter = ({ jsonData, fileName }) => {
  const exportToExcel = (jsonData) => {
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data"); // Sheet name

    XLSX.writeFile(workbook, "data.xlsx"); // File name
  };

  const handleExport = () => {
    exportToExcel(jsonData);
  };

  return <button onClick={handleExport}>Download Excel</button>;
};

export default JsonToExcelConverter;
