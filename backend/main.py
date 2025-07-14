"""
Main entry point for the drone project.
"""
import yaml
from drone_control.controller import DroneController

def load_config(path="config.yaml"):
    with open(path) as f:
        return yaml.safe_load(f)

def main():
    config = load_config()
    controller = DroneController(config["drone"])
    controller.start_mission()

if __name__ == "__main__":
    main()
