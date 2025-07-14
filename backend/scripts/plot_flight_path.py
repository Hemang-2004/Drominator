"""
Plot flight path from telemetry.
"""
import matplotlib.pyplot as plt
from data.telemetry_parser import parse_line

def plot_path(logfile="flight_data.csv"):
    # Placeholder plot
    plt.title("Flight Path")
    plt.show()

if __name__ == "__main__":
    plot_path()
