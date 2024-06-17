'use client';

import styles from '../ArticlePage/ArticlePage.module.css';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GetArticleIdResponseType, PatchArticleRequestType, PatchArticleResponseType } from '../../../../types/article';
import { useStore } from '../../../../store';
import { getArticle, patchArticle } from '../../../../api/article/article';

export default function ArticleEditPage() {
  const accessToken = useStore((state) => state.userAccessToken);
  const articleId = useStore((state) => state.articleId);
  const router = useRouter();
  const [article, setArticle] = useState<GetArticleIdResponseType | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    console.log('edit', articleId);
    if (articleId) {
      async function fetchArticle() {
        try {
          const response = await getArticle(articleId, accessToken);
          setArticle(response);
          setTitle(response.title);
          setContent(response.content);
        } catch (error) {
          console.error('게시글을 불러오는 데 실패했습니다:', error);
        }
      }
      fetchArticle();
    } else {
      console.log('게시글 ID가 정의되지 않았습니다.');
    }
  }, [articleId, accessToken]);

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: any) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!article) return;

    try {
      const patchedArticle: PatchArticleRequestType = {
        title,
        content,
      };

      const response: PatchArticleResponseType = await patchArticle(patchedArticle, accessToken, articleId);
      router.push(`/article/${articleId}`);
    } catch (error) {
      console.error('게시글 수정에 실패했습니다:', error);
    }
  };

  if (!article) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>게시글 수정</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.headerWrapper}>
            <div className={styles.header}>
              <div>
                <label>제목:</label>
                <input type="text" value={title} onChange={handleTitleChange} />
              </div>
              <div>
                <label>내용:</label>
                <textarea value={content} onChange={handleContentChange} />
              </div>
            </div>
            <button type="submit">수정 완료</button>
          </div>
        </form>
      </div>
    </div>
  );
}
