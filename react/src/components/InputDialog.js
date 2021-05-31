import { useContext } from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FilledInput,
  InputLabel,
  makeStyles,
  FormControl
} from '@material-ui/core'
import { ControlContext } from '../App'

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: '500px'
  },
  margin: {
    margin: theme.spacing(1)
  }
}))
function InputDialog() {
  const classes = useStyles()
  const controller = useContext(ControlContext)
  return (
    <Dialog
      classes={{ paper: classes.paper }}
      aria-labelledby="form-dialog-title"
      maxWidth="lg"
      open={controller.modal.show}
      onClose={controller.modal.handleClose}
    >
      <form
        noValidate
        autoComplete="off"
        onSubmit={
          controller.isUpdate
            ? controller.handleUpdateSubmit
            : controller.form.handleSubmit
        }
      >
        <DialogTitle id="form-dialog-title">
          {controller.isUpdate ? 'Update Record' : 'New Record'}
        </DialogTitle>
        <DialogContent dividers>
          <FormControl variant="filled" className={classes.margin}>
            <InputLabel>Car Name</InputLabel>
            <FilledInput
              autoFocus
              placeholder="Nissan"
              value={controller.form.carname.value}
              onChange={controller.form.carname.handleChange}
            />
          </FormControl>
          <FormControl variant="filled" className={classes.margin}>
            <InputLabel>Mileage</InputLabel>
            <FilledInput
              placeholder="10000"
              type="number"
              value={controller.form.mileage.value}
              onChange={controller.form.mileage.handleChange}
            />
          </FormControl>
          <FormControl variant="filled" className={classes.margin}>
            <InputLabel>Total</InputLabel>
            <FilledInput
              placeholder="1000.0"
              type="number"
              step="any"
              value={controller.form.total.value}
              onChange={controller.form.total.handleChange}
            />
          </FormControl>
          <FormControl variant="filled" className={classes.margin}>
            <InputLabel>Gas Total</InputLabel>
            <FilledInput
              placeholder="1000.0"
              type="number"
              step="any"
              value={controller.form.gastotal.value}
              onChange={controller.form.gastotal.handleChange}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="primary" variant="outlined">
            {controller.isUpdate ? 'Update' : 'Create'}
          </Button>
          <Button
            color="primary"
            variant="outlined"
            onClick={controller.modal.handleClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default InputDialog
