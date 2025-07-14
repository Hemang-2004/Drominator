"""
Waypoint navigation module.
"""
class Navigation:
    def __init__(self):
        self.waypoints = []

    def add_waypoint(self, lat, lon, alt):
        self.waypoints.append((lat, lon, alt))
