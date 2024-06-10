import { PostSignUp } from '../../types/auth';

const signUp = async (data: PostSignUp) => {
  try {
    const response = await fetch(`https://wikied-api.vercel.app/0-이규호/auth/signUp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    console.error('Error:', error);
    throw error;
  }
};

export default signUp;
