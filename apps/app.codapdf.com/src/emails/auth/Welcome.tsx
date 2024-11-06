import { env } from "@/constants/env.client";
import { Body, Button, Container, Head, Hr, Html, Preview, Section, Text } from "@react-email/components";

interface WelcomeEmailProps {
  name: string;
}

const baseUrl = env.APP_DOMAIN;
export const WelcomeEmail = ({ name }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Easily turn HTML templates into PDFs with a simple API and an intuitive dashboard </Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={paragraph}>Hi {name}</Text>
        <Text style={paragraph}>
          Welcome to <strong>{"<CodaPDF  />"}</strong>,
        </Text>
        <Text style={paragraph}>
          I am excited to have you on board! You are now just one step away from turning your HTML templates into PDFs with a simple API and an intuitive dashboard. Get started by
          logging in to your account.
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href={`${baseUrl}/auth/login`}>
            Get started
          </Button>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />
          The <strong>{"<CodaPDF  />"}</strong> team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          If you have any questions, please contact us at{" "}
          <a href="mailto:hello@codapdf.com" style={footer}>
            hello@codapdf.com
          </a>
        </Text>
      </Container>
    </Body>
  </Html>
);

WelcomeEmail.PreviewProps = {
  name: "Alan",
} as WelcomeEmailProps;

export default WelcomeEmail;

const main = {
  color: "#ffffff",
  backgroundColor: "#0d0d0d",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
