# CONSITEC - Sistema Inteligente de Cronogramas y Operaciones

Plataforma SaaS interna para gestión comercial, cronograma operativo, control de facturación/pagos y consolidado de métricas.

## Stack
- Next.js 14 (App Router)
- TypeScript estricto
- Tailwind CSS
- Supabase PostgreSQL
- Zustand
- React Hook Form + Zod
- date-fns

## Inicio rápido
1. Instalar dependencias: `npm install`
2. Configurar variables en `.env.local` usando `.env.example`
3. Crear tablas ejecutando `supabase/schema.sql`
4. Ejecutar: `npm run dev`

## Módulos
- Dashboard principal con KPIs + cronograma mensual + panel operativo
- Gestión de comerciales (alta, color, baja con confirmación fuerte)
- Modal reusable para CRUD de servicios con fechas dinámicas
- Módulo de pagos a instructores con filtro por mes y agrupación por instructor

## Estructura
- `app/` rutas
- `components/` UI reutilizable
- `modules/` componentes funcionales por dominio
- `lib/` acceso a datos y utilidades
- `store/` estado global con métricas y filtros
- `types/` contratos tipados
- `supabase/schema.sql` modelo de datos
