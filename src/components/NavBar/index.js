import { useRouter } from 'next/router';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';

const useStyles = makeStyles({
  root: {
    width: 250,
  },
  list: {
    marginTop: 0,
    paddingTop: 0,
  },
});

export default function NavBar({ drawerState, toggleDrawer }) {
  const theme = useTheme();
  const classes = useStyles();
  const router = useRouter();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const isSelected = (item) =>
    item.path === router.pathname ||
    (item.path !== '/' && router.pathname.startsWith(item.path));

  const primaryMenu = [
    { id: 1, label: 'Início', path: '/dashboard', icon: HomeIcon },
    { id: 2, label: 'Todo', path: '/todo', icon: ListIcon },
  ];

  const list = () => (
    <div
      className={classes.root}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List className={classes.list}>
        {primaryMenu.map((item) => {
          const Icon = item.icon;
          return (
            <div key={`menu_item_${item.id}`}>
              <ListItem
                key={`listItem_${item.id}`}
                button
                selected={isSelected(item)}
              >
                <ListItemIcon key={`listItemIcon_${item.id}`}>
                  <Icon
                    style={{
                      color: isSelected(item) && theme.palette.primary.dark,
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  key={`listItemText_${item.id}`}
                  primary={item.label}
                />
              </ListItem>
              <Divider />
            </div>
          );
        })}
      </List>
    </div>
  );

  return (
    <div>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        anchor="left"
        open={drawerState}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
    </div>
  );
}
