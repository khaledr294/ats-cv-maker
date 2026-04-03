"""
Generate PDF from HTML CV using weasyprint or playwright.
Run: python generate_pdf.py
"""
import subprocess
import sys
import os

HTML_FILE = os.path.join(os.path.dirname(__file__), "index.html")
PDF_FILE = os.path.join(os.path.dirname(__file__), "Khaled_Ragab_CV_RCM.pdf")

def try_playwright():
    """Use playwright (Chromium) for high-fidelity PDF generation."""
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print("Installing playwright...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "playwright"])
        subprocess.check_call([sys.executable, "-m", "playwright", "install", "chromium"])
        from playwright.sync_api import sync_playwright

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto(f"file:///{HTML_FILE.replace(os.sep, '/')}")
        page.pdf(
            path=PDF_FILE,
            format="A4",
            print_background=True,
            margin={"top": "0", "bottom": "0", "left": "0", "right": "0"},
        )
        browser.close()
    print(f"PDF generated: {PDF_FILE}")

if __name__ == "__main__":
    try_playwright()
