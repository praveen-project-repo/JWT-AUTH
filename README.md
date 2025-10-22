# JWT Authentication System

A production-ready authentication system built with Next.js, TypeScript, and PostgreSQL, featuring secure JWT token management, automatic refresh, and role-based access control.

## Features

✨ **Secure Authentication**
- JWT-based authentication with access and refresh tokens
- Automatic token refresh mechanism
- Secure password hashing with bcrypt
- HTTP-only cookies for refresh tokens

🔐 **Authorization**
- Role-based access control (RBAC)
- Protected routes and API endpoints
- Granular permission management
- Admin dashboard for user management

🎨 **Modern UI/UX**
- Responsive design with Tailwind CSS
- Real-time form validation
- Toast notifications
- Loading states and error handling
- Dark mode support

🚀 **Performance**
- Optimized token validation
- Redis caching for sessions
- Database query optimization
- Efficient state management

## Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Axios (HTTP client)
- React Hook Form
- Zod (Validation)

**Backend:**
- Node.js & Express
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT (jsonwebtoken)
- bcrypt

**DevOps:**
- Vercel (Frontend deployment)
- Railway/Render (Backend deployment)
- GitHub Actions (CI/CD)

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL (v14 or higher)
- Git

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/jwt-authentication.git
cd jwt-authentication
```

### 2. Install Dependencies

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**
```bash
cd backend
npm install
```

### 3. Environment Configuration

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Backend (.env):**
```env
# Server
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/jwt_auth_db"

# JWT Secrets (Generate secure random strings)
JWT_ACCESS_SECRET=your-super-secret-access-key-min-32-chars
JWT_REFRESH_SECRET=your-super-secret-refresh-key-min-32-chars

# Token Expiry
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# CORS
FRONTEND_URL=http://localhost:3000

# Redis (Optional - for production)
REDIS_URL=redis://localhost:6379
```

### 4. Database Setup

**Create database:**
```bash
createdb jwt_auth_db
```

**Run migrations:**
```bash
cd backend
npx prisma migrate dev --name init
npx prisma generate
```

**Seed database (optional):**
```bash
npm run seed
```

### 5. Generate JWT Secrets

Use the following command to generate secure secrets:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 6. Run the Application

**Backend:**
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

**Frontend:**
```bash
cd frontend
npm run dev
# App runs on http://localhost:3000
```

## Project Structure
```
jwt-authentication/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── login/
│   │   │   │   └── register/
│   │   │   ├── dashboard/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   ├── ui/
│   │   │   └── layout/
│   │   ├── lib/
│   │   │   ├── axios.ts
│   │   │   └── utils.ts
│   │   ├── hooks/
│   │   │   └── use-auth.ts
│   │   └── context/
│   │       └── auth-context.tsx
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── auth.controller.ts
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts
│   │   │   └── error.middleware.ts
│   │   ├── routes/
│   │   │   └── auth.routes.ts
│   │   ├── services/
│   │   │   └── auth.service.ts
│   │   ├── utils/
│   │   │   ├── jwt.util.ts
│   │   │   └── validation.util.ts
│   │   ├── config/
│   │   │   └── database.ts
│   │   └── index.ts
│   ├── prisma/
│   │   └── schema.prisma
│   └── package.json
│
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Protected Routes
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/admin/users` - Get all users (Admin only)

## Usage Examples

### Registration
```typescript
const response = await axios.post('/auth/register', {
  name: 'John Doe',
  email: 'john@example.com',
  password: 'SecurePass123!',
  role: 'user'
});
```

### Login
```typescript
const response = await axios.post('/auth/login', {
  email: 'john@example.com',
  password: 'SecurePass123!'
});
// Access token returned in response
// Refresh token set in HTTP-only cookie
```

### Protected Request
```typescript
const response = await axios.get('/users/profile', {
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
});
```

## Security Features

- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT token-based authentication
- ✅ HTTP-only cookies for refresh tokens
- ✅ CORS protection
- ✅ Rate limiting on authentication endpoints
- ✅ Input validation and sanitization
- ✅ SQL injection prevention (Prisma ORM)
- ✅ XSS protection
- ✅ CSRF protection
- ✅ Secure headers (Helmet.js)

## Testing

**Run unit tests:**
```bash
npm test
```

**Run integration tests:**
```bash
npm run test:integration
```

**Run e2e tests:**
```bash
npm run test:e2e
```

## Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Backend (Railway/Render)
1. Create new project
2. Connect GitHub repository
3. Configure environment variables
4. Add PostgreSQL database
5. Deploy

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| DATABASE_URL | PostgreSQL connection string | postgresql://user:pass@host:5432/db |
| JWT_ACCESS_SECRET | Secret for access tokens | min 32 characters |
| JWT_REFRESH_SECRET | Secret for refresh tokens | min 32 characters |
| JWT_ACCESS_EXPIRY | Access token lifetime | 15m |
| JWT_REFRESH_EXPIRY | Refresh token lifetime | 7d |
| FRONTEND_URL | Frontend application URL | http://localhost:3000 |

## Troubleshooting

**Token refresh not working:**
- Check if refresh token cookie is being sent
- Verify JWT_REFRESH_SECRET matches
- Check token expiry times

**CORS errors:**
- Verify FRONTEND_URL in backend .env
- Check CORS middleware configuration

**Database connection issues:**
- Verify DATABASE_URL format
- Ensure PostgreSQL is running
- Check database credentials

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Author

Your Name - [@yourhandle](https://twitter.com/yourhandle)

## Acknowledgments

- Next.js team for the amazing framework
- Prisma for the excellent ORM
- Tailwind CSS for utility-first CSS

## Support

For support, email your-email@example.com or open an issue in the GitHub repository.
