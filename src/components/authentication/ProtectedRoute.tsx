import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStores";
import { ReactNode } from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
	const { isAuthenticated } = useAuthStore();

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	return <>{children}</>;
};

// redirect authenticated users to the home page
export const RedirectAuthenticatedUser = ({
	children,
}: {
	children: ReactNode;
}) => {
	const { isAuthenticated, user } = useAuthStore();

	if (isAuthenticated && user) {
		return <Navigate to="/login" replace />;
	}

	return children;
};
