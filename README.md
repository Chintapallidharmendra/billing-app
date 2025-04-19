# Mayuri Billing App 🧾

A simple billing and inventory management application built with Expo and React Native.

## Features

- Product management
- Shopping cart functionality
- Bill generation
- Offline storage with SQLite
- Clean and simple UI

## Getting Started

1. Install dependencies
   ```bash
   npm install
   ```

2. Start the development server
   ```bash
   npx expo start
   ```

3. Run on your device:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app for physical device

## Project Structure

```
billing-app/
├── app/
│   ├── _layout.tsx      # Main navigation setup
│   ├── index.tsx        # Home screen
│   ├── products.tsx     # Products management
│   └── cart.tsx         # Shopping cart
├── lib/
│   └── database.ts      # SQLite operations
└── types/
    └── types.ts         # TypeScript definitions
```

## Development

- Edit files in the `app` directory to modify screens
- Database operations are handled in `lib/database.ts`
- Uses Expo Router for navigation
- SQLite for local data storage

## Build & Deploy

1. Create a production build:
   ```bash
   npx expo prebuild
   ```

2. Build for specific platform:
   ```bash
   # For iOS
   npx expo build:ios

   # For Android
   npx expo build:android
   ```

## Tech Stack

- Expo
- React Native
- TypeScript
- SQLite
- Expo Router

## License

MIT License