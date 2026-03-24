"""
Tool for resizing images
"""

import os
from PIL import Image

def process_images(directory, max_size=1920):
    if not os.path.isdir(directory):
        raise ValueError(f"Directory not found: {directory}")

    output_dir = os.path.join(directory, "processed")
    os.makedirs(output_dir, exist_ok=True)

    valid_exts = {".jpg", ".jpeg", ".png", ".bmp", ".tiff", ".webp"}

    image_files = [
        f for f in os.listdir(directory)
        if os.path.splitext(f)[1].lower() in valid_exts
    ]
    image_files.sort()

    existing_nums = {
        int(os.path.splitext(f)[0])
        for f in os.listdir(output_dir)
        if f.split(".")[0].isdigit()
    }

    counter = 1
    processed_count = 0

    for filename in image_files:
        src_path = os.path.join(directory, filename)
        if not os.path.isfile(src_path):
            continue

        while counter in existing_nums:
            counter += 1

        dst_path = os.path.join(output_dir, f"{counter}.jpg")

        try:
            with Image.open(src_path) as img:
                img = img.convert("RGB")

                img.thumbnail((max_size, max_size))

                img.save(dst_path, "JPEG", quality=90, optimize=True)

            processed_count += 1
            existing_nums.add(counter)
            counter += 1
            print(f"✅ Saved {os.path.basename(dst_path)}")

        except Exception as e:
            print(f"⚠️ Skipping {filename} (error: {e})")

    print(f"\nDone! Processed {processed_count}/{len(image_files)} images into '{output_dir}'")

process_images("../public/imgs/")
