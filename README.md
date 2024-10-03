# Property Lister Website

## Introduction

This is a Next.js application that provides a platform for listing and searching luxury rentals. It incorporates various features such as user authentication, email verification, password reset, magic link signups, OAuth, lazy loading, and scope for AI-based recommendations.

## Features

* **Fully Responsive:** Scales well for both smaller and larger screens.
* **User Authentication:** Users can create accounts, log in, and log out.
* **Email Verification:** Users must verify their email addresses before accessing certain features.
* **Password Reset:** Users can reset their passwords if they forget them.
* **Magic Link Signups:** Users can sign up without entering a password by clicking on a magic link sent to their email.
* **OAuth:** Users can sign in using their Google, Facebook, or other social media accounts.
* **Lazy Loading:** Rental listings are loaded incrementally as the user scrolls down the page, improving performance.
* **Click Tracking:** Every click on a rental is tracked and stored in the database.
* **AI-Based Recommendations Scope:** The collected click data will be used to train an AI model that can recommend relevant rentals to users.

## Technologies Used

* **Next.js:** A React framework for building server-rendered React applications.
* **Prisma:** A ORM for Node.js and TypeScript.
* **Tailwind CSS:** A utility-first CSS framework.
* **PostgreSQL:** A database provider.

## Getting Started

Populate the .env files according to the .env.example.

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Screenshots

![8](https://github.com/user-attachments/assets/478843bf-7c8d-45dc-af28-9f688a3c7cf1)
![9](https://github.com/user-attachments/assets/eb57ef47-1672-470e-ba15-b83091b2f8f9)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
