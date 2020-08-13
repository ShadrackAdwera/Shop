import React, { useRef, useState, useEffect } from 'react'
import { Button } from '@material-ui/core'

import './ImageUpload.css';

const ImagePicker = (props) => {
    const [file, setFile] = useState()
    const [previewUrl,setPreviewUrl] = useState('')
    const [isValid, setIsValid] = useState(false)
    const filePickerRef = useRef()

    const pickImageHandler = () => {
        filePickerRef.current.click()
    }

    useEffect(()=>{
        if(!file) {
            return
        }
        const fileReader = new FileReader()
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result)    
        }
        fileReader.readAsDataURL(file)
    }, [file])

    const pickedImageHandler = event => {
        let pickedFile
        let fileIsValid = isValid
        if(event.target.files && event.target.files.length===1) {
            pickedFile = event.target.files[0]
            setFile(pickedFile)
            setIsValid(true)
            fileIsValid = true
        } else {
            setIsValid(false)
            fileIsValid = false
        }
        props.onInput(props.id, pickedFile, fileIsValid)
    }

    return <div className="form-control">
      <input
        type="file"
        id={props.id}
        style={{ display: 'none' }}
        accept=".jpg, .png, .jpeg"
        onChange={pickedImageHandler}
        ref={filePickerRef}
      />
      <div className={`image-upload ${props.center && 'center'}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="preview" />}
          {!previewUrl && <p>Choose an Image bro</p>}
        </div>
        <Button type="button" onClick={pickImageHandler} color='primary'>
          <strong>CHOOSE IMAGE</strong>
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>

}

export default ImagePicker