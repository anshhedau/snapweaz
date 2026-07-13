import type { ComponentType } from 'npm:react@18.3.1';
import { template as certOtp } from './cert-otp.tsx';

export interface TemplateEntry {
  component: ComponentType<any>;
  subject: string | ((data: any) => string);
  displayName?: string;
  previewData?: Record<string, unknown>;
  to?: string;
}

export const TEMPLATES: Record<string, TemplateEntry> = {
  'cert-otp': certOtp,
};
