'use client';

import { useEffect } from 'react';
import { fetchComerciales, fetchServicios } from '@/lib/data';
import { useAppStore } from '@/store/useAppStore';

export const AppInitializer = (): null => {
  const { setComerciales, setServicios } = useAppStore();

  useEffect(() => {
    const init = async (): Promise<void> => {
      const [comerciales, servicios] = await Promise.all([fetchComerciales(), fetchServicios()]);
      setComerciales(comerciales);
      setServicios(servicios);
    };
    void init();
  }, [setComerciales, setServicios]);

  return null;
};
