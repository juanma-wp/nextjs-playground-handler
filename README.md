# WordPress Users App

This is a [Next.js](https://nextjs.org) project that integrates with WordPress using the [`wordpress-playground-handler`](https://www.npmjs.com/package/wordpress-playground-handler) package to fetch and display user data through the WordPress REST API.

## 🚀 Features

- **WordPress Integration**: Uses `wordpress-playground-handler` to run a WordPress instance
- **User Management**: Fetches and displays WordPress users with extended metadata
- **REST API**: Custom WordPress plugin extends user data with last login, joined date, roles, and capabilities
- **Modern UI**: Built with Next.js, React 19, and Tailwind CSS
- **JWT Authentication**: Configured with JWT authentication for WordPress REST API

## 📋 WordPress Configuration

The project includes a WordPress blueprint (`wordpress/blueprint.json`) that automatically:
- Sets up a WordPress installation
- Installs the JWT Authentication plugin
- Configures JWT authentication settings
- Adds custom mu-plugins for enhanced user data

## 🛠 Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the WordPress users dashboard.

## 🏗 Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/users/route.ts    # WordPress REST API integration
│   │   ├── components/           # React components
│   │   └── page.tsx             # Main dashboard page
└── wordpress/
    ├── blueprint.json           # WordPress setup configuration
    ├── database/               # WordPress database files
    └── mu-plugins/             # Custom WordPress plugins
```

## 🔧 WordPress Playground Handler

The `wordpress-playground-handler` package provides:
- **Serverless WordPress**: Run WordPress without a traditional server setup
- **Blueprint Configuration**: Automated WordPress setup and plugin installation
- **File System Mounting**: Mount local directories as WordPress mu-plugins and database
- **REST API Access**: Direct access to WordPress REST API endpoints

### Usage Example

```typescript
import { getPlaygroundHandler } from 'wordpress-playground-handler';

const handler = await getPlaygroundHandler({
  blueprintPath: path.resolve(process.cwd(), 'wordpress/blueprint.json'),
  mountPaths: {
    databasePath: path.resolve(process.cwd(), 'wordpress/database'),
    muPluginsPath: path.resolve(process.cwd(), 'wordpress/mu-plugins')
  }
});

const response = await handler.request({
  method: 'GET',
  url: '/wp-json/wp/v2/users'
});
```

## 📚 Learn More

To learn more about the technologies used:

- [wordpress-playground-handler Documentation](https://www.npmjs.com/package/wordpress-playground-handler)
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [WordPress REST API](https://developer.wordpress.org/rest-api/) - WordPress REST API documentation
- [WordPress Playground](https://wordpress.github.io/wordpress-playground/) - WordPress Playground project