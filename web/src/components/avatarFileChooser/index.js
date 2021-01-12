import React, { useState, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import filesize from 'filesize'

import { CircularProgressbar } from 'react-circular-progressbar'
import { MdCheckCircle, MdError } from 'react-icons/md'

import './styles.css'
import 'react-circular-progressbar/dist/styles.css'

const acceptStyle = {
    color: '#35d826',
    borderColor: '#35d826'
}

const rejectStyle = {
    color: '#ff1744',
    borderColor: '#ff1744'
}

const AvatarFileChooser = ({avatar, setAvatar}) => {

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({ accept: 'image/*', onDropAccepted: handleUpload })
    
    const style = useMemo(() => ({
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }), [isDragReject, isDragAccept])

    function renderUploadMessage() {
        if(isDragReject) return <p>Extensão de arquivo não suportada</p>
        if(isDragActive) return <p>Solte o arquivo aqui</p>
        return <p>Selecione ou arraste sua nova foto de perfil</p>
    }

    const [ uploadedFile, setUploadedFile ] = useState({
        url: avatar,
        error: false,
        progress: 100,
        uploaded: true,
        preview: avatar,
        name: 'avatar.png',
        readableSize: filesize(22260)
    })

    function handleUpload(files) {
        const uploadedFile = files.map((file) => ({
            file,
            url: null,
            progress: 0,
            error: false,
            uploaded: false,
            name: file.name,
            readableSize: filesize(file.size),
            preview: URL.createObjectURL(file)
        }))
        
        setUploadedFile(uploadedFile[0])
        
    }

    return (
        <div className="ac-container">
            <div className="ac-top-container">
                <div className="drop-container"{...getRootProps({style})}>
                    <input {...getInputProps()}/>
                    {renderUploadMessage()}
                </div>
            </div>
            <div className="ac-bottom-container">
                <div className="ac-preview">
                    <img src={uploadedFile.preview} alt="Preview da imagem de foto de perfil do usuário"/>
                </div>
                <div className="ac-infos">
                    <div className="ac-infos-top">
                        <p>{uploadedFile.name}</p> <br />
                        <p>{uploadedFile.readableSize}</p>
                    </div>
                    <div className="ac-infos-bottom">
                        {!uploadedFile.uploaded && !uploadedFile.error && (
                            <CircularProgressbar 
                                styles={{
                                    root: { width: 42 },
                                    text: { fill: '#7159c1' },
                                    path: { stroke: '#7159c1' }
                                }}
                                minValue={0}
                                maxValue={100}
                                strokeWidth={6}
                                value={uploadedFile.progress}
                                text={`${uploadedFile.progress}%`}
                            />
                        )}
                        {uploadedFile.error && (<MdError size={42} color="#ff1744"/> )}
                        {uploadedFile.uploaded && ( <MdCheckCircle size={42} color="#35d826"/> )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AvatarFileChooser