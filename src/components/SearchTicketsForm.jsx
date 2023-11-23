import React, { useState } from "react";
import axios from "axios";
import { variables } from "../Variables";

const SearchTicketsForm = () => {
	const [studentId, setStudentId] = useState("");
	const [tickets, setTickets] = useState([]);

	const useTicket = async (e, ticketNumber) => {
		e.preventDefault();
		try {
			const response = await axios.put(
				`${variables.DOMAIN}/tickets/useTicket/${ticketNumber}`,
				{},
				{ withCredentials: true }
			);
			if (response.status === 200) {
				// Refresh ticket data
				const response = await axios.get(
					`${variables.DOMAIN}/tickets/searchTickets/${studentId}`,
					{
						withCredentials: true,
					}
				);
				if (response.status === 200) {
					setTickets(response.data);
				}
			}
		} catch (error) {
			console.error(error);
			alert("An error occurred while updating the ticket status.");
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.get(
				`${variables.DOMAIN}/tickets/searchTickets/${studentId}`,
				{
					withCredentials: true,
				}
			);
			if (response.status === 200) {
				setTickets(response.data);
			}
		} catch (error) {
			console.error(error);
			alert("An error occurred while searching for tickets.");
		}
	};

	return (
		<div className="container mx-auto px-4">
			<form onSubmit={handleSubmit} className="space-y-4">
				<h2 className="text-xl font-bold mb-4">Search By Student</h2>
				<input
					type="text"
					placeholder="Student ID"
					value={studentId}
					onChange={(e) => setStudentId(e.target.value)}
					className="border p-2 w-full"
				/>
				<button
					type="submit"
					className="bg-blue-500 text-white py-2 px-4 mt-2 hover:bg-blue-600 transition duration-300 rounded"
				>
					Search
				</button>
			</form>
			{tickets.length > 0 && (
				<table className="table-auto w-full mt-8">
					<thead>
						<tr>
							<th className="border px-4 py-2">Name</th>
							<th className="border px-4 py-2">Student ID</th>
							<th className="border px-4 py-2">Email</th>
							<th className="border px-4 py-2">Ticket Number</th>
							<th className="border px-4 py-2">Sold at</th>
							<th className="border px-4 py-2">Used</th>
							<th className="border px-4 py-2">Action</th>
						</tr>
					</thead>
					<tbody>
						{tickets.map((ticket) => (
							<tr key={ticket._id}>
								<td className="border px-4 py-2 text-center">
									{ticket.name}
								</td>
								<td className="border px-4 py-2 text-center">
									{ticket.studentId}
								</td>
								<td className="border px-4 py-2 text-center">
									{ticket.email}
								</td>
								<td className="border px-4 py-2 text-center">
									{ticket.ticketNumber}
								</td>
								<td className="border px-4 py-2 text-center">
									{new Date(
										ticket.createdAt
									).toLocaleString()}
								</td>{" "}
								<td className="border px-4 py-2 text-center">
									{ticket.isUsed ? "Yes" : "No"}
								</td>
								{!ticket.isUsed ? (
									<td className="border px-4 py-2 flex justify-center items-center">
										<button
											onClick={(e) =>
												useTicket(
													e,
													ticket.ticketNumber
												)
											}
											className="bg-green-500 text-white py-1 px-2 hover:bg-green-600 transition duration-300 rounded"
										>
											Mark as Used
										</button>
									</td>
								) : (
									<td className="border px-4 py-2 text-center">
										-
									</td>
								)}
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default SearchTicketsForm;
