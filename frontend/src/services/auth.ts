import { z } from "zod";
import { apiClient } from "../api/apiClient";
import { signInSchema, signUpSchema } from "../utils/validation";
import { logout, setUser } from "../store/authSlice";
import { AppDispatch } from "../store";
import { store } from "../store";

const handleSignIn = async (data: z.infer<typeof signInSchema>, dispatch: AppDispatch, navigate: (path: string) => void) => {
    await apiClient.fetch("/signin", 'POST', data)
        .then((response) => {
            if (response.accessToken) {
                dispatch(setUser({
                    token: response.accessToken,
                    user: { id: response.user.id },
                }));
                navigate("/dashboard");
            }
        }).catch((error) => {
            console.log(`Sign up failed: ${error}`);
        });
};

const handleSignUp = async (data: z.infer<typeof signUpSchema>, dispatch: AppDispatch, navigate: (path: string) => void) => {
    try {
        await apiClient.fetch("/signup", 'POST', data).then((response) => {
            if (response.accessToken) {
                dispatch(setUser({
                    token: response.accessToken,
                    user: response.user,
                }));
                navigate("/dashboard");
            }
        }).catch((error) => {
            console.log(`Sign up failed: ${error}`);
        });
    } catch (error) {
        console.error("Sign Up Error:", error);

    }
};

const handleSignout = async (dispatch: AppDispatch, navigate: (path: string) => void, user: any) => {
    try {
        await apiClient.fetch("/signout", 'POST', { user: { id: user.id } })
            .then((response) => {
                dispatch(logout());
                navigate("/signin");
            }).catch((error) => {
                console.log(`Sign out failed: ${error}`);
            });

    } catch (error) {
        console.error("Sign Out Error:", error);
    }
};
 
const getUserDetails = async (dispatch: AppDispatch) => {
    try {
    const user = store.getState().auth.user;
    const token = `${store.getState().auth.token}`
    await apiClient.fetch("/getUserById", 'POST', { user: { id: user.id } }, token)
        .then((response) => {
            dispatch(setUser({
                token,
                user: response.user,
            })
            );
        }).catch((error) => {
            console.log(`get User ById failed: ${error}`);
        });
 
    } catch (error) {
        console.error("get User ById failed:", error);
    }
};

export { handleSignIn, handleSignUp, handleSignout, getUserDetails };
