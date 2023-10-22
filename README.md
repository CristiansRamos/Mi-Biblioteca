Sistema de Gestión de Préstamos de Libros
Este es un sistema de gestión de préstamos de libros desarrollado en React.js y utiliza una base de datos MySQL para almacenar la información. El sistema permite a los administradores realizar un seguimiento de los libros disponibles en diferentes categorías y gestionar los préstamos de libros a los lectores.

Características
Dashboard de Categorías: El sistema presenta un panel de control que muestra un contador de libros disponibles en cada categoría. Esto ayuda a los administradores a tener una visión general de la colección de libros.

Roles de Usuario:

Administradores: Los administradores tienen acceso completo al sistema. Pueden crear y gestionar usuarios, así como gestionar libros y préstamos.
Empleados: Los empleados pueden registrar lectores en el sistema y realizar préstamos de libros, pero no tienen acceso a la gestión de usuarios.

Tecnologías Utilizadas
Frontend: React.js
Base de Datos: MySQL
Instalación
Para ejecutar este proyecto en tu máquina local, sigue estos pasos:

Clona este repositorio:


Copia el codigo
git clone https://github.com/CristiansRamos/Mi-Biblioteca.git


Instala las dependencias del proyecto:
npm install

Configura la base de datos MySQL:
Crea una base de datos y configura las credenciales en el archivo de configuración.

Ejecuta la aplicación:

sql
npm start

Uso: 

Acceso al Sistema:

Accede al sistema utilizando las siguientes credenciales:
Administrador: username: administrador, contraseña: Administrador
Empleado: username: empleado, contraseña: Empleado

Panel de Control
En el panel de control, encontrarás un resumen de libros disponibles en cada categoría.
Gestión de Usuarios (Solo para Administradores)

Los administradores pueden crear, modificar y eliminar usuarios. Esto se realiza a través de la sección de gestión de usuarios en el menú de administrador.

Registro de Lectores (para Empleados y Admistradores)
Pueden registrar lectores en el sistema a través de la sección de registro de lectores en el menú de lectores.

Préstamo de Libros
Tanto los administradores como los empleados pueden realizar préstamos de libros. Selecciona un lector y el libro que desea prestar, y confirma la transacción.
