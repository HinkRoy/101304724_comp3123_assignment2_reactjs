import {
  Box,
  Card,
  CardContent,
} from "@mui/material";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import Header from "./Header";

function ViewEmployee() {
  const [employee, setEmployee] = useState({});

  const params = useParams();

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/emp/employees/" + params.id)
      .then(res => res.json())
      .then(res => {
        setEmployee(res)
      })
  }, [params.id])

  return (
    <Box>
      <Header />
      <Box p={4} display="flex" justifyContent="center">
        <Card sx={{ width: 500 }}>
          <CardContent>
            <h1>View Employee Details</h1>
            <Box mb={2}>
              Employee First Name: {employee.first_name}
            </Box>
            <Box mb={2}>
              Employee Last Name: {employee.last_name}
            </Box>
            <Box mb={2}>
              Employee Email Id: {employee.email}
            </Box>
            <Box mb={2}>
              Employee Gender: {employee.gender}
            </Box>
            <Box mb={2}>
              Employee Salary: {employee.salary}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}

export default ViewEmployee
