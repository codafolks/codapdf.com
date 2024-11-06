import { env } from "@/constants/env.server";
import type { License } from "@/server/database/schemas/licenses";

export type PlanSubscription = {
  nickname: "hobby" | "basic" | "pro" | "enterprise";
  title: string;
  description: string;
  cta: string;
  price?: {
    monthly: number;
    yearly: number;
  };
  priceId?: {
    monthly: string;
    yearly: string;
  };
  economize?: string;
  productId?: string;
  features: Array<{
    title: string;
    description: string;
  }>;
  license: License;
};

export const plansSubscription: Array<PlanSubscription> = [
  {
    nickname: "hobby",
    title: "Hobby Plan",
    description: "A great option for users who need basic functionality and want to explore the service before committing to a paid plan.",
    cta: "Get Started",
    price: {
      monthly: env.STRIPE_PRODUCT_IDS.hobby.price,
      yearly: env.STRIPE_PRODUCT_IDS.hobby.priceYearly,
    },
    priceId: {
      monthly: env.STRIPE_PRODUCT_IDS.hobby.priceIdMonthly,
      yearly: env.STRIPE_PRODUCT_IDS.hobby.priceIdYearly,
    },
    productId: env.STRIPE_PRODUCT_IDS.hobby.productId,
    license: "HOBBY",
    economize: "Save 5%",
    features: [
      {
        title: "Customizable HTML Templates",
        description: "Users can create and convert templates with custom data.",
      },
      {
        title: "Real-Time Preview",
        description: "Preview the PDF before downloading.",
      },
      {
        title: "Multiple Output Formats",
        description: "Choose basic page size and orientation.",
      },
      {
        title: "API Integration",
        description: "RESTful API to integration with your applications.",
      },
      {
        title: "Conversions",
        description: "up to 300 PDFs per month",
      },
      {
        title: "Support",
        description: "Community forum support",
      },
    ],
  },
  {
    nickname: "basic",
    title: "Basic Plan",
    description: "Perfect for individuals or small teams that need occasional HTML to PDF conversions without complex requirements.",
    cta: "Get Started",
    price: {
      monthly: env.STRIPE_PRODUCT_IDS.basic.price,
      yearly: env.STRIPE_PRODUCT_IDS.basic.priceYearly,
    },
    priceId: {
      monthly: env.STRIPE_PRODUCT_IDS.basic.priceIdMonthly,
      yearly: env.STRIPE_PRODUCT_IDS.basic.priceIdYearly,
    },
    productId: env.STRIPE_PRODUCT_IDS.basic.productId,
    license: "BASIC",
    economize: "Save 10%",
    features: [
      {
        title: "Customizable HTML Templates",
        description: "Users can create and convert templates with custom data and images.",
      },
      {
        title: "Real-Time Preview",
        description: "Preview the PDF before downloading.",
      },
      {
        title: "Multiple Output Formats",
        description: "Choose page size and orientation for PDFs.",
      },
      {
        title: "API Integration",
        description: "RESTful API to integration with your applications.",
      },
      {
        title: "Conversions",
        description: "up to 600 PDFs per month",
      },
      {
        title: "Support",
        description: "Email support only",
      },
    ],
  },
  {
    nickname: "pro",
    title: "Pro Plan",
    price: {
      monthly: env.STRIPE_PRODUCT_IDS.pro.price,
      yearly: env.STRIPE_PRODUCT_IDS.pro.priceYearly,
    },
    priceId: {
      monthly: env.STRIPE_PRODUCT_IDS.pro.priceIdMonthly,
      yearly: env.STRIPE_PRODUCT_IDS.pro.priceIdYearly,
    },
    productId: env.STRIPE_PRODUCT_IDS.pro.productId,
    license: "PRO",
    economize: "Save 20%",
    description: "Ideal for small to medium-sized businesses or professionals who need more control and flexibility with their HTML to PDF conversions.",
    cta: "Get Started",
    features: [
      {
        title: "Customizable HTML Templates",
        description: "Users can create and convert templates with custom data, images and JavaScript code, ex: Charts.",
      },
      {
        title: "Real-Time Preview",
        description: "Preview the PDF before downloading.",
      },
      {
        title: "Cloud Storage Integration",
        description: "Save your PDFs directly to cloud storage.",
      },
      {
        title: "API Integration",
        description: "RESTful API to integration with your applications.",
      },
      {
        title: "Conversions",
        description: "up to 1200 PDFs per month",
      },
      {
        title: "Support",
        description: "Priority email support",
      },
    ],
  },
  {
    nickname: "enterprise",
    title: "Enterprise Plan",
    description: "Tailored for large businesses or SaaS platforms that require high scalability, customization, and API integrations for their workflow.",
    cta: "Contact Us",
    license: "ENTERPRISE",
    features: [
      {
        title: "All Pro Plan features",
        description: "Plus the following:",
      },
      {
        title: "Support for CSS and JavaScript",
        description: "Handle more complex designs with JavaScript functionality.",
      },
      {
        title: "White-Labeling and Branding",
        description: "Customize PDFs with your company branding for professional documents.",
      },
      {
        title: "API Integration",
        description: "RESTful API to integration with your applications.",
      },
      {
        title: "Conversions",
        description: "Unlimited",
      },
      {
        title: "Support",
        description: "24/7 priority support and dedicated account manager",
      },
    ],
  },
];
