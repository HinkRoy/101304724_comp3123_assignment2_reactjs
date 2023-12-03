import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import Header from "./Header";

function UpdateEmployee() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [salary, setSalary] = useState('');

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/emp/employees/" + params.id)
      .then(res => res.json())
      .then(res => {
        setFirstName(res.first_name);
        setLastName(res.last_name);
        setEmail(res.email);
        setGender(res.gender);
        setSalary(res.salary);
      })
  }, [params.id])

  const handleSave = () => {
    if (firstName && lastName && email && gender && salary) {
      fetch("http://localhost:3000/api/v1/emp/employees/" + params.id, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          gender: gender,
          salary: salary,
        })
      }).then(res => res.json())
        .then(res => {
          navigate('/home')
        })
    }
  }

  return (
    <Box>
      <Header />
      <Box p={4} display="flex" justifyContent="center">
        <Card sx={{ width: 500 }}>
          <CardContent>
            <h1>Update Employee</h1>
            <Box mb={2}>
              <TextField fullWidth label="First Name" variant="outlined" value={firstName} onChange={e => setFirstName(e.target.value)} />
            </Box>
            <Box mb={2}>
              <TextField fullWidth label="Last Name" variant="outlined" value={lastName} onChange={e => setLastName(e.target.value)} />
            </Box>
            <Box mb={2}>
              <TextField fullWidth label="Email Id" variant="outlined" value={email} onChange={e => setEmail(e.target.value)} />
            </Box>
            <Box mb={2}>
              <FormControl fullWidth>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  value={gender}
                  label="Age"
                  onChange={e => setGender(e.target.value)}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box mb={2}>
              <TextField fullWidth label="Salary" variant="outlined" value={salary} onChange={e => setSalary(e.target.value)} />
            </Box>
          </CardContent>
          <CardActions>
            <Button variant="contained" onClick={() => handleSave()}>Save</Button>
            <Button variant="contained" color="secondary" onClick={() => navigate('/home')}>Cancel</Button>
          </CardActions>
        </Card>
      </Box>
    </Box>
  )
}

export default UpdateEmployee
