interface PostArticleRequestType {
  image: string;
  content: string;
  title: string;
}

interface PostArticleResponseType {
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

interface GetArticleResponseType {
  totalCount: number;
  list: [
    {
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
  ];
}

interface GetArticleIdResponseType extends PostArticleResponseType {}

interface PatchArticleRequestType extends PostArticleRequestType {}

interface PatchArticleResponseType extends PostArticleResponseType {
  isLiked: boolean;
  content: string;
}

interface DeleteArticleIdRequestType {
  articleId: number;
}

interface PostArticleLinkRequestType extends PatchArticleResponseType {}
