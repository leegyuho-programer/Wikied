export interface PostArticleRequestType {
  image: string;
  content: string;
  title: string;
}

export interface PostArticleResponseType {
  updatedAt: string;
  createdAt: string;
  likeCount: number;
  writer: {
    name: string;
    id: number;
  };
  image: string;
  title: string;
  id: number;
}

export interface GetArticleResponseType {
  totalCount: number;
  list: {
    updatedAt: string;
    createdAt: string;
    likeCount: number;
    writer: {
      name: string;
      id: number;
    };
    image: string;
    title: string;
    id: number;
  }[];
}

export interface GetArticleIdResponseType extends PostArticleResponseType {
  content: string;
  isLiked: boolean;
}

export interface PatchArticleRequestType {
  image?: string;
  content?: string;
  title?: string;
}

export interface PatchArticleResponseType extends PostArticleResponseType {
  isLiked: boolean;
  content: string;
}

export interface DeleteArticleIdRequestType {
  articleId: number;
}

export interface PostArticleLinkRequestType extends PatchArticleResponseType {}

export interface PostLikeRequestType {
  articledId: string;
}

export interface PostLikeResponseType {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  writer: {
    id: number;
    name: string;
  };
  image: string;
  isLiked: boolean;
}

export interface DeleteLikeRequestType extends PostLikeRequestType {}

export interface DeleteLikeResponseType extends PostLikeResponseType {}
