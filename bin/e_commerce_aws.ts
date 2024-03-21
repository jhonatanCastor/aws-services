import * as cdk from 'aws-cdk-lib';
import { ProductsAppStack } from '../lib/productsApp-stack';
import { ECommerceAPIStack } from '../lib/e_commerce_aws-stack';
import { ProductsAppLayersStack } from '../lib/productsAppLayers-stack';

const app = new cdk.App();

const env: cdk.Environment = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION
};

const tags = {
  cost: "ECommerce",
  team: "SiecolaCode"
};

const productsAppLayersStack = new ProductsAppLayersStack(app, "ProductsAppLayers", {
  tags: tags,
  env: env
})
const productsAppStack = new ProductsAppStack(app, "ProductsApp", {
  tags: tags,
  env: env
});
productsAppStack.addDependency(productsAppLayersStack);

const eCommerceApiStack = new ECommerceAPIStack(app, "ECommerceApi", {
  productsFetchHandler: productsAppStack.productsFetchHandler,
  productsAdminHandler: productsAppStack.productAdminHandler,
  tags: tags,
  env: env
});
eCommerceApiStack.addDependency(productsAppStack);