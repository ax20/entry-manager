import { useLocation } from 'react-router-dom'
import { CssBaseline, makeStyles } from '@material-ui/core'
import InputDialog from './InputDialog'
import OutputTable from './OutputTable'
import Header from './Header'
import Footer from './Footer'
import Home from './Home'
import SideBar from './SideBar'

export const drawerWidth = 200

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    [theme.breakpoints.up('sm')]: {
      marginLeft: drawerWidth
    }
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1
    //padding: theme.spacing(3)
  }
}))
function Main() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <InputDialog />
      <SideBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {useLocation().pathname === '/' ? <Home /> : <OutputTable />}
      </main>
      <Footer />
    </div>
  )
}

export default Main
