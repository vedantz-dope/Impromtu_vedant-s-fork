import cv2

image = cv2.imread('C:\\Users\\ASUS\\Desktop\\Impromptu\\Impromptu\\OPCV\\Dataset\\Image1.jpg')
cv2.imshow('Image01', image)
intensityArr = []

height, width, channels = image.shape
for y in range(height):
    for x in range(width):
        intensity = image[y, x]
        intensityArr.append(intensity)
print(intensityArr)
cv2.waitKey(0)
