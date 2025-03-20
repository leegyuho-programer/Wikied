import { metadataMap } from '@/app/metadata';
import LoginPage from '../_components/LoginPage';

export async function generateMetadata() {
  return metadataMap.loginPage;
}

export default function Login() {
  return <LoginPage />;
}
