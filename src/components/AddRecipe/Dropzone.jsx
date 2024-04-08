import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import './Dropzone.css'
function Dropzone({className,setFile,setPreview}) {
  const onDrop = useCallback(acceptedFiles => {
    if(acceptedFiles?.length){
      setPreview(Object.assign(acceptedFiles[0], { href: URL.createObjectURL(acceptedFiles[0]) }));
      setFile(acceptedFiles[0]);
    }
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop,
    accept:{
      'image/*':[]
    },
    maxSize:1024*1000
  })
  return (
    <div className='w-full flex sm:flex-row flex-col items-center justify-between px-2 sm:px-10 py-8'>
    <div {...getRootProps({
      className:className
    })}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p className=' cursor-default'>Drop the Images here ...</p> :
          <p className=' cursor-pointer'>Drag 'n' drop Images here, or <span className=' text-blue-500 cursor-pointer'>click here</span></p>
      }
    </div>
    
    </div>
  )
}
export default Dropzone