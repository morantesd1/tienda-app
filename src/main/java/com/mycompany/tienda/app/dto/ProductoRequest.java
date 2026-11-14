package com.mycompany.tienda.app.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public class ProductoRequest {

    @NotNull(message = "Debe seleccionar una categoría existente.")
    private Integer categoriaId;

    @NotBlank(message = "El nombre del producto no puede estar vacío.")
    @Size(max = 150, message = "El nombre no puede superar los 150 caracteres.")
    private String nombre;

    @NotNull(message = "El precio es obligatorio.")
    @DecimalMin(value = "0.01", message = "El precio debe ser mayor a 0.")
    private BigDecimal precio;

    @NotNull(message = "El stock es obligatorio.")
    @Min(value = 0, message = "El stock no puede ser negativo.")
    private Integer stock;

    public Integer getCategoriaId() { return categoriaId; }
    public void setCategoriaId(Integer categoriaId) { this.categoriaId = categoriaId; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public BigDecimal getPrecio() { return precio; }
    public void setPrecio(BigDecimal precio) { this.precio = precio; }

    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }
}
