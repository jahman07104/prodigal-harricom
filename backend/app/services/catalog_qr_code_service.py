# QR Code generation utility for catalog backend (example)
# Usage: import and call generate_qr_code('some text or url', 'output.png')
import qrcode

def generate_qr_code(data: str, output_path: str = 'qr_code.png'):
    """
    Generate a QR code image from the given data and save to output_path.
    """
    img = qrcode.make(data)
    img.save(output_path)
    return output_path

if __name__ == "__main__":
    # Example usage for the catalog
    url = "https://harricom.com/catalog/index.html"
    print(f"Generating QR code for {url}...")
    out = generate_qr_code(url, "catalog_qr.png")
    print(f"QR code saved to {out}")
