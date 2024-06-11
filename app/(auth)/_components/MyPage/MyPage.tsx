'use client';

import { useEffect, useState } from 'react';
import styles from './MyPage.module.css';
import Button from '../../../../components/Button/Button';
import SideBar from '../../../../components/SideBar/SideBar';
import SnackBar from '../../../../components/SnackBar/SnackBar';
import LinkCopy from '../../../../components/LinkCopy/LinkCopy';
import { useStore } from '../../../../store';
import { PostArticleResponseType } from '../../../../types/article';
import getArticle from '../../../../api/article/getArticles';
import TextEditor from '../../../../components/TextEditor/TextEditor';

const BASE_URL = 'https://www.wikied.kr';

function MyPage() {
  const { user } = useStore();
  const [isCopied, setIsCopied] = useState(false);
  const [editorContent, setEditorContent] = useState(
    '<h1>Welcome to My Page</h1><p>This is a template text. You can start editing here...</p>'
  );

  const handleInvite = async () => {
    try {
      const currentURL = window.location.href;
      await navigator.clipboard.writeText(currentURL);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const getArticles = async () => {
    try {
      const response = await getArticle();
    } catch (error) {
      console.error('글 가져오기 실패:', error);
    }
  };

  return (
    <div className={styles.container}>
      {isCopied && (
        <div className={styles.snackBar}>
          <SnackBar type="success" />
        </div>
      )}
      <div className={styles.title}>
        {/* 이름 데이터 가져오기 */}
        <p className={styles.name}>{user?.name}</p>
        <LinkCopy onCopy={setIsCopied} />
      </div>
      <div className={styles.section}>
        {/* 데이터가 있는지 없는지에 따라 다르게 보이게 하기 */}
        <SideBar />
        <TextEditor value={editorContent} setValue={setEditorContent} />
        <div className={styles.nodata}>
          <p className={styles.text}>
            아직 작성된 내용이 없네요.
            <br />
            친구들을 위키로 초대해 보세요!
          </p>
          <Button isLink={false} variant="primary" size="XS" onClick={handleInvite}>
            초대하기
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
