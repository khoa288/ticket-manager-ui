import React, { useState } from "react";
import axios from "axios";
import { variables } from "../Variables";

const TicketInfoForm = () => {
	const [ticketNumber, setTicketNumber] = useState("");
	const [ticketInfo, setTicketInfo] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const response = await axios.get(
				`${variables.DOMAIN}/tickets/ticketInfo/${ticketNumber}`,
				{
					withCredentials: true,
				}
			);
			if (response.status === 200) {
				setLoading(false);
				setTicketInfo(response.data);
			} else {
				setLoading(false);
				alert("Ticket not found.");
			}
		} catch (error) {
			setLoading(false);
			console.error(error);
			alert("An error occurred while searching for ticket information.");
		}
	};

	const useTicket = async (ticketNumber) => {
		try {
			setLoading(true);
			const response = await axios.put(
				`${variables.DOMAIN}/tickets/useTicket/${ticketNumber}`,
				{},
				{
					withCredentials: true,
				}
			);
			if (response.status === 200) {
				setLoading(false);
				alert("The ticket has been marked as used.");
				// Refresh ticket data
				setTicketInfo(response.data);
			} else {
				setLoading(false);
				alert("Please check your inputs and try again.");
			}
		} catch (error) {
			setLoading(false);
			console.error(error);
			alert("An error occurred while updating the ticket status.");
		}
	};

	return (
		<div>
			{loading ? (
				<div>
					<div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-50 z-50">
						Loading
					</div>
				</div>
			) : null}
			<div className="container mx-auto px-4">
				{/* Form */}
				<form onSubmit={handleSubmit} className="space-y-4">
					<h2 className="text-xl font-bold mb-4">Search By Ticket</h2>
					<input
						type="text"
						placeholder="Ticket Number"
						value={ticketNumber}
						onChange={(e) => setTicketNumber(e.target.value)}
						className="border p-2 w-full"
					/>
					<button
						type="submit"
						className="bg-blue-500 text-white py-2 px-4 mt-2 hover:bg-blue-600 transition duration-300 rounded"
					>
						Search
					</button>
				</form>

				{/* Display ticket info */}
				{ticketInfo && (
					<div className="mt-8">
						<h3 className="text-lg font-semibold mb-4">
							Ticket Information
						</h3>
						<table className="table-auto w-full">
							<thead>
								<tr>
									<th className="border px-4 py-2">Name</th>
									<th className="border px-4 py-2">
										Student ID
									</th>
									<th className="border px-4 py-2">Email</th>
									<th className="border px-4 py-2">
										Ticket Number
									</th>
									<th className="border px-4 py-2">
										Sold At
									</th>
									<th className="border px-4 py-2">Used</th>
									<th className="border px-4 py-2">Action</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className="border px-4 py-2 text-center">
										{ticketInfo.name}
									</td>
									<td className="border px-4 py-2 text-center">
										{ticketInfo.studentId}
									</td>
									<td className="border px-4 py-2 text-center">
										{ticketInfo.email}
									</td>
									<td className="border px-4 py-2 text-center">
										{ticketInfo.ticketNumber}
									</td>
									<td className="border px-4 py-2 text-center">
										{new Date(
											ticketInfo.createdAt
										).toLocaleString()}
									</td>
									<td className="border px-4 py-2 text-center">
										{ticketInfo.isUsed ? "Yes" : "No"}
									</td>

									{!ticketInfo.isUsed ? (
										<td className="border px-4 py-2 flex justify-center items-center">
											<button
												onClick={() =>
													useTicket(
														ticketInfo.ticketNumber
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
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	);
};

export default TicketInfoForm;
