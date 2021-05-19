import axios from 'axios'
import { useState,useEffect } from 'react'
function useImageApi(url) {
    const [image, setImage] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios(`${url}/images`)
                setImage(result.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        //const interval = setInterval(fetchData, 1000)
        //return ()=>clearInterval(interval)
    }, [url])
    function insertImage(carname, formData) {
        //console.log(carname)
        axios.post(`${url}/upload/${carname}`, formData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        }).then(function(result){
            console.log(result.data)
            setImage([...image, result.data])
            //const { filepath, filename, carname } = res.data
            //setData({ filepath, filename, carname })
        }).catch(function(err){
            console.log(err)
        })
    }
    return [
        image,
        insertImage
    ]      
}

export default useImageApi