This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.jsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Dependencies

- react
- react-hot-toast
- react switch
- mui image modal
- tabler icons
- sweetalert2
- tailwindcss

- next
- next-auth
- mongoose

## Features

- MongoDB cluster
- Sign Up / Log in / Log out with Google auth and Next-auth session
- Generate Images with 5 Different Leonardo.AI trained models
- Toaster Notifications
- Togler for privacy
- Image Modal
- Search Bar
- Open other users profile
- Delete account button to delete the account and all the related user designs
- Middleware that redirects to home page for not sign in users

## Midleware

Middleware will get a different cookie if you are working in the localhost or in a vercel live deployment. Change between the cookies in middleware.js use "Secure-next-auth" for live server or "next-auth" for localhost.

## Enviroment Variables

An .env file with this variables will be required. Update NEXAUTH_URL and NEXAUTH_URL_INTERNAL with your server url if live version.

- GOOGLE_ID
- GOOGLE_CLIENT_SECRET
- MONGODB_URI
- NEXTAUTH_URL=http://localhost:3000
- NEXTAUTH_URL_INTERNAL=http://localhost:3000
- NEXTAUTH_SECRET
- LEONARDO_SECRET
