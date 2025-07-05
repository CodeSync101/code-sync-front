# CodeSync Frontend

A modern Angular-based frontend application for managing code repositories, organizations, and user contributions. Built with Angular 16 and featuring a responsive design with authentication integration.

## 🚀 Features

- **User Authentication**: Integrated with Keycloak for secure login/logout
- **Organization Management**: Create and manage multiple organizations
- **Repository Management**: Handle Git repositories and groups
- **User Management**: Admin panel for user administration
- **Dashboard Analytics**: Real-time statistics and contribution tracking
- **Responsive Design**: Modern UI with Bootstrap and custom styling
- **Role-Based Access**: Different permissions for Admin, Teacher, Student, and Field Manager roles

## 🛠️ Tech Stack

- **Angular 16** - Frontend framework
- **Bootstrap 5** - UI components and responsive design
- **NgBootstrap** - Angular Bootstrap components
- **Keycloak** - Authentication and authorization
- **SCSS** - Advanced styling with custom variables
- **RxJS** - Reactive programming for state management

## 📋 Prerequisites

- Node.js (version 16 or higher)
- Angular CLI (version 16.0.1)
- Keycloak server running on `http://localhost:8080`
- Backend API services

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd code-sync-front
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   - Update `src/environments/environment.ts` with your API endpoints
   - Ensure Keycloak server is running and configured

4. **Start development server**
   ```bash
   ng serve
   ```

5. **Navigate to the application**
   - Open `http://localhost:4200/` in your browser
   - The application will automatically reload if you change any source files

## 🏗️ Project Structure

```
src/
├── app/
│   ├── component/           # Feature components
│   │   ├── users-management/
│   │   ├── organization-management/
│   │   └── repository-management/
│   ├── dashboard/          # Dashboard components
│   ├── features/           # Feature modules
│   ├── guards/            # Route guards
│   ├── interceptors/      # HTTP interceptors
│   ├── layouts/           # Layout components
│   ├── models/            # TypeScript interfaces
│   ├── services/          # API services
│   └── shared/           # Shared components
│       ├── header/        # Navigation component
│       └── sidebar/       # Sidebar component
├── assets/
│   ├── images/           # Static images
│   └── scss/            # Global styles
└── environments/         # Environment configuration
```

## 🎨 UI Components

The application includes a comprehensive set of UI components:

- **Navigation Bar**: User profile, organization selector, and logout
- **Sidebar**: Role-based menu navigation
- **Dashboard**: Analytics cards and contribution charts
- **Forms**: User management, organization creation
- **Tables**: Data display with pagination
- **Modals**: Interactive dialogs

## 🔐 Authentication

The application uses Keycloak for authentication:

- **Login**: Redirects to Keycloak login page
- **Token Management**: Automatic token refresh
- **Role-Based Access**: Different menus based on user roles
- **Logout**: Secure logout with token cleanup

## 📊 API Integration

The frontend communicates with several backend services:

- **User Service**: User management and authentication
- **Organization Service**: Organization CRUD operations
- **Stats Service**: Analytics and contribution data
- **Groups Service**: Repository and group management

## 🎯 Available Scripts

- `ng serve` - Start development server
- `ng build` - Build the project for production
- `ng test` - Run unit tests
- `ng e2e` - Run end-to-end tests
- `ng lint` - Run linting

## 🚀 Deployment

1. **Build for production**
   ```bash
   ng build --configuration production
   ```

2. **Deploy the `dist/` folder** to your web server

## 🔧 Configuration

### Environment Variables

Update `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8083/api/v1',
  keycloakUrl: 'http://localhost:8080',
  keycloakRealm: 'codesync-auth',
  keycloakClientId: 'codesync-front'
};
```

### Keycloak Configuration

Ensure your Keycloak server is configured with:
- Realm: `codesync-auth`
- Client: `codesync-front`
- Valid redirect URIs: `http://localhost:4200/*`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Check the documentation
- Open an issue on GitHub
- Contact the development team

---

**Built with ❤️ using Angular 16**
