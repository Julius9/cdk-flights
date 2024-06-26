import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';

export class CdkFlightsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Crear la VPC existente
    const vpc = ec2.Vpc.fromLookup(this, 'ExistingVpc', {
      vpcId: 'vpc-0faff1c7db13ccb17'
    });

    // Crear grupo de seguridad
    const securityGroup = new ec2.SecurityGroup(this, 'MySecurityGroup', {
      vpc,
      allowAllOutbound: true,
      securityGroupName: 'CdkFlightsStack-MySecurityGroup',
    });

    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22), 'Allow SSH access');
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), 'Allow HTTP access');
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(443), 'Allow HTTPS access');

    // Crear el IAM Role para la instancia EC2
    const role = new iam.Role(this, 'MyEc2Role', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore'),
      ],
    });

    const ami = new ec2.AmazonLinuxImage({
      generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
    });

    // Create EC2 Instance in the existing VPC
    // const ami = ec2.MachineImage.latestAmazonLinux();
    // const instance = new ec2.Instance(this, 'MyInstance', {
    //   vpc,
    //   instanceType: new ec2.InstanceType('t2.micro'),
    //   machineImage: ami,
    //   securityGroup,
    //   role,
    //   keyName: 'e1-grupo28-key', // Reemplaza esto con el nombre de tu key pair
    // });
  }
}






 