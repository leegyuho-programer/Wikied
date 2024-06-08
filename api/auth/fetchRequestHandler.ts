// export type RequestType = {
//   url: string;
//   method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
//   params?: { [key: string]: any };
//   body?: any;
//   token?: string;
// };

// /** request handler
//  * @param url request url
//  * @param method http method type
//  * @param params request parameters
//  * @param body request body
//  */

// export const request = async ({ url, method = 'GET', params, body }: RequestType) => {
//   const baseURL = 'https://wikied-api.vercel.app/docs/#/0-이규호';
//   const queryString = new URLSearchParams(params).toString();
//   let token = '';

//   // token
//   if (typeof window !== 'undefined') {
//     const userAuth = window.localStorage.getItem('store');
//     if (!userAuth) return;
//     const {
//       state: { userAccessToken },
//     } = JSON.parse(userAuth);
//     token = userAccessToken;
//   }

//   // fullUrl
//   const fullUrl = queryString ? `${baseURL}${url}?${queryString}` : `${baseURL}${url}`;

//   // options
//   const options: RequestInit = {
//     method,
//   };

//   // Only include body if it exists and if the method is not GET
//   if (body && method !== 'GET') {
//     options.body = JSON.stringify(body);
//   }

//   // include token when it exists
//   if (token) {
//     options.headers = { Authorization: `Bearer ${token}` };
//   }

//   const response = await fetch(fullUrl, options);

//   if (!response.ok) {
//     // 가장 가까운 Error Boundary의 error.tsx를 활성화 시킴
//     console.log(response.status);
//   }
//   return await response.json();
// };
