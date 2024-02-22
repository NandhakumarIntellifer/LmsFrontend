const BACKEND = {};
try{
    BACKEND.baseurl = process.env.BACKEND_URL || "https://localhost:7088/"
}catch(err){
    BACKEND.baseurl = "https://localhost:7088/"
}
export default BACKEND
