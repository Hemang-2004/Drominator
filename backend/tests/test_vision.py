import pytest
from vision.object_detection import detect_objects

def test_detect_objects():
    assert detect_objects(None) == []
