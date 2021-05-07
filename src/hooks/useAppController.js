import {useState} from 'react'
import axios from 'axios'
function useAppController(url,carname,mileage,total,gastotal){
    const [show, setShow] = useState(false)
    //const [data, setData] = useState([])

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)
    function handleSubmit(e) {
        e.preventDefault()
        console.log(carname)
        axios.post(`${url}/create/${carname.value}`, {
          car_name: carname.value,
          car_mileage: mileage.value,
          txn_date: Date.now(),
          txn_total: total.value,
          txn_gas_total: gastotal.value 
        }).then(function (response) {
          console.log(response)
/*          setData(data.concat({
            id: response.data.id,
            car_name: carname.value,
            car_mileage: mileage.value,
            txn_date: Date.now(),
            txn_total: total.value,
            txn_gas_total: gastotal.value 
          })) */
        }).catch(function (error) {
          console.warn(error)
        })
        setShow(false)
    }
    return {
        carname,
        mileage,
        total,
        gastotal,
        show,
        handleShow, 
        handleClose, 
        handleSubmit
    }
}

export default useAppController