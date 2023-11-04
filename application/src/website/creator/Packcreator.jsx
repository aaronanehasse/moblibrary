import { React, useEffect, useLayoutEffect, useState, useRef} from 'react'
import { FileUploader } from "react-drag-drop-files";
import { Buffer } from 'buffer'
import { ReactComponent as Infoico } from '../../ico/info.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import StepsModule from './StepsModule.jsx'
import { ReactComponent as Addimage } from '../../ico/add-image.svg'
import { ReactComponent as Addcircle } from '../../ico/add-circle.svg'
import { ReactComponent as Privateico } from '../../ico/private.svg' 
import { ReactComponent as Publicico } from '../../ico/public.svg' 
import { proxy } from '../../utilies/utilies.js'
import uniqid from 'uniqid'

const imageTypes = ["JPG", "PNG", "GIF"];

function Packcreator({title, setTitle, description, setDescription}) {
    var navigate = useNavigate()

    const [file, setFile] = useState(null);

    const [uploading, setUploading] = useState(false)

    const [images, setImages] = useState([])

    const [selectedFile, setSelectedFile] = useState(null)

    const [privated, setPrivated] = useState(false);

    const [value, setValue] = useState('');

    
    const [selected, setSelected] = useState('upload')

    const handleChange = (file) => {
        setFile([file]);
    };
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageArray = (e) => {
        console.log(images)
        const file = e.target.files[0];
        if (file) {
            setImages([...images, {
                obj: file,
                url: URL.createObjectURL(file),
            }])
        }
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setSelectedImage(URL.createObjectURL(file)); // Set data URL for preview
          setSelectedFile(file); // Store the selected File object
        }
      };

    const handleThumbnailDrop = (event) => {
        event.preventDefault();

            const file = event.dataTransfer.files[0];
            if (file) {
                setSelectedImage(URL.createObjectURL(file)); // Set data URL for preview
                setSelectedFile(file); // Store the selected File object
            } 
    }
    const handleImageDrop = (event) => {
        event.preventDefault();
            const file = event.dataTransfer.files[0];
            console.log(event.dataTransfer.files[0])
            if (file) {
                    setImages([...images, { 
                        obj: file,
                        url: URL.createObjectURL(file),
                        id: uniqid()
                    }])
                
            }
            console.log(images)

    }
        const handleDragOver = (event) => {
            event.preventDefault();
    };
      
    useEffect(() => {
        if (file) {
            setSelected('info');
        }
    }, [file])

    const elements = [
        {
            title: 'Upload Pack File',
            selector: 'upload',
            require: 'nofile'
        },
        {
            title: 'Create Pack',
            selector: 'info',
            require: 'file'
        },
        {
            title: 'Submit Pack',
            selector: 'submit',
            require: 'submit'
        }
    ]

    const dependencies = [
        {
            id: 'file',
            is: file
        },
        {
            id: 'nofile',
            is: file === null ? true : false
        },
        {
            id: 'submit',
            is: title.length > 5 ? true : false
        }
    ]
    const uploadFile = async () => {
        setUploading(true)
        if (selectedFile) {
            const formData = new FormData(); // Create a FormData object
        
            formData.append('thumbnails', selectedFile); // Append the selected file to the FormData
            console.log(formData);

            images.forEach(image => {
                formData.append('images', image.obj);
            })


            file.forEach((download) => {
                formData.append('downloads', download);
            });

            formData.append('title', title);
            formData.append('description', description);

            try {
                const res = await fetch(`${proxy}/api/product/uploadthumnail`, {
                method: 'POST',
                body: formData, // Use FormData to send the file
                });
        
                if (res.ok) {
                const response = await res.json();
                console.log(response.data);
                navigate('/')
                } else {
                console.error('File upload failed.');
                }
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
      };
      
      

    const onChange = (event) => setDescription(event.target.value);


    useEffect(() => {console.log(selected)}, [selected])


  return (
      <div>
        <StepsModule elements={elements} selected={selected} setSelected={setSelected} dependencies={dependencies}/>
        <div className='creatorpack'>
            {selected === 'upload' && (<>
                {file === null ? (<>
                
                <div className='creatorpack-card'>
                <div className='creator-info-start'>
                    <div className='creator-info-start-card'>
                        <Infoico/>
                        <div className='creator-info-start-card-content'>
                            <span>Drop or select a pack inside the upload area, we recomend to use a file name that specifies the name of the project and the version. More tips about file structure and creation can be found here. </span>
                        </div>
                    </div>
                </div>
                    <div className='creatorpack-droppack' maxSize={100} style={{marginTop:'30px'}}>
                        <FileUploader label='Upload or drop a pack here' handleChange={handleChange} name="file" types={['ZIP']} />
                    </div>
                </div>

                </>) : (<>
                    <div className='creatorpack-card'>
                        {/* <input placeholder=''/> */}
                    </div>
                </>)}
            </>)}
            {selected === 'info' && (<>
            <div className='creatorpack-card'>
                <div className='creatorpac-input-title'>
                    <span>Appearance</span>
                </div>
                <div className='creatorpack-section-rows'>
                    <div className='creatorpack-section-row'>
                        <div className='creatorpack-title'>
                            <span>Thumbnail</span>
                            <span className='creatorpack-subtitle'>Preview image, this is displayedin cards and as first image in the pack pages</span>
                        </div>
                        <label htmlFor="fileInput" onDrop={handleThumbnailDrop}
                            onDragOver={handleDragOver} className='creatorpack-thumbnailcontainer'>
                            <div className='creatorpack-thumbnailcard'>
                                {!selectedImage && (<div className='selectthumbnail'>
                                    <Addimage/>
                                    <input accept="image/png" id="fileInput" type="file" style={{visibility: 'hidden'}} onChange={(e) => handleImageChange(e)} />
                                    <span>Upload or drop a thumbnail</span>
                                </div>)}
                                {selectedImage && (<img alt='' src={selectedImage}/>)}
                            </div>
                        </label>
                    </div>

                    <div className='creatorpack-section-row'>
                        <div className='creatorpack-title'>
                            <span>Title & Description</span>
                            <span className='creatorpack-subtitle'>Title and description should be descriptive and engaging. Descriptionscan describe the concept behind a project.</span>
                        </div>

                        <div className="input-group">
                            <input onChange={(e) => {
                                    const value = e.target.value
                                    setTitle(value)
                                }}
                                required="" type="text" value={title} 
                                name="text" autocomplete="off" 
                                className={title.length > 0 ? "input-level3 inputfilled" : "input-level3"}
                            />
                            <label className="user-label" for="text">Title</label>
                        </div>
                        
                        <div className='input-group'>
                            <textarea onChange={onChange} style={{ minHeight: '32px', resize: 'none' }} value={description}
                            className={description.length > 0 ? 'textarea-level3 textareafilled' : 'textarea-level3'}
                            type='text'/>
                            <label className="user-label" for="text">Description</label>
                        </div>
                    </div>
        
                </div>
                <div className='creatorpack-section-rows'>
                    <div className='creatorpack-section-row'>
                        <div className='creatorpack-title'>
                            <span>Images</span>
                            <span className='creatorpack-subtitle'>You can drop images inside the box directly or click ( + ) to upload  a new image. Images are really good to show off what’s your project about. Colorful!</span>
                        </div>
                        <div className='creatorpack-galery-container' onChange={(e) => handleImageArray(e)}>
                            <div className='creatorpack-galery'>
                            <label htmlFor='imageInput' onDragOver={handleDragOver} onDrop={handleImageDrop}>
                                <div className='addimagesquare'>
                                    <input id="imageInput" type="file" style={{visibility: 'hidden', position:'absolute'}} onChange={(e) => handleImageArray(e)} />
                                    <Addcircle fill='rgba(255, 255, 255, 0.40)' height='38px' width='38px' />
                                </div>
                            </label>
                                {images.map(image => (<img alt='' src={image.url}/>))}
                            </div>
                        </div>                  
                    </div>
                </div>
                <div className='creatorpac-input-title'>
                    <span>Options</span>
                </div>
                <div className='creatorpack-section-rows'>
                    <div className='creatorpack-section-row'>
                        <div className='creatorpack-title'>
                            <span>Visibility</span>
                            <span className='creatorpack-subtitle'>Public projects can be seen by anyone whileprivate can only be seen by people with a link</span>
                        </div>
                    </div>
                    <div className='creatorpack-section-row'>
                        <div className='creatorpack-title'>
                            <span>Tags</span>
                            <span className='creatorpack-subtitle'>Type and press space to create a tag. Tags are 
keywords used both for search and fast filtering. </span>
                        </div>
                    </div>
                </div>
            </div>
            </>)
            }
        <div className='creator-submitbutton'>
            {selected === 'info' && (
                    <>
                        <button style={{width: '130px'}} className='button-level3'onClick={() => {
                            if (title.length > 5 ) {
                                setSelected('submit')
                            }
                        }}>Cancel</button>
                        <button style={{width: '130px'}} className='button-level3'onClick={() => {
                            if (title.length > 5 ) {
                                setSelected('submit')
                            }
                        }}>Next</button>
                    </>                   
)
            }
        </div>
            {selected === 'submit' && (<>
                <div className='creatorpack-card'>
                    {!uploading ? (<>
                    <div className='creatorpack-submitcard'>
                        <p>Your pack is ready to be posted!</p>
                    <button style={{width: '130px'}} className='button-level3'onClick={() => {
                        uploadFile()
                    }}>Post</button>
                    </div></>):(<>
                        <div className='creatorpack-submitcard'>
                            <img style={{height: '180px'}} src='/echo-turning.gif' alt=''/>
                            <p>Your pack is being uploaded</p>
                            <p>Dont close this window</p>
                        </div>
                    </>)}
                </div>
            </>)}
        </div>
    </div>

  )
}

export default Packcreator