import {
  DeleteCommentRequestType,
  GetCommentResponseType,
  PatchCommentRequestType,
  PatchCommentResponseType,
  PostCommentRequestType,
  PostCommentResponseType,
} from '../../types/comment';
import { authBasedRequest } from '../fetchRequestHandler';

export const deleteComment = async (commentId: number, token: string): Promise<DeleteCommentRequestType> => {
  try {
    const response = await authBasedRequest<DeleteCommentRequestType>({
      url: `comments/${commentId}`,
      method: 'DELETE',
      token,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getComment = async (
  articleId: number,
  limit: number = 10,
  cursor: number = 0
): Promise<GetCommentResponseType> => {
  try {
    const response = await fetch(
      `https://wikied-api.vercel.app/1-99/articles/${articleId}/comments?limit=${limit}&cursor=${cursor}`,
      { method: 'GET' }
    );
    return response.json();
  } catch (error) {
    console.error('댓글을 가져오는 중 오류가 발생했습니다:', error);
    throw error;
  }
};

export const patchComment = async (
  data: PatchCommentRequestType,
  token: string,
  commentId: number
): Promise<PatchCommentResponseType> => {
  try {
    const response = await authBasedRequest<PatchCommentResponseType>({
      url: `comments/${commentId}`,
      method: 'PATCH',
      body: data,
      token,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const postComment = async (
  data: PostCommentRequestType,
  token: string,
  articleId: number
): Promise<PostCommentResponseType> => {
  try {
    const response = await authBasedRequest<PostCommentResponseType>({
      url: `articles/${articleId}/comments`,
      method: 'POST',
      body: data,
      token,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
