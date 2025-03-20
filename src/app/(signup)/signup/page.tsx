import { metadataMap } from '@/app/metadata';
import SignUpPage from '../_components/SignUpPage';

export async function generateMetadata() {
  return metadataMap.signupPage;
}

export default function SignUp() {
  return <SignUpPage />;
}
