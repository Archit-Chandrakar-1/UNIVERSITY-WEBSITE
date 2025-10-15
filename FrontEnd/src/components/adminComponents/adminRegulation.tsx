import React, { useState } from 'react';

const AdminRegulation: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      setFile(e.target.files[0]);
      setUploadMessage(null);
    }
  };

  const handleUpload = () => {
    if (!file) {
      setUploadMessage('Select a file to upload');
      return;
    }
    setUploading(true);
    setTimeout(() => {
      setUploadMessage('File upload simulated!');
      setUploading(false);
      setFile(null);
    }, 1000);
  };

  return (
    <section>
      <h2 className="text-xl font-bold text-[#142143] mb-4">Upload Regulation or Approval</h2>
      <input type="file" accept=".pdf,image/*" onChange={handleFileChange} className="mb-4" />
      <br />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className={`px-6 py-2 rounded font-semibold text-white ${
          uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#ffaf00] hover:bg-yellow-400'
        }`}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {uploadMessage && <p className="mt-4 text-[#142143]">{uploadMessage}</p>}
      {/* Add uploaded files listing here later */}
    </section>
  );
};

export default AdminRegulation;
