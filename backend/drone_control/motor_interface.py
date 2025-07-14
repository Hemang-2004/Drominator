"""
Interface to control the drone's motors.
"""
class MotorInterface:
    def set_throttle(self, motor_id, value):
        print(f"Setting throttle of motor {motor_id} to {value}")
