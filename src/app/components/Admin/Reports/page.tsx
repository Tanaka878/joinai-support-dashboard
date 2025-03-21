import React from 'react';

const Reports = () => {
  // Static data for demonstration purposes
  const reportData = [
    { id: 1, title: 'Monthly Sales Report', date: '2025-03-01', status: 'Completed' },
    { id: 2, title: 'Customer Feedback Analysis', date: '2025-03-15', status: 'In Progress' },
    { id: 3, title: 'Annual Financial Overview', date: '2025-02-28', status: 'Completed' },
    { id: 4, title: 'Weekly Team Performance', date: '2025-03-18', status: 'Pending' },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4">Reports</h1>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border">Report Title</th>
            <th className="py-2 px-4 border">Date</th>
            <th className="py-2 px-4 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {reportData.map((report) => (
            <tr key={report.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border">{report.title}</td>
              <td className="py-2 px-4 border">{report.date}</td>
              <td className={`py-2 px-4 border ${
                report.status === 'Completed' ? 'text-green-600' :
                report.status === 'In Progress' ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {report.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
