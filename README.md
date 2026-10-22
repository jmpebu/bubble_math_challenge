# 🐾 Bubble Math Challenge

> **Juego interactivo y lúdico de operaciones matemáticas para niños**  
> Diseñado especialmente para hacer que el tiempo con el móvil sea educativo, divertido y motivador.

![Bubble Math Challenge](https://img.shields.io/badge/Versi%C3%B3n-1.0.0-sky.svg)
![React](https://img.shields.io/badge/React-19-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC.svg)
![Licencia](https://img.shields.io/badge/Licencia-MIT-green.svg)

---

## 🌟 Descripción del Proyecto

**Bubble Math Challenge** es una aplicación web interactiva pensada para niños de primaria (en torno a 8 años) que necesitan reforzar el cálculo mental y las cuatro operaciones básicas: **suma (+), resta (−), multiplicación (×) y división (÷)**.

En lugar de aburridas fichas de ejercicios, el juego presenta los cálculos matemáticos de forma estimulante: la operación aparece destacada en pantalla y alrededor flotan **burbujas translúcidas de colores** con posibles resultados. Solo una burbuja contiene el resultado correcto. Al pulsar la burbuja adecuada, esta explota con divertidos efectos visuales, confeti y alegres efectos sonoros sintetizados en tiempo real.

Como incentivo adicional para los más pequeños, el juego incluye un **Álbum de Pegatinas de Cachorros Rescatistas** (inspirados en la estética de la Patrulla Canina). A medida que la niña supera niveles y logra rachas de aciertos, desbloquea pegatinas de héroes caninos (Chase, Skye, Marshall, Rubble, Everest, Zuma y el Súper Cachorro Dorado) con sus lemas y sonidos de ladrido alegre, pudiendo pegarlos libremente en un escenario de aventuras.

---

## 🚀 Características Principales

### 1. 🎯 10 Niveles Progresivos de Dificultad
El juego cuenta con 10 niveles adaptados al desarrollo cognitivo de niños de 8 años (3º de Primaria):
1. **Nivel 1: Cachorros Novatos** – Sumas y restas básicas hasta 10 (22 segundos por pregunta).
2. **Nivel 2: Vuelo Seguro** – Sumas y restas hasta 15 (20s).
3. **Nivel 3: El Gran Salto** – Operaciones cruzando la decena (hasta 20) como `8 + 7` o `15 - 8` (18s).
4. **Nivel 4: ¡Fuego a la Acción!** – Introducción a las tablas del 2, 5 y 10 (16s).
5. **Nivel 5: Constructor de Tablas** – Tablas del 3 y del 4 (15s).
6. **Nivel 6: Maquinaria Pesada** – Tablas del 6 y del 7 + sumas hasta 50 (14s).
7. **Nivel 7: Repartos Amigables** – Primeras divisiones exactas sin resto (14s).
8. **Nivel 8: ¡Al Agua Patos!** – Tablas del 8 y del 9 + divisiones (12s).
9. **Nivel 9: Misión en la Nieve** – Operaciones mixtas combinadas hasta 100 (10s).
10. **Nivel 10: Gran Maestra de Burbujas** – Desafío de agilidad mental extrema a contrarreloj (8s).

### 2. 🎛️ Zona de Padres con Control Parental
- Acceso protegido mediante una sencilla operación matemática para evitar cambios accidentales por parte de los niños.
- **Selección libre de operaciones**: los padres pueden activar o desactivar cualquiera de las operaciones (Suma, Resta, Multiplicación, División) para adaptarse al temario que la niña esté trabajando en el colegio en ese momento.
- **Modo Práctica Relajado**: opción para desactivar el temporizador y jugar sin prisa ni presión de tiempo.
- **Desbloqueo de Niveles**: permite acceder a cualquier nivel sin necesidad de superar los previos.

### 3. 🫧 Mecánica de Burbujas y Distractores Inteligentes
- Las burbujas flotan con oscilaciones suaves y reflejos realistas gracias a animaciones CSS y física de fluidos.
- Las respuestas incorrectas (distractores) son números cercanos y basados en errores comunes de cálculo para fomentar el razonamiento en vez del azar.
- Si se comete un error, el sistema resalta suavemente la respuesta correcta para asegurar el aprendizaje inmediato sin frustración.

### 4. 🐶 Álbum de Stickers y Escenario Creativo
- **7 Cachorros Rescatistas Coleccionables**:
  - *Chase el Policía* (estrella policial)
  - *Skye la Piloto* (gafas y alas de aviador)
  - *Marshall el Bombero* (casco rojo y manguera)
  - *Rubble el Constructor* (casco amarillo y llave inglesa)
  - *Everest de las Nieves* (gorro de invierno husky)
  - *Zuma el Buzo* (casco naranja acuático)
  - *Súper Cachorro Dorado* (capa dorada y medalla de campeona)
- **Escenario de Aventuras**: un lienzo interactivo donde la niña puede colocar, mover, rotar y organizar a sus cachorros para crear composiciones personalizadas.

### 5. 🎵 Sonidos Sintetizados (Web Audio API)
- No requiere descargar archivos pesados de audio ni sufre retardos en móviles.
- Sintetizador integrado que emite:
  - *Pop* de burbuja al tocarla.
  - Acordes alegres ascendentes en C5-E5-G5-C6 al acertar.
  - Suave sonido elástico de rebote al fallar (positivo y pedagógico).
  - Ladridos alegres en dos tonos para los cachorros.
  - Fanfarria triunfal al completar un nivel con 3 estrellas.
  - Tic-tac suave cuando quedan menos de 4 segundos.

---

## 🛠️ Tecnologías Utilizadas

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Iconografía**: [Lucide React](https://lucide.dev/)
- **Efectos de Partículas**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Audio**: Web Audio API nativo del navegador
- **Persistencia**: LocalStorage (funciona 100% offline y sin registro)

---

## 📦 Instalación y Puesta en Marcha

### Prerrequisitos
- Node.js versión 18 o superior
- npm versión 9 o superior

### Pasos

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/bubble-math-challenge.git
   cd bubble-math-challenge
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**:
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:3000`.

4. **Compilar para producción**:
   ```bash
   npm run build
   ```

---

## 📱 Aplicación para Android (2 Formas de Usarla)

### Método 1: Instalación Directa e Instantánea como PWA (Recomendado)
No necesitas compilar nada ni usar cables:
1. Abre el enlace de la aplicación en el navegador **Google Chrome** de su teléfono Android.
2. Pulsa en el botón **"Instalar"** de la barra superior (o toca los tres puntos `⋮` de Chrome y pulsa **"Instalar aplicación"** / **"Añadir a pantalla de inicio"**).
3. La aplicación se instalará con su propio icono de la patrulla, **pantalla de carga**, funcionará **100% sin conexión a internet (offline)** y se abrirá en **pantalla completa** sin barras de navegación, ofreciendo una experiencia idéntica a una app descargada de Google Play.

### Método 2: Generar el archivo APK Nativo con Capacitor / Android Studio
El repositorio ya incluye la configuración completa de **Capacitor** (`capacitor.config.ts`) para compilar un paquete nativo de Android:

1. **Compilar los archivos web**:
   ```bash
   npm run build
   ```

2. **Añadir la plataforma Android nativa**:
   ```bash
   npx cap add android
   ```

3. **Sincronizar el código**:
   ```bash
   npx cap sync
   ```

4. **Abrir el proyecto en Android Studio**:
   ```bash
   npx cap open android
   ```

5. **Generar el archivo APK**:
   
   **Opción A: Directamente desde la terminal (la más rápida y recomendada)**:
   ```bash
   # En Mac / Linux:
   cd android && ./gradlew assembleDebug

   # En Windows:
   cd android && gradlew assembleDebug
   ```
   El archivo generado estará listo en:
   `android/app/build/outputs/apk/debug/app-debug.apk`

   **Opción B: Desde Android Studio**:
   - Si no ves el menú superior **Build**, se debe a la nueva interfaz de Android Studio: haz clic en el icono de **tres rayas horizontales (≡)** arriba a la izquierda > **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**.
   - O bien presiona la tecla **Shift dos veces** (Shift + Shift), escribe `Build APK` y pulsa Enter.
   - *Nota*: Si acabas de abrir el proyecto, espera 1-2 minutos a que termine la sincronización de Gradle (*"Gradle Sync in progress"* en la barra inferior) para que el menú esté habilitado.

¡Podrás enviarle ese archivo `.apk` a tu hija por WhatsApp o cable USB e instalarlo en su teléfono con un solo toque!

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. ¡Siéntete libre de utilizarlo y adaptarlo para la educación de tus hijos o alumnos!
