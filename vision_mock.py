import torch
from torchvision import models, transforms
from PIL import Image

model = models.resnet50(pretrained=True)
model.eval()

preprocess = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],  # Standard ImageNet mean
        std=[0.229, 0.224, 0.225]    # Standard ImageNet std
    )
])

def classify_image(image_path):
    image = Image.open(image_path).convert("RGB")
    input_tensor = preprocess(image)
    input_batch = input_tensor.unsqueeze(0)  # Add batch dimension

    with torch.no_grad():
        output = model(input_batch)

    _, predicted_idx = torch.max(output, 1)

    from urllib.request import urlopen
    import json
    labels_url = "https://raw.githubusercontent.com/pytorch/hub/master/imagenet_classes.txt"
    labels = urlopen(labels_url).read().decode().splitlines()

    return labels[predicted_idx.item()]

image_path = "panda.webp"  # Replace with your image file path
result = classify_image(image_path)
print(f"Image: {image_path} → Classification: {result}")