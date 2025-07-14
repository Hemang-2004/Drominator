"""
Stream live video from the drone.
"""
from sensors.camera import capture_image

def stream():
    while True:
        frame = capture_image()
        # display or transmit frame

if __name__ == "__main__":
    stream()
