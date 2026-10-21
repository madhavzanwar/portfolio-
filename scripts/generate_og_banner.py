import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_og_banner():
    WIDTH, HEIGHT = 1200, 630
    
    # 1. Base dark background
    img = Image.new("RGBA", (WIDTH, HEIGHT), (7, 9, 12, 255))
    
    # 2. Radial Glow in background (Azure/Emerald deep ambient light)
    glow = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    
    # Top-left azure ambient glow
    for r in range(400, 0, -10):
        alpha = int(24 * (1 - r / 400))
        glow_draw.ellipse([(-100 - r), (-100 - r), (400 + r), (400 + r)], fill=(30, 80, 140, alpha))
        
    # Center-right emerald ambient glow
    for r in range(350, 0, -10):
        alpha = int(18 * (1 - r / 350))
        glow_draw.ellipse([(750 - r), (200 - r), (1150 + r), (600 + r)], fill=(16, 120, 80, alpha))
        
    img = Image.alpha_composite(img, glow)
    draw = ImageDraw.Draw(img)
    
    # 3. Ultra-subtle geometric grid lines on dedicated alpha layer
    grid_layer = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    grid_draw = ImageDraw.Draw(grid_layer)
    grid_color = (255, 255, 255, 14)
    for x in range(0, WIDTH, 60):
        grid_draw.line([(x, 0), (x, HEIGHT)], fill=grid_color, width=1)
    for y in range(0, HEIGHT, 60):
        grid_draw.line([(0, y), (WIDTH, y)], fill=grid_color, width=1)
    # Subtle inner architectural frame
    grid_draw.rounded_rectangle([20, 20, WIDTH - 20, HEIGHT - 20], radius=24, outline=(255, 255, 255, 28), width=1)

    img = Image.alpha_composite(img, grid_layer)
    draw = ImageDraw.Draw(img)

    # 4. Fonts
    font_bold_path = "C:/Windows/Fonts/arialbd.ttf"
    font_reg_path = "C:/Windows/Fonts/arial.ttf"
    
    if not os.path.exists(font_bold_path):
        font_bold_path = "C:/Windows/Fonts/segoeuib.ttf"
    if not os.path.exists(font_reg_path):
        font_reg_path = "C:/Windows/Fonts/segoeui.ttf"
        
    font_super = ImageFont.truetype(font_bold_path, 60)
    font_title = ImageFont.truetype(font_bold_path, 21)
    font_sub = ImageFont.truetype(font_reg_path, 18)
    font_mono = ImageFont.truetype(font_bold_path, 11)
    font_tag = ImageFont.truetype(font_bold_path, 12)

    # 5. Left Column Content
    x_start = 70
    
    # Category badge
    badge_x = x_start
    badge_y = 65
    draw.rounded_rectangle([badge_x, badge_y, badge_x + 375, badge_y + 32], radius=16, fill=(15, 18, 24, 230), outline=(255, 255, 255, 25), width=1)
    draw.ellipse([badge_x + 12, badge_y + 11, badge_x + 22, badge_y + 21], fill=(16, 185, 129, 255)) # Emerald pulse
    draw.text((badge_x + 30, badge_y + 9), "COMPUTER SCIENCE (AI & ML) · PCCOE PUNE", font=font_mono, fill=(225, 224, 204, 255))
    
    # Large Name
    draw.text((x_start, 120), "MADHAV ZANWAR", font=font_super, fill=(255, 255, 255, 255))
    
    # Headline Title
    draw.text((x_start, 202), "AI & Machine Learning Engineer", font=font_title, fill=(56, 189, 248, 255))
    
    # Narrative sentence
    desc_line1 = "Building real-time neural networks, computer vision systems,"
    desc_line2 = "and production software with 350+ LeetCode DSA solutions."
    draw.text((x_start, 242), desc_line1, font=font_sub, fill=(190, 195, 205, 255))
    draw.text((x_start, 268), desc_line2, font=font_sub, fill=(190, 195, 205, 255))
    
    # Credential Badges Row (with crisp white text and colored indicator dots)
    pills = [
        ("350+ LeetCode DSA", (255, 161, 22), (30, 24, 15, 230)),
        ("Stanford ML Specialization", (56, 189, 248), (15, 25, 35, 230)),
        ("GDGC CP Lead", (16, 185, 129), (15, 30, 22, 230)),
        ("GSSoC Contributor", (236, 72, 153), (30, 18, 25, 230))
    ]
    
    pill_y = 325
    curr_x = x_start
    for label, dot_color, bg_color in pills:
        bbox = draw.textbbox((0, 0), label, font=font_tag)
        text_w = bbox[2] - bbox[0]
        pill_w = text_w + 34
        if curr_x + pill_w > 620:
            curr_x = x_start
            pill_y += 38
        draw.rounded_rectangle([curr_x, pill_y, curr_x + pill_w, pill_y + 28], radius=14, fill=bg_color, outline=(255, 255, 255, 25), width=1)
        # Colored dot
        draw.ellipse([curr_x + 10, pill_y + 10, curr_x + 18, pill_y + 18], fill=dot_color)
        draw.text((curr_x + 24, pill_y + 7), label, font=font_tag, fill=(245, 245, 245, 255))
        curr_x += pill_w + 10

    # Footer Metadata
    draw.line([(x_start, 530), (x_start + 480, 530)], fill=(255, 255, 255, 20), width=1)
    draw.text((x_start, 546), "PORTFOLIO & WORK", font=font_mono, fill=(140, 145, 155, 255))
    draw.text((x_start + 180, 546), "madhavzanwar.me", font=font_mono, fill=(245, 244, 235, 255))
    draw.text((x_start + 330, 546), "github.com/madhavzanwar", font=font_mono, fill=(160, 165, 175, 255))

    # 6. Right Column: Layered 3D Showcase Cards
    card_w, card_h = 440, 245
    
    # Load project images
    quicksketch_path = "public/images/projects/quicksketch.jpg"
    placement_path = "public/images/projects/placement.jpg"
    
    # Background Card (Placement AI)
    if os.path.exists(placement_path):
        bg_card = Image.open(placement_path).convert("RGBA")
        bg_card = bg_card.resize((card_w, card_h), Image.Resampling.LANCZOS)
        
        # Rounded corners for bg_card
        mask = Image.new("L", (card_w, card_h), 0)
        mask_draw = ImageDraw.Draw(mask)
        mask_draw.rounded_rectangle([0, 0, card_w, card_h], radius=18, fill=255)
        
        # Dark overlay on background card to create depth
        dark_dim = Image.new("RGBA", (card_w, card_h), (0, 0, 0, 100))
        bg_card = Image.alpha_composite(bg_card, dark_dim)
        
        # Paste angled/offset background card
        img.paste(bg_card, (700, 100), mask)
        draw.rounded_rectangle([700, 100, 700 + card_w, 100 + card_h], radius=18, outline=(255, 255, 255, 40), width=1)
        
        # Tiny badge on card
        draw.rounded_rectangle([715, 115, 830, 137], radius=10, fill=(0, 0, 0, 200), outline=(255, 255, 255, 30), width=1)
        draw.text((725, 120), "Placement AI", font=font_tag, fill=(255, 255, 255, 255))

    # Foreground Card (QuickSketch)
    if os.path.exists(quicksketch_path):
        fg_card = Image.open(quicksketch_path).convert("RGBA")
        fg_card = fg_card.resize((card_w, card_h), Image.Resampling.LANCZOS)
        
        # Shadow for fg_card
        shadow = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
        shadow_draw = ImageDraw.Draw(shadow)
        shadow_draw.rounded_rectangle([660, 280, 660 + card_w, 280 + card_h], radius=22, fill=(0, 0, 0, 220))
        shadow = shadow.filter(ImageFilter.GaussianBlur(18))
        img = Image.alpha_composite(img, shadow)
        
        # Paste foreground card
        fg_mask = Image.new("L", (card_w, card_h), 0)
        fg_mask_draw = ImageDraw.Draw(fg_mask)
        fg_mask_draw.rounded_rectangle([0, 0, card_w, card_h], radius=18, fill=255)
        
        draw = ImageDraw.Draw(img) # Re-obtain draw after composite
        img.paste(fg_card, (650, 270), fg_mask)
        draw.rounded_rectangle([650, 270, 650 + card_w, 270 + card_h], radius=18, outline=(255, 255, 255, 60), width=2)
        
        # Floating badge on foreground card
        draw.rounded_rectangle([665, 285, 830, 310], radius=12, fill=(0, 0, 0, 220), outline=(255, 255, 255, 40), width=1)
        draw.text((678, 292), "QuickSketch · 95.6% CNN", font=font_tag, fill=(255, 255, 255, 255))

    # Save to public/images/og-preview.png and dist/images/og-preview.png
    os.makedirs("public/images", exist_ok=True)
    os.makedirs("dist/images", exist_ok=True)
    
    img_rgb = img.convert("RGB")
    img_rgb.save("public/images/og-preview.png", "PNG", quality=95)
    img_rgb.save("dist/images/og-preview.png", "PNG", quality=95)
    print("Successfully generated 1200x630 Open Graph preview banner at public/images/og-preview.png!")

if __name__ == "__main__":
    create_og_banner()
