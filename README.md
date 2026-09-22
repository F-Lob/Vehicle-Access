# Vehicle Access Control

Sistema web para administrar el acceso vehicular a un recinto. Centraliza el registro de vehiculos, las solicitudes de acceso, la validacion de ingresos por personal de guardia y la administracion de credenciales.

El proyecto fue desarrollado como una aplicacion full-stack con una API REST desacoplada y una interfaz web de una sola pagina (SPA).

## Problema que resuelve

El control manual de acceso hace dificil conocer quien ingreso, con que vehiculo y bajo que autorizacion. Vehicle Access Control proporciona una fuente unica de informacion para:

- Registrar vehiculos asociados a usuarios.
- Gestionar solicitudes de acceso y documentos de respaldo.
- Revisar y aprobar solicitudes desde un rol administrativo.
- Registrar ingresos de usuarios autorizados y visitas.
- Consultar historiales de ingreso por fecha o patente.
- Mantener credenciales asociadas a usuarios.

## Funcionalidades principales

### Autenticacion y roles

- Inicio de sesion con JSON Web Tokens (JWT).
- Tokens de acceso y renovacion de sesion mediante cookie HTTP-only.
- Tres perfiles: user, admin y guardia.
- Rutas protegidas en frontend y autenticacion en la API.

### Gestion de vehiculos

- Registro de patente, modelo, marca, color y fotografia opcional.
- Asociacion de cada vehiculo con su propietario.
- Consulta de vehiculos propios.
- Edicion y eliminacion de vehiculos.

### Solicitudes y documentos

- Creacion de solicitudes con datos validados y PDF adjunto.
- Estados de solicitud: Pendiente, Aprobada y Rechazada.
- Revision administrativa de solicitudes pendientes.
- Consulta de solicitudes y documentos asociados por parte del usuario.

### Control de acceso

- Registro de entrada para usuarios existentes, validando RUT y patente contra los datos del sistema.
- Registro de visitas externas con RUT, patente, nombre y motivo.
- Busqueda de registros por fecha o patente.
- Ordenamiento y eliminacion de registros de entrada por personal de guardia.

### Credenciales

- API para crear, consultar, actualizar y revocar credenciales.
- Soporte de codigo de barras, vigencia y estado de validez.


## Ejecucion local

### Requisitos

- Node.js 18 o superior.
- npm 9 o superior.
- Una instancia local o remota de MongoDB.


## Estado del proyecto

El sistema se encuentra en etapa de evolucion tecnica. Cuenta con los flujos funcionales principales y se esta trabajando en mejorar la consistencia de la API, seguridad, pruebas y mantenibilidad para una version de produccion.
