import axios from "axios";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const appContext = createContext()

const initialUserState = {smile: false, Left: false, Right: false, finger: 0, hand: 0}

const ContextProvider = ({children}) =>{
	const [userState, setUserState] = useState(initialUserState)
	const [videoState, setVideoStart] = useState({initial: true, started: false, blocked: false})
	const [file, setFiles] = useState(null)
	const [message, setMessage] = useState('')
	const [formOpen, setFormOpen] = useState(false)
	const [apiInput, setAPIInput] = useState('')

	useEffect(()=>{
		const apiKey = sessionStorage.getItem('apiKey')
		if(!apiKey){
			setFormOpen(true)
		}else{
			window["loadAPIKeys"](apiKey).then((res) => { 
				if(!res){
					setFormOpen(true)
				}
			}).catch((err)=>setMessage('Something went wrong!'))
		}
	}, [])

    const video = useRef(null)
	const startBtn = useRef(null)
	const stopBtn = useRef(null)
	const canvas = useRef(null)

	useEffect(()=>{
		let timerInterval
		if(videoState.started){
			window["loadAPIKeys"](sessionStorage.getItem('apiKey')).then((res) => {
		if (res) {
			timerInterval = setInterval(()=>{
				const data = window["callService"](video.current, canvas.current, canvas.current.getContext('2d'));
				if(data){
				const {smile, Left, Right, finger, hand} = data
				const filteredData = {smile, Left, Right, finger, hand}
				for(const i in filteredData){
					if(filteredData[i]){
						setUserState((prev)=>{
							return {...prev, [i]: filteredData[i]}
						})
					}
				}
			}
			}, 1000)
		} else {  
			// Handle if apikey is invalid case.
			setMessage('Your API key is invalid!')
			setVideoStart((prev)=>{
				return {...prev, started: false}
			})
		}  
	}).catch(err=>setMessage('Something went wrong!')); 
		}else{
		window["closeSocket"]()
		}

		return ()=>{
			clearInterval(timerInterval)
		}
	}, [videoState.started])

	useEffect(()=>{
		const timer = setTimeout(()=>setMessage(''), 3000)

		return ()=>clearTimeout(timer)
	}, [message])

	const handleFileSubmit = async(e) =>{
		e.preventDefault()
			try{
			const response = await axios.get("https://developer.readyapis.com/api/AbsoluteToken/getAllApplications",
			{
				headers: {
								"api-key": "9e2b96711167486cb103c8b40c16ded3"
							},
				timestamp: new Date().toISOString()
			})
			console.log(response);
		}catch(err){
		console.log(err, new Date().toISOString());
	}
	}

	const handleSubmit = (e) =>{
		e.preventDefault()
		if(apiInput){
			window["loadAPIKeys"](apiInput).then((res) => {
				if(res){
					setFormOpen(false)
					sessionStorage.setItem('apiKey', apiInput)
					setMessage('Successfull')
				}else{
					setMessage('Invalid API key!')
				}
			})
		}else{
			setMessage('Please enter your api key')
		}
	}

    return <appContext.Provider value={{video, startBtn, stopBtn, canvas, userState, videoState, setVideoStart, file, setFiles,
			handleFileSubmit, message, setMessage, formOpen, apiInput, setAPIInput, handleSubmit}}>
        {children}
    </appContext.Provider>
}

const useGlobalContext = () =>{
    return useContext(appContext)
}

export {useGlobalContext, ContextProvider}