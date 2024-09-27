Sistema Multimedia Distribuido para Streaming de Contenido v1.0
Descripción: 
El objetivo de este proyecto es desarrollar un sistema multimedia distribuido que pueda transmitir música y videos en un computador. El sistema, que funciona con soluciones de Edge Computing en un entorno de red local, permite una gestión eficiente de solicitudes simultáneas y garantiza una entrega rápida y confiable de contenido multimedia.

El sistema proporciona una interfaz de usuario adaptable y optimizada utilizando tecnologías HTML, JavaScript y CSS. Además, utiliza AWS S3 para el almacenamiento en la nube y WebSockets para la comunicación entre el servidor y los clientes en tiempo real.

Instalación: 
No se requiere de alguna instalación previa para ejecutar el sistema, solamente abrir el HTML. 

Guía de uso: 
El sistema permite a los usuarios acceder a videos y música almacenados tanto en el bucket de AWS S3 como en el directorio local.

API de videos y audios
Para obtener la lista de videos y audios disponibles, accede a:
" GET /api/videos " 

El sistema combina los enlaces de archivos en S3 y los archivos MP3 locales en una lista, que se envía en formato JSON al cliente.
WebSockets
El sistema también soporta WebSockets para la actualización en tiempo real de los enlaces multimedia. Cuando un cliente se conecta, recibe la lista actual de archivos multimedia. Si el cliente envía el mensaje 'fetch_videos', se le reenvía la lista actualizada de videos y audios.

API: Se utiliza AWS S3 es la API que permite crear buckets para almacenar información en este caso archivos mp3 y mp4, los cuales se extraen mediante un enlace y se comparten en archivos JSON entre el servidor y cliente. 

Contribuciones y Créditos
Autores:
Gerson Vargas Gamboa
Josseph Valverde Robles
Ovidio Martínez Taleno

Este proyecto ha utilizado las siguientes tecnologías y recursos:
[AWS S3] - Almacenamiento en la nube
[WebSocket] - Comunicación en tiempo real
[Node.js] - Entorno de ejecución para JavaScript en el server
[Worker Threads] - Gestión de hilos para distribución de procesos. 
