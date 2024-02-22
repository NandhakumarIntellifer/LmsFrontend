import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Paper from '@mui/material/Paper';
import { SubmitNewPost } from "../../api/Posts";
import { useNavigate } from "react-router-dom";

export default function RequestBox(){
    const [reason, setReason] = useState("");
    const [startdate, setStartDate] = useState('');
    const [enddate, setEndDate] = useState('');
    const navigate = useNavigate();

    async function handleMakePost(e){
        e.preventDefault();
        if(!reason || !startdate || !enddate){alert("fill all values");return}
        console.log(startdate, enddate)
        console.log(new Date(startdate).getTimezoneOffset())
        const response = await SubmitNewPost(reason, new Date(startdate).getTime(), new Date(enddate).getTime())
        if (response.status == "success"){
            navigate("/dashboard/e/", { replace: true });
        }else{
            console.log("error...")
        }
    }

    return (
        <Grid
            maxWidth="xs" 
            style={{borderRadius:5,paddingTop:1,paddingBottom:10}}
            component={Paper}
            sx={{ 
                boxShadow:{xs:"0 0 3px rgba(0,0,0,0.5)", md:"0 0px 3px rgba(0,0,0,0.5)"},
                maxWidth:{xs:"95%", md:"40%", lg:"40%"},
                justifyContent:"flex-start",
                padding:{xs: 2, md:2, lg:2}
            }}
        >
            <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Grid container justify="space-between" flexDirection="column" mb={2}>
                <Typography component="h2" variant="b" align="left">Enter your leave details</Typography>
            </Grid>
            <Box component="form" noValidate sx={{ mt: 0 }} onSubmit={handleMakePost}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="Reason"
                    name="Reason"
                    label="Reason"
                    autoComplete="Reason"
                    value={reason}
                    rows={2}
                    multiline={true}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => setReason(e.target.value)}
                />
                    
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="StartDate"
                        type="datetime-local"
                        label="Start Date"
                        name="StartDate"
                        autoComplete="StartDate"
                        autoFocus
                        value={startdate}
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="EndDate"
                        type="datetime-local"
                        label="End Date"
                        placeholder=""
                        name="EndDate"
                        autoComplete="EndDate"
                        autoFocus
                        value={enddate}
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Apply Leave
                    </Button>
                </Box>
            </Box>
        </Grid>
    )
}