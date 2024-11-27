This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

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


## Creating "(dashboard)" in app directory
- Create following pages - 
  - chat, profile, tours


```tsx
export const metadata: Metadata = {
  title: 'AI Assistant',
  description:
    'AI Assistant: Your AI language companion. Powered by OpenAI to enhances your conversations, content creation, and more!',
};
```

- Change app/page.tsx boilerplate code as follows:

```tsx
import Link from 'next/link';
const HomePage = () => {
  return (
    <div className='hero min-h-screen bg-base-200'>
      <div className='hero-content text-center'>
        <div className='max-w-md'>
          <h1 className='text-6xl font-bold text-primary'>GPTGenius</h1>
          <p className='py-6 text-lg leading-loose'>
            GPTGenius: Your AI language companion. Powered by OpenAI, it
            enhances your conversations, content creation, and more!
          </p>
          <Link href='/chat' className='btn btn-secondary '>
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
```
Next we will install the Clerk package. 
Clerk has released a new version, however, I recommend continuing using the older version of Clerk “@clerk/nextjs@5.0.1” that we previously installed. At the end of the project, you will find an additional lesson where I provide the necessary steps to refactor our codebase to switch to the latest version of Clerk.


```sh
npm install @clerk/nextjs
```

Create the file under root directory with the name of 
.env.local

Add .env to file .gitignore to suppress from Git repos when commiting

Copy and paste the values from Clerk in file .env.local
```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = your_publishable_key;
CLERK_SECRET_KEY = your_secret_key;
```

Environment variables with this `NEXT_PUBLIC_` prefix are exposed to client-side JavaScript code, while those without the prefix are only accessible on the server-side and are not exposed to the client-side code.

```sh
NEXT_PUBLIC_
```

```js
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
```


- Setup ClerkProvider in layout file...
layout.js

```js
import { ClerkProvider } from '@clerk/nextjs';

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

### Dependencies
```sh
√ -> history
 1095  npm install react-icons --save --force
 1096  npm run dev
 1106  npm install react-hot-toast@2.4.1 react-icons@4.11.0 --force
 1107  npm audit fix
 1109  npm i @tanstack/react-query @tanstack/react-query-devtools
 ```




# OpenAI Integration

## OPENAI API

[Pricing](https://openai.com/pricing)
[OpenAI Docs.](https://platform.openai.com/docs/overview)
[OpenAI Playground](https://platform.openai.com/playground/chat?models=gpt-4o)
[OpenAI API Reference](https://platform.openai.com/docs/api-reference/introduction)














## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Libraries Installation
```sh
npm install @clerk/nextjs@5.0.1 @prisma/client@5.5.2 @tanstack/react-query@5.8.1 @tanstack/react-query-devtools@5.8.1 axios@1.6.1  openai@4.14.2   react-hot-toast@2.4.1 react-icons@4.11.0

npm install -D @tailwindcss/typography@0.5.10  daisyui@3.9.4 prisma@5.5.2
```

## Add code to Chat.tsx

```tsx
'use client';

import { generateChatResponse } from '@/utils/action';
import { useMutation } from '@tanstack/react-query';
import React from 'react'
import { useState } from 'react';

import toast from 'react-hot-toast';

const Chat = () => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);


  const {mutate} = useMutation({
      mutationFn:(message)=>generateChatResponse(message)
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(text);
  };

  return (
    <div className='min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]'>
      <div>
        <h2 className='text-5xl'>Messages</h2>
      </div>
      <form onSubmit={handleSubmit} className='max-w-4xl pt-12'>
        <div className='join w-full'>
          <input
            type='text'
            placeholder='Ask me to generate contents you need!'
            className='input input-bordered join-item w-full'
            value={text}
            required
            onChange={(e) => setText(e.target.value)}
          />
          <button className='btn btn-primary join-item' type='submit'>
            Guest ?
          </button>
        </div>
      </form>
    </div>
  );
};
export default Chat;
```

Updated Chat.tsx Code:
```tsx
'use client';

import React from 'react'

import { generateChatResponse } from '@/utils/action';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import toast from 'react-hot-toast';

const Chat = () => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

const { mutate, isPending } = useMutation({
  mutationFn: (query) => generateChatResponse([...messages, query]),
  onSuccess: (data) => {
    if (!data) {
      toast.error('Something went wrong...');
      return;
    }
    setMessages((prev) => [...prev, data]);
  },
});


```

## Install DB components

```sh
udemy/nextJS/home-share-ai
√ -> npm install prisma --save-dev --force
npm warn using --force Recommended protections disabled.

added 4 packages, changed 2 packages, and audited 429 packages in 10s

found 0 vulnerabilities

udemy/nextJS/home-share-ai
√ -> npm install @prisma/client --force
npm warn using --force Recommended protections disabled.

added 1 package, and audited 430 packages in 6s

found 0 vulnerabilities
```

### Initialize prisma database

```sh
udemy/nextJS/home-share-ai
√ -> npx prisma init

✔ Your Prisma schema was created at prisma/schema.prisma
  You can now open it in your favorite editor.

warn You already have a .gitignore file. Don't forget to add `.env` in it to not commit any private information.

Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
3. Run prisma db pull to turn your database schema into a Prisma schema.
4. Run prisma generate to generate the Prisma Client. You can then start querying your database.
5. Tip: Explore how you can extend the ORM with scalable connection pooling, global caching, and real-time database events. Read: https://pris.ly/cli/beyond-orm

More information in our documentation:
https://pris.ly/d/getting-started
```

### Setup account in PlanetScale 

Push database model to Neon through prisma
```sh 
udemy/nextJS/home-share-ai
√ -> npx prisma db push
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database "genai-db", schema "public" at "ep-square-flower-a5xgsuds.us-east-2.aws.neon.tech"

🚀  Your database is now in sync with your Prisma schema. Done in 1.14s

✔ Generated Prisma Client (v5.22.0) to ./node_modules/@prisma/client in 96ms

```

Next Open Prisma Client as follows:

```sh
 -> npx prisma studio 
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Prisma Studio is up on http://localhost:5555

```
It will openup studio at localhost/5555
