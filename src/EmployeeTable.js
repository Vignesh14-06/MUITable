import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import eye from "./Images/eye.svg";
import pencil from "./Images/edit-2.svg";
import deleteIcon from "./Images/arrow-circle-down Copy 2.svg";
import "./employeestyle.css";

const EmployeeTable = () => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  React.useEffect(() => {
    apiData();
  }, []);

  const apiData = async () => {
    let response = await axios.get("http://localhost:8000/employeeDetail");
    setData(response.data);
  };
  console.log(data, "data");

  const headCells = [
    {
      id: "firstName",
      label: "Employee Name",
      width: "250px",
    },
    {
      id: "empId",
      label: "Employee ID",
      width: "200px",
    },
    {
      id: "role",
      label: "Role",
      width: "200px",
    },
    {
      id: "email",
      label: "Email",
      width: "250px",
    },
    {
      id: "joiningDate",
      label: "Joining Date",
      width: "100px",
    },
    {
      id: "actions",
      label: "Actions",
      width: "100px",
    },
  ];

  function EnhancedTableHead(props) {

    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align="start"
              width={headCell.width}
              style={{ fontWeight: "700" }}
            >
              {headCell.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    console.log(page, "page");
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.firstName);
      console.log(newSelected, "newSelected");
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;
  return (
    <Box>
      <TableContainer>
        <Table aria-labelledby="tableTitle">
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
          />
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.firstName);
                const labelId = `enhanced-table-checkbox-${index}`;
                console.log(isItemSelected, "isItemSelected");

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    onClick={(event) => handleClick(event, row.firstName)}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.firstName}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox" align="start">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                      {`${row.firstName} ${row.lastName}`}
                    </TableCell>
                    <TableCell align="start">{row.empId}</TableCell>
                    <TableCell align="start">{row.role}</TableCell>
                    <TableCell align="start">{row.emailId}</TableCell>
                    <TableCell align="start">{row.joiningDate}</TableCell>
                    <TableCell align="start">
                      <div style={{ display: "flex", gap: "10px" }}>
                        <img src={eye} alt="" />
                        <img src={pencil} alt="" />
                        <img src={deleteIcon} alt="" />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default EmployeeTable;
