import { getProfile } from '@/api/profile/profile';
import { getProfileCode } from '@/api/profile/profileCode';
import { metadataMap } from '@/app/metadata';
import UserPage from '../../_components/UserPage/UserPage';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const profileList = await getProfile(1, 200);
  const codeId = profileList?.list.find((item) => item.id === parseInt(params.id))?.code;
  const profileCodeResponse = await getProfileCode(codeId ?? '');

  if (profileCodeResponse) {
    return {
      title: `${profileCodeResponse.name}님의 프로필`,
      description: '유저의 개인 페이지입니다. 정보 및 활동을 확인할 수 있습니다.',
      openGraph: {
        title: `${profileCodeResponse.name}님의 프로필`,
        description: '유저의 개인 페이지입니다. 정보 및 활동을 확인할 수 있습니다.',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/user/${params.id}`,
        images: [
          {
            url: profileCodeResponse.image || '/default-image.jpg',
            width: 800,
            height: 600,
            alt: `${profileCodeResponse.name}님의 프로필 이미지`,
          },
        ],
      },
    };
  }

  return metadataMap.default;
}

export default function User() {
  return <UserPage />;
}
