import { useContext } from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Paper,
  Button
} from '@material-ui/core'
import { ControlContext } from '../App'
export default function OutputTable() {
  const controller = useContext(ControlContext)
  const path = useLocation().pathname
  const matchNumber = controller.data.filter(
    (v) => '/' + v.car_name === path
  ).length
  if (matchNumber !== 0)
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="right">Car Name</TableCell>
              <TableCell align="right">Mileage</TableCell>
              <TableCell align="right">Distance Between Entry</TableCell>
              <TableCell align="right">Txn Date</TableCell>
              <TableCell align="right">Txn Gas Total</TableCell>
              <TableCell align="right">Txn mpg</TableCell>
              <TableCell align="right">Txn Total</TableCell>
              <TableCell align="right">Delete</TableCell>
              <TableCell align="right">Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {controller.data.map((item, index) =>
              path === '/' + item.car_name ? (
                <TableRow key={index} style={{ width: '60rem' }}>
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell align="right">{item.car_name}</TableCell>
                  <TableCell align="right">{item.car_mileage}</TableCell>
                  <TableCell align="right">
                    {item.distance_between_entry}
                  </TableCell>
                  <TableCell align="right">{item.txn_date}</TableCell>
                  <TableCell align="right">{item.txn_gas_total}</TableCell>
                  <TableCell align="right">{item.txn_mpg}</TableCell>
                  <TableCell align="right">{item.txn_total}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      color="secondary"
                      data-key={item.id}
                      onClick={controller.handleDelete}
                    >
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      color="primary"
                      data-key={item.id}
                      onClick={controller.handleUpdate}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ) : null
            )}
          </TableBody>
        </Table>
      </TableContainer>
    )
  else return <Redirect to="/" />
}
