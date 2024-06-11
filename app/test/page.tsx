'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import TextEditor from '../../components/TextEditor/TextEditor';

function UserEdit() {
  const router = useRouter();
  const [editorContent, setEditorContent] = useState(
    '<h1>01. 개요</h1><br/><br/><br/><br/><br/><br/><h1>02. 취미</h1><br/><br/><br/><br/><br/><br/><h1>03. 여담</h1><br/><br/><br/><br/><br/><br/><h1>04. 취향</h1>'
  );

  const postArticle = () => {
    // editorContent를 postArticle로 전달하는 로직을 작성
    console.log('게시될 내용:', editorContent);
    // postArticle 함수를 이용하여 서버로 데이터를 전송하는 등의 로직을 구현
  };

  return (
    <div>
      <TextEditor value={editorContent} setValue={setEditorContent} />
      <div>
        <button
          onClick={() => {
            router.back();
          }}
        >
          취소
        </button>
        <button onClick={postArticle}>저장</button>
      </div>
    </div>
  );
}

export default UserEdit;
