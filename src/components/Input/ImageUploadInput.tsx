'use client';

import { postImage } from '@/api/image/postImage';
import { parseCookies } from 'nookies';
import { useCallback, useRef } from 'react';

function ImageUploadInput() {
  const cookies = parseCookies();
  const accessToken = cookies.userAccessToken;
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const imgFile = e.target.files[0];

    try {
      const response = await postImage(imgFile, accessToken);
      console.log('Uploaded Image URL:', response.url);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const onUploadImageButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

  return (
    <>
      <input type="file" accept="image/*" ref={inputRef} onChange={handleImage} style={{ display: 'none' }} />
      <button onClick={onUploadImageButtonClick}>업로드</button>
    </>
  );
}

export default ImageUploadInput;
