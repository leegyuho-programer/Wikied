// import Article from '../../../(unauth)/_components/Article/Article';
// import Button from '../../../../components/Button/Button';
// import HeartIcon from '../../../../components/SvgComponents/HeartIcon/HeartIcon';
// import ArticleStrokeIcon from '../../../../components/SvgComponents/StrokeIcon/ArticleStrokeIcon';
// import styles from './PostingPage.module.css';

// export default function PostingPage() {
//   return (
//     <div className={styles.container}>
//       <div className={styles.headerWrapper}>
//         <div className={styles.header}>
//           <h1 className={styles.title}>게시물 제목입니다.</h1>
//           <Button variant="primary" isLink={true} destination="/" size="S">
//             수정하기
//           </Button>
//         </div>
//         <div className={styles.content}>
//           <div className={styles.user}>
//             <p>박동욱</p>
//             <p>2024.02.24</p>
//           </div>
//           <div className={styles.like}>
//             <HeartIcon />
//             <p>130</p>
//           </div>
//         </div>
//       </div>
//       <ArticleStrokeIcon />
//       <div>내용들</div>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Article from '../../../(unauth)/_components/Article/Article';
import Button from '../../../../components/Button/Button';
import HeartIcon from '../../../../components/SvgComponents/HeartIcon/HeartIcon';
import ArticleStrokeIcon from '../../../../components/SvgComponents/StrokeIcon/ArticleStrokeIcon';
import styles from './PostingPage.module.css';
import Input from '../../../../components/Input/Input';
import { postImageFile } from '../../../../api/image/postImage';
import postArticle from '../../../../api/article/postArticles';

export default function PostingPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [image, setImage] = useState(null);

  const handleImageChange = (e: any) => {
    setImage(e.target.files[0]);
  };

  const onSubmit = async (data: any) => {
    if (!image) {
      alert('이미지를 선택해주세요.');
      return;
    }

    try {
      // Step 2: 이미지 업로드
      const formData = new FormData();
      formData.append('image', image); // 'file' 대신 'image'로 수정

      const imageUploadResponse = await postImageFile(formData);

      const imageUrl = imageUploadResponse.url;

      // Step 3: 게시물 데이터 전송
      const requestBody = {
        ...data,
        image: imageUrl,
      };

      const response = await postArticle(requestBody);
      alert('게시물이 성공적으로 업로드되었습니다.');
      return response;
    } catch (error) {
      console.error('업로드 실패:', error);
      alert('업로드에 실패했습니다.');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          placeholder="게시물 제목입니다."
          {...register('title', { required: '제목을 입력해주세요.' })}
          className={styles.input}
        />
        <textarea
          placeholder="내용"
          {...register('content', { required: '내용을 입력해주세요.' })}
          className={styles.textarea}
        ></textarea>
        {/* {errors.content && <p className={styles.error}>{errors.content.message}</p>} */}

        <input type="file" onChange={handleImageChange} className={styles.fileInput} />
        {/* {errors.image && <p className={styles.error}>{errors.image.message}</p>} */}

        <button type="submit" className={styles.submitButton}>
          게시물 업로드
        </button>
      </form>
    </div>
  );
}
