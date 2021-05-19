import { useState } from 'react'
import useDataApi from './useDataApi'
import useImageApi from './useImageApi'
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
export default function useController(url){
  const carname = useFormInput('Nissan')
  const mileage = useFormInput(10000)
  const total = useFormInput(1000.0)
  const gastotal = useFormInput(1000.0)

  const [data, {insert,remove,update}] = useDataApi(url)
  const [image, insertImage] = useImageApi(url)

  const [file, setFile] = useState('')
  const [show, setShow] = useState(false)
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

  function handleSubmit(e) {
    e.preventDefault()
    insert(carname, mileage, total, gastotal)
    setShow(false)
  }

  function handleDelete(e) {
    e.preventDefault()
    const id = e.target.getAttribute('data-key')
    remove(id)
  }

  function handleUpdate(e) {
    e.preventDefault()
    const id = e.target.getAttribute('data-key')
    const i = data.findIndex(el => el.id === parseInt(id))
    carname.setValue(data[i].car_name)
    mileage.setValue(data[i].car_mileage)
    total.setValue(data[i].txn_total)
    gastotal.setValue(data[i].txn_gas_total)

    setIndex(i)
    setIsUpdate(true)
    setShow(true)
  }

  function handleUpdateSubmit(e) {
    e.preventDefault()
    const updateObject = {
      id: data[index].id,
      txn_date: data[index].txn_date,
      car_name: carname.value,
      car_mileage: parseInt(mileage.value),
      distance_between_entry: data[index].distance_between_entry,
      txn_total: parseInt(total.value),
      txn_gas_total: parseInt(gastotal.value),
      txn_mpg: data[index].txn_mpg
    }
    update(index,updateObject)
    setShow(false)
    setIsUpdate(false)
  }

  function handleImageChange(e) {
    //console.log(e.target)
    setFile(e.target.files[0])
    setIndex(e.target.getAttribute('data-key'))
  }

  function handleImageSubmit(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', file)
    //console.log(nameList())
    if(Array.isArray(data) && data.length > 0 && index >= 0)
      insertImage(nameList()[index], formData)
    //console.log(image)
  }
  function nameList() {
    if(Array.isArray(data) && data.length > 0) {
      const array = data.reduce((result, item) => [...result, item.car_name],[])
      return Array.from(new Set(array))
    } else return []
  }

  function nameImageList() {
    var array = []
    //console.log(image)
    nameList().forEach((item,index)=>{
      const i = image.findIndex(el => el.carname === item)
      if(i >= 0)
        array=[...array, {name:item, image:image[i].img, filename:image[i].name}]
      else
        array=[...array, {name:item, image:null, filename:null}]
    })
    return array
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
    },
    image,
    handleImageSubmit,
    handleImageChange,
    nameList,
    nameImageList
  }
}