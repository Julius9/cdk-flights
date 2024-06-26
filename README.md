# Documentación Iaas

### Configuración del Entorno
Necesitamos:
* Nuestra cuenta de AWS, nos apareció varias veces una indicación que era mejor con un usuario AIM que un usuario raíz,  esto quizas nos complico un poco las cosas
* Tener instalado Node.js y AWS CDK
* Tener configurado AWS CLI con nuestras credenciales

### Estructura del Proyecto
* `/lib`: contiene los stacks de CDK
* `/bin`: Contiene el archivo principal para la ejecución del CDK
* `cdk.json`: Configuración de CDK
* `package.json`: Dependencias y scripts del proyecto


###  Descripción de los Archivos de Código

-   `bin/cdk-flights.ts`:
    -   Descripción del archivo principal y cómo se inicializan los stacks
-   `lib/cdk-flights-stack.ts`:
    -   Detalle de la configuración del stack de vuelos
-   `lib/frontend-stack.ts`:
    -   Detalle de la configuración del stack del frontend

### Descripción de los Stacks

-   **CdkFlightsStack**:
	- En este caso tuvimos especial ojo para no crear otra instancia EC2 y tener dos al mismo tiempo, esto para evitar tener cobros adicionales
    -   **Propósito**: Describir que configura VPC, Security Group y la instancia EC2.
    -   **Componentes**:
        -   VPC existente.
        -   Security Group con reglas específicas.
        -   Instancia EC2 con IAM Role y AMI configurada.
   
-   **FrontendStack**:
    -   **Propósito**: Describir que configura el bucket S3 para alojar el frontend.
    -   **Componentes**:
        -   Bucket S3 con políticas de acceso público.
        -   Configuración para sitio web estático.
        -   Despliegue del contenido del frontend al bucket S3.


### Configuración de AWS CDK
* Instalamos las dependencias con:
	* `npm install`
	*	`npm install -g aws-cdk`

* Ademas utilizamos los comandos:
	* `cdk bootstrap`: Inicializa el entorno de CDK
	* `cdk synth`: Genera el CloudFormation template
	*	`cdk deploy`: Despliega la infraestructura en AWS