# API REST - Caso de Estudio: Películas (IU Digital de Antioquia)

API REST desarrollada en Node.js y Express con persistencia de datos en MongoDB Atlas, diseñada para la gestión de una plataforma de entretenimiento web (tipo streaming).

##  Tecnologías Utilizadas
* **Node.js** - Entorno de ejecución de JavaScript del lado del servidor.
* **Express** - Framework web para Node.js.
* **MongoDB Atlas** - Base de datos NoSQL en la nube.
* **Mongoose** - ODM para modelado de datos de MongoDB.

---

##  Estructura del Proyecto
El proyecto está estructurado de manera modular separando responsabilidades:
- `models/`: Esquemas de Mongoose para los 5 módulos solicitados.
- `routes/`: Controladores con la lógica de las peticiones HTTP (GET, POST, PUT, DELETE).

---

##  Módulos Implementados (CRUD Completo)
1. **Género:** Gestión de géneros cinematográficos (Acción, Ciencia Ficción, etc.).
2. **Director:** Gestión del director principal de la producción.
3. **Productora:** Gestión de estudios cinematográficos (Warner Bros, Disney, etc.).
4. **Tipo:** Clasificación multimedia (Película o Serie).
5. **Media:** Gestión central de películas y series con relaciones cruzadas (`populate`) hacia los demás módulos y validaciones de campos únicos (serial y URL).


