# Ferrum Global Solutions — Landing Page

React + Vite · Paleta oficial Manual de Imagen · Animaciones GSAP + Three.js

## Stack

- **React 18** + **Vite 5**
- **GSAP 3** — ScrollTrigger, TextPlugin, animaciones avanzadas
- **Three.js** — malla wireframe animada en hero
- **CSS Modules por componente** — sin frameworks externos
- Fuente: **Poppins** (Google Fonts)

## Estructura

```
src/
├── components/
│   ├── Header.jsx / Header.css
│   ├── Hero.jsx / Hero.css
│   ├── Servicios.jsx / Servicios.css
│   ├── Dupla.jsx / Dupla.css
│   ├── FerrumOS.jsx / FerrumOS.css
│   ├── Formulario.jsx / Formulario.css
│   └── Footer.jsx / Footer.css
├── hooks/
│   ├── useScrollReveal.js
│   ├── useCursor.js
│   └── useIntro.js
├── styles/
│   ├── globals.css      ← Variables de marca (Manual de Imagen v1.0)
│   └── animations.css   ← Cursor, intro overlay, transiciones
├── App.jsx
└── main.jsx
```

## Desarrollo local

```bash
npm install
npm run dev
# → http://localhost:5173
```

## Build de producción

```bash
npm run build
# Output en /dist
```

## Despliegue en GitHub Pages

### Configuración inicial (una sola vez)

1. Subir el proyecto a GitHub:
```bash
git init
git add .
git commit -m "feat: initial Ferrum landing"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/ferrum-landing.git
git push -u origin main
```

2. En GitHub → Settings → Pages → Source: **GitHub Actions**

3. El workflow `.github/workflows/deploy.yml` se ejecuta automáticamente con cada `push` a `main`.

4. La URL quedará en: `https://TU_USUARIO.github.io/ferrum-landing/`

> **Si usas subpath** (ej. `/ferrum-landing/`), actualiza `vite.config.js`:
> ```js
> base: '/ferrum-landing/'
> ```

### Dominio personalizado (ferrumgs.com)

1. En GitHub → Settings → Pages → Custom domain → ingresar `ferrumgs.com`
2. En tu proveedor DNS, agregar registro:
   ```
   CNAME  www  TU_USUARIO.github.io
   A      @    185.199.108.153
   A      @    185.199.109.153
   A      @    185.199.110.153
   A      @    185.199.111.153
   ```

## Paleta de colores (Manual de Imagen)

| Token       | Hex       | Uso                     |
|-------------|-----------|-------------------------|
| negro       | `#0E0E0F` | Fondo principal         |
| dark-gray   | `#5C5B5C` | Texto secundario muted  |
| silver      | `#999999` | Texto dimmed            |
| humo        | `#E7E6E6` | Texto principal         |
| oro         | `#E49800` | Accent caliente         |
| amarillo    | `#EABD0C` | Accent primario         |
| soft-yellow | `#F9DA1B` | Highlight / gradients   |

## Servicios activos

1. **Debida Diligencia Estratégica** — Legal, Normativa y Ambiental · máx. 72h
2. **Diseño y Documentación Técnica** — Arquitectura, Ingeniería y BIM · máx. 8 días

## Contacto

📧 ferrumglobalsolutions@gmail.com  
📞 +57 322 716 7158  
📍 Ubaté, Cundinamarca · Colombia
