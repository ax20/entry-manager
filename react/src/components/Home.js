import { useContext } from 'react'
import {
  Grid,
  Card,
  CardContent,
  makeStyles,
  Typography
} from '@material-ui/core'
import { ControlContext } from '../App'

const useStyles = makeStyles((theme) => ({
  card: {
    width: '25rem',
    textAlign: 'center',
    margin: theme.spacing(6)
  }
}))
export default function Home() {
  const classes = useStyles()
  const controller = useContext(ControlContext)
  const nameImages = controller.nameImageList()
  return (
    <Grid container>
      {nameImages.map((item, index) => (
        <Grid item xs={12} sm={3} key={index}>
          <Card className={classes.card}>
            <CardContent>
              <Typography component="h5" variant="h6">
                {item.name}
              </Typography>
              {item.image ? (
                <img
                  width="200"
                  alt={item.filename}
                  src={`data:image/jpeg;base64,${item.image}`}
                  // src={data.filePath}
                />
              ) : (
                <form onSubmit={controller.handleImageSubmit}>
                  <input
                    type="file"
                    className="custom-file-input"
                    data-key={index}
                    onChange={controller.handleImageChange}
                  />
                  <input
                    type="submit"
                    value="Upload"
                    className="btn btn-primary btn-block mt-4"
                  />
                </form>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
