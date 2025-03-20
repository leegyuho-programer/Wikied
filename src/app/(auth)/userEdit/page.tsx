import { metadataMap } from '@/app/metadata';
import UserEditPage from '../_components/UserEditPage/UserEditPage';

export async function generateMetadata() {
  return metadataMap.userEditPage;
}

export default function userEdit() {
  return <UserEditPage />;
}
