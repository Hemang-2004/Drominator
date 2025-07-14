import pytest
from sensors.imu import read_imu

def test_read_imu():
    data = read_imu()
    assert "accel" in data
