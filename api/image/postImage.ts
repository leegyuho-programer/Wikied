// export const postImageFile = async (data: FormData) => {
//   try {
//     const response = await fetch('https://wikied-api.vercel.app/1-99/images/upload', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//       body: JSON.stringify(data),
//     });
//     return response;
//   } catch (err: any) {
//     return err.response;
//   }
// };

export const postImageFile = async (data: FormData) => {
  try {
    const response = await fetch('https://wikied-api.vercel.app/1-99/images/upload', {
      method: 'POST',
      body: data,
    });

    if (!response.ok) {
      throw new Error('Image upload failed');
    }

    const responseData = await response.json();
    return responseData;
  } catch (err) {
    console.error('Error uploading image:', err);
    throw err;
  }
};
