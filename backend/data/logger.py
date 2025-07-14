"""
Logs telemetry and data.
"""
def log(data, filename="flight_data.csv"):
    with open(filename, "a") as f:
        f.write(str(data) + "\n")
