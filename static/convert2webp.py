import os
import sys
from PIL import Image

def convert_to_webp(input_file, output_file, quality=80):
    try:
        with Image.open(input_file) as im:
            im.save(output_file, "webp", quality=quality)
        print(f"Converted: {input_file} => {output_file}")
    except Exception as e:
        print(f"Error converting file: {input_file}")
        print(str(e))

def process_folder(folder_path):
    for root, dirs, files in os.walk(folder_path):
        for filename in files:
            if any(filename.lower().endswith(ext) for ext in ['.jpg', '.jpeg', '.png']):
                input_file = os.path.join(root, filename)
                output_file = os.path.splitext(input_file)[0] + ".webp"
                convert_to_webp(input_file, output_file)

if __name__ == "__main__":
    folder_path = os.path.dirname('./')
    process_folder(folder_path)