# DataVault Pro

<div align="center">

![DataVault Pro](https://img.shields.io/badge/DataVault-Pro-00D9FF?style=for-the-badge)
[![Built with Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Filecoin](https://img.shields.io/badge/Filecoin-Onchain%20Cloud-0090FF?style=for-the-badge&logo=filecoin)](https://filecoin.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/s70628056-9879s-projects/v0-filecoin-onchain-cloud)

**A decentralized data marketplace with cryptographically verified storage and streaming payments**

[Live Demo](https://vercel.com/s70628056-9879s-projects/v0-filecoin-onchain-cloud) • [Documentation](#documentation) • [Report Bug](https://github.com/your-repo/issues)

</div>

---

## Overview

DataVault Pro is a revolutionary decentralized data marketplace built on Filecoin's Onchain Cloud infrastructure. It enables creators and organizations to monetize datasets with cryptographically verified storage (PDP - Proof of Data Possession) and programmable streaming payments via Filecoin Pay.

### What Makes DataVault Pro Unique

- **Cryptographic Verification**: Every dataset includes PDP (Proof of Data Possession) verification, ensuring sellers actually possess the data they claim
- **Streaming Payments**: Buyers can pay per access or subscribe with streaming micropayments via Filecoin Pay smart contracts
- **Fast Content Delivery**: FilCDN integration ensures rapid content delivery for purchased datasets
- **Warm Storage**: Leveraging Filecoin's Warm Storage Service for quick retrieval and verified persistence
- **Trustless Architecture**: Smart contract payment rails eliminate intermediaries and ensure automatic settlements

---

## Features

### For Sellers
- Upload datasets with rich metadata (title, description, category, pricing)
- Set flexible pricing models (one-time purchase or streaming subscriptions)
- Track earnings, views, and sales in real-time
- Monitor PDP verification status for all uploads
- Comprehensive analytics dashboard with performance insights

### For Buyers
- Browse marketplace with advanced search and filtering
- Preview dataset samples before purchase
- Verify data integrity with PDP proofs
- Multiple payment options (one-time or streaming)
- Fast downloads via FilCDN
- Transaction history and payment tracking

### Platform Features
- MetaMask wallet integration
- Real-time PDP verification display
- Streaming payment infrastructure
- Analytics and insights dashboard
- Responsive design for all devices
- Dark mode optimized UI

---

## Technology Stack

### Core Technologies
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling
- **shadcn/ui** - High-quality UI components

### Filecoin Onchain Cloud Stack
- **Synapse SDK** (`@filoz/synapse-sdk`) - Seamless Filecoin integration
- **Filecoin Warm Storage** - Fast, verifiable storage with PDP
- **Filecoin Pay** - Smart contract payment rails for streaming payments
- **FilCDN** - Content delivery network for fast retrieval

### Additional Libraries
- **Recharts** - Data visualization
- **Lucide React** - Icon system
- **date-fns** - Date formatting
- **SWR** - Data fetching and caching

---

## Prerequisites

Before you begin, ensure you have:

- **Node.js** 18.x or higher
- **npm** or **yarn** package manager
- **MetaMask** browser extension
- **Filecoin Calibration testnet** tokens (for testing)
- **Git** for version control

---

## Installation

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/your-username/datavault-pro.git
cd datavault-pro
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
# or
yarn install
\`\`\`

### 3. Environment Setup

Create a `.env.local` file in the root directory:

\`\`\`env
# Filecoin Network Configuration
NEXT_PUBLIC_FILECOIN_NETWORK=calibration
NEXT_PUBLIC_FILECOIN_RPC_URL=https://api.calibration.node.glif.io/rpc/v1

# Synapse SDK Configuration
NEXT_PUBLIC_SYNAPSE_API_URL=https://api.synapse.filoz.io
NEXT_PUBLIC_SYNAPSE_API_KEY=your_synapse_api_key

# Filecoin Pay Configuration
NEXT_PUBLIC_FILECOIN_PAY_CONTRACT=0x...
NEXT_PUBLIC_PAYMENT_TOKEN_ADDRESS=0x...

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

### 4. Run Development Server

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Configuration

### Wallet Setup

1. Install [MetaMask](https://metamask.io/) browser extension
2. Add Filecoin Calibration testnet:
   - Network Name: `Filecoin Calibration`
   - RPC URL: `https://api.calibration.node.glif.io/rpc/v1`
   - Chain ID: `314159`
   - Currency Symbol: `tFIL`
   - Block Explorer: `https://calibration.filfox.info/`

3. Get testnet tokens from [Filecoin Faucet](https://faucet.calibration.fildev.network/)

### Synapse SDK Setup

1. Sign up for Synapse SDK access at [FilOzone](https://github.com/FilOzone/synapse-sdk)
2. Obtain your API key
3. Add the API key to your `.env.local` file

---

## Usage

### For Sellers

#### 1. Upload a Dataset

\`\`\`typescript
// Navigate to /upload
// Fill in dataset details:
- Title
- Description
- Category (AI/ML, Finance, Healthcare, etc.)
- Price (in FIL)
- Upload file(s)
\`\`\`

#### 2. Monitor Your Datasets

\`\`\`typescript
// Navigate to /dashboard
// View:
- Total revenue
- Active datasets
- Total views
- Sales analytics
\`\`\`

#### 3. Track Analytics

\`\`\`typescript
// Navigate to /analytics
// Monitor:
- Revenue trends
- Top performing datasets
- Conversion rates
- Performance insights
\`\`\`

### For Buyers

#### 1. Browse Marketplace

\`\`\`typescript
// Navigate to /marketplace
// Use filters:
- Search by keyword
- Filter by category
- Sort by price, date, popularity
\`\`\`

#### 2. Purchase a Dataset

\`\`\`typescript
// Click on a dataset
// Review details and PDP verification
// Choose payment method:
- One-time purchase
- Streaming subscription
// Confirm transaction in MetaMask
\`\`\`

#### 3. Download Your Data

\`\`\`typescript
// After purchase, download via FilCDN
// Fast, verified content delivery
\`\`\`

---

## Project Structure

\`\`\`
datavault-pro/
├── app/
│   ├── analytics/          # Analytics dashboard
│   ├── dashboard/          # Seller dashboard
│   ├── marketplace/        # Marketplace browser
│   │   └── [id]/          # Dataset detail pages
│   ├── payments/          # Payment history
│   ├── upload/            # Dataset upload
│   ├── verification/      # PDP verification
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # shadcn/ui components
│   └── site-header.tsx    # Navigation header
├── lib/
│   ├── wallet-context.tsx      # Wallet state management
│   ├── synapse-context.tsx     # Synapse SDK integration
│   ├── filecoin-pay-context.tsx # Payment management
│   └── utils.ts                # Utility functions
├── public/                # Static assets
└── package.json          # Dependencies
\`\`\`

---

## API Integration

### Synapse SDK Usage

\`\`\`typescript
import { useSynapse } from '@/lib/synapse-context'

function UploadComponent() {
  const { uploadFile, getFileInfo } = useSynapse()
  
  const handleUpload = async (file: File) => {
    const cid = await uploadFile(file, {
      title: 'My Dataset',
      description: 'Dataset description',
      price: 10
    })
    console.log('Uploaded with CID:', cid)
  }
}
\`\`\`

### Filecoin Pay Integration

\`\`\`typescript
import { useFilecoinPay } from '@/lib/filecoin-pay-context'

function PurchaseComponent() {
  const { createPaymentRail, processPayment } = useFilecoinPay()
  
  const handlePurchase = async (datasetId: string, price: number) => {
    const railId = await createPaymentRail(datasetId, price)
    await processPayment(railId)
  }
}
\`\`\`

### PDP Verification

\`\`\`typescript
import { useSynapse } from '@/lib/synapse-context'

function VerificationComponent() {
  const { verifyPDP } = useSynapse()
  
  const checkVerification = async (cid: string) => {
    const proof = await verifyPDP(cid)
    console.log('PDP Proof:', proof)
  }
}
\`\`\`

---

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

\`\`\`bash
# Or use Vercel CLI
npm i -g vercel
vercel
\`\`\`

### Environment Variables for Production

Ensure all environment variables are set in Vercel dashboard:
- `NEXT_PUBLIC_FILECOIN_NETWORK`
- `NEXT_PUBLIC_SYNAPSE_API_KEY`
- `NEXT_PUBLIC_FILECOIN_PAY_CONTRACT`

---

## Development

### Run Tests

\`\`\`bash
npm run test
\`\`\`

### Build for Production

\`\`\`bash
npm run build
npm run start
\`\`\`

### Lint Code

\`\`\`bash
npm run lint
\`\`\`

---

## Roadmap

- [ ] Multi-chain support (Ethereum, Polygon)
- [ ] Advanced analytics with ML insights
- [ ] Dataset versioning and updates
- [ ] Collaborative datasets with multiple sellers
- [ ] API access for programmatic purchases
- [ ] Mobile app (React Native)
- [ ] Dataset recommendations engine
- [ ] Reputation system for sellers
- [ ] Escrow and dispute resolution
- [ ] Integration with Jupyter notebooks

---

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Add tests for new features
- Update documentation

---

## Troubleshooting

### Common Issues

**MetaMask not connecting:**
- Ensure you're on Filecoin Calibration testnet
- Clear browser cache and reload
- Check MetaMask is unlocked

**Upload failing:**
- Verify Synapse API key is correct
- Check file size limits (max 100MB)
- Ensure sufficient tFIL balance

**Payment not processing:**
- Confirm wallet has sufficient tFIL
- Check Filecoin Pay contract address
- Verify network connection

**PDP verification pending:**
- Wait for blockchain confirmation (1-2 minutes)
- Refresh the page
- Check storage provider status

---

## Resources

### Filecoin Onchain Cloud

- [Synapse SDK Documentation](https://github.com/FilOzone/synapse-sdk)
- [Synapse SDK npm Package](https://www.npmjs.com/package/@filoz/synapse-sdk)
- [Synapse SDK DeepWiki](https://deepwiki.com/FilOzone/synapse-sdk)
- [Filecoin Services](https://github.com/FilOzone/filecoin-services)
- [Filecoin Pay Documentation](https://deepwiki.com/FilOzone/filecoin-pay)
- [Example Upload dApp](https://github.com/FIL-Builders/fs-upload-dapp)

### Filecoin Network

- [Filecoin Documentation](https://docs.filecoin.io/)
- [Calibration Testnet Faucet](https://faucet.calibration.fildev.network/)
- [Filecoin Explorer](https://calibration.filfox.info/)

### Development Tools

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [TypeScript](https://www.typescriptlang.org/docs/)

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- Built with [v0.app](https://v0.app/chat/projects/dobOkghyrX4)
- Powered by [Filecoin Onchain Cloud](https://filecoin.io/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Deployed on [Vercel](https://vercel.com/)

---

## Contact

For questions, feedback, or support:

- GitHub Issues: [Create an issue](https://github.com/your-repo/issues)
- Twitter: [@your-twitter](https://twitter.com/your-twitter)
- Discord: [Join our community](https://discord.gg/your-discord)

---

<div align="center">

**Built with ❤️ using Filecoin Onchain Cloud**

[⬆ Back to Top](#datavault-pro)

</div>
