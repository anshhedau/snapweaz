/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22';
import type { TemplateEntry } from './registry.ts';

interface Props {
  code?: string;
  name?: string;
  expiresInMinutes?: number;
}

const Email = ({ code = '000000', name, expiresInMinutes = 10 }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your SnapWeaz certificate verification code</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Verify your certificate</Heading>
        <Text style={text}>
          {name ? `Hi ${name},` : 'Hi there,'} use the code below to view your SnapWeaz
          certificate. It expires in {expiresInMinutes} minutes.
        </Text>
        <Section style={codeBox}>
          <Text style={codeText}>{code}</Text>
        </Section>
        <Text style={muted}>
          If you didn't request this, you can safely ignore this email.
        </Text>
        <Text style={footer}>SnapWeaz Studio · snapweaz.com</Text>
      </Container>
    </Body>
  </Html>
);

export const template = {
  component: Email,
  subject: 'Your SnapWeaz certificate verification code',
  displayName: 'Certificate OTP',
  previewData: { code: '482913', name: 'Jhanvi', expiresInMinutes: 10 },
} satisfies TemplateEntry;

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
};
const container = { padding: '32px 28px', maxWidth: '520px', margin: '0 auto' };
const h1 = { color: '#0f0506', fontSize: '24px', margin: '0 0 12px', fontWeight: 600 };
const text = { color: '#3a2a2c', fontSize: '15px', lineHeight: '1.6', margin: '0 0 24px' };
const codeBox = {
  backgroundColor: '#fff4ef',
  border: '1px solid #f8a791',
  borderRadius: '14px',
  padding: '20px',
  textAlign: 'center' as const,
  margin: '0 0 24px',
};
const codeText = {
  color: '#0f0506',
  fontSize: '34px',
  letterSpacing: '10px',
  fontWeight: 700,
  margin: 0,
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
};
const muted = { color: '#6a5658', fontSize: '13px', margin: '0 0 24px' };
const footer = { color: '#9a8a8c', fontSize: '12px', margin: 0 };
