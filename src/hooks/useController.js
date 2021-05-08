import { useState, useEffect } from 'react'
import axios from 'axios'
function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue)
  function handleChange(e) {
    setValue(e.target.value)
  }
  return {
    value,
    handleChange,
    setValue
  }
}
function useController(url){
  const carname = useFormInput('Nissan')
  const mileage = useFormInput(10000)
  const total = useFormInput(1000.0)
  const gastotal = useFormInput(1000.0)

  const [show, setShow] = useState(false)
  const [data, setData] = useState([])
  const [index, setIndex] = useState(-1)
  const [isUpdate, setIsUpdate] = useState(false)

  function handleShow () {
    setShow(true)
    setIsUpdate(false)
  } 
  function handleClose() {
    setShow(false)
    setIsUpdate(false)
  }
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
    const interval = setInterval(fetchData, 1000)
    return ()=>clearInterval(interval)
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
    }).catch(function (error) {
      console.warn(error)
    })
    setShow(false)
  }
  function handleDelete(e) {
    e.preventDefault()
    const id = e.target.getAttribute('data-key')
    axios.delete(`${url}/delete/${id}/not-good`)
    .then(function (response) {
      console.log(response)
    }).catch(function (error) {
      console.log(error)
    })
  }
  function handleUpdate(e) {
    e.preventDefault()
    const id = e.target.getAttribute('data-key')
    const index = data.findIndex(el => el.id === parseInt(id))
    carname.setValue(data[index].car_name)
    mileage.setValue(data[index].car_mileage)
    total.setValue(data[index].txn_total)
    gastotal.setValue(data[index].txn_gas_total)

    setIndex(index)
    setIsUpdate(true)
    setShow(true)
  }
  function handleUpdateSubmit(e) {
    e.preventDefault()
    axios.put(`${url}/update/${data[index].id}`, {
      car_name: carname.value,
      car_mileage: mileage.value,
      distance_between_entry: data[index].distance_between_entry,
      txn_total: total.value,
      txn_gas_total: gastotal.value,
      txn_mpg: data[index].txn_mpg
    }).then(function (response) {
      console.log(response)
    }).catch(function (error) {
      console.log(error)
    })
    setShow(false)
    setIsUpdate(false)
  }
  return {
    data,
    isUpdate,
    handleDelete,
    handleUpdate,
    handleUpdateSubmit,
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
    }
  }
}

export default useController