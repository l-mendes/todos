import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader  from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => {
  return {
    card: {
      backgroundColor: theme.palette.background.default,
      border: '1px solid #c1c1c1',
    },
    title: {
      borderBottom: '1px solid rgba(0, 0, 0, 0.15)',
      padding: 10,
      color: theme.palette.primary.dark,
    },
    footer: {
      borderTop: '1px solid rgba(0, 0, 0, 0.15)',
    }
  }
});

export default function TodoCard({title, children}) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader 
        title={title} 
        className={classes.title}
        titleTypographyProps={{variant:'body1' }}
        color="textSecondary"
      />
      <CardContent className={classes.body}>
        {children}
      </CardContent>
    </Card>
  );
}