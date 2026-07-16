/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1';
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Column,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22';
import type { TemplateEntry } from './registry.ts';

interface Props {
  code?: string;
  name?: string;
  expiresInMinutes?: number;
}

const Email = ({ code = '000000', name, expiresInMinutes = 2 }: Props) => {
  const digits = String(code).padStart(6, '0').slice(0, 6).split('');
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Your SnapWeaz certificate verification code</Preview>
      <Body style={main}>
        <Container style={outer}>
          <Section style={card}>
            <Heading style={h1}>
              VERIFY YOUR <span style={h1Accent}>CERTIFICATE</span>
            </Heading>

            {name ? <Text style={hiName}>Hi {name},</Text> : <Text style={hiName}>Hi there,</Text>}
            <Text style={intro}>
              Use the code below to view your certificate. It expires in{' '}
              <strong style={strong}>{expiresInMinutes} minutes</strong>.
            </Text>

            <Section style={codeFrame}>
              <Row>
                {digits.map((d, i) => (
                  <Column key={i} align="center" style={digitCol}>
                    <div style={digitBox}>{d}</div>
                  </Column>
                ))}
              </Row>
            </Section>

            <Section style={noteBox}>
              <Text style={noteText}>
                🔒 If you didn't request this, you can safely ignore this email.
              </Text>
            </Section>

            <Hr style={hr} />

            <Section>
              <Row>
                <Column align="left" style={footerLeftCol}>
                  <Link href="https://www.snapweaz.com" style={iconPill} aria-label="Website">
                    <span style={iconGlyph}>🌐</span>
                  </Link>
                  <Link href="https://instagram.com/snapweaz.com" style={iconPill} aria-label="Instagram">
                    <span style={iconGlyph}>📸</span>
                  </Link>
                  <Link href="https://linkedin.com/company/snapweaz" style={iconPill} aria-label="LinkedIn">
                    <span style={iconGlyph}>in</span>
                  </Link>
                </Column>
                <Column align="right" style={footerRightCol}>
                  <Link href="https://www.snapweaz.com" style={siteLink}>
                    snapweaz.com
                  </Link>
                </Column>
              </Row>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export const template = {
  component: Email,
  subject: 'Your SnapWeaz certificate verification code',
  displayName: 'Certificate OTP',
  previewData: { code: '321434', name: 'Jhanvi', expiresInMinutes: 2 },
} satisfies TemplateEntry;

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
  padding: '24px 0',
};
const outer = { maxWidth: '620px', margin: '0 auto', padding: '0 16px' };
const card = {
  backgroundColor: '#ffffff',
  borderRadius: '24px',
  padding: '48px 40px 36px',
  boxShadow: '0 10px 40px rgba(15, 5, 6, 0.06)',
};
const h1 = {
  color: '#0f0f10',
  fontSize: '30px',
  lineHeight: '1.15',
  fontWeight: 800,
  margin: '0 0 24px',
  letterSpacing: '0.02em',
};
const h1Accent = {
  background: 'linear-gradient(90deg, #a855f7 0%, #ec4899 55%, #f97316 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text' as const,
  color: '#ec4899',
};
const hiName = { color: '#7c3aed', fontSize: '18px', fontWeight: 700, margin: '0 0 8px' };
const intro = { color: '#3f3f46', fontSize: '15px', lineHeight: '1.65', margin: '0 0 28px' };
const strong = { color: '#f97316', fontWeight: 700 };
const codeFrame = {
  border: '1.5px solid #f8a791',
  borderRadius: '18px',
  padding: '18px 12px',
  margin: '0 0 24px',
  background: 'linear-gradient(180deg, #fff 0%, #fff7f2 100%)',
};
const digitCol = { padding: '0 4px' };
const digitBox = {
  backgroundColor: '#ffffff',
  border: '1px solid #ececf2',
  borderRadius: '12px',
  color: '#0f0f10',
  fontSize: '30px',
  fontWeight: 800,
  padding: '14px 0',
  minWidth: '46px',
  textAlign: 'center' as const,
  boxShadow: '0 2px 6px rgba(15, 5, 6, 0.04)',
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
};
const noteBox = {
  backgroundColor: '#f6f5fb',
  borderRadius: '14px',
  padding: '12px 16px',
  margin: '0 0 28px',
};
const noteText = { color: '#52525b', fontSize: '13px', margin: 0, lineHeight: '1.5' };
const hr = { borderColor: '#eef0f4', margin: '20px 0 18px' };
const footerLeftCol = { verticalAlign: 'middle' as const };
const footerRightCol = { verticalAlign: 'middle' as const };
const iconPill = {
  display: 'inline-block',
  color: '#7c3aed',
  fontSize: '14px',
  fontWeight: 700,
  textDecoration: 'none',
  width: '34px',
  height: '34px',
  lineHeight: '34px',
  textAlign: 'center' as const,
  marginRight: '8px',
  border: '1px solid #ece7fb',
  borderRadius: '999px',
  backgroundColor: '#faf8ff',
};
const iconGlyph = { display: 'inline-block', lineHeight: '34px' };
const siteLink = {
  color: '#7c3aed',
  fontSize: '14px',
  fontWeight: 700,
  textDecoration: 'none',
};
const disclaimer = {
  color: '#8a8a95',
  fontSize: '11px',
  margin: '14px 0 0',
  textAlign: 'center' as const,
};
