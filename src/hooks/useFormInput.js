import {useState} from 'react'
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

  export default useFormInput