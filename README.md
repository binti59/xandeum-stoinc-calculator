# Xandeum STOINC Calculator

A React-based calculator for estimating rewards and storage income from participating in the Xandeum Devnet. This calculator helps users understand potential earnings from running validator nodes, pNodes, or moderating the Discord community.

## Features

- **Rewards Calculator**: Calculate monthly XAND token rewards for different node types
- **Storage Income Calculator**: Estimate income from pNode storage operations
- **Multiple Timeframes**: View projections for daily, monthly, and yearly earnings
- **Real-time Updates**: Calculations update automatically as you change parameters
- **Responsive Design**: Works on both desktop and mobile devices
- **Information Hub**: Detailed information about the Xandeum rewards program

## Node Types Supported

1. **Validator Node Operators**: 10,000 XAND/month
2. **pNode Operators**: 10,000 XAND/month + storage income
3. **Discord Moderators**: 40,000 XAND/month

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Installation

1. Clone this repository:
   \`\`\`bash
   git clone <your-repository-url>
   cd xandeum-stoinc-calculator
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   pnpm install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   pnpm run dev
   \`\`\`

4. Open your browser and navigate to \`http://localhost:5173\`

## Connecting to Your GitHub Account

### Step 1: Create a New Repository on GitHub

1. Go to [GitHub](https://github.com/binti59)
2. Click "New repository"
3. Name it "xandeum-stoinc-calculator" (or your preferred name)
4. Make it public or private as desired
5. **Do NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### Step 2: Connect Local Repository to GitHub

Run these commands in your project directory:

\`\`\`bash
# Add your GitHub repository as remote origin
git remote add origin https://github.com/binti59/xandeum-stoinc-calculator.git

# Push your code to GitHub
git branch -M main
git push -u origin main
\`\`\`

## Deployment Options

### Option 1: Vercel (Recommended - Free)

1. Go to [Vercel](https://vercel.com)
2. Sign up/login with your GitHub account
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will automatically detect it's a React app
6. Click "Deploy"
7. Your site will be live at \`https://your-project-name.vercel.app\`

### Option 2: Netlify (Free)

1. Go to [Netlify](https://netlify.com)
2. Sign up/login with your GitHub account
3. Click "New site from Git"
4. Choose GitHub and select your repository
5. Build settings:
   - Build command: \`pnpm run build\`
   - Publish directory: \`dist\`
6. Click "Deploy site"

### Option 3: GitHub Pages (Free)

1. In your GitHub repository, go to Settings > Pages
2. Source: Deploy from a branch
3. Branch: \`gh-pages\` (you'll need to create this)
4. Add this to your \`package.json\` scripts:
   \`\`\`json
   "scripts": {
     "deploy": "pnpm run build && npx gh-pages -d dist"
   }
   \`\`\`
5. Install gh-pages: \`pnpm add -D gh-pages\`
6. Run: \`pnpm run deploy\`

### Option 4: Your Own Domain

If you have your own hosting service:

1. Build the project: \`pnpm run build\`
2. Upload the contents of the \`dist\` folder to your web server
3. Configure your web server to serve the \`index.html\` for all routes

## Customization

### Updating Reward Rates

To update the reward rates, modify the \`rewardRates\` object in \`src/App.jsx\`:

\`\`\`javascript
const rewardRates = {
  validator: 10000,  // XAND per month
  pnode: 10000,      // XAND per month
  discord: 40000     // XAND per month
}
\`\`\`

### Updating Storage Income Calculation

The storage income calculation is in the \`calculateStorageIncome\` function. Currently set to $0.01 per GB per month:

\`\`\`javascript
const monthlyStorageIncome = storageAmount * 0.01 * nodeCount
\`\`\`

### Styling

The app uses Tailwind CSS for styling. You can customize colors and design in:
- \`src/App.css\` - Main styles and color variables
- \`src/App.jsx\` - Component styling classes

## Technologies Used

- **React 19** - Frontend framework
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Lucide React** - Icons
- **Vite** - Build tool

## Contributing

1. Fork the repository
2. Create a feature branch: \`git checkout -b feature-name\`
3. Commit your changes: \`git commit -m 'Add feature'\`
4. Push to the branch: \`git push origin feature-name\`
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or support, please open an issue on GitHub or contact the development team.

---

**Note**: This calculator provides estimates based on current Xandeum Devnet parameters. Actual earnings may vary based on network conditions and program updates.

