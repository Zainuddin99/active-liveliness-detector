import { useCallback, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { MdPhotoCamera } from 'react-icons/md';
import { useGlobalContext } from '../context';
import CustomizedSwitches from './IOSSwitch';

function Video(){
	const {video, canvas, videoState, setMessage, setVideoStart} = useGlobalContext()

	const accessCamera = useCallback(()=>{
		if (navigator.mediaDevices.getUserMedia) {  
			navigator.mediaDevices.getUserMedia({ video: true })
			.then(function(stream) {
			if(videoState.blocked){
				setVideoStart((prev)=>{
			return {...prev, blocked: false}
		})
			} 
			video.current.srcObject = stream;  
			video.current.play();  
		})  
		.catch(function(err) {  
		// Handle errors if required
		setVideoStart((prev)=>{
			return {...prev, blocked: true}
		})
		setMessage('Please allow the camera to be continued...')
		});  
	}   
	}, [setMessage, setVideoStart, video, videoState.blocked])

	useEffect(accessCamera, [accessCamera])

	if(videoState.blocked){
		return <div className="no-video-access">
			<div>
				<MdPhotoCamera style={{fontSize:"5rem"}} />
				<Alert variant='warning'>No Camera access</Alert>
			</div>
		</div>
	}

	return (
	<div className='video-container'>
		<video ref={video} className="webCamWidth"></video>
		<canvas ref={canvas} className="d-none" style={{display: "none"}}></canvas>
		<div className='switch-container'>
		<CustomizedSwitches/>

		<p className={`video-text ${videoState.started ? 'started': ''}`}>{videoState.initial ? 'Start the camera to record' : videoState.started ? 'Recording' : 'Stopped'}</p>
		</div>
	</div>
	)
}

export default Video;
