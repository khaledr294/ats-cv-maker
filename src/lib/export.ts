import html2canvas from "html2canvas";
import jsPDF from "jspdf";
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
