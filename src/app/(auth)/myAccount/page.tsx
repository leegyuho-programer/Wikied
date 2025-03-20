import { metadataMap } from '@/app/metadata';
import MyAccountPage from '../_components/MyAccountPage/MyAccountPage';

export async function generateMetadata() {
  return metadataMap.myAccount;
}

export default function MyAccount() {
  return <MyAccountPage />;
}
