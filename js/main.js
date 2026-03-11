// Cargar datos de libros
async function cargarLibros() {
    try {
        const response = await fetch('data/libros.json');
        const libros = await response.json();
        renderizarLibros(libros);
    } catch (error) {
        console.error('Error al cargar los libros:', error);
    }
}

// Renderizar libros en el grid
function renderizarLibros(libros) {
    const grid = document.getElementById('libros-grid');
    
    libros.forEach(libro => {
        const card = document.createElement('div');
        card.className = 'libro-card';
        card.onclick = () => abrirModal(libro);
        
        card.innerHTML = `
            <img src="${libro.portada}" alt="${libro.titulo}">
            <div class="libro-info">
                <h3>${libro.titulo}</h3>
                <p><strong>Autor:</strong> ${libro.autor}</p>
                <p><strong>Editorial:</strong> ${libro.editorial}</p>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

let flipbookInitialized = false;

// Abrir modal
function abrirModal(libro) {
    const container = document.getElementById('modal-flipbook');
    
    // Generar páginas dinámicamente desde el array de comentarios
    let paginasHTML = `
        <div class="modal-page">
            <div class="modal-content-box">
                <h2>${libro.titulo}</h2>
                <h3>Información General</h3>
                <p><strong>Autor:</strong> ${libro.autor}</p>
                <p><strong>Editorial:</strong> ${libro.editorial}</p>
                <p><strong>Leer libro:</strong> <a href="${libro.link}" target="_blank" style="color: #9b7fd4; text-decoration: underline;">Ver aquí</a></p>
            </div>
        </div>
    `;
    
    // Agregar una página por cada comentario
    libro.comentarios.forEach((comentario, index) => {
        paginasHTML += `
            <div class="modal-page">
                <div class="modal-content-box">
                    <h2>${libro.titulo}</h2>
                    <p>${comentario}</p>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = `
        <button class="modal-close" onclick="cerrarModal()">&times;</button>
        <div id="flipbook">
            ${paginasHTML}
        </div>
    `;
    
    // Forzar reflow y mostrar modal con animación
    container.style.display = 'flex';
    container.offsetHeight; // Force reflow
    requestAnimationFrame(() => {
        container.classList.add('active');
    });
    
    // Click en el fondo para cerrar
    container.onclick = function(e) {
        if (e.target === container) {
            cerrarModal();
        }
    };
    
    // Inicializar Turn.js
    setTimeout(() => {
        $('#flipbook').turn({
            width: 1200,
            height: 600,
            autoCenter: false,
            duration: 1200,
            gradients: true,
            elevation: 50,
            acceleration: true,
            page: 1,
            display: 'single',
            when: {
                turning: function(event, page, view) {
                    // Prevenir saltos
                },
                turned: function(event, page, view) {
                    console.log('Página actual: ' + page);
                }
            }
        });
        
        // Forzar altura y posición consistente
        $('#flipbook').css({
            'position': 'relative',
            'top': '0',
            'left': '0',
            'margin-top': '0',
            'margin-bottom': '0',
            'transform': 'none'
        });
        
        $('#flipbook .page, #flipbook .page-wrapper').css({
            'height': '600px',
            'min-height': '600px',
            'max-height': '600px',
            'position': 'absolute',
            'top': '0',
            'left': '0',
            'margin': '0',
            'padding': '0'
        });
        
        // Prevenir scroll durante transición
        $('#flipbook .modal-content-box').on('scroll', function() {
            if ($('#flipbook').turn('animating')) {
                $(this).scrollTop(0);
            }
        });
        
        flipbookInitialized = true;
        
        // Agregar botones de navegación
        const navButtons = `
            <button id="prev-btn" style="position: fixed; left: 2rem; top: 50%; transform: translateY(-50%); z-index: 1002; background: white; border: none; width: 60px; height: 60px; border-radius: 50%; font-size: 2rem; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.3); transition: transform 0.3s ease;">←</button>
            <button id="next-btn" style="position: fixed; right: 2rem; top: 50%; transform: translateY(-50%); z-index: 1002; background: white; border: none; width: 60px; height: 60px; border-radius: 50%; font-size: 2rem; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.3); transition: transform 0.3s ease;">→</button>
        `;
        container.insertAdjacentHTML('beforeend', navButtons);
        
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        prevBtn.onclick = (e) => {
            e.stopPropagation();
            const currentPage = $('#flipbook').turn('page');
            if (currentPage === 1) {
                $('#flipbook').turn('page', $('#flipbook').turn('pages'));
            } else {
                $('#flipbook').turn('previous');
            }
        };
        
        nextBtn.onclick = (e) => {
            e.stopPropagation();
            const currentPage = $('#flipbook').turn('page');
            const totalPages = $('#flipbook').turn('pages');
            if (currentPage === totalPages) {
                $('#flipbook').turn('page', 1);
            } else {
                $('#flipbook').turn('next');
            }
        };
        
        // Hover effects
        prevBtn.onmouseenter = () => prevBtn.style.transform = 'translateY(-50%) scale(1.1)';
        prevBtn.onmouseleave = () => prevBtn.style.transform = 'translateY(-50%) scale(1)';
        nextBtn.onmouseenter = () => nextBtn.style.transform = 'translateY(-50%) scale(1.1)';
        nextBtn.onmouseleave = () => nextBtn.style.transform = 'translateY(-50%) scale(1)';
    }, 200);
}

// Cerrar modal - hacer global
window.cerrarModal = function() {
    const container = document.getElementById('modal-flipbook');
    
    // Animar salida
    container.classList.add('closing');
    container.classList.remove('active');
    
    setTimeout(() => {
        if (flipbookInitialized) {
            try {
                $('#flipbook').turn('destroy');
            } catch(e) {
                console.log('Error destroying flipbook:', e);
            }
            flipbookInitialized = false;
        }
        container.style.display = 'none';
        container.classList.remove('closing');
        container.innerHTML = '';
    }, 700);
};

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    cargarLibros();
    
    // Cerrar modal con tecla ESC y navegar con flechas
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            cerrarModal();
        }
        
        // Navegar con flechas del teclado
        if (flipbookInitialized) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const currentPage = $('#flipbook').turn('page');
                if (currentPage === 1) {
                    $('#flipbook').turn('page', $('#flipbook').turn('pages'));
                } else {
                    $('#flipbook').turn('previous');
                }
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                const currentPage = $('#flipbook').turn('page');
                const totalPages = $('#flipbook').turn('pages');
                if (currentPage === totalPages) {
                    $('#flipbook').turn('page', 1);
                } else {
                    $('#flipbook').turn('next');
                }
            }
        }
    });
});
