import { Body, Button, Container, Head, Hr, Html, Preview, Text } from "@react-email/components";

interface ResetPasswordProps {
  name: string;
  resetPasswordLink: string;
}

export const ResetPassword = ({ name, resetPasswordLink }: ResetPasswordProps) => (
  <Html>
    <Head />
    <Preview>Someone recently requested a password change for your {"<CodaPDF  />"} account</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={paragraph}>Hi {name}</Text>
        <Text style={paragraph}>Someone recently requested a password change for your {"<CodaPDF  />"} account. If this was you, you can set a new password here:</Text>
        <Button style={button} href={resetPasswordLink}>
          Reset password
        </Button>
        <Text style={paragraph}>If you don&apos;t want to change your password or didn&apos;t request this, just ignore and delete this message.</Text>
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

ResetPassword.PreviewProps = {
  name: "Alan",
} as ResetPasswordProps;

export default ResetPassword;

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
