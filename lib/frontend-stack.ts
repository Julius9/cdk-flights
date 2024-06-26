import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class FrontendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Referenciar el bucket S3 existente
    const bucket = s3.Bucket.fromBucketName(this, 'FrontendBucket', 'e1-cstorage');

    // Configurar el bucket para permitir acceso público
    bucket.addToResourcePolicy(new iam.PolicyStatement({
      actions: ['s3:GetObject'],
      resources: [`${bucket.bucketArn}/*`],
      principals: [new iam.AnyPrincipal()],
    }));

    // Configurar el alojamiento de sitio web estático
    bucket.addToResourcePolicy(new iam.PolicyStatement({
      actions: ['s3:GetBucketWebsite'],
      resources: [bucket.bucketArn],
      principals: [new iam.AnyPrincipal()],
    }));

    // Definir la función Lambda con Node.js 20
    const deploymentFunction = new lambda.Function(this, 'DeploymentFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        exports.handler = async (event) => {
          console.log('Deploying frontend to S3');
          return {
            statusCode: 200,
            body: 'Deployment successful'
          };
        };
      `),
    });

    // Desplegar contenido al bucket S3
    new s3deploy.BucketDeployment(this, 'DeployWebsite', {
      sources: [s3deploy.Source.asset('/Users/hierbasbuenas/Desktop/ArquiSis/grupo28/IIC2173-grupo28-front')],
      destinationBucket: bucket,
      memoryLimit: 512, // Aumentar el límite de memoria si es necesario
    });
  }
}

const app = new cdk.App();
new FrontendStack(app, 'FrontendStack', {
  env: {
    account: '654654374122',
    region: 'us-east-1',
  },
});
app.synth();
