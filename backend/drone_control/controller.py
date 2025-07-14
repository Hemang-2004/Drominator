"""
PID-based drone controller.
"""
class DroneController:
    def __init__(self, params):
        self.max_altitude = params.get("max_altitude", 100)
        self.max_speed = params.get("max_speed", 5)

    def start_mission(self):
        print(f"Starting mission with max altitude {self.max_altitude}m and speed {self.max_speed}m/s")
