import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import { useGlobalContext } from '../context';

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 62,
    height: 44,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(23px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#52d869',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 37,
    height: 41,
  },
  track: {
    borderRadius: 34 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

export default function IOSSwitchComponent() {
  const {videoState, setVideoStart} = useGlobalContext()

  const handleChange = () => {
    if(videoState.initial){
      setVideoStart((prev)=>{
        return {...prev, initial: false, started: true}
      })
    }else{
      setVideoStart((prev)=>{
        return {...prev, started: !prev.started}
      })
    }
  };

  return (
  <IOSSwitch checked={videoState.started} onChange={handleChange} />
  );
}