import BACKEND from "./config";
import { useUserStore } from "../store";
import { callLogout } from "./Accounts";

function loggingOutDecisionMaker(response){
    if(!response.ok){
        callLogout();
    }
}

export const SubmitNewPost = async (reason, startDate, endDate)=>{
    const url = BACKEND.baseurl + "api/Employee/post";
    const {token} = useUserStore.getState()

    const rresponse = await fetch(url, {
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`   
        },
        body:JSON.stringify({appliedOn: Date.now(),reason,startDate,endDate})
    })
    loggingOutDecisionMaker(rresponse);

    const response = await rresponse.json();
    return response;
}
export const GetPostsByEmployee = async ()=>{
    const url = BACKEND.baseurl + "api/Employee/posts/";
    const {token} = useUserStore.getState()
    const rresponse = await fetch(url, {
        method:"GET",
        headers:{
            Authorization: `Bearer ${token}`
        },
    })
    loggingOutDecisionMaker(rresponse);

    const response = await rresponse.json();
    return response.data
}

export const GetAllPosts = async () => {
    const url = BACKEND.baseurl + "api/Admin/posts/";
    const {token} = useUserStore.getState()
    const rresponse = await fetch(url, {
        method:"GET",
        headers:{
            Authorization: `Bearer ${token}` 
        },
    })
    loggingOutDecisionMaker(rresponse);

    const response = await rresponse.json();
    return response.data
}

export const UpdatePostById = async (id, postStatus) => {
    const url = BACKEND.baseurl + "api/Admin/posts/";
    const {token} = useUserStore.getState()
    const rresponse = await fetch(url, {
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` 
        },
        body:JSON.stringify({id, postStatus})
    })
    loggingOutDecisionMaker(rresponse);

    const response = await rresponse.json();
    return response
}