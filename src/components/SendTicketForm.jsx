import React, { useState } from "react";
import axios from "axios";
import { variables } from "../Variables";

const SendTicketForm = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [studentId, setStudentId] = useState("");
	const [amount, setAmount] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `${variables.DOMAIN}/tickets/sendTicket`;
			const response = await axios.post(
				url,
				{
					name,
					email,
					studentId,
					amount,
				},
				{
					withCredentials: true,
				}
			);
			if (response.status === 201) {
				alert("Ticket sent successfully!");
			}
		} catch (error) {
			console.error(error);
			alert("An error occurred while sending the ticket.");
		}
	};

	return (
		<div className="container mx-auto px-4">
			<form onSubmit={handleSubmit} className="space-y-4">
				<h2 className="text-xl font-bold mb-4">Send Ticket</h2>
				<input
					type="text"
					placeholder="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="border p-2 w-full"
				/>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="border p-2 w-full"
				/>
				<input
					type="text"
					placeholder="Student ID"
					value={studentId}
					onChange={(e) => setStudentId(e.target.value)}
					className="border p-2 w-full"
				/>
				<input
					type="number"
					placeholder="Amount"
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
					className="border p-2 w-full"
				/>
				<button
					type="submit"
					className="bg-blue-500 text-white py-2 px-4 mt-2 hover:bg-blue-600 transition duration-300 rounded"
				>
					Send Ticket
				</button>
			</form>
		</div>
	);
};

export default SendTicketForm;
