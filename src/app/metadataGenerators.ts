import { getArticleServer } from '@/api/article/server-article';
import { getProfile } from '@/api/profile/profile';
import { getProfileCode } from '@/api/profile/profileCode';
import { metadataMap } from '@/app/metadata';

interface Params {
  params: { id: string };
}

export async function generateArticleMetadata({ params }: Params) {
  const articleId = Number(params.id);

  try {
    const article = await getArticleServer(articleId);

    return {
      title: article.title,
      description: article.content.substring(0, 160),
      openGraph: {
        title: article.title,
        description: article.content.substring(0, 160),
        images: article.image ? [article.image] : [],
      },
    };
  } catch (error) {
    return {
      title: '게시글을 찾을 수 없습니다',
      description: '요청하신 게시글을 찾을 수 없습니다.',
    };
  }
}

export async function generateProfileMetadata({ params }: Params) {
  try {
    const profileList = await getProfile(1, 100);
    const targetProfile = profileList?.list.find((item) => item.id === parseInt(params.id));
    const profileCodeResponse = await getProfileCode(targetProfile?.code ?? '');

    if (profileCodeResponse) {
      return {
        title: `${profileCodeResponse.name}님의 프로필`,
        description: metadataMap.userPage.description,
        openGraph: {
          title: `${profileCodeResponse.name}님의 프로필`,
          description: metadataMap.userPage.description,
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
  } catch (error) {
    return {
      title: '프로필을 찾을 수 없습니다',
      description: '요청하신 프로필을 찾을 수 없습니다.',
    };
  }

  return metadataMap.default;
}
