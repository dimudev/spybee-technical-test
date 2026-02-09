# Spybee Frontend Test

Este proyecto es una aplicación de gestión de proyectos desarrollada como prueba técnica para **Spybee**. La aplicación permite visualizar, filtrar y localizar proyectos en un mapa interactivo.

## 🚀 Demo
[Ver aplicación en Vercel](https://spybee-technical-test-rho.vercel.app/)

## 🛠️ Stack Tecnológico
* **Framework:** Next.js (App Router)
* **Estado Global:** Zustand
* **Mapa:** MapLibre GL
* **Estilos:** CSS Modules (Vanilla CSS)
* **Gestor de paquetes:** pnpm

## 📌 Decisiones Técnicas
* **MapLibre GL:** Se seleccionó como alternativa Open Source a Mapbox GL para evitar dependencias de licencias pagas, manteniendo la misma compatibilidad y rendimiento exigidos en los requerimientos.
* **Zustand:** Se utilizó para desacoplar la lógica de la lista y el mapa. El mapa reacciona a cambios en el Store para ejecutar la función `.flyTo()` sin re-renders innecesarios.
* **Rendimiento:** La búsqueda y el filtrado se realizan de forma eficiente sobre el cliente utilizando memorización de datos.
* **TanStack Table** Implementado para gestionar de forma robusta la lógica de la tabla. Permite un manejo eficiente de la paginación, el filtrado y el ordenamiento (alfabético y por conteo de ítems), manteniendo el estado de la UI sincronizado y escalable.

## 📋 Requerimientos Cumplidos
1.  **Listado de Proyectos:** Tabla con nombre, plan, estado y conteo de ítems (incidentes, RFI, tareas).
2.  **Paginación:** Sistema de 10 ítems por página.
3.  **Buscador:** Filtro funcional por texto.
4.  **Ordenamiento:** Filtros por orden alfabético y cantidad de incidencias/RFI/tareas.
5.  **Mapa Interactivo:** Marcadores dinámicos y navegación automática al seleccionar un proyecto de la lista.

## ⚙️ Instalación y Uso

1. Clonar el repositorio:
   git clone https://github.com/dimudev/spybee-technical-test.git
2. Instalar dependencias:
   pnpm install
3. Ejecutar en desarrollo:
   pnpm dev
