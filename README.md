# Drominator - Drone Delivery Prediction System 🚀

## Project Overview

Drominator is an advanced analytics and prediction system designed to optimize drone delivery operations for large-scale logistics, specifically tailored for companies like Walmart. It allows users to configure various parameters, analyze drone delivery feasibility, predict profitability, and visualize optimal routes on an interactive map.

## Key Features ✨

*   **User Authentication** 🔐: Secure sign-in and sign-up process for employees.
*   **Dashboard for Parameter Configuration** 📊:
    *   Select a target city (e.g., Mumbai, Bangalore, New Delhi).
    *   Adjust demographic parameters like population range, literacy level, and elevation height.
    *   Configure operational parameters including weather conditions, drone type, payload weight, and define no-fly zones.
*   **Interactive Map Visualization** 🗺️:
    *   Integrates with Google Maps to display warehouse and destination locations.
    *   Visualizes drone routes (straight line) or bike routes (curved road path) based on analysis.
    *   Highlights no-fly zones and adjusts path color accordingly.
    *   Dynamically re-centers the map based on the selected city.
*   **Comprehensive Route Analysis** 📈:
    *   Determines route feasibility and suggests the optimal delivery method (drone-only, bike-only, or mixed).
    *   Provides actual distance and estimated time for delivery using Google Maps Directions API.
    *   Predicts profitability (Profitable, Break-even, Loss) based on distance and no-fly zone detection.
    *   Assesses risk levels (Low, Medium, High) considering various factors.
    *   Displays drone specifications and potential orders for the route.
    *   Includes hardcoded no-fly zone logic for specific city/route combinations (e.g., Mumbai, Bangalore).
*   **Responsive User Interface** 📱: Designed to work seamlessly across various screen sizes.
*   **Custom Fonts** ✒️: Utilizes "Syabil" and "Rubik" fonts for a distinct visual appeal.
*   **Loading Animations** ⏳: Provides visual feedback during route analysis and map loading.
*   **Error Handling** ⚠️: Gracefully handles Google Maps API errors, including `NOT_FOUND` for routes and `InvalidKeyMapError` for API key issues.

## Technologies Used 🛠️

*   **Next.js 14+**: React framework for production (App Router).
*   **React**: JavaScript library for building user interfaces.
*   **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
*   **shadcn/ui**: Reusable UI components built with Radix UI and Tailwind CSS.
*   **Lucide React**: A collection of beautiful open-source icons.
*   **Google Maps JavaScript API**: For interactive maps, place autocomplete, and directions services.

## Getting Started 🏁

Follow these instructions to set up and run the project locally.

### Prerequisites ✅

*   Node.js (v18.x or higher)
*   npm or Yarn
*   A Google Cloud Project with the following APIs enabled:
    *   Maps JavaScript API
    *   Places API
    *   Directions API

### Installation ⬇️

1.  **Clone the repository (if applicable):**
    \`\`\`bash
    git clone <your-repository-url>
    cd drominator-system
    \`\`\`
    *(Note: If you received this project directly from v0, you can skip this step and proceed with the provided files.)*

2.  **Install dependencies:**
    \`\`\`bash
    npm install
    # OR
    yarn install
    \`\`\`

3.  **Configure Environment Variables** 🔑:
    Create a `.env.local` file in the root of your project and add your Google Maps API key:
    \`\`\`
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
    \`\`\`
    **Important**: Replace `YOUR_GOOGLE_MAPS_API_KEY` with your actual API key from Google Cloud Console. Ensure the key has access to the Maps JavaScript API, Places API, and Directions API.

### Running the Development Server 💻

To run the application in development mode:

\`\`\`bash
npm run dev
# OR
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production 📦

To build the application for production:

\`\`\`bash
npm run build
# OR
yarn build
\`\`\`

To start the production server:

\`\`\`bash
npm start
# OR
yarn start
\`\`\`

## Usage 💡

1.  **Sign In/Sign Up**: Navigate to `/auth` to sign in or create an account.
2.  **Configure Parameters**: On the dashboard (`/dashboard`), select a city and configure various demographic and operational parameters.
3.  **Analyze Route**: Navigate to the map page (`/dashboard/map`). Enter a warehouse location and a destination. Click "Analyze Route" to see the predicted feasibility, delivery method, and route visualization on the map.
4.  **Review Analysis**: The analysis card will display detailed information about the route, including distance, estimated time, profitability, and risk level.

## Troubleshooting 🐛

*   **`InvalidKeyMapError`**: This error indicates an issue with your Google Maps API key.
    *   Ensure `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is correctly set in your `.env.local` file.
    *   Verify that the API key is valid and has the necessary APIs enabled (Maps JavaScript API, Places API, Directions API) in your Google Cloud Console.
    *   Check for any API key restrictions (e.g., HTTP referrers) that might be preventing access from `localhost`.
*   **`DIRECTIONS_ROUTE: NOT_FOUND`**: This means Google Maps could not find a route between the specified origin and destination.
    *   **Check your browser's developer console (F12 -> Console tab)** after attempting to analyze a route. Look for logs like "Directions Request - Origin:" and "Directions Request - Destination:" to see the exact addresses being sent to Google.
    *   Ensure the addresses you enter are complete, accurate, and recognizable by Google Maps. Try searching for them directly on maps.google.com to confirm their validity.
    *   Try using more precise addresses (e.g., including street numbers, city, state, country).
    *   If the issue persists, consider if there's genuinely no drivable route between the points or if the locations are too obscure for Google Maps to resolve.
*   **CSS/Animations Not Loading**: If styles or animations are missing, it might be a caching issue or a PostCSS/TailwindCSS configuration problem.
    *   Delete the `.next` folder in your project root.
    *   Clear your npm/yarn cache: \`\`\`bash
        npm cache clean --force
        # OR
        yarn cache clean
        \`\`\`
    *   Reinstall dependencies: \`\`\`bash
        npm install
        # OR
        yarn install
        \`\`\`
    *   Restart the development server.
*   **"Loading forever" / Blank Map**:
    *   Check your browser's developer console for any JavaScript errors related to Google Maps.
    *   Ensure your internet connection is stable.
    *   Verify that the Google Maps script is loading correctly (check network tab in dev tools).

## Contributing 🤝

*(If this were an open-source project, you would include guidelines for contributions here.)*

## License 📄

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/licenses/MIT) file for details.
