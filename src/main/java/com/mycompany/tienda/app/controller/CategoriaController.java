package com.mycompany.tienda.app.controller;

import com.mycompany.tienda.app.model.Categoria;
import com.mycompany.tienda.app.repository.CategoriaRepository;
import com.mycompany.tienda.app.repository.ProductoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/categorias")
@CrossOrigin(origins = "*")
public class CategoriaController {

    private final CategoriaRepository categoriaRepository;
    private final ProductoRepository productoRepository;

    public CategoriaController(CategoriaRepository categoriaRepository,
                               ProductoRepository productoRepository) {
        this.categoriaRepository = categoriaRepository;
        this.productoRepository = productoRepository;
    }

    @GetMapping
    public List<Categoria> listarCategorias() {
        return categoriaRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarCategoria(@PathVariable Integer id) {
        if (!categoriaRepository.existsById(id)) {
            throw new IllegalArgumentException("La categoría no existe.");
        }

        if (productoRepository.existsByCategoriaId(id)) {
            throw new IllegalStateException(
                "No se puede eliminar la categoría porque todavía tiene productos asociados."
            );
        }

        categoriaRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("mensaje", "Categoría eliminada correctamente."));
    }
}
