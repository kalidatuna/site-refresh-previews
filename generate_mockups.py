from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "mockups"
OUT.mkdir(parents=True, exist_ok=True)

PROSPECTS = [
    ("bland-roofing", "Bland Roofing Company", "Roofing built for Central Georgia", ["Roof Repair", "Roof Replacement", "Storm Damage"], "(478) 474-0953"),
    ("mckeithen-roofing", "Bob McKeithen & Sons Roofing", "Tallahassee roofing with decades of local trust", ["Re-Roofing", "Repairs", "Residential Roofing"], "850-575-3333"),
    ("mr-roberson", "M.R. Roberson Roofing", "Straight answers. Strong roofs.", ["Roof Repair", "Roof Replacement", "Roof Cleaning"], "(770) 715-1125"),
    ("five-star-gc", "Five Star General Contracting & Roofing", "Roofing and contracting without the runaround", ["Re-Roofs", "Roof Repairs", "General Contracting"], "813-727-8764"),
    ("arden", "Arden Roofing & Restorations", "Roofing remedies for North Georgia", ["Shingle Roofing", "Metal Roofing", "Roof Repair"], "404-542-9441"),
    ("riley-services", "Riley Services", "Practical home improvement at a fair price", ["Flooring", "Pressure Washing", "Gutter Cleaning"], "Get a fast quote"),
    ("georgia-air", "Georgia Air Contractors", "Reliable heating and cooling across Metro Atlanta", ["AC Repair", "Heating", "Maintenance"], "(770) 766-1607"),
    ("routine-maintenance", "Routine Maintenance Inc.", "One call for repairs, remodeling and upkeep", ["Remodeling", "Repairs", "Property Maintenance"], "(770) 631-1433"),
    ("hrs-sheet-metal", "HRS Sheet Metal", "Commercial sheet metal work done right", ["Fabrication", "Installation", "Custom Sheet Metal"], "(407) 710-2393"),
    ("kennedy-roofing", "Kennedy Construction Groups", "Family owned roofing built to last", ["Roof Replacement", "Roof Repair", "Storm Response"], "(941) 337-9078"),
]

def font(size, bold=False):
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf",
    ]
    for p in candidates:
        if Path(p).exists():
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()

for idx, (slug, name, headline, services, phone) in enumerate(PROSPECTS):
    img = Image.new("RGB", (1440, 900), "#f6f3ed")
    d = ImageDraw.Draw(img)
    dark = "#192126"
    accent = ["#b04b2f", "#315f7a", "#9a6a2f", "#2d5a4b", "#6b4c3b"][idx % 5]
    muted = "#62696d"

    d.rectangle((0, 0, 1440, 88), fill=dark)
    d.text((70, 29), name.upper(), font=font(24, True), fill="white")
    d.text((1020, 34), "SERVICES     ABOUT     CONTACT", font=font(17), fill="#dde2e4")

    d.rounded_rectangle((70, 145, 1370, 585), radius=26, fill="#ffffff")
    d.text((115, 195), "LOCAL • LICENSED • RESPONSIVE", font=font(18, True), fill=accent)
    d.multiline_text((115, 245), headline, font=font(55, True), fill=dark, spacing=8)
    d.multiline_text((115, 395), "Clear service options, real trust signals, and one obvious way\nto request an estimate from any device.", font=font(23), fill=muted, spacing=8)
    d.rounded_rectangle((115, 500, 360, 558), radius=14, fill=accent)
    d.text((151, 517), "REQUEST AN ESTIMATE", font=font(17, True), fill="white")
    d.rounded_rectangle((385, 500, 610, 558), radius=14, outline="#c9ced1", width=2)
    d.text((425, 517), phone, font=font(17, True), fill=dark)

    card_x = [70, 515, 960]
    for x, service in zip(card_x, services):
        d.rounded_rectangle((x, 635, x+410, 790), radius=20, fill="#ffffff")
        d.ellipse((x+28, 669, x+72, 713), fill=accent)
        d.text((x+92, 662), service, font=font(24, True), fill=dark)
        d.text((x+92, 704), "Simple details and a clear next step", font=font(16), fill=muted)
        d.text((x+92, 742), "Learn more →", font=font(16, True), fill=accent)

    d.text((70, 842), "CONCEPT PREVIEW • HOME PAGE DIRECTION", font=font(15, True), fill=muted)
    d.text((1090, 842), "Mobile-first • Fast • Clear CTA", font=font(15), fill=muted)
    img.save(OUT / f"{slug}.png", quality=95)

print(f"generated {len(PROSPECTS)} mockups in {OUT}")
