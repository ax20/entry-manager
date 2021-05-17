import axios from 'axios'
import { useEffect, useReducer } from 'react'
import dataReducer from '../reducers/dataReducer'

function useDataApi(url){
    const [state, dispatch] = useReducer(dataReducer, {
        data: [], error: ''
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios(`${url}/view`)
                if(Array.isArray(result.data))
                  dispatch({ type: 'ResetData', payload: result.data })
            } catch (error) {
                dispatch({ type: 'Failure', payload: error })
            }
        }
        fetchData()
        //const interval = setInterval(fetchData, 1000)
        //return ()=>clearInterval(interval)
    }, [url])

    function insert(carname, mileage, total, gastotal) {
        axios.post(`${url}/create/${carname.value}`, {
            car_name: carname.value,
            car_mileage: mileage.value,
            //txn_date: new Date().toString(),
            txn_total: total.value,
            txn_gas_total: gastotal.value 
          }).then(function (response) {
            console.log(response.data)
            dispatch({ type: 'InsertData', payload: response.data })
          }).catch(function (error) {
            dispatch({ type: 'Failure', payload: error })
          })
    }

    function remove(id) {
        axios.delete(`${url}/delete/${id}/not-good`)
        .then(function (response) {
          console.log(response)
          dispatch({ type: 'DeleteData', payload: id })
        }).catch(function (error) {
          dispatch({ type: 'Failure', payload: error })
        })
    }

    function update(index, updateObject) {
        axios.put(`${url}/update/${state.data[index].id}`, updateObject)
        .then(function (response) {
          console.log(response)
          const UpdatedData = state.data
          UpdatedData[index] = updateObject
          dispatch({ type: 'ResetData', payload: UpdatedData })
        }).catch(function (error) {
          dispatch({ type: 'Failure', payload: error })
        })
    }

    return [
        state.data,
        {
            insert,
            remove,
            update
        }
    ]
}

export default useDataApi