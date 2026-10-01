# Notas Efímeras — Demo de ambientes efímeros para pruebas

Aplicación web sencilla desarrollada para la actividad universitaria
**"La utilización de herramientas para la generación de ambientes efímeros para pruebas"**
(curso: Tendencias en Entornos de Desarrollo de Aplicaciones y Servicios — Desarrollo de Sistemas Web).

## ¿Qué hace la aplicación?

**Notas Efímeras** es una aplicación de una sola página que permite:

- Agregar notas de texto con fecha y hora.
- Eliminar notas individualmente.
- Conservar las notas en el navegador (localStorage) entre recargas.

Es intencionalmente sencilla: su propósito es servir como proyecto de demostración
para el proceso de preparación, configuración y despliegue (deployment), y para
ilustrar el uso de ambientes efímeros de pruebas.

## Estructura del proyecto

```text
├── public/                 # Archivos estáticos (favicon, robots.txt)
├── src/
│   ├── routes/
│   │   ├── __root.tsx      # Layout raíz y metadatos globales
│   │   └── index.tsx       # Página principal (la aplicación de notas)
│   ├── lib/                # Utilidades
│   ├── styles.css          # Sistema de diseño (Tailwind CSS v4)
│   ├── router.tsx          # Configuración del enrutador (TanStack Router)
│   └── start.ts            # Punto de entrada
├── package.json            # Dependencias y scripts
├── vite.config.ts          # Configuración de compilación (Vite)
└── README.md               # Este documento
```

## Ejecución local

```bash
bun install   # o: npm install
bun run dev   # o: npm run dev
```

La aplicación queda disponible en `http://localhost:8080`.

## Despliegue (Deployment)

El proyecto se despliega desde la plataforma Lovable con el botón **Publish**,
que genera una URL pública de producción. Cada cambio en una rama de prueba
genera además una **URL de vista previa (preview)** independiente: ese es el
ambiente efímero.

## Ambientes efímeros para pruebas

Un **ambiente efímero** es un entorno de ejecución temporal, completo y aislado,
que se crea automáticamente a partir de una rama o pull request, se usa para
validar cambios y se destruye cuando ya no se necesita.

En este proyecto se demuestran así:

1. **Producción**: la URL publicada, estable, con la versión aprobada.
2. **Preview efímera**: cada cambio/rama genera una URL temporal donde se prueba
   la funcionalidad (agregar y eliminar notas) sin tocar producción.
3. **Destrucción**: al terminar la validación, la preview se descarta; no consume
   recursos ni deja residuos.

Ventajas demostradas: validación aislada, retroalimentación rápida, cero riesgo
para el entorno productivo y costos reducidos (el entorno solo existe mientras se usa).
