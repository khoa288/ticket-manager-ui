import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { variables } from "../Variables";
import axios from "axios";

export default function Login() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const url = `${variables.DOMAIN}/auth/login`;

		try {
			setLoading(true);
			const response = await axios.post(
				url,
				{ secret: e.target.password.value },
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true,
				}
			);

			if (response.status === 200) {
				setLoading(false);
				navigate("/dashboard");
			} else {
				setLoading(false);
				alert("Please check your inputs and try again.");
			}
		} catch (error) {
			setLoading(false);
			alert(error.response ? error.response.data : error.message);
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

			<div className="h-screen flex bg-gray-bg1">
				<div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
					<h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
						Log in to your account 🔐
					</h1>

					<form
						className="w-64 mx-auto mb-12"
						onSubmit={handleSubmit}
					>
						<input
							type="password"
							id="password"
							placeholder="Password"
							autoComplete="off"
							className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
							required
						/>

						<button className="bg-gray-50 font-medium block w-full rounded-sm p-2">
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
