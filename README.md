# Sistema de Control de Inventario (Productos y Categorías)

Aplicación web Full-Stack desarrollada con **Java Spring Boot**, **MySQL**, **HTML5**, **CSS3** y **JavaScript (Fetch API)** para la gestión de productos y categorías con relación uno a muchos (`1:N`), validación de reglas de negocio y diseño responsivo.

---

## Requisitos e Instrucciones para Levantar el Proyecto en Local

### Requisitos previos
* **Java Development Kit (JDK):** Versión **17** o superior (probado con JDK 17 / 21 / 26).
* **Apache Maven:** Versión **3.8+** (incluido en NetBeans o instalado en el sistema).
* **MySQL Server:** Versión **8.0+** ejecutándose en el puerto `3306`.
* **IDE recomendado:** Apache NetBeans, IntelliJ IDEA o VS Code.

### Pasos de ejecución

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/morantesd1/tienda-app.git](https://github.com/morantesd1/tienda-app.git)
   cd tienda-app

2. **Configurar credenciales de base de datos:**
Abrir el archivo src/main/resources/application.properties y verifica o ajusta las credenciales según tu entorno local:

Properties
spring.datasource.url=jdbc:mysql://localhost:3306/tienda_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=tu_password
server.port=8080

3. **Importar la base de datos:**

El script completo de estructura y datos iniciales se encuentra en database/database.sql.

Credenciales y parámetros por defecto
Host / Puerto: localhost:3306

Base de datos: tienda_db

Usuario por defecto: root

Contraseña: (configurada en application.properties)

-Importar desde MySQL Workbench

Abrir MySQL Workbench y conectarse a la instancia local (Local instance MySQL).

Ir al menú superior File > Open SQL Script... y seleccionar database/database.sql.

Ejecutar todo el script.


4. **Compilar y ejecutar la API:**


Desde Apache NetBeans:

Abrir el proyecto (File > Open Project).

Hacer clic derecho sobre el proyecto tienda-app y seleccionar Clean and Build.

Hacer clic derecho sobre TiendaApp.java y seleccionar Run File (o presionar F6).

5. **Acceder a la interfaz web:**

Abrir el navegador e ingresar a:http://localhost:8080


**Justificación de la Estructura de Carpetas**

El proyecto sigue una arquitectura en capas estándar de Spring Boot. Se manejó de la manera descrita a continuación para evitar mezclar métodos de acceso a datos con validaciones HTTP.

El paquete 'controller' contiene los Endpoints.
El paquete 'dto' valida los datos de entrada antes de editar la base de datos
El paquete 'exception' contiene el  manejo de errores de HTTP y las reglas del negocio
El paquete 'model' contiene las entidades JPA para el mapeo a las tablas de MySQL
El paquete 'repository' contiene las interfaces Spring Data JPA 
