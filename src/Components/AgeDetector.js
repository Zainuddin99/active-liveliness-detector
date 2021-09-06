import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { useGlobalContext } from '../context'

function AgeDetector() {
    const {setFiles, handleFileSubmit} = useGlobalContext()
    return (
        <form>
            <Form.Control type="file" size="lg" name="file" onChange={(e)=>setFiles(e.target.files[0])}/>
            <Button type='submit' variant='btn btn-primary' onClick={handleFileSubmit}>Submit request</Button>
        </form>
    )
}

export default AgeDetector
