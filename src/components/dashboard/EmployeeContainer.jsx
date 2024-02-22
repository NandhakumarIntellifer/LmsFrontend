
import { Link, useParams } from "react-router-dom";
import LeavesTable from "../primary/LeavesTable";
import RequestBox from "../primary/RequestBox";
import { Button, Grid, Typography } from "@mui/material";
import Footer from "../shared/Footer";

export default function EmployeeContainer(){
    const { pageType } = useParams();
    return (
        <div style={{height:"100%", display:"grid",gridTemplateRows:"min-content auto min-content min-content", paddingInline:25}}>
            <div style={{marginBlock:5}}>
                <Typography variant="h4">Employee View: <span style={{textTransform:"capitalize"}}>{pageType}</span></Typography>
            </div>

            <div style={{overflow:"auto",borderRadius:5, boxShadow: "box-shadow: inset 0 0 10px #000000", paddingLeft:2, paddingTop:2}}>
                {pageType && <EmployeePages page={pageType} />}
            </div>

            {pageType == "posts" && <div>
                <Grid style={{paddingBlock: 20}} container sx={{justifyContent:{xs: "center", md:"left"}}} alignItems="center">
                    <Link to="/dashboard/e/apply"><Button variant="contained">Apply for Leave</Button></Link>
                </Grid>
            </div>}

            <Footer />
        </div>
    );
}

function EmployeePages({page}){
    return (
        <>
            {page == "apply" && <RequestBox />}
            {page == "posts" && <LeavesTable userType={"e"} editable={false} filterable={false}/>}
        </>
    )
}