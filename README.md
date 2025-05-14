# React Native Currency Converter

## How to Run the Application Locally

1. **Clone the repository:**

   ```sh
   git clone <your-repo-url>
   cd <your-repo-folder>
   ```

2. **Install dependencies:**

   ```sh
   yarn install
   # or
   npm install
   ```

3. **Install iOS pods (for Mac/iOS):**

   ```sh
   cd ios && pod install && cd ..
   ```

4. **Start the Metro bundler:**

   ```sh
   yarn start
   # or
   npm start
   ```

5. **Run the app:**
   - For iOS:
     ```sh
     yarn ios
     # or
     npx react-native run-ios
     ```
   - For Android:
     ```sh
     yarn android
     # or
     npx react-native run-android
     ```

---

## App Architecture & Libraries

### Architecture

- **React Native CLI** with **TypeScript** for type safety and maintainability.
- **Redux Toolkit** for state management (exchange rates, selected currencies, amount, etc.).
- **redux-persist** to cache the latest exchange rates for offline use.
- **react-navigation** for screen navigation (stack navigator).
- **axios** for API requests to [vatcomply.com](https://www.vatcomply.com/documentation#rates-latest).
- **react-native-safe-area-context** for safe area handling on iOS/Android.
- **Component-based structure**: Each UI element (input, selector, swap button) is in its own folder with separate style files for maintainability.

### Main Third-Party Libraries

- `@reduxjs/toolkit`, `react-redux`, `redux-persist`: State management and persistence.
- `@react-navigation/native`, `@react-navigation/native-stack`: Navigation between screens.
- `axios`: HTTP client for fetching exchange rates.
- `@react-native-async-storage/async-storage`: Storage for redux-persist.
- `react-native-safe-area-context`: Handles device safe areas.

### Features

- Real-time currency conversion using the latest rates from vatcomply.com.
- Offline support with last known rates.
- Searchable, scrollable currency selection with country flags and names.
- Responsive, modern UI matching the provided design.
- Error handling and user-friendly messages.

---

Feel free to reach out if you have any questions or need further setup help!
