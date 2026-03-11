# Plan de Desarrollo: Web de Exposición de Libro-Álbumes

## Objetivo
Crear una web que muestre 10 portadas de libro-álbumes con interacciones hover (información del libro) y click (modal con comentario).

## Paso a Paso

### 1. Estructura del Proyecto
```
libro-albums/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── images/
│   └── portadas/
│       ├── libro1.jpg
│       ├── libro2.jpg
│       └── ...
└── data/
    └── libros.json
```

### 2. Crear Archivo de Datos (data/libros.json)
- Array con 10 objetos, cada uno conteniendo:
  - `id`: identificador único
  - `titulo`: nombre del libro
  - `autor`: autor del libro
  - `editorial`: editorial
  - `paginas`: número de páginas
  - `portada`: ruta a la imagen
  - `comentario`: texto del comentario para el modal

### 3. Estructura HTML (index.html)
- Header con título del sitio
- Grid container para las 10 portadas
- Estructura del modal (oculto por defecto):
  - Overlay oscuro
  - Contenedor del modal
  - Botón de cerrar
  - Área para título y comentario

### 4. Estilos CSS (css/styles.css)
- **Grid de portadas**: CSS Grid responsive (2-3-4 columnas según viewport)
- **Cards de libros**:
  - Imagen de portada
  - Overlay con información (oculto por defecto)
  - Transiciones suaves
- **Hover effect**:
  - Mostrar overlay con información del libro
  - Efecto de zoom o elevación sutil
- **Modal**:
  - Centrado en pantalla
  - Fondo oscuro semitransparente
  - Animación de entrada/salida
  - Responsive

### 5. Funcionalidad JavaScript (js/main.js)
- **Cargar datos**: Fetch de `libros.json`
- **Renderizar portadas**: 
  - Crear elementos dinámicamente
  - Insertar imagen y datos
- **Event listeners**:
  - Hover: mostrar/ocultar información
  - Click en portada: abrir modal con comentario
  - Click en cerrar/overlay: cerrar modal
  - Tecla ESC: cerrar modal

### 6. Implementación por Fases

#### Fase 1: Base
- Crear estructura de carpetas
- HTML básico con grid estático
- CSS para layout responsive

#### Fase 2: Datos
- Crear `libros.json` con información de los 10 libros
- Agregar imágenes de portadas

#### Fase 3: Interactividad
- JavaScript para cargar y renderizar datos
- Implementar hover effect
- Crear y controlar modal

#### Fase 4: Refinamiento
- Ajustar animaciones y transiciones
- Optimizar responsive design
- Accesibilidad (aria-labels, keyboard navigation)

### 7. Tecnologías
- HTML5
- CSS3 (Grid, Flexbox, Transitions)
- JavaScript Vanilla (ES6+)
- Opcional: Framework CSS (Bootstrap/Tailwind) si se prefiere

### 8. Consideraciones
- Imágenes optimizadas (formato WebP, tamaño adecuado)
- Accesibilidad: alt text, navegación por teclado
- Performance: lazy loading de imágenes
- Mobile-first approach

## Próximos Pasos
1. ¿Tienes las imágenes de las portadas?
2. ¿Tienes la información de los 10 libros?
3. ¿Prefieres JavaScript vanilla o algún framework (React, Vue)?
4. ¿Necesitas que sea estático o con backend?
