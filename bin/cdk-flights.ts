#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkFlightsStack } from '../lib/cdk-flights-stack';
import { FrontendStack } from '../lib/frontend-stack';

const app = new cdk.App();
new CdkFlightsStack(app, 'CdkFlightsStack', {
  env: {
    account: '654654374122',
    region: 'us-east-1',
  },
});

new FrontendStack(app, 'FrontendStack', {
  env: {
    account: '654654374122',
    region: 'us-east-1',
  },
});

app.synth();
