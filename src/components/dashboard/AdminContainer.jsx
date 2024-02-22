
import { useParams } from "react-router-dom";
import LeavesTable from "../primary/LeavesTable";
import { useEffect, useState } from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Modal from '@mui/material/Modal';
import Footer from "../shared/Footer";
import FilterBox from "../primary/FilterBox";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    maxWidth:"85%",
    bgcolor: 'background.paper',
    borderRadius:"10px",
    boxShadow: 24,
    p: 3,
    pt:1.5,
  };

export default function AdminContainer(){
    const { pageType } = useParams();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div style={{height:"100%", display:"grid",gridTemplateRows:"min-content auto min-content min-content", paddingInline:25}}>
            <div style={{marginBlock:5}}>
                <Typography variant="h4">Admin View: <span style={{textTransform:"capitalize"}}>{pageType}</span></Typography>
            </div>

            <div style={{overflow:"auto",borderRadius:5, boxShadow: "box-shadow: inset 0 0 10px #000000"}}>
                {pageType && <AdminPages page={pageType} />}
                <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="filter-modal"
                aria-describedby="filter-options-for-table"
                >
                    <Box sx={style}>
                        <Typography id="filter-modal" variant="h6" component="h2">
                            Filter Options
                        </Typography>
                        <Box id="filter-options-for-table" sx={{ mt: 2 }}>
                            <FilterBox closeModal={handleClose}/>
                        </Box>
                    </Box>
                </Modal>
            </div>

            {pageType == "posts" && <div>
                <Grid style={{paddingBlock: 20}} container sx={{justifyContent:{xs: "center", md:"left"}}} alignItems="center">
                    <Button variant="contained" onClick={handleOpen}>Open Filters</Button>
                </Grid>
            </div>}

            <Footer />
        </div>
    );
}

function AdminPages({page}){

    return (
        <>
            {page == "pending" && <LeavesTable userType={"a"} editable={true} filterable={false} pendingForced={true} />}
            {page == "posts" && <>
                <LeavesTable userType={"a"} editable={false} filterable={true}/>
            </>}
        </>
    )
}