'use client';

import { useEffect, useState } from 'react';
import { deleteComercial, fetchComerciales } from '@/lib/data';
import { supabase } from '@/lib/supabase';
import { useAppStore } from '@/store/useAppStore';

export const ComercialesManager = (): JSX.Element => {
  const { comerciales, setComerciales } = useAppStore();
  const [nombre, setNombre] = useState('');
  const [color, setColor] = useState('#2563eb');

  const load = async (): Promise<void> => setComerciales(await fetchComerciales());
  useEffect(() => { void load(); }, []);

  const add = async (): Promise<void> => {
    if (!nombre.trim()) return;
    await supabase.from('comerciales').insert({ nombre: nombre.trim().toUpperCase(), color });
    setNombre('');
    await load();
  };

  const updateColor = async (id: string, newColor: string): Promise<void> => {
    await supabase.from('comerciales').update({ color: newColor }).eq('id', id);
    await load();
  };

  return (
    <section className="card p-4">
      <h1 className="text-xl font-semibold">Gestión de Comerciales</h1>
      <div className="mt-4 flex gap-2">
        <input className="rounded border p-2" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" />
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        <button className="rounded bg-primary px-3 py-2 text-white" onClick={() => void add()}>Agregar</button>
      </div>
      <ul className="mt-4 space-y-2">
        {comerciales.map((c) => (
          <li key={c.id} className="flex items-center justify-between rounded border p-3">
            <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full" style={{ backgroundColor: c.color }} />{c.nombre}</div>
            <div className="flex gap-2">
              <input type="color" value={c.color} onChange={(e) => void updateColor(c.id, e.target.value)} />
              <button
                className="rounded bg-red-600 px-3 py-1 text-white"
                onClick={async () => {
                  const confirm = window.prompt(`Escribe ELIMINAR ${c.nombre} para confirmar`);
                  if (confirm === `ELIMINAR ${c.nombre}`) {
                    await deleteComercial(c.id);
                    await load();
                  }
                }}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
