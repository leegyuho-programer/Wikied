import UserPage from '../../_components/UserPage/UserPage';

export default function Page({ params }: { params: { id: string } }) {
  const parsedId = parseInt(params.id);
  return <UserPage profileId={parsedId} />;
}
