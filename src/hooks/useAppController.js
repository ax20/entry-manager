import {useState, useEffect} from 'react'
import axios from 'axios'
function useAppController(url,carname,mileage,total,gastotal){
    const [show, setShow] = useState(false)
    const [data, setData] = useState([])

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    useEffect(() => {
      const fetchData = async () => {
        try {
          //setIsLoading(true)
          const result = await axios(`${url}/view/Nissan`)
          console.log(result.data)
          setData(result.data)
          //setIsLoading(false)
        } catch (error) {
          console.warn(error)
        }
      }
      fetchData()
      //const interval = setInterval(fetchData, 1000)
      //return clearInterval(interval)
      // eslint-disable-next-line
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
        carname,
        mileage,
        total,
        gastotal,
        data,
        show,
        handleShow, 
        handleClose, 
        handleSubmit
    }
}

export default useAppController