import React, { useState } from "react";
import { variables } from "../Variables";

const ExportTickets = () => {
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");

	const handleDownload = () => {
		if (startDate && endDate) {
			window.open(
				`${variables.DOMAIN}/tickets/exportTickets?startDate=${startDate}&endDate=${endDate}`
			);
		} else {
			alert("Please enter both start and end dates.");
		}
	};

	return (
		<div className="container mx-auto px-4">
			<h2 className="text-xl font-bold mb-4">
				Export Tickets By Date Range
			</h2>
			<div className="flex space-x-4">
				<input
					type="date"
					value={startDate}
					onChange={(e) => setStartDate(e.target.value)}
					className="border px-2 py-1"
				/>
				<input
					type="date"
					value={endDate}
					onChange={(e) => setEndDate(e.target.value)}
					className="border px-2 py-1"
				/>
				<button
					onClick={handleDownload}
					className="bg-blue-500 text-white px-4 py-1 rounded"
				>
					Download Excel
				</button>
			</div>
		</div>
	);
};

export default ExportTickets;
