'use client';

import dynamic from 'next/dynamic';
import { Dispatch, SetStateAction, useMemo } from 'react';
import 'react-quill/dist/quill.snow.css';
import styles from './TextEditor.module.css';
import './TextEditor.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface Props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

function TextEditor({ value, setValue }: Props) {
  const modules = useMemo(
    () => ({
      toolbar: [
        ['bold', 'italic', 'underline', 'blockquote'],
        [{ header: [1, 2, 3, 4, false] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }],
        ['image', 'link'],
      ],
    }),
    []
  );

  const formats = ['bold', 'italic', 'underline', 'blockquote', 'header', 'list', 'script', 'size'];

  return (
    <div className={styles.container}>
      <ReactQuill theme="snow" modules={modules} formats={formats} value={value} onChange={setValue} />
    </div>
  );
}

export default TextEditor;
