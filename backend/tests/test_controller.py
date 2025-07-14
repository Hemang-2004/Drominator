import pytest
from drone_control.controller import DroneController

def test_controller_init():
    params = {"max_altitude": 50, "max_speed": 2}
    ctrl = DroneController(params)
    assert ctrl.max_altitude == 50
