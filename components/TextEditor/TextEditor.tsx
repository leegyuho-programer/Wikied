'use client';

import dynamic from 'next/dynamic';
import { Dispatch, SetStateAction, useMemo } from 'react';
import 'react-quill/dist/quill.snow.css';
import styles from './TextEditor.module.css';
import './TextEditor.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface Props {
  value?: string;
  setValue: Dispatch<SetStateAction<string>> | Dispatch<SetStateAction<string | undefined>>;
}

function TextEditor() {
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

  const formatsWithLabels = {
    ...formats,
    header: [{ header: '제목' }, { header: [1, 2, 3, 4, false] }],
  };

  return (
    <div className={styles.container}>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formatsWithLabels}
        // value={value}
        placeholder={'작품을 어필해보세요!'}
        // onChange={setValue}
      />
    </div>
  );
}

export default TextEditor;
