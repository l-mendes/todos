import { CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      textAlign: 'center',
    }
  }
});

const LoadingSpinner = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress color="primary" />
    </div>
  )
}

export default LoadingSpinner;