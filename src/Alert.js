import React, { useEffect } from 'react'

// destructure props from object
const Alert = ({type, message, showAlertCb, list}) => {
  // run on mount showAlert
  useEffect(() => {
    const timeout = setTimeout(() => {
      showAlertCb() // showAlert will run and default to show: false
    }, 2000)
  
    // remove timeout on unmount
    return () => {
      clearTimeout(timeout)
    }
  }, [list]) // if list changes run showAlert to allow run for 3 secs always

  return <p className={`alert alert-${type}`}>{message}</p>
  
}



export default Alert
