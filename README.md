# DroneSense.AI - Drone Delivery Prediction System 🚀

## Project Overview

DroneSense.AI is an advanced analytics and prediction system designed to optimize drone delivery operations for large-scale logistics, specifically tailored for companies like Walmart. It allows users to configure various parameters, analyze delivery feasibility, predict profitability, and visualize optimal routes on an interactive map.

## Key Features ✨

* **User Authentication** 🔐: Secure sign-in and sign-up process for employees.
* **Dashboard for Parameter Configuration** 📊

  * Select a target city (e.g., Mumbai, Bangalore, New Delhi).
  * Adjust demographic parameters: population range, literacy level, elevation height.
  * Configure operational parameters: weather conditions, drone type, payload weight, and no-fly zones.
* **Interactive Map Visualization** 🗺️

  * Integrates Google Maps to display warehouse and destination locations.
  * Visualizes drone routes (straight lines) or bike routes (road paths) based on analysis.
  * Highlights no-fly zones and adapts path coloring accordingly.
  * Dynamically re-centers the map based on the selected city.
* **Comprehensive Route Analysis** 📈

  * Determines route feasibility and suggests the optimal delivery method (drone-only, bike-only, or mixed).
  * Provides distance and estimated time via Google Maps Directions API.
  * Predicts profitability (Profitable, Break-even, Loss) based on distance and no-fly zones.
  * Assesses risk levels (Low, Medium, High) considering various factors.
  * Displays drone specifications and potential order loads for the route.
  * Includes hardcoded no-fly zone logic for specific city/route combinations.
* **Responsive User Interface** 📱: Works seamlessly across screen sizes.
* **Custom Fonts** ✒️: Uses "Syabil" and "Rubik" for distinct visual appeal.
* **Loading Animations** ⏳: Provides feedback during route analysis and map loading.
* **Error Handling** ⚠️: Handles Google Maps API errors, including `NOT_FOUND` and `InvalidKeyMapError`.

## Technologies Used 🛠️

* **Next.js** (v14+): React framework (App Router).
* **React**: UI library.
* **Tailwind CSS**: Utility-first CSS framework.
* **shadcn/ui**: Radix UI + Tailwind components.
* **Lucide React**: Open-source icons.
* **Google Maps JavaScript API**: Interactive maps, autocomplete, directions.

## Getting Started 🏁

### Prerequisites ✅

* Node.js (v18+)
* npm or Yarn
* Google Cloud Project with APIs enabled:

  * Maps JavaScript API
  * Places API
  * Directions API

### Installation ⬇️

1. **Clone the repository (skip if you already have files):**

   ```bash
   git clone <your-repo-url>
   cd drominator-system
   ```
2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```
3. **Configure environment variables:**

   * Create a `.env.local` in the project root:

     ```
     NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
     ```
   * Replace `YOUR_GOOGLE_MAPS_API_KEY` with your actual key. Ensure the required APIs are enabled.

### Running the Development Server 💻

```bash
npm run dev
yarn dev
```

Visit `http://localhost:3000` to view the app.

### Building for Production 📦

```bash
npm run build
yarn build
```

Start the production server:

```bash
npm start
yarn start
```

## Usage 💡

1. **Sign In / Sign Up**: Go to `/auth`.
2. **Configure Parameters**: On `/dashboard`, select city and adjust settings.
3. **Analyze Route**: In `/dashboard/map`, enter origin and destination, then click **Analyze Route**.
4. **Review Analysis**: See distance, time, profitability, risk, and recommended delivery method.

## Troubleshooting 🐛

### InvalidKeyMapError

* Verify `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` in `.env.local`.
* Ensure Maps JS API, Places API, and Directions API are enabled.
* Check key restrictions (e.g., HTTP referrers).

### DIRECTIONS\_ROUTE: NOT\_FOUND

* Check browser console for origin/destination values.
* Confirm addresses are valid in Google Maps.
* Use full addresses (street, city, state, country).

### Missing CSS / Animations

1. Delete `.next` folder.
2. Clear cache:

   ```bash
   npm cache clean --force
   ```

yarn cache clean

```
3. Reinstall dependencies.
4. Restart the server.

### Blank Map / Infinite Loading
- Check console for JS errors.
- Verify Google Maps script is loading (Network tab).
- Ensure stable internet connection.

## Contributing 🤝

Contributions are welcome! Please open issues or pull requests.

## License 📄

This project is licensed under MIT. See [LICENSE](https://opensource.org/licenses/MIT) for details.

```
