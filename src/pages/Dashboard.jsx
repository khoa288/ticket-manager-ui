import React from "react";
import axios from "axios";
import { variables } from "../Variables";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SendTicketForm from "../components/SendTicketForm";
import SearchTicketsForm from "../components/SearchTicketsForm";
import TicketStats from "../components/TicketStats";
import TicketInfoForm from "../components/TicketInfoForm";
import ExportTickets from "../components/ExportTickets";
import TicketUploadForm from "../components/TicketUploadForm";

export default function Dashboard() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const handleLogout = async () => {
		try {
			setLoading(true);
			const response = await axios.post(
				`${variables.DOMAIN}/auth/logout`,
				{},
				{
					withCredentials: true,
				}
			);

			if (response.status === 200) {
				setLoading(false);
				navigate("/");
			} else {
				setLoading(false);
				alert("Please try again.");
			}
		} catch (error) {
			setLoading(false);
			console.error(error);
			alert("An error occurred while logging out. Please try again.");
		}
	};

	const handleRefresh = () => {
		window.location.reload();
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
			<div className="container mx-auto p-4 space-y-8">
				<div className="flex justify-between items-center mb-4">
					<h1 className="text-3xl font-bold">Dashboard</h1>
					<div className="space-x-2">
						{/* Refresh button */}
						<button
							onClick={handleRefresh}
							className="bg-blue-500 text-white py-2 px-4 hover:bg-blue-600 transition-colors duration-200 rounded"
						>
							Refresh
						</button>

						{/* Logout button */}
						<button
							onClick={handleLogout}
							className="bg-red-500 text-white py-2 px-4 hover:bg-red-700 transition-colors duration-200 rounded"
						>
							Logout
						</button>
					</div>
				</div>

				{/* Components */}
				<hr />
				<SendTicketForm />
				<hr />
				<TicketUploadForm />
				<hr />
				<SearchTicketsForm />
				<hr />
				<TicketInfoForm />
				<hr />
				<ExportTickets />
				<hr />
				<TicketStats />
			</div>
		</div>
	);
}
