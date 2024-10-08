# Quote Management App

A Next.js application for managing and displaying quotes. This app allows users to view a list of quotes and create new ones.

## Features

- **View Quotes**: Display a paginated list of quotes.
- **Create Quote**: Add new quotes through a dedicated page.
- **Pagination**: Navigate through pages of quotes.


## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (>= 14.x)
- [npm](https://www.npmjs.com/) (or [Yarn](https://yarnpkg.com/))

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    ```

2. **Navigate to the project directory**

    ```bash
    cd your-repo-name
    ```

3. **Install dependencies**

    ```bash
    npm install
    # or
    yarn install
    ```

4. **Run the development server**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

5. **Open your browser and go to `http://localhost:3000`**

## Usage

- **Viewing Quotes**: Navigate to `/quotes` to see the list of quotes. You can use pagination controls to navigate through pages.
- **Creating a Quote**: Navigate to `/create-quote` to add a new quote.

## Configuration

- **API Endpoint**: The app fetches quotes from a predefined API endpoint. Ensure you have the correct API endpoint and token set up in the `loadQuotes` function within `app/quotes/page.tsx`.

## Contributing

1. **Fork the repository**
2. **Create a new branch**
3. **Make your changes**
4. **Submit a pull request**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- **Next.js**: For the React framework.
- **Axios**: For handling HTTP requests.
- **Tailwind CSS**: For styling.

---

Feel free to modify this README based on your project's specific details and requirements. If you have additional setup steps or dependencies, make sure to include those in the `Getting Started` section.
