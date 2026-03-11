# Exposición de Libro-Álbumes

Web estática para mostrar una colección de 10 libro-álbumes con interacciones hover y modal.

## Estructura del Proyecto

```
libro-albums/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos
├── js/
│   └── main.js         # Funcionalidad
├── data/
│   └── libros.json     # Datos de los libros
├── images/
│   └── portadas/       # Imágenes de portadas (libro1.jpg - libro10.jpg)
└── README.md
```

## Cómo Usar

### 1. Agregar Imágenes
Coloca las imágenes de las portadas en `images/portadas/` con los nombres:
- libro1.jpg
- libro2.jpg
- libro3.jpg
- ... hasta libro10.jpg

### 2. Actualizar Información
Edita `data/libros.json` con la información real de cada libro:
- titulo
- autor
- editorial
- paginas
- comentario

### 3. Probar Localmente
Abre `index.html` en tu navegador o usa un servidor local:
```bash
python -m http.server 8000
# o
npx serve
```

### 4. Desplegar en GitHub Pages

1. Crea un repositorio en GitHub
2. Sube todos los archivos
3. Ve a Settings > Pages
4. Selecciona la rama `main` y carpeta `/ (root)`
5. Guarda y espera unos minutos

Tu sitio estará disponible en: `https://tu-usuario.github.io/libro-albums/`

## Funcionalidades

- **Grid responsive**: Se adapta a diferentes tamaños de pantalla
- **Hover**: Muestra información del libro (autor, editorial, páginas)
- **Click**: Abre modal con comentario detallado
- **Cerrar modal**: Click en X, overlay o tecla ESC
- **Optimizado para GitHub Pages**: 100% estático, sin dependencias

## Tecnologías

- HTML5
- CSS3 (Grid, Flexbox, Animations)
- JavaScript Vanilla (ES6+)
