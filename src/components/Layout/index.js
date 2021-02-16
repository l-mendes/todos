import { makeStyles } from '@material-ui/core';
import { useState } from 'react';
import TopBar from '../TopBar';
import NavBar from '../NavBar';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      backgroundColor: theme.palette.background.default,
      display: 'flex',
      height: '100vh',
      overflow: 'hidden',
      width: '100vw',
    },
    wrapper: {
      display: 'flex',
      flex: '1 1 auto',
      overflow: 'hidden',
      marginTop: 60,
    },
    contentContainer: {
      display: 'flex',
      flex: '1 1 auto',
      overflow: 'hidden',
      padding: 10,
    },
    content: {
      flex: '1 1 auto',
      height: '100%',
      overflow: 'auto',
    },
  };
});

const Layout = ({ children }) => {
  const classes = useStyles();
  const [drawerState, setDrawerState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawerState(open);
  };

  return (
    <>
      <div className={classes.root}>
        <TopBar toggleDrawer={toggleDrawer} />
        <NavBar drawerState={drawerState} toggleDrawer={toggleDrawer} />
        <div className={classes.wrapper}>
          <div className={classes.contentContainer}>
            <div className={classes.content}>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
