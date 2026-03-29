# 📍 Pin Catalog

> Catálogo web profesional para una marca de pines creada en la universidad.

## ✨ Características

- **Catálogo responsivo** con grid tipo Pinterest (4 cols desktop → 2 tablet → 1 móvil)
- **12 pines de ejemplo** organizados en categorías: Anime, Música, Arte, Humor, Personalizado
- **Filtros interactivos** sin recarga de página
- **Modal de detalle** con especificaciones completas de cada pin
- **Carrito flotante** con persistencia en `localStorage`
- **Formulario de contacto** funcional
- **Animaciones suaves** (fade-in, hover effects, transiciones)
- **Sin dependencias externas** — HTML + CSS + JavaScript vanilla puro
- **SEO optimizado** — meta tags, HTML semántico, atributos `aria`
- **Modo de movimiento reducido** respetado (`prefers-reduced-motion`)

## 🎨 Paleta de Colores

| Color         | Hex       | Uso                                    |
|---------------|-----------|----------------------------------------|
| Burdeo        | `#6B1B47` | Header, elementos principales          |
| Verde Pino    | `#2D5016` | Acentos, bordes, footer                |
| Verde Limón   | `#B8D84F` | Highlights, estadísticas               |
| Coral         | `#FF6B6B` | CTAs, precios, carrito flotante        |
| Blanco/Crema  | `#F8F7F3` | Fondo principal                        |
| Gris Oscuro   | `#2C2C2C` | Texto principal                        |

## 🗂️ Estructura de Carpetas

```
pin-catalog/
├── index.html            ← Página principal
├── css/
│   ├── styles.css        ← Estilos principales, componentes, animaciones
│   └── responsive.css    ← Breakpoints: mobile, tablet (768px+), desktop (1200px+)
├── js/
│   ├── main.js           ← Datos de pines, render de cards, modal, menú, formulario
│   ├── filters.js        ← Filtrado por categoría con transición suave
│   └── cart.js           ← Carrito con localStorage, panel lateral
├── assets/
│   ├── images/
│   │   └── pins/         ← Imágenes SVG de los 12 pines (reemplazar con fotos reales)
│   └── icons/            ← Iconos SVG (cart, close, share)
└── README.md
```

## 🚀 Cómo usar

1. **Clona o descarga** el repositorio
2. Abre `index.html` directamente en el navegador  
   *(no requiere servidor, pero se recomienda uno local para mejor rendimiento)*
3. Para servidor local rápido:
   ```bash
   # Python 3
   python -m http.server 8080
   # o Node.js
   npx serve .
   ```
4. Visita `http://localhost:8080`

## 🖼️ Agregar Imágenes Reales

Reemplaza los archivos SVG en `assets/images/pins/` con tus fotos reales (`.jpg`, `.png` o `.webp`).  
Luego actualiza las rutas en el array `PINS_DATA` dentro de `js/main.js`:

```js
image: 'assets/images/pins/mi-pin-foto.jpg',
```

## 🌐 Publicar en GitHub Pages

1. Ve a **Settings** → **Pages** en tu repositorio de GitHub
2. En **Source**, selecciona la rama `main` y la carpeta `/ (root)`
3. Guarda y en unos minutos tu sitio estará disponible en:  
   `https://TU_USUARIO.github.io/pin-catalog/`

## 🔧 Personalización

### Agregar un nuevo pin
Agrega un objeto al array `PINS_DATA` en `js/main.js`:
```js
{
  id: 13,
  name: 'Mi Nuevo Pin',
  category: 'arte',           // anime | musica | arte | humor | personalizado
  categoryLabel: 'Arte',
  description: 'Descripción del pin.',
  price: 4500,                // precio en CLP
  image: 'assets/images/pins/pin-13.svg',
  specs: { Tamaño: '3 cm', Material: 'Zinc + esmalte', Esmalte: 'Brillante' }
}
```

### Cambiar la moneda
Modifica la función `formatPrice` en `js/main.js` para adaptar el formato:
```js
function formatPrice(price) {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
}
```

---

Hecho con ❤️ en la universidad · **Pin Catalog** 📍
