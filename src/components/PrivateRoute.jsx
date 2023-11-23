import { useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./AuthCheck";

const PrivateRoute = memo(function PrivateRoute({ children }) {
	const isAuthenticated = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated === false) {
			navigate("/");
		}
	}, [isAuthenticated, navigate]);

	return isAuthenticated ? children : null;
});

export default PrivateRoute;
