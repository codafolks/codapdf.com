import {
  Brush,
  Cloud,
  Code,
  CodeXml,
  Database,
  Eye,
  File,
  FileText,
  Globe,
} from "lucide-react";

export const keyFeatures = [
  {
    id: "customizable-html-templates",
    title: "Customizable HTML Templates",
    description:
      "Users can upload or design their own HTML templates, allowing complete flexibility in the design and content of the PDFs generated.",
    icon: FileText,
  },
  {
    id: "real-time-preview",
    title: "Real-Time Preview",
    description:
      "A live preview feature lets users see exactly how their HTML template will look as a PDF, ensuring they can adjust styling before finalizing the conversion.",
    icon: Eye,
  },
  {
    id: "dynamic-data-integration",
    title: "Dynamic Data Integration",
    description:
      "Supports merging dynamic data into templates, such as names, dates, and other variables, to create personalized PDF documents in bulk.",
    icon: Database,
  },
  // {
  //   id:'responsive-html-to-pdf-conversion',
  //   title: "Responsive HTML to PDF Conversion",
  //   description:
  //     "Converts responsive HTML templates into PDFs that retain formatting across different screen sizes and styles, maintaining consistency between web and print views.",
  //   icon: Layout,
  // },
  {
    id: "support-for-css-and-javascript",
    title: "Support for CSS and JavaScript",
    description:
      "Handles advanced CSS and JavaScript functionalities within templates, allowing for complex designs, animations, and interactions that render correctly in PDFs.",
    icon: Code,
  },
  {
    id: "multiple-output-formats",
    title: "Multiple Output Formats",
    description:
      "Users can select various PDF output options such as page size, orientation (portrait or landscape), and margin settings to meet their specific needs.",
    icon: File,
  },
  // {
  //   id:'batch-pdf-generation',
  //   title: "Batch PDF Generation",
  //   description:
  //     "Allows users to upload multiple templates or data sets for batch processing, automating the generation of large volumes of PDFs efficiently.",
  //   icon: Layers,
  // },
  {
    id: "restful-api-for-integration",
    title: "RESTful API for Integration",
    description:
      "Provides a REST API for developers to integrate HTML-to-PDF conversion functionality into other platforms or workflows programmatically.",
    icon: CodeXml,
  },
  // {
  //   id:'security-and-access-control',
  //   title: "Security and Access Control",
  //   description:
  //     "Ensures user data and documents are secure, offering features like encryption, access control, and document expiration settings for privacy and compliance.",
  //   icon: Shield,
  // },
  // {
  ///  id:'fast-and-scalable-conversion',
  //   title: "Fast and Scalable Conversion",
  //   description:
  //     "Optimized for speed and scalability, ensuring quick conversion times even with high volumes or complex templates.",
  //   icon: Zap,
  // },
  {
    id: "cloud-storage-integration",
    title: "Cloud Storage Integration",
    description:
      "Supports saving PDFs directly to cloud storage platforms (e.g., AWS S3, Google Drive), enabling seamless integration with users' existing workflows.",
    icon: Cloud,
  },
  {
    id: "white-labeling-and-branding",
    title: "White-Labeling and Branding",
    description:
      "Allows businesses to apply custom branding (logos, colors) to PDFs, making them suitable for reports, invoices, and official documents.",
    icon: Brush,
  },
  // {
  //   id:'automated-email-delivery',
  //   title: "Automated Email Delivery",
  //   description:
  //     "After conversion, the system can automatically email the generated PDFs to recipients, streamlining distribution for invoices, reports, and other documents.",
  //   icon: Send,
  // },
  // {
  //   id:'version-control',
  //   title: "Version Control",
  //   description:
  //     "Maintains versions of templates and PDFs, enabling users to revert to previous versions or track changes over time.",
  //   icon: Clock,
  // },
  {
    id: "cross-browser-compatibility",
    title: "Cross-Browser Compatibility",
    description:
      "The service works on all major web browsers, ensuring users can access and use the tool regardless of their preferred platform.",
    icon: Globe,
  },
];
