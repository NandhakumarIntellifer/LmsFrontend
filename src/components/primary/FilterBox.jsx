import React, {useEffect, useState} from "react";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box, Button, ButtonGroup, TextField } from '@mui/material';
import { useSearchParams } from "react-router-dom";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function FilterBox({closeModal}){
    const [searchParams, setSearchParams] = useSearchParams({
        pending: true,
        approved: true,
        declined: true,
        empId: "",
        startDate: "",
        endDate: ""
    });

    // Extract attribute values
    const pendingStatus = searchParams.get('pending') === "true";
    const approvedStatus = searchParams.get('approved') === "true";
    const declinedStatus = searchParams.get('declined') === "true";
    const empId = searchParams.get('empId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
        
    // Do something with the extracted attributes
    // console.log('pendingStatus:', pendingStatus);
    // console.log('approvedStatus:', approvedStatus);
    // console.log('declinedStatus:', declinedStatus);
    // console.log('empId:', empId);
    // console.log('startDate:', startDate);
    // console.log('endDate:', endDate);

    function handleApplyFilters(e){
        e.preventDefault();
        // console.log(e.target)
        closeModal();
    }

    function handleClearFilters(e){
        console.log("clear filters")
        searchParams.set('pending', true);
        searchParams.set('approved', true);
        searchParams.set('declined', true);
        searchParams.set('empId', "");
        searchParams.set('startDate', "");
        searchParams.set('endDate', "");
        closeModal();
    }

    return (
        <>
            <FormGroup>
                <FormControlLabel 
                    control={
                        <Checkbox 
                            name="pendingStatus" 
                            checked={pendingStatus}
                            onChange={e => setSearchParams( prev => {
                                    prev.set("pending",e.target.checked);
                                    return prev
                                }, {replace: true})
                            } 
                        />} 
                    label="Pending" 
                />
                <FormControlLabel 
                    control={
                        <Checkbox 
                            name="approvedStatus" 
                            checked={approvedStatus}
                            onChange={e => setSearchParams( prev => {
                                    prev.set("approved",e.target.checked);
                                    return prev
                                }, {replace: true})
                            }  
                        />} 
                    label="Approved" 
                />
                <FormControlLabel 
                    control={
                        <Checkbox 
                            name="declinedStatus" 
                            checked={declinedStatus}
                            onChange={e => setSearchParams( prev => {
                                    prev.set("declined",e.target.checked);
                                    return prev
                                }, {replace: true})
                            }
                        />}
                    label="Declined" 
                />
            </FormGroup>

            <br />
            <Box>
                <TextField 
                    id="empId"
                    name="empId"
                    fullWidth 
                    label="Employee ID"
                    variant="filled"
                    value={empId}
                    onChange={e => setSearchParams( prev => {
                            prev.set("empId",e.target.value);
                            return prev
                        }, {replace: true})
                    }
                />
            </Box>

            <br />
            <FormGroup 
                style={{
                    flexDirection:"row", justifyContent:"space-between", 
                    flexWrap: "nowrap", translate: "15px 0"
                }}>
                <FormControlLabel 
                    control={
                        <TextField
                            margin="normal"
                            fullWidth
                            id="StartDate"
                            type="date"
                            label="Starting from"
                            name="startDate"
                            autoComplete="StartDate"
                            autoFocus
                            value={startDate}
                            InputLabelProps={{ shrink: true }}
                            onChange={e => setSearchParams( prev => {
                                    prev.set("startDate",e.target.value);
                                    return prev
                                }, {replace: true})
                            }
                        />
                    }
                />
                <FormControlLabel 
                    control={
                        <TextField
                            margin="normal"
                            fullWidth
                            id="EndDate"
                            type="date"
                            label="Ending till"
                            placeholder=""
                            name="endDate"
                            autoComplete="EndDate"
                            autoFocus
                            value={endDate}
                            InputLabelProps={{ shrink: true }}
                            onChange={e => setSearchParams( prev => {
                                    prev.set("endDate",e.target.value);
                                    return prev
                                }, {replace: true})
                            }
                        />
                    } 
                />
            </FormGroup>

            <br />
            <Box justifyContent={"right"}>
                <ButtonGroup variant="outlined" aria-label="Basic button group" style={{width:"100%"}}>
                    <Button style={{width:"50%"}} onClick={handleApplyFilters}>Apply Filters</Button>
                    <Button style={{width:"50%"}} onClick={handleClearFilters}>Clear Filters</Button>
                </ButtonGroup>
            </Box>
        </>
    )
}