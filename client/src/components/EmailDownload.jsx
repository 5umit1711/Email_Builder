import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EmailDownload = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDownload = async () => {
        try {
            const response = await axios.get(`/api/download/${id}`, {
                responseType: 'blob',
            });
            const fileURL = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = fileURL;
            link.setAttribute('download', 'generated_email.html'); 
            document.body.appendChild(link);
            link.click(); 
            document.body.removeChild(link); 
            navigate("/");
        } catch (error) {
            console.error("Error downloading the file:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Download your email template</h2>
                <p className="text-gray-600 mb-6">Template ID: <span className="font-semibold text-blue-600">{id}</span></p>
                <button 
                    onClick={handleDownload} 
                    className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition duration-200"
                >
                    Download Template
                </button>
            </div>
        </div>
    );
};

export default EmailDownload;
