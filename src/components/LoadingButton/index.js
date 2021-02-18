import { Button, CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    loading: {
      marginRight: 6,
    }
  }
});

const LoadingButton = (props) => {
  const classes = useStyles();
  const {
    children,
    loading,
    ...rest
  } = props;

  return (
    <Button {...rest}>
      {loading && <CircularProgress size={20} className={classes.loading} />}
      {children}
    </Button>
  )
}

export default LoadingButton;