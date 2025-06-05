import { getProfile } from '@/api/profile/profile';
import { getProfileCode } from '@/api/profile/profileCode';
import { GetProfileCodeResponseType } from '@/types/profile';
import UserPageClient from '../UserPageClient/UserPageClient';

interface Props {
  profileId: number;
}

export default async function UserPage({ profileId }: Props) {
  try {
    const profileList = await getProfile(1, 100);
    const codeId = profileList?.list?.find((item: any) => item.id === profileId)?.code;

    let profileCodeResponse: GetProfileCodeResponseType | null = null;
    if (codeId) {
      profileCodeResponse = await getProfileCode(codeId);
    }

    return <UserPageClient initialProfileData={profileCodeResponse} profileId={profileId} profileList={profileList} />;
  } catch (error) {
    console.error('Server-side data fetching error:', error);
    return <UserPageClient initialProfileData={null} profileId={profileId} profileList={null} hasError={true} />;
  }
}
