import { pdf } from "@react-pdf/renderer";
import { CVDocument } from "@/components/pdf/CVDocument";
import { CVData } from "@/types/cv";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface ExportPDFOptions {
  cvData: CVData;
}

interface LegacyExportPDFOptions {
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

// New PDF export using @react-pdf/renderer with proper Arabic support
export async function exportToPDF({ cvData }: ExportPDFOptions): Promise<void> {
  // Generate PDF using @react-pdf/renderer
  const blob = await pdf(<CVDocument data={cvData} />).toBlob();
  
  // Create download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${sanitizeFileName(cvData.fullName)}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Legacy export for backward compatibility (HTML to PDF)
const resolveScale = (scale?: number) => {
  if (typeof scale === "number") return scale;
  if (typeof window !== "undefined" && window.devicePixelRatio > 1) {
    return window.devicePixelRatio;
  }
  return 2;
};

const ensureFontsReady = async () => {
  if (typeof document !== "undefined") {
    const enrichedDocument = document as unknown as { fonts?: FontFaceSet };
    if (enrichedDocument.fonts && "ready" in enrichedDocument.fonts) {
      await enrichedDocument.fonts.ready;
    }
  }
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

export async function exportToPDFLegacy({
  element,
  cvData,
  scale,
}: LegacyExportPDFOptions): Promise<void> {
  const canvas = await renderElementToCanvas(element, scale);
  const imageData = canvas.toDataURL("image/png");

  const pdfDoc = new jsPDF("portrait", "pt", "a4");
  const pageWidth = pdfDoc.internal.pageSize.getWidth();
  const pageHeight = pdfDoc.internal.pageSize.getHeight();

  const pdfWidth = pageWidth;
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  let heightLeft = pdfHeight;
  let position = 0;

  pdfDoc.addImage(imageData, "PNG", 0, position, pdfWidth, pdfHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position = heightLeft - pdfHeight;
    pdfDoc.addPage();
    pdfDoc.addImage(imageData, "PNG", 0, position, pdfWidth, pdfHeight);
    heightLeft -= pageHeight;
  }

  pdfDoc.save(`${sanitizeFileName(cvData.fullName)}.pdf`);
}
