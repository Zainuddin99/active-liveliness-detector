import React from 'react'
import { useGlobalContext } from '../context'

function Message() {
    const {message} = useGlobalContext()
    return (
        <div className={`message ${message ? 'open' : ''}`}>
            {message}
        </div>
    )
}

export default Message
