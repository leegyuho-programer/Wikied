export interface User {
  updatedAt: string;
  job: string;
  nationality: string;
  city: string;
  image: string;
  code: string;
  name: string;
  id: number;
}

export interface PostProfileRequestType {
  securityAnswer: string;
  securityQuestion: string;
}

export interface PostProfileResponseType {
  updatedAt: string;
  securityQuestion: string;
  teamId: string;
  content: string;
  nationality: string;
  family: string;
  bloodType: string;
  nickname: string;
  birthday: string;
  sns: string;
  job: string;
  mbti: string;
  city: string;
  image: string;
  code: string;
  name: string;
  id: number;
}

export interface GetProfileResponseType {
  totalCount: number;
  list: User[];
}
