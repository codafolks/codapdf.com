import type { License } from "@/server/database/schemas/licenses";
import type { ProductNickname } from "@/server/database/schemas/subscriptions";

export type PlanSubscription = {
  nickname: ProductNickname;
  title: "Hobby Plan" | "Basic Plan" | "Pro Plan" | "Enterprise Plan";
  description: string;
  cta: string;
  price?: {
    monthly: number;
    yearly: number;
  };
  economize?: string;
  features: Array<{
    title: string;
    description: string;
  }>;
  license: License;
};

export const factorPrice = 100;

export const hobbyPriceMonthly = 3 * factorPrice;
export const basicPriceMonthly = 6 * factorPrice;
export const proPriceMonthly = 12 * factorPrice;

export const hobbyDiscount = 0.05;
export const basicDiscount = 0.1;
export const proDiscount = 0.2;

export const hobbyPriceYearly = Number(Math.round(hobbyPriceMonthly * 12 * (1 - hobbyDiscount)).toPrecision(2));
export const basicPriceYearly = Number(Math.round(basicPriceMonthly * 12 * (1 - basicDiscount)).toPrecision(2));
export const proPriceYearly = Number(Math.round(proPriceMonthly * 12 * (1 - proDiscount)).toPrecision(2));

export const hobbyConversionLimit = 500;
export const basicConversionLimit = 1000;
export const proConversionLimit = 1500;

export const plansSubscription: Array<PlanSubscription> = [
  {
    nickname: "hobby",
    title: "Hobby Plan",
    description:
      "A great option for users who need basic functionality and want to explore the service before committing to a paid plan.",
    cta: "Get Started",
    price: {
      monthly: hobbyPriceMonthly,
      yearly: hobbyPriceYearly,
    },
    license: "HOBBY",
    economize: `Save ${hobbyDiscount * 100}%`,
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
        description: `up to ${hobbyConversionLimit} PDFs per month`,
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
    description:
      "Perfect for individuals or small teams that need occasional HTML to PDF conversions without complex requirements.",
    cta: "Get Started",
    price: {
      monthly: basicPriceMonthly,
      yearly: basicPriceYearly,
    },
    license: "BASIC",
    economize: `Save ${basicDiscount * 100}%`,
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
        description: `up to ${basicConversionLimit} PDFs per month`,
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
      monthly: proPriceMonthly,
      yearly: proPriceYearly,
    },
    license: "PRO",
    economize: `Save ${proDiscount * 100}%`,
    description:
      "Ideal for small to medium-sized businesses or professionals who need more control and flexibility with their HTML to PDF conversions.",
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
        description: `up to ${proConversionLimit} PDFs per month`,
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
    description:
      "Tailored for large businesses or SaaS platforms that require high scalability, customization, and API integrations for their workflow.",
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
