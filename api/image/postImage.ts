import { PostImageResponseType } from '../../types/image';

export const postImage = async (data: File, token: string): Promise<PostImageResponseType> => {
  try {
    const formData = new FormData();
    formData.append('image', data);

    const response = await fetch('https://wikied-api.vercel.app/1-99/images/upload', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const responseData = await response.json();
    return responseData as PostImageResponseType;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};
