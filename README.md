# Next.js Blog Project

![full-stack-next.js-blog-project](/public/github-cover.png)

Welcome to the **Next.js Blog Project**! This project is a simple and modern blog application built using [Next.js](https://nextjs.org/).

## Features

- **Static Site Generation (SSG):** Pre-render pages for better performance and SEO.
- **Dynamic Routing:** Create dynamic blog post pages.
- **Markdown Support:** Write blog posts in Markdown files.
- **API Routes:** Fetch data for dynamic content.
- **Responsive Design:** Optimized for all devices.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/mdalmamunit427/full-stack-next-js-blog-website.git
    cd next-blog-project
    ```

2. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3. Create a `.env.local` file in the root of your project and add the following environment variables:

    ```env
    MONGODB_URI=""
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
    CLOUDINARY_CLOUD_NAME=""
    CLOUDINARY_API_KEY=""
    CLOUDINARY_API_SECRET=""

    NEXT_PUBLIC_BASE_URL="http://localhost:3000"

    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
    CLERK_SECRET_KEY=""
    ```

    > **Note:** Ensure you do not expose these sensitive keys in a public repository. Use `.gitignore` to exclude the `.env.local` file from version control.

4. Start the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

5. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

```plaintext
next-blog-project/
├── pages/          # Application pages
├── public/         # Static assets
├── styles/         # CSS and styling files
├── posts/          # Markdown files for blog posts
├── components/     # Reusable components
├── package.json    # Project dependencies
└── README.md       # Project documentation
```

## Scripts

- `npm run dev` - Start the development server.
- `npm run build` - Build the project for production.
- `npm start` - Start the production server.
- `npm run lint` - Run ESLint to check for code issues.

## Deployment

This project can be deployed to platforms like [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/). Follow their documentation for deployment instructions.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Inspired by the Next.js blog tutorial

Happy coding!