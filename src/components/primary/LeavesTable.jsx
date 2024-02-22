import { useTheme } from "@emotion/react";
import {Box, IconButton, Typography} from "@mui/material"
import { Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from "@mui/material";
import { useEffect, useState } from "react";

import Paper from '@mui/material/Paper';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { toDateAndTimeString, toLocaleDateString, toPostStatusText, toLocaleString } from "../../utils";
import { UpdatePostById, GetAllPosts, GetPostsByEmployee } from "../../api/Posts";
import { useSearchParams } from "react-router-dom";
/*
 * Employee's View
 * 
 * 
 * Admin's View
 * 
 * 
 */

export default function LeavesTable({userType, editable = false, filterable = false, pendingForced = false, status, startDate, endDate}){
    const [records, setRecords] = useState([]);
    const [searchParams, _] = useSearchParams({
      pending: true,
      approved: true,
      declined: true,
      empId: "",
      startDate: "",
      endDate: ""
    });
    console.log({filterable})
    useEffect(() => {
      async function getPostsBasedOnUser(){
        if(userType == "a"){
          const r = await GetAllPosts();
          // console.log(r)
          setRecords(r ? r : []);
        }
        else if(userType == "e"){
          const r = await GetPostsByEmployee();
          // console.log(r)
          setRecords(r ? r : []);
        }
      }
      getPostsBasedOnUser();

    }, [])

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    function relevantRecords(){
      let result = records;
      if (editable && pendingForced) {
          result = records.filter(row => row.postStatus == 0);
          result.sort((a,b) => a.appliedOn - b.appliedOn)
      }
      if (filterable) {
        const pendingStatus = searchParams.get('pending') === "true";
        const approvedStatus = searchParams.get('approved') === "true";
        const declinedStatus = searchParams.get('declined') === "true";
        const empId = searchParams.get('empId');
        const startDate = new Date(searchParams.get('startDate')).getTime() || -1;
        const endDate = new Date(searchParams.get('endDate')).getTime() || Number.MAX_SAFE_INTEGER;

        console.log(pendingStatus, approvedStatus, declinedStatus)
        console.log(empId, startDate, endDate)

        const statuses = [pendingStatus ? 0 : null, approvedStatus ? 1 : null, declinedStatus ? 2: null]

        const statusFiltered = result.filter(row => statuses.indexOf(row.postStatus) != -1);
        result = statusFiltered;

        const empIdFiltered = result.filter(row => row.userId.indexOf(empId) != -1);
        result = empIdFiltered;

        const startdateFiltered = result.filter(row => row.startDate >= startDate);
        result = startdateFiltered;

        const enddateFiltered = result.filter(row => row.endDate <= endDate);
        result = enddateFiltered;
      }
      return result;
    } 

    async function handlePostPermission(id, status){
      const response = await UpdatePostById(id, status);
      if(response.status == "success") {
        const item = records.filter(r => r.id == id);
        console.log(item)
        item.postStatus = status;
        const rest = records.filter(r => r.id != id);
        setRecords([...rest, item]);

        if(response.result == "allow"){
          console.log("allowed")
        }else{
          console.log("declined")
        }
      }
    }

    return (
    <TableContainer component={Paper} sx={{ maxWidth:850 }}>
        <Table sx={{ minWidth: 750 }} aria-label="simple table" size={true ? 'small' : 'medium'}>
            <TableHead>
                <TableRow>
                    <TableCell style={{ width: 40, fontWeight:700 }} align="left">PostId</TableCell>
                    
                    {userType == "a" && <TableCell style={{ width: 50, fontWeight:700 }} align="center">EmpId</TableCell>}
                    <TableCell style={{ width: 100, fontWeight:700 }} align="center">Applied On</TableCell>

                    <TableCell style={{ width: 120, fontWeight:700 }} align="center">Reason</TableCell>
                    <TableCell style={{ width: 100, fontWeight:700 }} align="center">Start Date</TableCell>
                    <TableCell style={{ width: 100, fontWeight:700 }} align="center">End Date</TableCell>

                    {!editable ? 
                        <>
                            <TableCell style={{ width: 80, fontWeight:700 }} align="center">Status</TableCell>
                        </>
                        :
                        <>
                            <TableCell style={{ width: 40, fontWeight:700 }} align="center" colSpan={2}>Permission</TableCell>
                        </>
                    }
                </TableRow>
            </TableHead>
            <TableBody>
                {(relevantRecords()).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">{row.id}</TableCell>
                            {userType == "a" && <TableCell align="center">{row.userId}</TableCell>}
                            <TableCell align="center">{toLocaleString(row.appliedOn )}</TableCell>

                            <TableCell align="center">{row.reason}</TableCell>

                            <TableCell align="center">{toDateAndTimeString(row.startDate + new Date().getTimezoneOffset())}</TableCell>
                            <TableCell align="center">{toDateAndTimeString(row.endDate + new Date().getTimezoneOffset() )}</TableCell>


                            {!editable ? 
                                <>
                                    <TableCell align="center">{toPostStatusText(row.postStatus)}</TableCell>
                                </>
                                :
                                <>
                                    <TableCell align="right">
                                        <IconButton
                                            aria-label="allow"
                                            color="primary"
                                            onClick={() => { handlePostPermission(row.id, 1) }}
                                        >
                                            <DoneIcon style={{color:"yellowgreen"}}/>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            aria-label="decline"
                                            color="primary"
                                            onClick={() => { handlePostPermission(row.id, 2) }}
                                        >
                                            <CloseIcon style={{color:"red"}}/>
                                        </IconButton>
                                    </TableCell>
                                </>
                            }
                        </TableRow>
                    ))}
            </TableBody>
        <TableFooter>
            <TableRow>
              <TableCell colSpan={ userType == "a" ? (editable ? 5 : 4) : 3} />
                <TablePagination
                    rowsPerPageOptions={[5] || [5, 10, { label: 'All', value: -1 }]}
                    colSpan={3}
                    count={(relevantRecords()).length}
                    rowsPerPage={5 || rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                />
            </TableRow>
        </TableFooter>
        </Table>
    </TableContainer>
    )
}


function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }