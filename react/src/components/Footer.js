import { Typography, Container, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor: 'rgb(220, 220, 220)'
  }
}))
function Footer() {
  const classes = useStyles()
  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © Ashwin Charathsandran and David Liang '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </footer>
  )
}

export default Footer
