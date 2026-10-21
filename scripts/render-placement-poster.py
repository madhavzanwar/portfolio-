from PIL import Image, ImageDraw, ImageFilter, ImageFont
import os

w, h = 1920, 1080
canvas = Image.new('RGB', (w, h), color='#080a0f')
draw = ImageDraw.Draw(canvas)

# 1. Studio Lighting Background
for y in range(h):
    factor = y / h
    r = int(8 + factor * 10)
    g = int(10 + factor * 14)
    b = int(16 + factor * 20)
    draw.line([(0, y), (w, y)], fill=(r, g, b))

# Ambient soft glow in center
center_x, center_y = w // 2, h // 2
for rad in range(500, 50, -30):
    draw.ellipse([center_x - rad, center_y - rad + 50, center_x + rad, center_y + rad + 50], outline=(18, 45, 80))

# 2. Typography at top (Flow style)
font_title = ImageFont.truetype(r'C:\Windows\Fonts\segoeuib.ttf', 64)
font_sub = ImageFont.truetype(r'C:\Windows\Fonts\segoeui.ttf', 20)
font_specs = ImageFont.truetype(r'C:\Windows\Fonts\segoeuib.ttf', 12)

# Flow-style small tech specs above title
draw.text((w//2, 70), "PYTHON   FLASK   LLM REASONING   RESUME PARSING   MOCK INTERVIEWS", font=font_specs, fill='#38bdf8', anchor='mm')
draw.text((w//2, 120), "PLACEMENT AI", font=font_title, fill='#E1E0CC', anchor='mm')
draw.text((w//2, 168), "AI-Powered Campus Placement & Technical Interview Intelligence", font=font_sub, fill='#9E9C94', anchor='mm')

# 3. Load Real Screenshots
resume_img = Image.open('public/images/projects/placement-shots/resume-analysis.png').convert('RGBA')
mock_img = Image.open('public/images/projects/placement-shots/mock-interview.png').convert('RGBA')

# 4. Realistic Laptop Mockup
laptop_w, laptop_h = 1060, 660
laptop_x = 180
laptop_y = 230

# Screen bezel & casing
bezel = Image.new('RGBA', (laptop_w, laptop_h), color=(0, 0, 0, 0))
bezel_draw = ImageDraw.Draw(bezel)

# Outer aluminum chassis
bezel_draw.rounded_rectangle([0, 0, laptop_w, laptop_h - 40], radius=24, fill='#161a22', outline='#2d3748', width=2)
# Inner display border
bezel_draw.rounded_rectangle([18, 18, laptop_w - 18, laptop_h - 58], radius=14, fill='#0d1117', outline='#1f2937', width=1)
# Camera dot
bezel_draw.ellipse([laptop_w // 2 - 4, 8, laptop_w // 2 + 4, 16], fill='#2d3748')

# Fit resume image inside display
disp_w = laptop_w - 40
disp_h = laptop_h - 80
screen_content = resume_img.resize((disp_w, disp_h), Image.Resampling.LANCZOS)
bezel.paste(screen_content, (20, 20))

# Laptop base / keyboard deck
base_y = laptop_h - 44
bezel_draw.polygon([
    (0, base_y),
    (laptop_w, base_y),
    (laptop_w + 30, laptop_h),
    (-30, laptop_h)
], fill='#1e2430', outline='#3b475d')
# Trackpad notch
notch_w = 160
notch_x = (laptop_w - notch_w) // 2
bezel_draw.rounded_rectangle([notch_x, base_y, notch_x + notch_w, base_y + 8], radius=4, fill='#0d1117')

# Shadow for laptop
shadow = Image.new('RGBA', (laptop_w + 120, 100), (0, 0, 0, 0))
s_draw = ImageDraw.Draw(shadow)
s_draw.ellipse([20, 10, laptop_w + 100, 90], fill=(0, 0, 0, 180))
shadow = shadow.filter(ImageFilter.GaussianBlur(18))
canvas.paste(shadow, (laptop_x - 60, laptop_y + laptop_h - 60), shadow)

# Paste Laptop
canvas.paste(bezel, (laptop_x, laptop_y), bezel)

# 5. Overlapping Floating Tablet on the Right (Mock Interview UI)
tab_w, tab_h = 560, 420
tab_x = 1200
tab_y = 380

tablet = Image.new('RGBA', (tab_w, tab_h), color=(0, 0, 0, 0))
t_draw = ImageDraw.Draw(tablet)

# Tablet chassis
t_draw.rounded_rectangle([0, 0, tab_w, tab_h], radius=28, fill='#11151e', outline='#38bdf8', width=2)
# Tablet screen inner
inner_pad = 14
t_screen = mock_img.resize((tab_w - inner_pad * 2, tab_h - inner_pad * 2), Image.Resampling.LANCZOS)
# Rounded mask for screen
mask = Image.new('L', (tab_w - inner_pad * 2, tab_h - inner_pad * 2), 0)
mask_draw = ImageDraw.Draw(mask)
mask_draw.rounded_rectangle([0, 0, tab_w - inner_pad * 2, tab_h - inner_pad * 2], radius=20, fill=255)

tablet.paste(t_screen, (inner_pad, inner_pad), mask)

# Floating pill badge on tablet
badge_w, badge_h = 240, 38
t_draw.rounded_rectangle([tab_w - badge_w - 24, 24, tab_w - 24, 24 + badge_h], radius=19, fill=(0, 0, 0, 210), outline='#10b981', width=1)
badge_font = ImageFont.truetype(r'C:\Windows\Fonts\segoeuib.ttf', 13)
t_draw.text((tab_w - badge_w // 2 - 24, 24 + badge_h // 2), "AI MOCK INTERVIEW LIVE", font=badge_font, fill='#10b981', anchor='mm')

# Tablet Shadow
t_shadow = Image.new('RGBA', (tab_w + 80, tab_h + 80), (0, 0, 0, 0))
ts_draw = ImageDraw.Draw(t_shadow)
ts_draw.rounded_rectangle([20, 20, tab_w + 60, tab_h + 60], radius=32, fill=(0, 0, 0, 220))
t_shadow = t_shadow.filter(ImageFilter.GaussianBlur(24))

canvas.paste(t_shadow, (tab_x - 40, tab_y - 20), t_shadow)
canvas.paste(tablet, (tab_x, tab_y), tablet)

# Save final masterpiece
canvas.save('public/images/projects/placement.jpg', quality=95)
print('Placement AI studio advertising poster successfully generated!')
