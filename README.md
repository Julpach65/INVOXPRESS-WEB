# InvoXpress - Sistema de Facturación y Gestión de Ventas

## Descripción del Proyecto

InvoXpress es una solución integral diseñada para la gestión eficiente de inventarios, ventas y facturación en el sector ferretero. El sistema permite el seguimiento de productos, gestión de carritos de compra y autenticación segura de usuarios.

## Arquitectura del Sistema

El proyecto está estructurado en dos componentes principales:

### Frontend
- Interfaz de usuario responsiva desarrollada con HTML5 y CSS3.
- Lógica de cliente implementada en JavaScript Vanilla.
- Gestión de estado local mediante LocalStorage para el carrito de compras.
- Integración con Google Identity Services para autenticación social.

### Backend
- Servidor de aplicaciones basado en Node.js y Express.
- Arquitectura RESTful para la exposición de endpoints.
- Controladores en Java para la lógica de negocio extendida.

## Tecnologías Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript.
- **Backend:** Node.js, Express, Java.
- **Autenticación:** Google OAuth 2.0.
- **Base de Datos:** Preparado para integración con MySQL.

## Instalación y Configuración

1. Clonar el repositorio.
2. Navegar al directorio raíz.
3. Instalar las dependencias de Node.js (opcional si ya están instaladas):
   ```bash
   npm install
   ```
4. Iniciar el servidor de desarrollo:
   ```bash
   node index.js
   ```

## Autores

- Julián Pacheco

## Licencia

Este proyecto es de uso académico y profesional.
