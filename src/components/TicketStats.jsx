import React, { useEffect, useState } from "react";
import axios from "axios";
import { variables } from "../Variables";

const TicketStats = () => {
	const [stats, setStats] = useState(null);

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const response = await axios.get(
					`${variables.DOMAIN}/tickets/ticketStats`,
					{
						withCredentials: true,
					}
				);
				if (response.status === 200) {
					setStats(response.data);
				}
			} catch (error) {
				console.error(error);
				alert("An error occurred while fetching ticket stats.");
			}
		};

		fetchStats();
	}, []);

	return (
		<div className="container mx-auto px-4">
			{stats && (
				<>
					<table className="table-auto w-full">
						<thead>
							<tr>
								<th className="border px-4 py-2">
									Total Tickets Sold
								</th>
								<th className="border px-4 py-2">
									Used Tickets
								</th>
								<th className="border px-4 py-2">
									Unused Tickets
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="border px-4 py-2 text-center">
									{stats.totalTickets}
								</td>
								<td className="border px-4 py-2 text-center">
									{stats.usedTickets}
								</td>
								<td className="border px-4 py-2 text-center">
									{stats.unusedTickets}
								</td>
							</tr>
						</tbody>
					</table>
				</>
			)}
		</div>
	);
};

export default TicketStats;
