import BACKEND from "./config";
import { useUserStore } from "../store";

export function callLogout(){
    console.log("Logging out..")
    const {setToken} = useUserStore.getState(); 
    setToken("");
}

export const registerUser = async (name, email, password, confirmPassword) => {
    const url = BACKEND.baseurl + "api/Account/register";
    const rresponse = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name,email,password,confirmPassword})
    });
    const response = await rresponse.json();
    if (response?.flag) {
        return ({status:"success", message:response.message});
    }
    return ({status:"failed", message:response.message});
}


export const loginUser = async (email, password) => {
    const url = BACKEND.baseurl + "api/Account/login";
    const rresponse = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email,password})
    });
    const response = await rresponse.json();
    if (response?.flag) {
        const { setToken } = useUserStore.getState();
        setToken(response.token)
        return ({status:"success", message:response?.message});
    }
    return ({status:"failed", message:response?.message});
}