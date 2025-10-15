import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  AlignmentType,
  Document as DocxDocument,
  ImageRun,
  Packer,
  Paragraph,
  convertInchesToTwip,
} from "docx";
import { CVData } from "@/types/cv";

interface ExportPDFOptions {
  element: HTMLElement;
  cvData: CVData;
  scale?: number;
}

const sanitizeFileName = (fullName: string) => {
  const fallback = "cv-preview";
  if (!fullName) return fallback;
  return (
    fullName
      .trim()
      .replace(/[^a-zA-Z0-9\u0600-\u06FF\-_ ]+/g, "")
      .replace(/\s+/g, "_")
      .toLowerCase() || fallback
  );
};

const ensureFontsReady = async () => {
  if (typeof document !== "undefined") {
    const enrichedDocument = document as unknown as { fonts?: FontFaceSet };
    if (enrichedDocument.fonts && "ready" in enrichedDocument.fonts) {
      await enrichedDocument.fonts.ready;
    }
  }
};

const resolveScale = (scale?: number) => {
  if (typeof scale === "number") return scale;
  if (typeof window !== "undefined" && window.devicePixelRatio > 1) {
    return window.devicePixelRatio;
  }
  return 2;
};

const renderElementToCanvas = async (element: HTMLElement, scale?: number) => {
  await ensureFontsReady();
  return html2canvas(element, {
    scale: resolveScale(scale),
    useCORS: true,
    backgroundColor: "#ffffff",
    logging: false,
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight,
  });
};

export async function exportToPDF({
  element,
  cvData,
  scale,
}: ExportPDFOptions): Promise<void> {
  const canvas = await renderElementToCanvas(element, scale);
  const imageData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("portrait", "pt", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const pdfWidth = pageWidth;
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  let heightLeft = pdfHeight;
  let position = 0;

  pdf.addImage(imageData, "PNG", 0, position, pdfWidth, pdfHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position = heightLeft - pdfHeight;
    pdf.addPage();
    pdf.addImage(imageData, "PNG", 0, position, pdfWidth, pdfHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(`${sanitizeFileName(cvData.fullName)}.pdf`);
}

const PX_PER_INCH = 96;
const A4_WIDTH_IN = 8.27;
const A4_HEIGHT_IN = 11.69;
const EXPORT_MARGIN_IN = 0.25;

const dataUrlToUint8Array = (dataUrl: string) => {
  const base64 = dataUrl.split(",")[1];
  if (!base64) return new Uint8Array();
  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
};

interface ExportDOCXOptions {
  element: HTMLElement;
  cvData: CVData;
  scale?: number;
}

export async function exportToDOCX({
  element,
  cvData,
  scale,
}: ExportDOCXOptions): Promise<void> {
  const canvas = await renderElementToCanvas(element, scale);
  const imageDataUrl = canvas.toDataURL("image/png");
  const imageBuffer = dataUrlToUint8Array(imageDataUrl);

  const usableWidthPx = (A4_WIDTH_IN - EXPORT_MARGIN_IN * 2) * PX_PER_INCH;
  const usableHeightPx = (A4_HEIGHT_IN - EXPORT_MARGIN_IN * 2) * PX_PER_INCH;

  let targetWidthPx = usableWidthPx;
  let targetHeightPx = (canvas.height * targetWidthPx) / canvas.width;

  if (targetHeightPx > usableHeightPx) {
    targetHeightPx = usableHeightPx;
    targetWidthPx = (canvas.width * targetHeightPx) / canvas.height;
  }

  const doc = new DocxDocument({
    sections: [
      {
        properties: {
          page: {
            size: {
              width: convertInchesToTwip(A4_WIDTH_IN),
              height: convertInchesToTwip(A4_HEIGHT_IN),
            },
            margin: {
              top: convertInchesToTwip(EXPORT_MARGIN_IN),
              right: convertInchesToTwip(EXPORT_MARGIN_IN),
              bottom: convertInchesToTwip(EXPORT_MARGIN_IN),
              left: convertInchesToTwip(EXPORT_MARGIN_IN),
            },
          },
        },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new ImageRun({
                data: imageBuffer,
                transformation: {
                  width: targetWidthPx,
                  height: targetHeightPx,
                },
              }),
            ],
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${sanitizeFileName(cvData.fullName)}.docx`;
  link.click();
  window.URL.revokeObjectURL(url);
}
