import { Button, makeStyles, TextField } from '@material-ui/core'
import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { useGlobalContext } from '../context'

    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                },
                width: "1000px"
            },
        input: {
            '& > *': {
                width: "300px",
            }
        }
        }));

function APIKeyManager() {

    const {formOpen, apiInput, handleSubmit, setAPIInput} = useGlobalContext()

    const classes = useStyles()

    return (
        <CSSTransition in={formOpen} timeout={1000} classNames="form-container" unmountOnExit>
        <div className='api-key-form-container'>

            <form className='api-key-form' onSubmit={handleSubmit}>
                <h3>Enter your API Key to continue...</h3>
                <div>
                <TextField className={classes.input} label="API KEY" value={apiInput} onChange={(e)=>setAPIInput(e.target.value)} />
                <Button variant="contained" type="submit" color="primary">
                    Submit
                </Button>
                </div>
                <p className='no-api'>Dont have API key? Get it from <a href="https://developer.readyapis.com/" target='_blank' rel="noreferrer">developer.readyapis.com</a></p>
            </form>
        </div>
        </CSSTransition>
    )
}

export default APIKeyManager
