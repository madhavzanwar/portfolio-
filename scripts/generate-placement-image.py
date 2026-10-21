from PIL import Image, ImageDraw, ImageFont
import math
import os

w, h = 1920, 1080
img = Image.new('RGB', (w, h), color='#07090e')
draw = ImageDraw.Draw(img)

# Background atmospheric gradient
for y in range(h):
    ratio = y / h
    r = int(7 + ratio * 10)
    g = int(9 + ratio * 14)
    b = int(15 + ratio * 22)
    draw.line([(0, y), (w, y)], fill=(r, g, b))

# Ambient cyan and violet soft glows
for rad in range(600, 50, -20):
    val = int((1 - rad / 600) * 20)
    draw.ellipse([w//2 - rad, h//2 - rad + 50, w//2 + rad, h//2 + rad + 50], outline=(15, 60, 100))

# Fonts
font_title = ImageFont.truetype(r'C:\Windows\Fonts\segoeuib.ttf', 72)
font_subtitle = ImageFont.truetype(r'C:\Windows\Fonts\segoeui.ttf', 24)
font_card_h = ImageFont.truetype(r'C:\Windows\Fonts\segoeuib.ttf', 22)
font_body = ImageFont.truetype(r'C:\Windows\Fonts\segoeui.ttf', 16)
font_bold = ImageFont.truetype(r'C:\Windows\Fonts\segoeuib.ttf', 18)
font_mono = ImageFont.truetype(r'C:\Windows\Fonts\segoeuib.ttf', 38)
font_small = ImageFont.truetype(r'C:\Windows\Fonts\segoeui.ttf', 14)

# Top Title
draw.text((w//2, 85), "PLACEMENT AI", font=font_title, fill='#E1E0CC', anchor='mm')
draw.text((w//2, 138), "AI-Powered Campus Placement & Mock Interview Intelligence", font=font_subtitle, fill='#9E9C94', anchor='mm')

# Mockup Card coordinates
cw, ch = 1420, 780
x1 = (w - cw) // 2
y1 = 185
x2, y2 = x1 + cw, y1 + ch

# Card Shadow
for s in range(30, 0, -2):
    draw.rounded_rectangle([x1 - s, y1 - s + 10, x2 + s, y2 + s + 10], radius=28, outline=(4, 6, 12), width=2)

# Main Window Surface
draw.rounded_rectangle([x1, y1, x2, y2], radius=20, fill='#0d1117', outline='#1e2638', width=2)

# Window Header
draw.rounded_rectangle([x1, y1, x2, y1 + 52], radius=20, fill='#161d2a')
draw.rectangle([x1, y1 + 30, x2, y1 + 52], fill='#161d2a')
draw.line([(x1, y1 + 52), (x2, y1 + 52)], fill='#232d42', width=1)

# Window dots
draw.ellipse([x1 + 25, y1 + 20, x1 + 37, y1 + 32], fill='#ff5f56')
draw.ellipse([x1 + 47, y1 + 20, x1 + 59, y1 + 32], fill='#ffbd2e')
draw.ellipse([x1 + 69, y1 + 20, x1 + 81, y1 + 32], fill='#27c93f')
draw.text((w//2, y1 + 26), "placement-ai.pccoe.internal // candidate-dashboard", font=font_small, fill='#8b949e', anchor='mm')

# Window Layout: 3 Columns
content_y = y1 + 72

# --- Column 1: Candidate Readiness (width 400) ---
col1_x1 = x1 + 25
col1_w = 420
col1_x2 = col1_x1 + col1_w
draw.rounded_rectangle([col1_x1, content_y, col1_x2, y2 - 25], radius=16, fill='#111622', outline='#1f293d', width=1)

draw.text((col1_x1 + 25, content_y + 25), "CANDIDATE PROFILE", font=font_small, fill='#38bdf8')
draw.text((col1_x1 + 25, content_y + 48), "Madhav Zanwar", font=font_card_h, fill='#f0f6fc')
draw.text((col1_x1 + 25, content_y + 76), "B.Tech CSE (AI & ML) · PCCOE", font=font_small, fill='#8b949e')

# Readiness Score Ring
gauge_cx, gauge_cy = col1_x1 + col1_w // 2, content_y + 195
draw.ellipse([gauge_cx - 85, gauge_cy - 85, gauge_cx + 85, gauge_cy + 85], outline='#1f293d', width=12)
# Emerald arc
for angle in range(-90, 210, 2):
    rad = math.radians(angle)
    px = gauge_cx + int(85 * math.cos(rad))
    py = gauge_cy + int(85 * math.sin(rad))
    draw.ellipse([px-6, py-6, px+6, py+6], fill='#10b981')

draw.text((gauge_cx, gauge_cy - 8), "94.2%", font=font_mono, fill='#f0f6fc', anchor='mm')
draw.text((gauge_cx, gauge_cy + 26), "READINESS SCORE", font=font_small, fill='#10b981', anchor='mm')

# Metrics bars
bars_y = content_y + 320
metrics = [
    ("DSA & Algorithms", 0.96, "#10b981"),
    ("Machine Learning & Vision", 0.94, "#38bdf8"),
    ("Python / Flask Systems", 0.91, "#f59e0b"),
    ("Technical Communication", 0.88, "#a855f7")
]
for title, pct, color in metrics:
    draw.text((col1_x1 + 25, bars_y), title, font=font_body, fill='#c9d1d9')
    draw.text((col1_x2 - 25, bars_y), f"{int(pct*100)}%", font=font_bold, fill=color, anchor='ra')
    # bar track
    draw.rounded_rectangle([col1_x1 + 25, bars_y + 24, col1_x2 - 25, bars_y + 32], radius=4, fill='#1b2234')
    fill_w = int((col1_w - 50) * pct)
    draw.rounded_rectangle([col1_x1 + 25, bars_y + 24, col1_x1 + 25 + fill_w, bars_y + 32], radius=4, fill=color)
    bars_y += 58


# --- Column 2: AI Mock Interview System (width 500) ---
col2_x1 = col1_x2 + 20
col2_w = 480
col2_x2 = col2_x1 + col2_w
draw.rounded_rectangle([col2_x1, content_y, col2_x2, y2 - 25], radius=16, fill='#111622', outline='#1f293d', width=1)

draw.text((col2_x1 + 25, content_y + 25), "AI MOCK INTERVIEW SIMULATOR", font=font_small, fill='#10b981')
draw.text((col2_x1 + 25, content_y + 48), "Live Session: Technical Round 02", font=font_card_h, fill='#f0f6fc')

# Video / Audio Simulation Tile
video_y = content_y + 90
draw.rounded_rectangle([col2_x1 + 25, video_y, col2_x2 - 25, video_y + 260], radius=12, fill='#070a10', outline='#20293d')

# Waveform / Audio bars
wave_y = video_y + 130
draw.text((col2_x1 + col2_w // 2, wave_y - 45), "AI Question: 'Explain your 95.6% CNN Architecture'", font=font_body, fill='#f0f6fc', anchor='mm')

for i in range(32):
    bx = col2_x1 + 65 + i * 11
    bar_h = int(math.sin(i * 0.45) * 35 + 45)
    draw.rounded_rectangle([bx, wave_y - bar_h // 2, bx + 6, wave_y + bar_h // 2], radius=3, fill='#38bdf8')

draw.rounded_rectangle([col2_x1 + 45, video_y + 205, col2_x2 - 45, video_y + 242], radius=8, fill='#162235', outline='#2a3d5e')
draw.text((col2_x1 + col2_w // 2, video_y + 224), "✓ Real-Time Evaluation: Accurate algorithmic reasoning detected", font=font_small, fill='#38bdf8', anchor='mm')

# Feedback notes
notes_y = video_y + 285
draw.text((col2_x1 + 25, notes_y), "INTELLIGENT FEEDBACK", font=font_small, fill='#8b949e')
notes = [
    ("• Strength: Clear explanation of model parameters & convolution steps", "#10b981"),
    ("• Strength: High confidence on algorithmic optimization questions", "#10b981"),
    ("• Recommendation: Mention deployment latency on cloud container", "#f59e0b")
]
for n_text, n_col in notes:
    notes_y += 30
    draw.text((col2_x1 + 25, notes_y), n_text, font=font_body, fill=n_col)


# --- Column 3: Skill Coverage Roadmap (width 390) ---
col3_x1 = col2_x2 + 20
col3_w = x2 - col3_x1 - 25
col3_x2 = col3_x1 + col3_w
draw.rounded_rectangle([col3_x1, content_y, col3_x2, y2 - 25], radius=16, fill='#111622', outline='#1f293d', width=1)

draw.text((col3_x1 + 25, content_y + 25), "CURATED ROADMAP", font=font_small, fill='#a855f7')
draw.text((col3_x1 + 25, content_y + 48), "Skill Milestones", font=font_card_h, fill='#f0f6fc')

roadmap_y = content_y + 90
milestones = [
    ("1. Resume Parsing Engine", "Completed · 100%", "#10b981", True),
    ("2. Mock Interview AI", "Active · Real-time", "#38bdf8", True),
    ("3. DSA Optimization", "350+ LeetCode Track", "#10b981", True),
    ("4. System Design Prep", "Microservices & APIs", "#f59e0b", False),
    ("5. Behavioral Mastery", "STAR Method Ready", "#8b949e", False),
]

for title, sub, col, done in milestones:
    draw.rounded_rectangle([col3_x1 + 20, roadmap_y, col3_x2 - 20, roadmap_y + 72], radius=10, fill='#161d2b', outline='#242f45')
    # circle indicator
    draw.ellipse([col3_x1 + 35, roadmap_y + 26, col3_x1 + 55, roadmap_y + 46], fill=col if done else '#222d42', outline=col)
    if done:
        draw.text((col3_x1 + 45, roadmap_y + 36), "✓", font=font_small, fill='#070a10', anchor='mm')
    draw.text((col3_x1 + 68, roadmap_y + 24), title, font=font_bold, fill='#f0f6fc')
    draw.text((col3_x1 + 68, roadmap_y + 46), sub, font=font_small, fill=col)
    roadmap_y += 88

# Save final image
os.makedirs('public/images/projects', exist_ok=True)
img.save('public/images/projects/placement.jpg', quality=95)
print('Placement AI advertising poster successfully generated!')
