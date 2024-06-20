export interface GetNotificationResponseType {
  totalCount: number;
  list: [
    {
      createdAt: string;
      content: string;
      id: number;
    }
  ];
}

export interface DeleteNotificationRequestType {
  id: number;
}

export interface DeleteNotificationResponseType {
  createdAt: string;
  content: string;
  id: number;
}
