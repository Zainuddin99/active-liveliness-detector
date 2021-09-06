import React from 'react'
import { useGlobalContext } from '../context'
import {HiOutlineEmojiHappy, HiOutlineEmojiSad} from 'react-icons/hi'
import {MdDone} from 'react-icons/md'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import {ImCross} from 'react-icons/im'

function VideoResults() {
    const {userState} = useGlobalContext()

    const {smile, finger, hand, Left, Right} = userState
    return (
        <ul className='video-result'>

            <SwitchTransition mode={"out-in"}>
                <CSSTransition key={smile} classNames='list' timeout={500}>
                    <li className={`list ${smile ? 'done' : ''}`}>
                        <p><span>{smile ? <HiOutlineEmojiHappy/> : <HiOutlineEmojiSad/>}</span> Smile</p>
                    </li>
                </CSSTransition>
            </SwitchTransition>
            
            <SwitchTransition mode={"out-in"}>
                <CSSTransition key={Left} classNames='list' timeout={500}>
                    <li className={`list ${Left ? 'done' : ''}`}>
                        <p><span>{Left ? <MdDone/> : <ImCross/>}</span> Look left</p>
                    </li>
                </CSSTransition>
            </SwitchTransition>

            <SwitchTransition mode={"out-in"}>
                <CSSTransition key={Right} classNames='list' timeout={500}>
                    <li className={`list ${Right ? 'done' : ''}`}>
                        <p><span>{Right ? <MdDone/> : <ImCross/>}</span> Look Right</p>
                    </li>
                </CSSTransition>
            </SwitchTransition>

            <SwitchTransition mode={"out-in"}>
                <CSSTransition key={finger} classNames='list' timeout={500}>
                    <li className={`list ${finger ? 'done' : ''}`}>
                        <p><span>{finger}</span> Show finger</p>
                    </li>
                </CSSTransition>
            </SwitchTransition>
            
            <SwitchTransition mode={"out-in"}>
                <CSSTransition key={hand} classNames='list' timeout={500}>
                    <li className={`list ${hand ? 'done' : ''}`}>
                        <p><span>{hand}</span> Show hand</p>
                    </li>
                </CSSTransition>
            </SwitchTransition>
        </ul>
    )
}

export default VideoResults
