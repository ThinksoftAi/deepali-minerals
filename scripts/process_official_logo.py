#!/usr/bin/env python3
import os
import subprocess

source = "public/assets/aistudio/Logo_DM_GG_7d017d38.png"

# 1. First, verify source exists
if not os.path.exists(source):
    raise FileNotFoundError(f"Source not found: {source}")

# Artwork bounding box: 765x449 at +265+131
# Let's add 40px clean uniform padding around the artwork:
# X: 265 - 40 = 225
# Y: 131 - 40 = 91
# W: 765 + 80 = 845
# H: 449 + 80 = 529

# Create standard framed official logo with balanced white margins
subprocess.run([
    'convert', source,
    '-crop', '845x529+225+91',
    '+repage',
    '-quality', '100',
    '/tmp/official_logo_framed.png'
], check=True)

# Also create the transparent version of the exact artwork
subprocess.run([
    'convert', '/tmp/official_logo_framed.png',
    '-fuzz', '4%',
    '-transparent', '#FFFFFF',
    '/tmp/official_logo_transparent.png'
], check=True)

# Also create the full uncropped source copy for reference
subprocess.run(['cp', source, '/tmp/official_logo_full.png'], check=True)

# Destination paths to update with the new official logo
destinations = [
    'assets/images/brand/logo.png',
    'public/assets/images/brand/logo.png',
    'assets/images/logo.png',
    'public/assets/images/logo.png',
    'assets/images/logo-white-bg.png',
    'public/assets/images/logo-white-bg.png',
    'Glossy Deepali Minerals Logo(1).png',
    'public/Glossy Deepali Minerals Logo(1).png',
    'assets/images/brand/Glossy Deepali Minerals Logo(1).png',
    'public/assets/images/brand/Glossy Deepali Minerals Logo(1).png',
]

for dest in destinations:
    os.makedirs(os.path.dirname(dest) if os.path.dirname(dest) else '.', exist_ok=True)
    subprocess.run(['cp', '/tmp/official_logo_framed.png', dest], check=True)
    print(f"Updated {dest}")

# Also write JPEG versions where expected
jpg_dests = [
    'assets/images/brand/logo.jpg',
    'public/assets/images/brand/logo.jpg',
    'assets/images/logo.jpg',
    'public/assets/images/logo.jpg',
]
for dest in jpg_dests:
    subprocess.run(['convert', '/tmp/official_logo_framed.png', '-quality', '96', dest], check=True)
    print(f"Updated {dest}")

# Save the transparent version as well
subprocess.run(['cp', '/tmp/official_logo_transparent.png', 'assets/images/brand/logo-transparent.png'], check=True)
subprocess.run(['cp', '/tmp/official_logo_transparent.png', 'public/assets/images/brand/logo-transparent.png'], check=True)

# 2. CREATE THE OFFICIAL FAVICON AS REQUESTED IN SECTION 5
# "Use a suitable square crop of the DM symbol only if necessary, keeping the main letters recognisable.
# Do not use the entire wide logo in a tiny favicon if it becomes unreadable."
# In the original 1248x832 image:
# The DM monogram and molecule symbol spans:
# Left ~ 265, Right ~ 1030, Top ~ 131, Bottom ~ 490 (above DEEPALI MINERALS text)
# Center of DM mark + molecule: X ~ 620, Y ~ 310
# A 520x520 square crop centered at (620, 310):
# X_start = 620 - 260 = 360
# Y_start = 310 - 260 = 50
subprocess.run([
    'convert', source,
    '-crop', '700x520+310+70',
    '+repage',
    '-background', 'white',
    '-gravity', 'center',
    '-extent', '600x600',
    '-resize', '512x512',
    '/tmp/favicon-512.png'
], check=True)

# Generate multi-size favicon formats
favicon_outputs = [
    ('public/favicon.ico', '32x32'),
    ('public/favicon-32x32.png', '32x32'),
    ('public/favicon-16x16.png', '16x16'),
    ('public/apple-touch-icon.png', '180x180'),
    ('public/favicon-512x512.png', '512x512'),
    ('assets/favicon.ico', '32x32'),
    ('assets/favicon-32x32.png', '32x32'),
    ('assets/apple-touch-icon.png', '180x180'),
]

for out_path, size in favicon_outputs:
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    subprocess.run(['convert', '/tmp/favicon-512.png', '-resize', size, out_path], check=True)
    print(f"Generated {out_path} ({size})")

print("All official logo and favicon assets generated successfully!")
