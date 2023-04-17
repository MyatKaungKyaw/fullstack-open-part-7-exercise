import { useState } from "react";
import PropTypes from "prop-types";
import {
  TextField,
  Button,
} from '@mui/material'

const LogIn = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPasswod] = useState("");

  const usernameOnChange = (e) => {
    setUsername(e.target.value);
  };

  const passwordOnChange = (e) => {
    setPasswod(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await props.handleLogin(username, password);
    setUsername("");
    setPasswod("");
  };

  return (
    <div className='login'>
      <h2>log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <TextField
            type="text"
            label="username"
            value={username}
            onChange={usernameOnChange}
          />
        </div>
        <div>
          password
          <TextField
            type="password"
            label="password"
            value={password}
            onChange={passwordOnChange}
          />
        </div>
        <Button variant="contained" color="primary" type="submit">LogIn</Button>
      </form>
    </div>
  );
};

LogIn.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default LogIn;
