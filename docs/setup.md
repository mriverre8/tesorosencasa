# Tesoros en Casa [Next.js + TailwindCSS]

## Desplegado en Vercel

- **Frontend**: https://tesorosencasa.vercel.app/

---

## Tecnologías utilizadas

- **Next.js 15**: Framework de React para desarrollo de aplicaciones web modernas.
- **React 19**: Librería de JavaScript para construir interfaces de usuario.
- **Tailwind CSS 3**: Framework de utilidades para diseño responsivo y estilizado rápido.
- **Zustand**: Manejo de estado global sencillo y reactivo.
- **Prisma**: ORM para interactuar con la base de datos de manera segura y eficiente.
- **Supabase**: Backend como servicio, incluyendo autenticación y almacenamiento.
- **Cloudinary**: Gestión y optimización de imágenes en la nube.
- **Next-Intl**: Soporte para internacionalización.
- **Prettier & ESLint**: Formateo y linting de código para mantener calidad y consistencia.

---

## Requisitos

- Node.js >= 20
- npm o yarn
- Base de datos compatible con Prisma (PostgreSQL, MySQL, SQLite, etc.)
- Cuenta en Supabase y Cloudinary

> Recomendado: probado con Node 20 y node 22.

---

## Instalación

Clona el repositorio y navega a la carpeta:

```bash
git clone https://github.com/mriverre8/tesorosencasa.git
cd tesorosencasa
```

Instala las dependencias:

```bash
npm install
```

## Ejecutar en desarrollo

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
