"""
IMU sensor interface.
"""
def read_imu():
    # Return dummy accelerometer/gyro data
    return {"accel": (0,0,9.8), "gyro": (0,0,0)}
