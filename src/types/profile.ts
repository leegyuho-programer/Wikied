export interface PostProfileRequestType {
  securityAnswer: string;
  securityQuestion: string;
}

export interface PostProfileResponseType {
  updatedAt?: string;
  securityQuestion?: string;
  teamId?: string;
  content?: string;
  nationality?: string;
  family?: string;
  bloodType?: string;
  nickname?: string;
  birthday?: string;
  sns?: string;
  job?: string;
  mbti?: string;
  city?: string;
  image?: string;
  code?: string;
  name?: string;
  id?: number;
}

export interface GetProfileResponseType {
  totalCount: number;
  list: [
    {
      updatedAt: string;
      job: string;
      nationality: string;
      city: string;
      image: string;
      code: string;
      name: string;
      id: number;
    }
  ];
}

export interface GetProfileCodeResponseType extends PostProfileResponseType {}

export interface PatchProfileCodeRequestType {
  securityAnswer?: string;
  securityQuestion?: string;
  nationality?: string;
  family?: string;
  bloodType?: string;
  nickname?: string;
  birthday?: string;
  sns?: string;
  job?: string;
  mbti?: string;
  city?: string;
  image?: string;
  content?: string;
}

export interface PatchProfileCodeResponseType {
  securityAnswer?: string;
  securityQuestion?: string;
  nationality?: string;
  family?: string;
  bloodType?: string;
  nickname?: string;
  birthday?: string;
  sns?: string;
  job?: string;
  mbti?: string;
  city?: string;
  image?: string;
  content?: string;
}

export interface PostProfilePingRequestType {
  securityAnswer: string;
}

export interface PostProfilePingResponseType {
  registeredAt: string;
  userId: number;
}

export interface GetProfilePingResponseType extends PostProfilePingResponseType {}
