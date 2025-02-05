import axios from "axios";
import { loggedFaillure, loggedInSuccess, loggedOut } from "../../reducer/auth";

export const checkAuthStatus = async (dispatch, setAuthLoading) => {
    try {
        const response = await axios.get("/api/user/protected-route", {
            withCredentials: true,
        });

        if (response.data.isAuthenticated) {
            dispatch(loggedInSuccess(response.data.user));
        } else {
            dispatch(loggedOut());
        }
    } catch (error) {
        dispatch(loggedFaillure());
    } finally {
        setAuthLoading(false);
    }
};
