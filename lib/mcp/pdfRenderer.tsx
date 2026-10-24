import React from 'react';
import { renderToBuffer } from '@react-pdf/renderer';
import { ResumeData, ResumeTemplate } from '@/types/resume';
import { normalizeTemplateId } from '@/constants/templates';

import { renderBlackYellowPdf } from './pdfTemplates/blackYellow';
import { renderClassicPdf } from './pdfTemplates/classic';
import { renderModernPdf } from './pdfTemplates/modern';
import { renderMinimalPdf } from './pdfTemplates/minimal';
import { renderTwoColumnPdf } from './pdfTemplates/twoColumn';
import { renderPremiumPdf } from './pdfTemplates/premium';
import { renderExecutivePdf } from './pdfTemplates/executive';
import { renderRedlinePdf } from './pdfTemplates/redline';
import { renderNavyPdf } from './pdfTemplates/navy';
import { renderSerifPdf } from './pdfTemplates/serif';
import { renderPhotoSidebarPdf } from './pdfTemplates/photoSidebar';
import { renderPhotoCirclePdf } from './pdfTemplates/photoCircle';
import { renderLawyerClassicPdf } from './pdfTemplates/lawyerClassic';
import { renderMinimalProPdf } from './pdfTemplates/minimalPro';
import { renderPinkHeaderPdf } from './pdfTemplates/pinkHeader';
import { renderDarkNavyPdf } from './pdfTemplates/darkNavy';
import { renderCrimsonPdf } from './pdfTemplates/crimson';
import { renderLuxuryGoldPdf } from './pdfTemplates/luxuryGold';

export {
  renderBlackYellowPdf,
  renderClassicPdf,
  renderModernPdf,
  renderMinimalPdf,
  renderTwoColumnPdf,
  renderPremiumPdf,
  renderExecutivePdf,
  renderRedlinePdf,
  renderNavyPdf,
  renderSerifPdf,
  renderPhotoSidebarPdf,
  renderPhotoCirclePdf,
  renderLawyerClassicPdf,
  renderMinimalProPdf,
  renderPinkHeaderPdf,
  renderDarkNavyPdf,
  renderCrimsonPdf,
  renderLuxuryGoldPdf,
};

/**
 * Return the dedicated React-PDF Document for the given resume and template.
 * Each template has its own faithful PDF layout matching the website preview.
 */
export function getPdfDocumentForTemplate(data: ResumeData): React.ReactElement<any> {
  const normalized = normalizeTemplateId(data.template);

  switch (normalized) {
    case 'black-yellow':
      return renderBlackYellowPdf(data);
    case 'classic':
      return renderClassicPdf(data);
    case 'modern':
      return renderModernPdf(data);
    case 'minimal':
      return renderMinimalPdf(data);
    case 'two-column':
      return renderTwoColumnPdf(data);
    case 'premium':
      return renderPremiumPdf(data);
    case 'executive':
      return renderExecutivePdf(data);
    case 'redline':
      return renderRedlinePdf(data);
    case 'navy':
      return renderNavyPdf(data);
    case 'serif':
      return renderSerifPdf(data);
    case 'photo-sidebar':
      return renderPhotoSidebarPdf(data);
    case 'photo-circle':
      return renderPhotoCirclePdf(data);
    case 'lawyer-classic':
      return renderLawyerClassicPdf(data);
    case 'minimal-pro':
      return renderMinimalProPdf(data);
    case 'pink-header':
      return renderPinkHeaderPdf(data);
    case 'dark-navy':
      return renderDarkNavyPdf(data);
    case 'crimson':
      return renderCrimsonPdf(data);
    case 'luxury-gold':
      return renderLuxuryGoldPdf(data);
    default:
      return renderClassicPdf(data);
  }
}

/**
 * Generate a production-ready, vector PDF buffer for any registered template.
 */
export async function generateResumePdfBuffer(data: ResumeData): Promise<Buffer> {
  const doc = getPdfDocumentForTemplate(data);
  return await renderToBuffer(doc as any);
}
