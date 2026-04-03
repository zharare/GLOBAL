'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { ServicioCompleto } from '@/types/domain';
import { ServicioFormValues, servicioSchema } from '@/types/forms';

interface Props {
  open: boolean;
  comerciales: { id: string; nombre: string }[];
  initial?: ServicioCompleto | null;
  onClose: () => void;
  onSubmit: (values: ServicioFormValues) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const defaultValues: ServicioFormValues = {
  curso: '',
  instructor: '',
  empresa: '',
  comercial_id: '',
  estado: 'Programado',
  facturado: false,
  pagado: false,
  color: '#f97316',
  fechas: [{ fecha: new Date().toISOString().slice(0, 10), horas: 1 }],
};

export const ServiceModal = ({ open, initial, onClose, onSubmit, onDelete, comerciales }: Props): JSX.Element | null => {
  const form = useForm<ServicioFormValues>({
    resolver: zodResolver(servicioSchema),
    defaultValues: initial
      ? {
          ...initial,
          fechas: initial.fechas.map((f) => ({ fecha: f.fecha, horas: f.horas })),
        }
      : defaultValues,
  });

  const { fields, append, remove } = useFieldArray({ control: form.control, name: 'fechas' });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <form
        className="w-full max-w-3xl rounded-xl bg-white p-6 shadow-2xl"
        onSubmit={form.handleSubmit(async (values) => {
          await onSubmit(values);
          onClose();
        })}
      >
        <h2 className="mb-4 text-lg font-semibold">{initial ? 'Editar servicio' : 'Crear servicio'}</h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {(['curso', 'instructor', 'empresa'] as const).map((field) => (
            <input key={field} className="rounded border p-2" placeholder={field} {...form.register(field)} />
          ))}
          <select className="rounded border p-2" {...form.register('comercial_id')}>
            <option value="">Selecciona comercial</option>
            {comerciales.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
          </select>
          <select className="rounded border p-2" {...form.register('estado')}>
            <option>Programado</option><option>Ejecutado</option><option>Reprogramado</option>
          </select>
          <input type="color" className="h-10 rounded border p-1" {...form.register('color')} />
        </div>

        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium">Fechas y horas</p>
          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-[1fr_120px_40px] gap-2">
              <input type="date" className="rounded border p-2" {...form.register(`fechas.${index}.fecha`)} />
              <input type="number" className="rounded border p-2" {...form.register(`fechas.${index}.horas`)} />
              <button type="button" className="rounded bg-red-500 text-white" onClick={() => remove(index)}>✕</button>
            </div>
          ))}
          <button type="button" className="rounded bg-slate-200 px-3 py-1" onClick={() => append({ fecha: new Date().toISOString().slice(0, 10), horas: 1 })}>
            + Agregar fecha
          </button>
        </div>

        <div className="mt-4 flex gap-4 text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" {...form.register('facturado')} /> Facturado</label>
          <label className="flex items-center gap-2"><input type="checkbox" {...form.register('pagado')} /> Pagado</label>
        </div>

        <div className="mt-6 flex justify-between">
          {initial?.id ? (
            <button type="button" className="rounded bg-red-600 px-4 py-2 text-white" onClick={async () => { await onDelete(initial.id); onClose(); }}>
              Eliminar
            </button>
          ) : <span />}
          <div className="space-x-2">
            <button type="button" className="rounded border px-4 py-2" onClick={onClose}>Cancelar</button>
            <button type="submit" className="rounded bg-primary px-4 py-2 text-white">Guardar</button>
          </div>
        </div>
      </form>
    </div>
  );
};
