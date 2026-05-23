# Novuscampo · Cuaderno de Finca

Versión funcional de prueba para testear con productores ganaderos reales en Venezuela.

A diferencia del prototipo del marketplace (que mostraba datos de ejemplo), aquí
el productor **registra su finca, carga información real y esa información se
guarda**: si cierra y reabre la app, sus datos siguen ahí.

## Cómo funciona la persistencia

- **Todo se guarda localmente en el teléfono** usando `localStorage` del navegador.
- **No hay servidor, no hay nube, no hay cuentas con contraseña.**
- El "registro" es solo identidad local: el productor escribe su nombre y el de
  su finca, se guarda en el dispositivo.
- Si borra el caché del navegador o cambia de equipo, los datos se pierden. Por
  eso Ajustes incluye **"Exportar mis datos"** (descarga un JSON de respaldo) y
  **"Borrar todo"** (con confirmación).

## Pantallas

1. **Onboarding** (primera vez): bienvenida de marca → registro mínimo (nombre,
   finca, estado) → entra al Inicio. Si ya hay finca registrada, salta directo
   al Inicio.
2. **Inicio**: saludo con el nombre real + avisos del día generados de los datos
   reales (vacunas por vencer, stock bajo, pendientes vencidos).
3. **Rebaño**: CRUD de animales (chapeta, sexo, raza, edad, peso, estado, nota).
   Cada animal tiene detalle con historial de eventos.
4. **Anotar**: registra un evento (vacuna, peso, parto, etc.) sobre un animal.
5. **Pendientes**: tareas con vencidos / próximos / hechos.
6. **Más → Sanidad**: medicamentos y vacunas; lo que vence pronto se marca solo.
7. **Más → Inventario**: insumos con alerta de stock bajo.
8. **Más → Potreros**: nombre, estado, días.
9. **Más → Ajustes**: editar finca, exportar datos, borrar todo.


## Funciones de venta y colaboración

Estas funciones conectan el cuaderno con el día a día comercial de la finca:

- **Foto por animal**: al registrar o editar un animal puedes tomar una foto con
  la cámara o subir una desde el teléfono. Se comprime automáticamente (máximo
  800px, calidad media) para que pese poco — alrededor de 100 KB cada una, así
  caben muchas sin llenar el teléfono.
- **Exportar animales en PDF**: desde el detalle de un animal (botón "Exportar
  ficha PDF") o seleccionando varios en el rebaño (botón "Seleccionar para PDF").
  El PDF incluye foto, chapeta, raza, sexo, edad, peso, estado, nota y las
  vacunas registradas. Al exportar varios puedes elegir "una ficha por hoja" o
  "dos por hoja". Es una ficha limpia, pensada para mandarla a un comprador.
- **Compartir por WhatsApp**: el PDF se comparte con el menú nativo del teléfono
  (que deja elegir WhatsApp y adjunta el archivo de verdad). En computadora, el
  PDF se descarga para adjuntarlo a mano.
- **Compartir pendientes por WhatsApp**: en la pantalla Pendientes, el botón
  "Compartir pendientes por WhatsApp" arma un mensaje con los pendientes
  vencidos y próximos y abre WhatsApp con el texto listo para enviar (a uno
  mismo o a un colaborador).

### Nota sobre almacenamiento y fotos

Como las fotos ocupan espacio y todo se guarda en el teléfono, si el
almacenamiento se llena la app **avisa con una barra roja** en lugar de fallar en
silencio. Si eso pasa, conviene borrar fotos de animales viejos o exportar un
respaldo y borrar datos. Para una prueba de campo normal (decenas de animales)
no debería ser un problema.

### Limitación honesta de "compartir PDF"

Ninguna aplicación web puede adjuntar un archivo a WhatsApp de forma totalmente
automática. En el teléfono usamos el menú de compartir nativo, que sí adjunta el
PDF y deja elegir WhatsApp en un toque. En computadora, el PDF se descarga y hay
que adjuntarlo manualmente. Como los productores usan el teléfono, en la práctica
el flujo es de un toque.

## Cómo correrlo

Es un solo archivo HTML. **No requiere instalación ni build.**

### Local (para probar en tu computadora)
Abrí `index.html` en cualquier navegador moderno. Para que el service worker y
la instalación PWA funcionen, conviene servirlo por HTTP en lugar de abrir el
archivo directo:

```
cd cuaderno-finca
python3 -m http.server 8080
```
Luego abrí `http://localhost:8080` en el navegador.

### Desplegar (para que lo prueben productores reales)

**Vercel** (recomendado, sirve archivos estáticos sin build):
1. Subí la carpeta `cuaderno-finca` a un repositorio.
2. Importá el repo en Vercel. No necesita configuración de build: es estático.
3. Vercel te da una URL pública. Compartila por WhatsApp.

**GitHub Pages** (igual que el marketplace):
1. Subí los archivos a un repo.
2. Activá GitHub Pages en Settings → Pages.
3. Compartí la URL.

En el teléfono, el productor puede "Agregar a pantalla de inicio" desde el menú
del navegador para instalarla como app.

## Archivos

- `index.html` — toda la app (HTML + CSS + React vía CDN, sin build).
- `manifest.json` — configuración PWA (nombre, íconos, colores).
- `sw.js` — service worker para instalación y modo offline.
- `icon-192.png`, `icon-512.png`, `favicon.png` — íconos con el toro de marca.

## Stack

- HTML + React 18 + Babel (desde CDN, sin build step).
- Persistencia: `localStorage` envuelto en un hook propio `useCuaderno`.
- Mismo sistema de diseño que el marketplace Novuscampo (tokens CSS idénticos).
- Sin TypeScript, sin backend, sin dependencias que instalar.

## Identidad visual

Reutiliza el sistema de diseño completo del marketplace: paleta papel/tinta/
terracota, tipografías Newsreader (serif) + DM Sans (cuerpo) + JetBrains Mono
(datos), el toro de marca, y la filosofía editorial sobria. Adaptado a reglas de
UX de campo: botones de 60px+, texto de 18px+, alto contraste, teclado numérico
donde corresponde, confirmación en acciones destructivas, y nunca pantalla en
blanco (siempre estado vacío con instrucción amable).
