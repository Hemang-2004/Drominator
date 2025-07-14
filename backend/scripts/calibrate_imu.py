"""
Script to calibrate IMU.
"""
from sensors.imu import read_imu

def calibrate():
    data = read_imu()
    print("Calibration data:", data)

if __name__ == "__main__":
    calibrate()
