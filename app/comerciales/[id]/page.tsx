import { ComercialDashboard } from '@/modules/comerciales/ComercialDashboard';

export default function ComercialDetailPage({ params }: { params: { id: string } }): JSX.Element {
  return <ComercialDashboard comercialId={params.id} />;
}
