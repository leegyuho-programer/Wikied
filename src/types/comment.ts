export interface PostCommentRequestType {
  content: string;
  accessToken?: string;
  articleId?: number;
}

export interface PostCommentResponseType {
  writer: {
    image: string;
    name: string;
    id: number;
  };
  updatedAt: string;
  createdAt: string;
  content: string;
  id: number;
}

export interface GetCommentRequestType {
  limit: number;
  cursor: number;
}

export interface GetCommentResponseType {
  nextCursor: number;
  list: {
    writer: {
      image: string;
      name: string;
      id: number;
    };
    updatedAt: string;
    createdAt: string;
    content: string;
    id: number;
  }[];
}

export interface PatchCommentRequestType {
  content: string;
}

export interface PatchCommentResponseType extends PostCommentResponseType {}

export interface DeleteCommentRequestType {
  commentId: number;
}
