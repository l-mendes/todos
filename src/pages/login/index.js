import React, { useState }  from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import baseUrl from '../../utils/baseUrl';
import LoginForm from '../../components/Login/Form';
import fetchJson from "../../utils/fetchJson";
import { makeStyles } from '@material-ui/core/styles';
import withSession from '../../utils/session';
import useUser from '../../utils/useUser';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
        Todo Tasks
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  }
}));

function SignIn() {
  const classes = useStyles();

  const { mutateUser } = useUser({
    redirectTo: '/dashboard',
    redirectIfFound: true,
  })

  const [errorMsg, setErrorMsg] = useState("");

  const userLogin = async (e) => {
    e.preventDefault();

    try {
      await mutateUser(
        fetchJson(baseUrl + '/api/login', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.value,
            password: password.value
          }),
        }),
      );
    } catch (error) {
      console.error("Ocorreu um erro inesperado:", error);
      setErrorMsg(error.data.message);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Todo Tasks
        </Typography>
        <LoginForm errorMessage={errorMsg} onSubmit={userLogin} />
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get('user') || {isLoggedIn: false};

  if (user?.isLoggedIn) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  }

  return {
    props: { user },
  }
})

export default SignIn;