'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { DashboardClient } from '@/modules/dashboard/DashboardClient';

export const ComercialDashboard = ({ comercialId }: { comercialId: string }): JSX.Element => {
  const setSelectedComercialId = useAppStore((s) => s.setSelectedComercialId);

  useEffect(() => {
    setSelectedComercialId(comercialId);
    return () => setSelectedComercialId(null);
  }, [comercialId, setSelectedComercialId]);

  return <DashboardClient />;
};
