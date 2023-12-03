import {Link} from "react-router-dom";
import {useState} from "react";
import {useNavigate} from "react-router";
import {Box, Button, Card, CardContent, TextField, Typography} from "@mui/material";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username && password) {
      setMessage('');
      fetch(`https://101304724-comp-3123-assignment1.vercel.app/api/v1/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      }).then(res => res.json())
        .then(res => {
          if (res.status) {
            localStorage.setItem('user', JSON.stringify(res))
            navigate('/home')
          } else {
            setMessage('Invalid email or password!');
          }
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
            Login
          </Typography>
          <Box mb={2}>
            <TextField fullWidth label="Username" variant="outlined" value={username} onChange={e => setUsername(e.target.value)} />
          </Box>
          <Box mb={3}>
            <TextField fullWidth type="password" label="Password" variant="outlined" value={password} onChange={e => setPassword(e.target.value)} />
          </Box>
          <Box mb={2}>
            <Button variant="contained" fullWidth onClick={handleLogin}>Login</Button>
          </Box>
          {
            message && (
              <Box mb={2}>
                <Typography sx={{color: 'red'}}>{message}</Typography>
              </Box>
            )
          }
          <Box>
            Don't have account? <Link to="/signup">Signup</Link>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Login
