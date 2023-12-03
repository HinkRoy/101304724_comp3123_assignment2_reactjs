import {Box, Button, Card, CardContent, TextField, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useState} from "react";
import {useNavigate} from "react-router";

function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate()

  const handleRegister = () => {
    if (email && username && password && confPassword) {
      if (password !== confPassword) {
        setMessage('Confirm password should be equal to password.');
        return;
      }
      setMessage('');
      fetch(`http://localhost:3000/api/v1/user/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          username,
          password
        })
      }).then(res => res.json())
        .then(res => {
          navigate('/login')
        });
    } else {
      setMessage('Please fill all inputs!');
    }
  }

  return (
    <Box width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center">
      <Card sx={{ minWidth: 400 }}>
        <CardContent>
          <Typography sx={{ fontSize: 30, textAlign: 'center' }} fontWeight={700} gutterBottom>
            Signup
          </Typography>
          <Box mb={2}>
            <TextField fullWidth label="Email" variant="outlined" value={email} onChange={e => setEmail(e.target.value)} />
          </Box>
          <Box mb={2}>
            <TextField fullWidth label="Username" variant="outlined" value={username} onChange={e => setUsername(e.target.value)} />
          </Box>
          <Box mb={3}>
            <TextField fullWidth type="password" label="Password" variant="outlined" value={password} onChange={e => setPassword(e.target.value)} />
          </Box>
          <Box mb={3}>
            <TextField fullWidth type="password" label="Confirm Password" variant="outlined" value={confPassword} onChange={e => setConfPassword(e.target.value)} />
          </Box>
          <Box mb={2}>
            <Button variant="contained" fullWidth onClick={handleRegister}>Signup</Button>
          </Box>
          {
            message && (
              <Box mb={2}>
                <Typography sx={{color: 'red'}}>{message}</Typography>
              </Box>
            )
          }
          <Box>
            Already have account? <Link to="/login">Login</Link>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Signup
