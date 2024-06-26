"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CdkFlightsStack = void 0;
const cdk = __importStar(require("@aws-cdk/core"));
const ec2 = __importStar(require("@aws-cdk/aws-ec2"));
const iam = __importStar(require("@aws-cdk/aws-iam"));
class CdkFlightsStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // Crear la VPC
        const vpc = new ec2.Vpc(this, 'MyVpc', {
            maxAzs: 2,
            natGateways: 1,
        });
        // Crear el Security Group
        const securityGroup = new ec2.SecurityGroup(this, 'MySecurityGroup', {
            vpc,
            description: 'Allow SSH and HTTP access',
            allowAllOutbound: true,
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
        // Aquí podrías definir recursos adicionales o configuraciones específicas
    }
}
exports.CdkFlightsStack = CdkFlightsStack;
