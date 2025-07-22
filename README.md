# Advanced Xandeum STOINC Calculator

🚀 **Live Demo**: https://flycgmlj.manus.space  
📁 **GitHub Repository**: https://github.com/binti59/xandeum-stoinc-calculator

A comprehensive React-based calculator for calculating Storage Income (STOINC) from the Xandeum Devnet. This calculator implements the complete STOINC formula system including storage credits, boost factors, NFT bonuses, and the final distribution calculation.

## 🎯 Features

### Complete STOINC Formula Implementation
- **Storage Credits Calculation**: `pNodes × storageSpace × performanceScore × stake`
- **Boost Factor System**: Geometric mean calculation for multiple pNodes
- **NFT Bonuses**: All 6 NFT types with correct multipliers
- **Purchase Era Boosts**: All 6 purchase eras with accurate boost factors
- **Final STOINC Distribution**: `(boostedCredits / totalBoostedCredits) × totalFees × pNodeShare`

### Advanced Calculator Features
- **Individual pNode Configuration**: Configure each pNode separately
- **Real-time Calculations**: All values update instantly as you change parameters
- **Multiple Timeframes**: Per epoch (2 days), monthly, and yearly projections
- **Network Parameters**: Configurable total fees, pNode share, and network credits
- **Visual Formula Display**: Complete mathematical equations and explanations

### Professional Interface
- **3-Tab Layout**: Calculator, Formulas & Math, Information
- **Responsive Design**: Works perfectly on desktop and mobile
- **Modern UI**: Gradient backgrounds with professional styling
- **Interactive Elements**: Checkboxes for NFTs, dropdowns for eras

## 📊 NFT Boost Factors

| NFT Type | Boost Factor | Percentage Increase |
|----------|--------------|-------------------|
| Titan NFT | 11x | 1,000% boost |
| Dragon NFT | 4x | 300% boost |
| Coyote NFT | 2.5x | 150% boost |
| Rabbit NFT | 1.5x | 50% boost |
| XENO NFT | 1.1x | 10% boost |
| Cricket NFT | 1.1x | 10% boost |

## 🏆 Purchase Era Boosts

| Era | Boost Factor | Percentage Increase |
|-----|--------------|-------------------|
| DeepSouth Era | 16x | 1,500% boost |
| South Era | 10x | 900% boost |
| Main Era | 7x | 600% boost |
| Coal Era | 3.5x | 250% boost |
| Central Era | 2x | 100% boost |
| North Era | 1.25x | 25% boost |

## 🔧 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Installation
```bash
# Clone the repository
git clone https://github.com/binti59/xandeum-stoinc-calculator.git
cd xandeum-stoinc-calculator

# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build
```

### Development
```bash
# Start development server with hot reload
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

## 📈 How STOINC is Calculated

### 1. Storage Credits Formula
```
storageCredits = pNodes × storageSpace × performanceScore × stake
```

**Key Factors:**
- **pNodes**: Number of pNodes owned
- **storageSpace**: Total storage capacity (GB)
- **performanceScore**: Network-measured performance (0-1 scale)
- **stake**: Amount of XAND staked

### 2. Boost Factors Formula
```
boostedCredits = storageCredits × (boost₁ × boost₂ × ... × boostₙ)^(1/n)
```

**Boost Sources:**
- **NFTs**: Provide multipliers from 1.1x to 11x
- **Purchase Eras**: Provide multipliers from 1.25x to 16x
- **Geometric Mean**: Prevents single high-boost dominance

### 3. Final STOINC Distribution
```
STOINC = (boostedCredits / totalBoostedCredits) × totalFees × pNodeShare
```

**Variables:**
- **totalFees**: All storage fees collected from sedApps (in SOL)
- **pNodeShare**: Percentage of fees allocated to pNodes (e.g., 94%)
- **totalBoostedCredits**: Sum of boosted credits across all network participants

## 💰 Rewards vs STOINC

### XAND Rewards (Fixed Monthly)
- **Validator Nodes**: 10,000 XAND/month
- **pNode Operators**: 10,000 XAND/month
- **Discord Moderators**: 40,000 XAND/month
- Paid in locked XAND tokens
- Funded by Xandeum Foundation

### STOINC (Variable)
- Paid in SOL from sedApp storage fees
- Calculated every epoch (~2 days)
- Based on your boosted credits vs network total
- Can vary significantly based on network usage

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)
1. Fork this repository
2. Connect to [Vercel](https://vercel.com)
3. Import your repository
4. Deploy automatically

### Option 2: Netlify
1. Fork this repository
2. Connect to [Netlify](https://netlify.com)
3. Set build command: `pnpm run build`
4. Set publish directory: `dist`

### Option 3: GitHub Pages
```bash
# Install gh-pages
pnpm add -D gh-pages

# Add to package.json scripts
"deploy": "pnpm run build && npx gh-pages -d dist"

# Deploy
pnpm run deploy
```

## 🛠 Customization

### Update Boost Factors
Edit the boost factor objects in `src/App.jsx`:

```javascript
const nftBoosts = {
  'titan': { name: 'Titan NFT', boost: 11, description: '1,000% boost' },
  // ... other NFTs
}

const eraBoosts = {
  'deepsouth': { name: 'DeepSouth Era', boost: 16, description: '1,500% boost' },
  // ... other eras
}
```

### Update Network Parameters
Modify default values in the component state:
```javascript
const [totalFees, setTotalFees] = useState(1000) // SOL
const [pNodeShare, setPNodeShare] = useState(0.94) // 94%
const [totalNetworkBoostedCredits, setTotalNetworkBoostedCredits] = useState(1000000)
```

## 🔍 Example Calculation

**Scenario**: 3 pNodes with 100,000 total storage credits

**pNode Boosts**:
- pNode 1: 1.5x boost (Rabbit NFT)
- pNode 2: 1.0x boost (no boosts)
- pNode 3: 2.0x boost (Central Era)

**Calculation**:
```
Geometric Mean = (1.5 × 1.0 × 2.0)^(1/3) = 1.442
Boosted Credits = 100,000 × 1.442 = 144,225
Average Boost = 44.225%
```

If network has 1M total boosted credits and 1,000 SOL in fees:
```
STOINC = (144,225 / 1,000,000) × 1,000 × 0.94 = 135.57 SOL per epoch
```

## 🏗 Technical Stack

- **Frontend**: React 19
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: pnpm

## 📝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit: `git commit -m 'Add feature'`
5. Push: `git push origin feature-name`
6. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

- **GitHub Issues**: Report bugs or request features
- **Live Demo**: Test the calculator at https://flycgmlj.manus.space
- **Documentation**: Complete formulas and examples included

## ⚠️ Disclaimer

This calculator provides estimates based on current Xandeum Devnet parameters. Actual STOINC earnings may vary based on:
- Network conditions and usage
- sedApp fee generation
- Changes to the STOINC distribution formula
- Performance scores and network participation

Always refer to official Xandeum documentation for the most current information.

---

**Built with ❤️ for the Xandeum Community**

