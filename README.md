# SISFRU · Sitio comercial estático

Sitio comercial construido con HTML, CSS y JavaScript nativos. No requiere Node.js ni proceso de compilación en producción.

## Ejecutar localmente

Puedes abrir `index.html` directamente o servir la carpeta con cualquier servidor HTTP local.

Para validar exactamente la imagen de producción:

```sh
docker build -t sisfru-web .
docker run --rm -p 8080:80 sisfru-web
```

Luego abre `http://localhost:8080`.

## Despliegue en Easypanel

1. Crea un servicio **App** conectado al repositorio Git.
2. Selecciona esta carpeta como directorio de compilación si el repositorio contiene otros proyectos.
3. Easypanel detectará el `Dockerfile`.
4. Configura el dominio `sisfru.cl` y el puerto proxy `80`.
5. Despliega y activa el certificado HTTPS automático.

## Formulario · fase pendiente

El formulario es únicamente visual. `script.js` intercepta el botón y confirma explícitamente que los datos no fueron enviados ni almacenados.

En la segunda fase se implementará:

- endpoint público en ASP.NET;
- validación y protección antispam en el servidor;
- almacenamiento en base de datos;
- notificación por correo;
- conexión mediante `fetch()` desde `script.js`;
- estados accesibles de envío, éxito y error.
