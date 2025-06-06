import UserPage from '../../_components/UserPage/UserPage';

export default function User({ params }: { params: { id: string } }) {
  const parsedId = parseInt(params.id);
  return <UserPage profileId={parsedId} />;
}
