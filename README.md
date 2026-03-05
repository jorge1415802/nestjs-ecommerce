<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>


# 🚀 NestJS eCommerce - Senior Challenge Refactor

Este proyecto ha sido transformado de un monolito acoplado a una **Arquitectura Modular de alta eficiencia**, optimizada para el ecosistema **Cloud-Native (AWS)**.

## 🛠️ Stack Tecnológico
- **Framework:** NestJS 9.x
- **Persistencia:** PostgreSQL + TypeORM
- **Autenticación:** JWT Stateless (Enriquecido con Claims/Roles)
- **Infraestructura:** Docker & Serverless Framework (AWS Lambda Ready)
- **Bundler:** esbuild

---

## 🏗️ Diagnóstico y Refactorización (Senior Insights)

Se identificaron y resolvieron problemas críticos de diseño que bloqueaban la escalabilidad:

### 1. Eliminación de Acoplamiento Circular e Innecesario
*   **Problema:** Los `AuthGuard` y `RolesGuard` obligaban a todos los módulos de negocio (como `ProductModule`) a importar el `UserModule` para validar al usuario contra la DB en cada petición.
*   **Solución:** Se implementó un **JWT con Payload Enriquecido** (id, email, roles). Los Guards ahora validan la identidad de forma **Stateless**, desacoplando totalmente la lógica de negocio de la persistencia de usuarios.
*   **Resultado:** `ProductModule` es ahora 100% independiente; las consultas redundantes a la DB en cada request se redujeron a cero.

### 2. Saneamiento de Límites de Dominio (Bounded Contexts)
*   **Problema:** El `RoleModule` intentaba gestionar estados de usuarios, violando la Cohesión y el Encapsulamiento.
*   **Solución:** Se eliminó el `RoleController` y se centralizó la gestión de identidad en el `UserModule` (Aggregate Root). El `RoleModule` se transformó en un **módulo de catálogo puro**.
*   **Resultado:** Grafo de dependencias limpio y unidireccional.

### 3. Optimización Serverless para AWS
*   **Logro:** Implementación de un **Proxy Handler** con `@codegenie/serverless-express` y empaquetado agresivo con `esbuild`.
*   **Resultado:** Bundle final de **~733kb**, garantizando latencias mínimas (Zero Cold Starts) y máxima eficiencia de costos en **AWS Lambda**.

---

## ☁️ Propuesta de Arquitectura Target (AWS)

Para escalar este sistema técnica y organizacionalmente, se propone:

*   **Cómputo:** Despliegue en **AWS Lambda** (para la API) y **AWS Fargate** (para tareas pesadas o crons).
*   **Base de Datos:** **Amazon RDS PostgreSQL** con **RDS Proxy** para gestionar el pool de conexiones de las Lambdas.
*   **Seguridad:** Uso de **AWS Secrets Manager** para credenciales y **AWS WAF** para protección perimetral.
*   **Event-Driven:** El sistema está preparado para integrar **AWS EventBridge** y desacoplar procesos (ej. notificaciones) mediante eventos asíncronos tras el registro.

---

## 🚀 Instalación y Ejecución

### 1. Levantar Infraestructura Local (Docker)
```bash
docker-compose up -d
```

### 2. Ejecucion
```bash
npm install
npm run migration:run
npm run seed:run
```
