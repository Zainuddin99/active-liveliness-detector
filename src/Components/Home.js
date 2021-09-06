import { Button } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    
    return (
        <div>
            <Link to='/active-liveliness' className='page-link'><Button variant="contained">Lets get started</Button></Link>
        </div>
    )
}

export default Home
