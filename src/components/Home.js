import { useContext } from 'react'
import { Card } from 'react-bootstrap'
import { ControlContext } from '../App'
function Home(){
    const controller = useContext(ControlContext)
    const nameImages = controller.nameImageList()
    return (
        <div className="container-fluid mt-4">
            <div className="row">
            {nameImages.map((item,index) => (
            <div key={index} className="col-auto mb-3">
                <Card border = 'primary' style={{width: '18rem'}}>
                    <Card.Header>{item.name}</Card.Header>
                    <Card.Body>          
                    {item.image?(
                    <img  
                        width="200"
                        alt={item.filename}
                        src={`data:image/jpeg;base64,${item.image}`} 
                        // src={data.filePath}
                    />
                    ):(
                    <form onSubmit={controller.handleImageSubmit}>
                        <input
                            type='file'
                            className='custom-file-input'
                            data-key={index}
                            onChange={controller.handleImageChange}
                        />
                        <input
                            type='submit'
                            value='Upload'
                            className='btn btn-primary btn-block mt-4'
                        />
                    </form>
                    )}
                    </Card.Body>
                </Card>
            </div>
            ))}
            </div>
        </div>
    )
}

export default Home