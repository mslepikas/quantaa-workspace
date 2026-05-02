#!/usr/bin/env python3
"""Generate a Nonaym.ai logo using Pillow — clean, crisp version."""

from PIL import Image, ImageDraw, ImageFont
import math

# --- Configuration ---
WIDTH = 1024
HEIGHT = 1024
BG_COLOR = (255, 255, 255)

PRIMARY = (15, 23, 42)   # dark navy
ACCENT  = (6, 182, 212)  # teal/cyan
GRAY    = (100, 116, 139)
WHITE   = (255, 255, 255)


# Font setup — use fixed-weight fonts that Pillow handles reliably
FONT_TITLES = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"   # 80px
FONT_SUB    = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"   # 44px
FONT_TAG    = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"         # 24px


def shield_outline_points(cx, cy, r):
    pts = []
    # Top
    pts.append((cx, cy - r))
    # Right half
    for i in range(1, 11):
        frac = i / 10
        angle = math.pi / 2 + (math.pi / 2) * frac
        x = cx + r * 0.85 * math.cos(angle)
        y = cy - r * 0.25 + r * 0.75 * math.sin(angle)
        pts.append((x, y))
    # Bottom tip
    pts.append((cx, cy + r * 0.65))
    # Left half (reverse)
    for i in range(1, 11):
        frac = i / 10
        angle = math.pi / 2 - (math.pi / 2) * frac
        x = cx + r * 0.85 * math.cos(angle)
        y = cy - r * 0.25 + r * 0.75 * math.sin(angle)
        pts.append((x, y))
    return pts


def create_logo():
    img = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)

    # Load fonts
    try:
        title_font = ImageFont.truetype(FONT_TITLES, 80)
        sub_font = ImageFont.truetype(FONT_SUB, 44)
        tag_font = ImageFont.truetype(FONT_TAG, 24)
    except:
        print("WARNING: Could not load fonts, using defaults")
        title_font = sub_font = tag_font = ImageFont.load_default()

    cx = WIDTH // 2
    icon_cy = HEIGHT // 2 - 40

    # === Draw Shield Icon ===
    # Outer shield (dark navy outline)
    outer_r = 170
    outer_pts = shield_outline_points(cx, icon_cy, outer_r)
    draw.line(outer_pts + [outer_pts[0]], fill=PRIMARY, width=5)

    # Middle shield (accent outline, slightly smaller)
    mid_r = 145
    mid_pts = shield_outline_points(cx, icon_cy, mid_r)
    draw.line(mid_pts + [mid_pts[0]], fill=ACCENT, width=3)

    # Inner shield (accent filled)
    inner_r = 135
    inner_pts = shield_outline_points(cx, icon_cy, inner_r)
    draw.polygon(inner_pts, fill=ACCENT)

    # DNS arrow inside (white, pointing up)
    arrow_cx = cx
    arrow_top = icon_cy - inner_r * 0.5
    arrow_bot = icon_cy + inner_r * 0.1
    head_w = inner_r * 0.3

    # Shaft
    draw.line([(arrow_cx, arrow_top), (arrow_cx, arrow_bot)], fill=WHITE, width=7)
    # Arrowhead
    head_pts = [
        (arrow_cx - head_w, arrow_bot - head_w * 0.5),
        (arrow_cx, arrow_bot),
        (arrow_cx + head_w, arrow_bot - head_w * 0.5),
    ]
    draw.polygon(head_pts, fill=WHITE)

    # Small network dots
    dot_positions = [
        (cx, icon_cy - outer_r * 0.65),
        (cx - outer_r * 0.42, icon_cy + 8),
        (cx + outer_r * 0.42, icon_cy + 8),
    ]
    for dx, dy in dot_positions:
        draw.ellipse([(dx-5, dy-5), (dx+5, dy+5)], fill=ACCENT)

    # === Text ===
    title_text = "nonaym"
    subtitle_text = ".ai"
    tagline_text = "Privacy-First DNS. Built for your network."

    # Measure title
    title_bbox = draw.textbbox((0, 0), title_text, font=title_font)
    title_w = title_bbox[2] - title_bbox[0]
    title_x = (WIDTH - title_w) // 2
    title_y = icon_cy + outer_r + 50

    # Measure subtitle
    sub_bbox = draw.textbbox((0, 0), subtitle_text, font=sub_font)
    sub_w = sub_bbox[2] - sub_bbox[0]
    sub_x = (WIDTH - title_w - sub_w) // 2
    sub_y = title_y + 70

    # Measure tagline
    tag_bbox = draw.textbbox((0, 0), tagline_text, font=tag_font)
    tag_w = tag_bbox[2] - tag_bbox[0]
    tag_x = (WIDTH - tag_w) // 2
    tag_y = sub_y + 55

    # Draw
    draw.text((title_x, title_y), title_text, fill=PRIMARY, font=title_font)
    draw.text((sub_x, sub_y), subtitle_text, fill=ACCENT, font=sub_font)
    draw.text((tag_x, tag_y), tagline_text, fill=GRAY, font=tag_font)

    # Print diagnostics
    print(f"Title: '{title_text}' at ({title_x}, {title_y}), w={title_w}")
    print(f"Subtitle: '{subtitle_text}' at ({sub_x}, {sub_y}), w={sub_w}")
    print(f"Tagline: '{tagline_text}' at ({tag_x}, {tag_y}), w={tag_w}")

    # Save
    img.save("/home/mslepikas/.openclaw/workspace/websites/nonaym-ai/logo.png", "PNG")
    print("✓ logo.png saved")

    # Favicon
    favicon = img.resize((32, 32), Image.LANCZOS)
    favicon.save("/home/mslepikas/.openclaw/workspace/websites/nonaym-ai/favicon.png", "PNG")
    print("✓ favicon.png saved")

    # App icon (icon + text area)
    crop_top = max(0, icon_cy - outer_r - 20)
    crop_bot = min(HEIGHT, tag_y + 50)
    crop_left = max(0, cx - 260)
    crop_right = min(WIDTH, cx + 260)
    app_icon = img.crop((crop_left, crop_top, crop_right, crop_bot))
    app_icon.save("/home/mslepikas/.openclaw/workspace/websites/nonaym-ai/app-icon.png", "PNG")
    print(f"✓ app-icon.png saved ({app_icon.size})")


if __name__ == "__main__":
    create_logo()
