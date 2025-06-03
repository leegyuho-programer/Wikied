import { getProfile } from '@/api/profile/profile';
import { getProfileCode } from '@/api/profile/profileCode';
import { GetProfileCodeResponseType } from '@/types/profile';
import UserPage from '../../_components/UserPage/UserPage';

// 서버 컴포넌트에서 데이터를 미리 페치
export default async function User({ params }: { params: { id: string } }) {
  const parsedId = parseInt(params.id);

  try {
    // 서버에서 데이터 미리 페치
    const profileList = await getProfile(1, 100);
    const codeId = profileList?.list?.find((item: any) => item.id === parsedId)?.code;

    let profileCodeResponse: GetProfileCodeResponseType | null = null;
    if (codeId) {
      profileCodeResponse = await getProfileCode(codeId);
    }

    // 클라이언트 컴포넌트에 서버에서 페치한 데이터 전달
    return <UserPage initialProfileData={profileCodeResponse} profileId={parsedId} profileList={profileList} />;
  } catch (error) {
    console.error('Server-side data fetching error:', error);

    // 에러 발생 시 클라이언트에서 처리하도록
    return <UserPage initialProfileData={null} profileId={parsedId} profileList={null} hasError={true} />;
  }
}
