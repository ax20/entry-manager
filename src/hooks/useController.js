import { useState, useEffect } from 'react'
import axios from 'axios'

function useController(url,carname,mileage,total,gastotal){
    const [show, setShow] = useState(false)
    const [data, setData] = useState([])

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)
    useEffect(() => {
      const fetchData = async () => {
          try {
            const result = await axios(`${url}/view/Nissan`)
            setData(result.data)
          } catch (error) {
            console.log(error)
          }
      }
      fetchData()
      //const interval = setInterval(fetchData, 1000)
      //return clearInterval(interval)
    }, [url])
    function handleSubmit(e) {
        e.preventDefault()
        axios.post(`${url}/create/${carname.value}`, {
          car_name: carname.value,
          car_mileage: mileage.value,
          txn_date: new Date().toString(),
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
        data,
        form: {
          carname,
          mileage,
          total,
          gastotal,
          handleSubmit,
        },
        modal:{
          show,
          handleShow, 
          handleClose
        },
    }
}

export default useController