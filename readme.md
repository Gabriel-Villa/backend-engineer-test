# Backend Engineer Test

## Getting started

```bash
APPLICA=/var/www/applica

# Clone the repository: 
git clone git@github.com:Gabriel-Villa/backend-engineer-test.git $APPLICA

# Create env file
cp $APPLICA/.env.example $APPLICA/.env

# Install dependencies and run server
cd $APPLICA
npm install
npm run start

# Go to
http://localhost:5000
```

## Endpoints

-   GET /api/posts
-   GET /api/posts?start=5&size=2
-   GET /api/posts?start=2

## Extraendpoints

-   GET /api/users
-   GET /api/posts/:postId/comments
