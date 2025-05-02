# Support Dashboard

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). The Support Dashboard is a web application designed to manage support tickets, agents, and analytics for customer support teams.

## Features

- **User Management**: Create and manage Admin and Agent accounts.
- **Ticket Management**: View, filter, and update support tickets.
- **Agent Performance**: Analyze agent performance with detailed metrics and charts.
- **Notifications**: Stay updated with ticket notifications.
- **Customizable Settings**: Update user profiles and application preferences.
- **Analytics**: Visualize ticket trends and agent performance using charts.

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

You can start editing the page by modifying files in the `src/app/components` directory. The page auto-updates as you edit the files.

## Project Structure

- **`src/app/components/Admin`**: Components for Admin functionalities like user creation, agent management, and performance analytics.
- **`src/app/components/Agent`**: Components for Agent functionalities like ticket management, notifications, and profile updates.
- **`src/app/components/Charts`**: Reusable chart components for visualizing data.
- **`src/app/config`**: Configuration files, including API endpoints.

## API Integration

This project integrates with a backend API for managing users, tickets, and analytics. Update the `BASE_URL` in `src/app/config/api/api.ts` to point to your backend server.

## Deployment

This project has been deployed on [Railway](https://railway.app). Railway provides an easy-to-use platform for deploying web applications and APIs.

To deploy this project on Railway:

1. Create a new project on Railway.
2. Connect your GitHub repository to Railway.
3. Set the required environment variables, such as `BASE_URL`, in the Railway dashboard.
4. Deploy the project.

You can access the live application at the Railway-provided URL after deployment.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.
