package com.mycompany.tienda.app.controller;

import com.mycompany.tienda.app.dto.ProductoRequest;
import com.mycompany.tienda.app.model.Categoria;
import com.mycompany.tienda.app.model.Producto;
import com.mycompany.tienda.app.repository.CategoriaRepository;
import com.mycompany.tienda.app.repository.ProductoRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductoController {

    private final ProductoRepository productoRepository;
    private final CategoriaRepository categoriaRepository;

    public ProductoController(ProductoRepository productoRepository,
                              CategoriaRepository categoriaRepository) {
        this.productoRepository = productoRepository;
        this.categoriaRepository = categoriaRepository;
    }

    @GetMapping
    public List<Producto> listarProductos(
            @RequestParam(required = false) String nombre,
            @RequestParam(required = false) Integer categoriaId) {
        String filtroNombre = (nombre != null && !nombre.trim().isEmpty()) ? nombre.trim() : null;
        return productoRepository.buscarConFiltros(filtroNombre, categoriaId);
    }

    @PostMapping
    public ResponseEntity<Producto> crearProducto(@Valid @RequestBody ProductoRequest request) {
        Categoria categoria = categoriaRepository.findById(request.getCategoriaId())
                .orElseThrow(() -> new IllegalArgumentException("La categoría seleccionada no existe."));

        Producto producto = new Producto();
        producto.setCategoria(categoria);
        producto.setNombre(request.getNombre().trim());
        producto.setPrecio(request.getPrecio());
        producto.setStock(request.getStock());

        Producto guardado = productoRepository.save(producto);
        return ResponseEntity.status(HttpStatus.CREATED).body(guardado);
    }
}
