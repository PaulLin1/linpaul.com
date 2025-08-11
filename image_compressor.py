"""
Quick script i generated in chatgpt to compress my wallpapers
"""

from PIL import Image
import os

def compress_images(input_folder, output_folder, target_width=1920, target_height=1080, quality=85):
    """
    Compress and resize images from input_folder and save to output_folder.
    Images are resized to fit within target dimensions maintaining aspect ratio,
    saved as JPEG with given quality.
    """
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    for filename in os.listdir(input_folder):
        if filename.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
            input_path = os.path.join(input_folder, filename)
            output_path = os.path.join(output_folder, os.path.splitext(filename)[0] + '.jpg')  # convert all to jpg
            
            with Image.open(input_path) as img:
                # Handle transparency by pasting on white background if needed
                if img.mode in ("RGBA", "LA") or (img.mode == "P" and 'transparency' in img.info):
                    background = Image.new("RGB", img.size, (255, 255, 255))
                    background.paste(img, mask=img.split()[3])  # alpha channel
                    img = background
                else:
                    img = img.convert("RGB")
                
                # Resize while maintaining aspect ratio
                img.thumbnail((target_width, target_height), Image.Resampling.LANCZOS)
                
                # Save as JPEG with compression
                img.save(output_path, "JPEG", quality=quality, optimize=True)
                
                print(f"Compressed and saved: {output_path}")

# Example usage:
compress_images("./", "./")
