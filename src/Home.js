import {
  Box,
  Button,
  Paper,
  Table, TableBody, TableCell,
  TableContainer,
  TableHead, TableRow,
} from "@mui/material";
import {useEffect, useState} from "react";
import Header from "./Header";
import {useNavigate} from "react-router";

function Home() {
  const [employees, setEmployees] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getEmployeeList()
  }, [])

  const getEmployeeList = () => {
    fetch('http://localhost:3000/api/v1/emp/employees')
      .then(res => res.json())
      .then(res => {
        setEmployees(res);
      })
  }

  const handleDelete = (id) => {
    fetch('http://localhost:3000/api/v1/emp/employees/' + id, {
      method: 'DELETE'
    }).then(() => {
      getEmployeeList()
    })
  }

  return (
    <Box>
      <Header />
      <Box p={4}>
        <h1>Employees List</h1>
        <Box mb={2}>
          <Button variant="contained" onClick={() => navigate('/addEmployee')}>Add Employee</Button>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Employee First Name</TableCell>
                <TableCell>Employee Last Name</TableCell>
                <TableCell>Employee Email Id</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <TableRow
                  key={employee.email}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{employee.first_name}</TableCell>
                  <TableCell>{employee.last_name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>
                    <Box display="flex" gap={2}>
                      <Button variant="contained" onClick={() => navigate('/updateEmployee/' + employee._id)}>Update</Button>
                      <Button variant="contained" color="error" onClick={() => handleDelete(employee._id)}>Delete</Button>
                      <Button variant="contained" onClick={() => navigate('/viewEmployee/' + employee._id)}>View</Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

export default Home
