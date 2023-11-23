import { useState, useEffect } from "react";
import axios from "axios";
import { variables } from "../Variables";

const useAuth = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(null);

	useEffect(() => {
		async function checkAuth() {
			const url = `${variables.DOMAIN}/auth/check`;
			try {
				const response = await axios.get(url, {
					withCredentials: true,
				});

				if (response.status === 200) {
					setIsAuthenticated(true);
				} else {
					setIsAuthenticated(false);
				}
			} catch (error) {
				setIsAuthenticated(false);
			}
		}

		checkAuth();
	}, []);

	return isAuthenticated;
};

export default useAuth;
