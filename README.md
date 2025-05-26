# Review Sentiment Analysis Frontend

A modern React application for analyzing product reviews using sentiment analysis. This frontend works in conjunction with the Review Sentiment Analysis backend to provide a user-friendly interface for analyzing product reviews.

## Features

- Review sentiment analysis with aspect-based classification
- Product review scraping from e-commerce platforms
- Review summarization
- Modern UI built with Mantine
- Real-time analysis feedback

## Tech Stack

- React with TypeScript
- Vite + SWC for fast development and builds
- Mantine UI components
- React Query for API state management
- Axios for API requests

## Getting Started

1. Prerequisites:

   - Node.js 16 or higher
   - npm 7 or higher
   - Review Sentiment Analysis backend running

2. Installation:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with:

   ```
   VITE_API_URL=http://localhost:8000
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Usage

1. Enter a review text in the input field
2. Select aspects to analyze (or leave blank to use general sentiment analysis)
3. Click "Analyze" to get sentiment analysis results
4. View the results with sentiment scores for each aspect

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Authors

- Davit Mamrikishvili

## Acknowledgments

- [DeBERTa-v3](https://huggingface.co/yangheng/deberta-v3-base-absa-v1.1) for aspect-based sentiment analysis
- [DistilBERT](https://huggingface.co/distilbert-base-uncased-finetuned-sst-2-english) for general sentiment analysis
- [BART](https://huggingface.co/facebook/bart-large-cnn) for text summarization
