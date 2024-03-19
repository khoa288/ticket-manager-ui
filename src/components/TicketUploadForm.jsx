import React, { useState } from "react";
import axios from "axios";
import { variables } from "../Variables";

const TicketUploadForm = () => {
	const [file, setFile] = useState(null);
	const [message, setMessage] = useState("");

	const handleFileChange = (event) => {
		setFile(event.target.files[0]);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!file) {
			setMessage("Please select a CSV file to upload.");
			return;
		}

		const formData = new FormData();
		formData.append("file", file);

		try {
			// Update the URL to match your API endpoint
			const response = await axios.post(
				`${variables.DOMAIN}/tickets/sendTicketFile`,
				formData,
				{
					withCredentials: true,
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			setMessage(response.data.message);
		} catch (error) {
			// Check if error.response and error.response.data exist
			if (error.response && error.response.data) {
				setMessage(
					error.response.data.error ||
						"An error occurred while sending emails."
				);
			} else {
				// Handle cases where error.response is undefined
				setMessage(error.message || "An unexpected error occurred.");
			}
		}
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-xl font-bold mb-4">
				Upload CSV to Send Tickets
			</h1>
			<form onSubmit={handleSubmit} className="mb-4">
				<input
					type="file"
					accept=".csv"
					onChange={handleFileChange}
					className="block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-violet-50 file:text-violet-700
                     hover:file:bg-violet-100"
				/>
				<button
					type="submit"
					className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
				>
					Send Emails
				</button>
			</form>
			{message && <div className="text-green-500">{message}</div>}
		</div>
	);
};

export default TicketUploadForm;
