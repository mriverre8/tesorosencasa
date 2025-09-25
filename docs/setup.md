# Tesoros en Casa [Next.js + TypeScript + TailwindCSS]

## Desplegado en Vercel

- **Frontend**: https://tesorosencasa.vercel.app/

## Requisitos

- Node.js >= 20
- npm
- Git
- Base de datos compatible con Prisma (PostgreSQL, MySQL, SQLite, etc.)
- Cuenta en Supabase y Cloudinary

> Recomendado: probado con Node 20 y Node 22.

## 1. Instalación

Clona el repositorio y navega a la carpeta:

```bash
git clone https://github.com/mriverre8/tesorosencasa.git
cd tesoros-en-casa
```

Instala las dependencias:

```bash
npm install
```

## 2. Variables de entorno

Crea un archivo `.env` con esta estructura:

```bash
DATABASE_URL=<your_database_url>
DIRECT_URL=<your_direct_url>
```

Crea un archivo `.env.local` con esta estructura:

```bash
NEXT_PUBLIC_SUPABASE_URL=<your_supabase_url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_supabase_anon_key>
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
NEXT_PUBLIC_CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
```

## 3. Setup de la base de datos

```bash
npx prisma generate
npx prisma db push
```

## 4. Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: http://localhost:3000

## Compilar y ejecutar en producción

```bash
npm run build
npm start
```

## Linter y formateo

```bash
# Revisar lint
npm run lint

# Formatear código
npm run format
```
