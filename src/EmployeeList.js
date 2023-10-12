import React from "react";
import "./employeestyle.css";
import { TextField, Typography, Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import EmployeeTable from "./EmployeeTable";
import InputAdornment from '@mui/material/InputAdornment';
import searchIcon from './Images/search.svg';

const EmployeeList = () => {
  return (
    <div className="main">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography className="typo"> Employess</Typography>
        <Button className="button1">Add New Employee</Button>
      </div>
      <div style={{display:'flex',justifyContent:'flex-start',marginLeft:'50px',gap:'20px'}}>
        <div >
        <FormControl sx={{minWidth: 120}} size="small">
      <InputLabel id="demo-select-small-label">Action</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        // value={age}
        // onChange={handleChange}
      >
        <MenuItem value={10}>Delete</MenuItem>
        <MenuItem value={20}>Export PDF</MenuItem>
      </Select>
    </FormControl> 
        </div>
        <TextField
          placeholder="Search"
          className="textsss"
          InputProps={{
            startAdornment: <InputAdornment position="start"><img src={searchIcon} alt=""/></InputAdornment>,
          }}
        />
      </div>
      <div style={{ marginLeft: "40px", marginRight: "40px" }}>
        <EmployeeTable />
      </div>
    </div>
  );
};

export default EmployeeList;
