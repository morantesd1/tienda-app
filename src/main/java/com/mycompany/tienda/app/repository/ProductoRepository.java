package com.mycompany.tienda.app.repository;

import com.mycompany.tienda.app.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ProductoRepository extends JpaRepository<Producto, Integer> {

    boolean existsByCategoriaId(Integer categoriaId);

    @Query("SELECT p FROM Producto p WHERE " +
           "(:nombre IS NULL OR LOWER(p.nombre) LIKE LOWER(CONCAT('%', :nombre, '%'))) AND " +
           "(:categoriaId IS NULL OR p.categoria.id = :categoriaId) " +
           "ORDER BY p.id DESC")
    List<Producto> buscarConFiltros(@Param("nombre") String nombre,
                                    @Param("categoriaId") Integer categoriaId);
}
