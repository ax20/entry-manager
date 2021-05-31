import { useContext } from 'react'
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  makeStyles
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { ControlContext } from '../App'
import { drawerWidth } from './Main'
//const drawerWidth = 200

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: 'blue',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  }
}))
export default function Header() {
  const controller = useContext(ControlContext)
  const classes = useStyles()
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={controller.handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Button
          variant="outlined"
          color="secondary"
          onClick={controller.modal.handleShow}
        >
          Create Record
        </Button>
      </Toolbar>
    </AppBar>
  )
}
