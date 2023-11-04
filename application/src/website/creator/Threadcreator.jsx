import { React, useEffect, useLayoutEffect, useState, useRef} from 'react'
import { FileUploader } from "react-drag-drop-files";
import Uploadfile from './Uploadfile'
import { ReactComponent as Image } from '../../ico/image.svg'
import { ReactComponent as CodeBlock } from '../../ico/codeblock.svg'
import { ReactComponent as TextBlock } from '../../ico/textbox.svg'
import { ReactComponent as Link } from '../../ico/link.svg'
const fileTypes = ["JPG", "PNG", "GIF"];


function Threadcreator({title, setTitle, description, setDescription}) {
const [file, setFile] = useState(null);
const titleinput = useRef(null)
const textareaRef = useRef(null);

const [value, setValue] = useState('');

const onChange = (event) => setValue(event.target.value);

useLayoutEffect(() => {
    // Reset height - important to shrink on delete
    textareaRef.current.style.height = 'inherit';
    // Set height
    textareaRef.current.style.height = `${Math.max(textareaRef.current.scrollHeight, 32)}px`;
  }, [value]);

const handleChange = (file) => {
    setFile(file);
};

useEffect(() => {
  if (titleinput) {
    titleinput.current.focus()
  }

}, [titleinput])

  return (
    <div className='threadcreator'>
        <input ref={titleinput} className='threadcreatortitle' value={title} type='text' placeholder='Title' onChange={(e) => {
                      const value = e.target.value
                      setTitle(value)}}/>
        <textarea
        onChange={onChange}
        ref={textareaRef}
        style={{ minHeight: '32px', resize: 'none' }}
        value={value}
        className='threadcreatordescription disable-scrollbars' type='text' placeholder='Description'/>

        <div className='theadcreator-addsection'>

          <div className='theadcreator-addsection-button' title='Add Text section'>
              <TextBlock/>
          </div>

          <div className='theadcreator-addsection-button' title='Add Image section'>
              <Image/>
          </div>

          <div className='theadcreator-addsection-button' title='Add Embed section'>
              <Link/>
          </div>
          

          <div className='theadcreator-addsection-button' title='Add Code Snipet section'>
              <CodeBlock/>
          </div>

        </div>
        {/* <FileUploader handleChange={handleChange} name="file" types={fileTypes} /> */}
    </div>
  )
}

export default Threadcreator