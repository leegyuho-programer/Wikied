// import { PostSignUp } from '../../types/auth';

// export const signUp = async (data: PostSignUp) => {
//   try {
//     const response = await fetch('https://wikied-api.vercel.app/0-이규호/auth/signUp', {
//       method: 'POST', // HTTP 메서드를 명시적으로 설정
//       headers: {
//         'Content-Type': 'application/json', // JSON 형식의 데이터를 보내기 위해 Content-Type 헤더 설정
//       },
//       body: JSON.stringify(data), // 데이터를 JSON 문자열로 변환하여 body에 설정
//     });

//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }

//     const responseData = await response.json(); // 응답 데이터를 JSON 형식으로 파싱
//     return responseData; // 필요한 경우 응답 데이터를 반환
//   } catch (error: any) {
//     console.error('Error:', error);
//     throw error; // 에러를 호출자에게 전달
//   }
// };
