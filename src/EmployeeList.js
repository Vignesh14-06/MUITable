import React, { useState } from "react";
import "./employeestyle.css";
import { TextField, Typography, Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import EmployeeTable from "./EmployeeTable";
import InputAdornment from '@mui/material/InputAdornment';
import searchIcon from './Images/search.svg';
import 'jspdf-autotable'
import jsPDF from "jspdf";
import axios from "axios";
import moment from "moment/moment";
import ListSubheader from '@mui/material/ListSubheader';



const EmployeeList = () => {
  const [data, setData] = React.useState([]);
  const [selected,setSelected] = useState([]);
  const[selectedRole,setSelectedRole]=useState();
  const headCells = [
    {
      id: "name",
      title: "Employee Name",
      width: "250px",
    },
    {
      id: "empId",
      title: "Employee ID",
      width: "200px",
    },
    {
      id: "role",
      title: "Role",
      width: "200px",
    },
    {
      id: "emailId",
      title: "Email",
      width: "250px",
    },
    {
      id: "joiningDate",
      title: "Joining Date",
      width: "100px",
    },
    {
      id: "actions",
      title: "Actions",
      width: "100px",
    },
  ];

  React.useEffect(() => {
    apiData();
  }, []);
  const removeRole = (data) =>{
    let role = []
    for(let i=0; i < data.length; i++){
      if(role.indexOf(data[i]) === -1){
        role.push(data[i])
      }
    }
    return role
  }
 const roleData = data.map((data)=>data.role)
 let roleList = removeRole(roleData)
 
  const apiData = async () => {
    let response = await axios.get("http://localhost:8000/employeeDetail");
    setData(response.data);
  };
  const tableData = data.map((data)=>[data.name,data.empId,data.role,data.emailId,data.joiningDate])

  const selectedId = (id)=>{
    setSelected(id)
}

  const handleChange = (e)=>{
    if(e.target.value === 'Delete'){
      const deletedData = data.filter((data)=>!selected.includes(data))
      setData(deletedData)
    }
    if(e.target.value === 'ExportPdf'){
      const doc = new jsPDF()
      doc.text("EmployeeDetails",30,10)
     doc.autoTable({
      columns:headCells.map((d)=>({...d,datakey:d.id})), 
        body:tableData
      })
      doc.save('EmployeeDetail.pdf')
    }
  }

const handleChange1 = (e) =>{
  if(e.target.value === "last7days"){
    let day = moment().subtract(60, 'd');
    let todate = moment(day).format("DDMMYYYY")
    let fromdate = moment().format("DDMMYYYY")


   // let date=Date.parse(todate);
   // console.log(typeof(date));

    console.log(todate.substring(0,2),todate.substring(2,4),todate.substring(4,8))
   let filteredDay = data.filter((x)=>{
   let filter=x.joiningDate;
   console.log(filter.substring(0,2),fromdate.substring(0,2),filter.substring(0,2),todate.substring(0,2) ,filter.substring(3,5),fromdate.substring(2,4),filter.substring(3,5),todate.substring(2,4),filter.substring(6,10),fromdate.substring(4,8))
   
    return (
   (filter.substring(0,2) <= fromdate.substring(0,2) &&
    filter.substring(0,2) >= todate.substring(0,2) )&&
    (filter.substring(3,5) <= fromdate.substring(2,4) && filter.substring(3,5) >= todate.substring(2,4))&&(filter.substring(6,10)===fromdate.substring(4,8))
    )
    })

   setData(filteredDay)
    
  }

}


  const handleChange2 = (e)=>{
    console.log(e.target.value,"rolestarget")
    setSelectedRole(e.target.value)

    if(e.target.value.props.children ===  "Frontend Developer"){
      const roleFilter = data.filter((data)=> data.role === "Frontend Developer")
      setData(roleFilter)
    }
    if(e.target.value.props.children === "Backend Developer"){
      const roleFilter = data.filter((data)=> data.role === "Backend Developer")
      setData(roleFilter)
    }
    if(e.target.value.props.children === "FullStack Developer"){
      const roleFilter = data.filter((data)=> data.role === "FullStack Developer")
      setData(roleFilter)
    }
    if(e.target.value.props.children === "Software Developer"){
      const roleFilter = data.filter((data)=> data.role === "Software Developer")
      setData(roleFilter)
    }
    if(e.target.value.props.children === "Team Lead"){
      const roleFilter = data.filter((data)=> data.role === "Team Lead")
      setData(roleFilter)
    }
    if(e.target.value.props.children === "CEO"){
      const roleFilter = data.filter((data)=> data.role === "CEO")
      setData(roleFilter)
    }
    if(e.target.value.props.children === "Mern Developer"){
      const roleFilter = data.filter((data)=> data.role === "Mern Developer")
      setData(roleFilter)
    }
    if(e.target.value.props.children === "Bussiness Analyst"){
      const roleFilter = data.filter((data)=> data.role === "Bussiness Analyst")
      setData(roleFilter)
    }
    if(e.target.value.props.children === "Managing Director"){
      const roleFilter = data.filter((data)=> data.role === "Managing Director")
      setData(roleFilter)
    }
    if(e.target.value.props.children === "Testing Engineer"){
      const roleFilter = data.filter((data)=> data.role === "Testing Engineer")
      setData(roleFilter)
    }
    if(e.target.value.props.children === "Devops Engineer"){
      const roleFilter = data.filter((data)=> data.role === "Devops Engineer")
      setData(roleFilter)
    }
    if(e.target.value.props.children === "System Emgineer"){
      const roleFilter = data.filter((data)=> data.role === "System Emgineer")
      setData(roleFilter)
    }

  }

  const handleChange3 = (e) =>{
    let datas = [...data]
    if(e.target.value === "asc"){
      let ascData = datas.sort((a,b)=>a.name.localeCompare(b.name))
      setData(ascData)
    }
    if(e.target.value === "dsc"){
      let dscData = datas.sort((a,b)=>b.name.localeCompare(a.name))
      setData(dscData)
    }
  }
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
      <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginLeft:"50px",marginRight:"40px",marginTop:"44px"}}>
        <div style={{display:'flex',justifyContent:'flex-start',gap:'40px'}}>
        <div>
        <FormControl sx={{minWidth: 120}} size="small">
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={"action"}
        onChange={handleChange}
      >
        <MenuItem value='action'><en>Action</en></MenuItem>
        <MenuItem value={"Delete"}>Delete</MenuItem>
        <MenuItem value={"ExportPdf"}>Export PDF</MenuItem>
      </Select>
      </FormControl>
        </div>
        <div>
        <TextField
          placeholder="Search"
          className="textsss"
          InputProps={{
            startAdornment: <InputAdornment position="start"><img src={searchIcon} alt=""/></InputAdornment>,
          }}
        />
        </div>
        </div>
        <div style={{display:'flex',gap:'20px'}}>
        <div>
        <FormControl sx={{minWidth: 130}} size="small">
      <InputLabel id="demo-select-small-label">FilterByDate</InputLabel>
        <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value=""
        onChange={handleChange1}
      >
        <MenuItem value={"last7days"}>Last 7 Days</MenuItem>
        <MenuItem value={"last30days"}>Last 30 Days</MenuItem>
        <MenuItem value={"last60days"}>Last 60 Days</MenuItem>
      </Select>
      </FormControl>
        </div>
        <div>
        <FormControl sx={{minWidth: 120}} size="small">
      <InputLabel id="demo-select-small-label">Filter by</InputLabel>
        <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={selectedRole}
        onChange={handleChange2}
      >
         <ListSubheader>Role</ListSubheader>
         {roleList.map((x)=> <MenuItem value={<li>{x}</li>}>{<li>{x}</li>}</MenuItem>)}
         {/* <MenuItem value={"FrontendDeveloper"}>Frontend Developer</MenuItem>
         <MenuItem value={"BackendDeveloper"}>Backend Developer</MenuItem>
         <MenuItem value={"FullStackDeveloper"}>FullStack Developer</MenuItem>
         <MenuItem value={"SoftwareDeveloper"}>Software Developer</MenuItem>
         <MenuItem value={"TeamLead"}>Team Lead</MenuItem>
         <MenuItem value={"CEO"}>CEO</MenuItem>
         <MenuItem value={"MernDeveloper"}>Mern Developer</MenuItem>
         <MenuItem value={"BussinessAnalyst"}>Bussiness Analyst</MenuItem>
         <MenuItem value={"ManagingDirector"}>Managing Director</MenuItem>
         <MenuItem value={"TestingEngineer"}>Testing Engineer</MenuItem>
         <MenuItem value={"DevopsEngineer"}>Devops Engineer</MenuItem>
        <MenuItem value={"SystemEmgineer"}>System Emgineer</MenuItem>*/}
        <MenuItem value={"Department"}>Department</MenuItem> 
      </Select>
      </FormControl>
        </div>
        <div>
        <FormControl sx={{minWidth: 120}} size="small">
      <InputLabel id="demo-select-small-label">Sort by</InputLabel>
        <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value=""
        onChange={handleChange3}
      >
        <MenuItem value={"asc"}>Ascending</MenuItem>
        <MenuItem value={"dsc"}>Desending</MenuItem>
      </Select>
      </FormControl>
        </div>
      </div>
      </div>
      <div style={{ marginLeft: "40px", marginRight: "40px",marginTop:"21px"}}>
        <EmployeeTable data={data} headCells={headCells} selectedId={selectedId}/>
      </div>
    </div>
  );
};

export default EmployeeList;
