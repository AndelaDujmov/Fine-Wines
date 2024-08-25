import React from 'react';

const Logout = ({ onClose, onConfirm }) => {
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-lg font-semibold mb-4 text-gray-600">Do you want to logout?</h2>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onConfirm}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Yes
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Logout;