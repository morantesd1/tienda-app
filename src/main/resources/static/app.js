const API_PRODUCTOS = '/api/productos';
const API_CATEGORIAS = '/api/categorias';

const formProducto = document.getElementById('formProducto');
const selectCategoriaForm = document.getElementById('categoriaId');
const selectFiltroCategoria = document.getElementById('filtroCategoria');
const inputFiltroNombre = document.getElementById('filtroNombre');
const tablaProductos = document.getElementById('tablaProductos');
const listaCategorias = document.getElementById('listaCategorias');
const mensajeGlobal = document.getElementById('mensajeGlobal');
const contadorProductos = document.getElementById('contadorProductos');

document.addEventListener('DOMContentLoaded', () => {
    cargarCategorias();
    cargarProductos();
});

inputFiltroNombre.addEventListener('input', cargarProductos);
selectFiltroCategoria.addEventListener('change', cargarProductos);

formProducto.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const categoriaId = parseInt(selectCategoriaForm.value, 10);
    const precio = parseFloat(document.getElementById('precio').value);
    const stock = parseInt(document.getElementById('stock').value, 10);

    if (!nombre) {
        mostrarMensaje('El nombre del producto no puede estar vacío.', 'error');
        return;
    }
    if (isNaN(categoriaId)) {
        mostrarMensaje('Debe seleccionar una categoría existente.', 'error');
        return;
    }
    if (isNaN(precio) || precio <= 0) {
        mostrarMensaje('El precio debe ser mayor a Q0.00.', 'error');
        return;
    }
    if (isNaN(stock) || stock < 0) {
        mostrarMensaje('El stock no puede ser negativo.', 'error');
        return;
    }

    try {
        const response = await fetch(API_PRODUCTOS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, categoriaId, precio, stock })
        });

        const data = await response.json();

        if (!response.ok) {
            mostrarMensaje(data.error || 'Error al registrar el producto.', 'error');
            return;
        }

        mostrarMensaje(`Producto "${data.nombre}" registrado exitosamente.`, 'exito');
        formProducto.reset();
        cargarProductos();
    } catch (error) {
        mostrarMensaje('No se pudo conectar con el servidor.', 'error');
    }
});

async function cargarCategorias() {
    try {
        const res = await fetch(API_CATEGORIAS);
        const categorias = await res.json();

        selectCategoriaForm.innerHTML = '<option value="">Seleccione una categoría...</option>';
        selectFiltroCategoria.innerHTML = '<option value="">Todas las categorías</option>';
        listaCategorias.innerHTML = '';

        categorias.forEach(cat => {
            const optForm = document.createElement('option');
            optForm.value = cat.id;
            optForm.textContent = cat.nombre;
            selectCategoriaForm.appendChild(optForm);

            const optFiltro = document.createElement('option');
            optFiltro.value = cat.id;
            optFiltro.textContent = cat.nombre;
            selectFiltroCategoria.appendChild(optFiltro);

            const li = document.createElement('li');
            li.innerHTML = `
                <span>${cat.nombre}</span>
                <button type="button" class="btn-delete" onclick="eliminarCategoria(${cat.id})">
                    Eliminar
                </button>
            `;
            listaCategorias.appendChild(li);
        });
    } catch (error) {
        mostrarMensaje('Error al cargar las categorías.', 'error');
    }
}

function formatearQuetzales(monto) {
    return 'Q' + Number(monto).toLocaleString('es-GT', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

async function cargarProductos() {
    const params = new URLSearchParams();
    const nombre = inputFiltroNombre.value.trim();
    const categoriaId = selectFiltroCategoria.value;

    if (nombre) params.append('nombre', nombre);
    if (categoriaId) params.append('categoriaId', categoriaId);

    try {
        const res = await fetch(`${API_PRODUCTOS}?${params.toString()}`);
        const productos = await res.json();

        contadorProductos.textContent = `${productos.length} ${productos.length === 1 ? 'producto encontrado' : 'productos encontrados'}`;
        tablaProductos.innerHTML = '';

        if (productos.length === 0) {
            tablaProductos.innerHTML = `
                <tr>
                    <td colspan="5" class="empty-state">
                        No se encontraron productos con los filtros actuales.
                    </td>
                </tr>`;
            return;
        }

        productos.forEach(prod => {
            const esBajoStock = prod.stock <= 5;
            const filaClase = esBajoStock ? 'fila-bajo-stock' : '';
            const estadoHTML = esBajoStock
                ? '<span class="badge badge-bajo-stock">Bajo Stock</span>'
                : '<span class="badge badge-normal">Disponible</span>';

            const tr = document.createElement('tr');
            tr.className = filaClase;
            tr.innerHTML = `
                <td data-label="Producto"><strong>${prod.nombre}</strong></td>
                <td data-label="Categoría"><span class="category-chip">${prod.categoria ? prod.categoria.nombre : 'Sin categoría'}</span></td>
                <td data-label="Precio" class="price-cell">${formatearQuetzales(prod.precio)}</td>
                <td data-label="Stock">${prod.stock} uds.</td>
                <td data-label="Estado">${estadoHTML}</td>
            `;
            tablaProductos.appendChild(tr);
        });
    } catch (error) {
        mostrarMensaje('Error al obtener el listado de productos.', 'error');
    }
}

async function eliminarCategoria(id) {
    try {
        const res = await fetch(`${API_CATEGORIAS}/${id}`, { method: 'DELETE' });
        const data = await res.json();

        if (!res.ok) {
            mostrarMensaje(data.error, 'error');
            return;
        }

        mostrarMensaje(data.mensaje, 'exito');
        cargarCategorias();
    } catch (error) {
        mostrarMensaje('Error de red al intentar eliminar la categoría.', 'error');
    }
}

function mostrarMensaje(texto, tipo) {
    mensajeGlobal.textContent = texto;
    mensajeGlobal.className = `alert ${tipo}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
        mensajeGlobal.classList.add('oculto');
    }, 5000);
}



