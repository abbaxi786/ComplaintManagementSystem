'use client';
import React, { useEffect, useState } from 'react';

function Tabs({ ComplaintForm = [] ,message}) {
  const [tabData, setTabData] = useState(null);

  useEffect(() => {
    function setDefaultTab() {
      if (Array.isArray(ComplaintForm) && ComplaintForm.length > 0) {
        setTabData(ComplaintForm[0]);
        console.log("Default tab set to: ", ComplaintForm[0]);
      }
    }
    setDefaultTab();
  }, [ComplaintForm]);

  const handleCopyLink = () => {
    if (tabData?.publicLink) {
      navigator.clipboard.writeText(tabData.publicLink);
      alert('Public link copied!');
    }
  };

  if (!Array.isArray(ComplaintForm) || ComplaintForm.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500 showUp">
        {message || "No complaint forms available."}
      </div>
    );
  }

  return (
    <div className="w-full mb-5 showUp">
      <div role="tablist" className="tabs tabs-box">
        {ComplaintForm.map((complaint) => (
          <button
            key={complaint._id}
            role="tab"
            className={`tab ${
              tabData?._id === complaint._id ? 'tab-active' : ''
            }`}
            onClick={() => setTabData(complaint)}
          >
            {complaint.title}
          </button>
        ))}
      </div>

      {tabData && (
        <div key={tabData._id} className="fadeUp mt-6 p-6 bg-base-100 shadow-md rounded-lg border">
          <h1 className="text-2xl font-bold">{tabData.title}</h1>
          <p className="text-lg mt-2">{tabData.description}</p>

          <div>
            <h1 className="text-2xl font-bold my-3 text-purple-700">Complaint For</h1>
          <div className="mt-3 flex flex-wrap gap-2">
            {tabData.role?.map((role) => (
              <span key={role} className="badge badge-primary">
                {role}
              </span>
            ))}
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-3">
            Created at:{' '}
            {tabData.createdAt
              ? new Date(tabData.createdAt).toLocaleDateString()
              : 'N/A'}
          </p>

          <div className="bg-zinc-800 p-4 rounded-md mt-4">
            <p className="break-all">{tabData.publicLink}</p>
            <button
              onClick={handleCopyLink}
              className="btn btn-sm btn-outline mt-2"
            >
              Copy Link
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tabs;
