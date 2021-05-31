import { ControlContext } from '../App'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import {
  Hidden,
  Divider,
  makeStyles,
  Drawer,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core'
import { drawerWidth } from './Main'
//const drawerWidth = 200

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  link: {
    textDecoration: 'none',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'rgb(58, 58, 59)'
  }
}))
function SideBar() {
  const controller = useContext(ControlContext)
  const classes = useStyles()
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <Link to="/" className={classes.link}>
          <ListItem button>
            <ListItemText inset primary="Home" />
          </ListItem>
        </Link>
        {controller.nameList().map((item, index) => (
          <Link to={'/' + item} key={index} className={classes.link}>
            <ListItem button>
              <ListItemText inset primary={item} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  )
  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          // anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={controller.mobileOpen}
          onClose={controller.handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  )
}

export default SideBar
