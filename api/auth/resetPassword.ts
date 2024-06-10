import { PatchPassword } from '../../types/auth';

const resetPassword = async (data: PatchPassword, accessToken: string | null) => {
  try {
    const response = await fetch(`https://wikied-api.vercel.app/0-이규호/users/me/password`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
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

export default resetPassword;
