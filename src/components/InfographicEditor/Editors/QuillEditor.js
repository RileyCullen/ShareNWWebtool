import React from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';


function QuillEditor()
{
    const { quill, quillRef } = useQuill();
    return (
        <div className='text-editor' style={{width: 500, height: 300}}>
            <div ref={quillRef}></div>
        </div>
    )
}

export { QuillEditor };