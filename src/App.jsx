import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Checkbox } from '@/components/ui/checkbox.jsx'
import { Calculator, Coins, Server, Users, TrendingUp, Info, Zap, Crown, Award } from 'lucide-react'
import './App.css'

function App() {
  // Basic parameters
  const [pNodeCount, setPNodeCount] = useState(1)
  const [storageSpace, setStorageSpace] = useState(100)
  const [performanceScore, setPerformanceScore] = useState(1)
  const [xandStake, setXandStake] = useState(1000)
  const [timeframe, setTimeframe] = useState('monthly')
  const [xandPrice, setXandPrice] = useState(0.1)
  
  // Network parameters
  const [totalFees, setTotalFees] = useState(1000)
  const [pNodeShare, setPNodeShare] = useState(0.94)
  const [totalNetworkBoostedCredits, setTotalNetworkBoostedCredits] = useState(1000000)
  
  // NFT selections
  const [selectedNFTs, setSelectedNFTs] = useState([])
  const [purchaseEra, setPurchaseEra] = useState('')
  
  // Individual pNode configurations
  const [pNodes, setPNodes] = useState([{
    id: 1,
    storageSpace: 100,
    performanceScore: 1,
    stake: 1000,
    nfts: [],
    purchaseEra: ''
  }])

  // NFT boost factors
  const nftBoosts = {
    'xeno': { name: 'XENO NFT', boost: 1.1, description: '10% boost' },
    'titan': { name: 'Titan NFT', boost: 11, description: '1,000% boost' },
    'dragon': { name: 'Dragon NFT', boost: 4, description: '300% boost' },
    'coyote': { name: 'Coyote NFT', boost: 2.5, description: '150% boost' },
    'rabbit': { name: 'Rabbit NFT', boost: 1.5, description: '50% boost' },
    'cricket': { name: 'Cricket NFT', boost: 1.1, description: '10% boost' }
  }

  // Purchase era boost factors
  const eraBoosts = {
    'deepsouth': { name: 'DeepSouth Era', boost: 16, description: '1,500% boost' },
    'south': { name: 'South Era', boost: 10, description: '900% boost' },
    'main': { name: 'Main Era', boost: 7, description: '600% boost' },
    'coal': { name: 'Coal Era', boost: 3.5, description: '250% boost' },
    'central': { name: 'Central Era', boost: 2, description: '100% boost' },
    'north': { name: 'North Era', boost: 1.25, description: '25% boost' }
  }

  // Reward rates (XAND per month) - separate from STOINC
  const rewardRates = {
    validator: 10000,
    pnode: 10000,
    discord: 40000
  }

  // Update pNodes when count changes
  useEffect(() => {
    const newPNodes = []
    for (let i = 0; i < pNodeCount; i++) {
      if (pNodes[i]) {
        newPNodes.push(pNodes[i])
      } else {
        newPNodes.push({
          id: i + 1,
          storageSpace: storageSpace,
          performanceScore: performanceScore,
          stake: xandStake,
          nfts: [],
          purchaseEra: purchaseEra
        })
      }
    }
    setPNodes(newPNodes)
  }, [pNodeCount])

  // Calculate storage credits for a single pNode
  const calculateStorageCredits = (pNode) => {
    return pNode.storageSpace * pNode.performanceScore * pNode.stake
  }

  // Calculate boost factor for a single pNode
  const calculatePNodeBoost = (pNode) => {
    let totalBoost = 1

    // Apply NFT boosts
    pNode.nfts.forEach(nftKey => {
      if (nftBoosts[nftKey]) {
        totalBoost *= nftBoosts[nftKey].boost
      }
    })

    // Apply purchase era boost
    if (pNode.purchaseEra && eraBoosts[pNode.purchaseEra]) {
      totalBoost *= eraBoosts[pNode.purchaseEra].boost
    }

    return totalBoost
  }

  // Calculate total storage credits across all pNodes
  const calculateTotalStorageCredits = () => {
    return pNodes.reduce((total, pNode) => {
      return total + calculateStorageCredits(pNode)
    }, 0)
  }

  // Calculate geometric mean of boost factors
  const calculateGeometricMeanBoost = () => {
    if (pNodes.length === 0) return 1
    
    const boostProduct = pNodes.reduce((product, pNode) => {
      return product * calculatePNodeBoost(pNode)
    }, 1)
    
    return Math.pow(boostProduct, 1 / pNodes.length)
  }

  // Calculate boosted credits
  const calculateBoostedCredits = () => {
    const totalCredits = calculateTotalStorageCredits()
    const geometricBoost = calculateGeometricMeanBoost()
    return totalCredits * geometricBoost
  }

  // Calculate STOINC earnings
  const calculateSTOINC = () => {
    const boostedCredits = calculateBoostedCredits()
    if (totalNetworkBoostedCredits === 0) return 0
    
    const stoinc = (boostedCredits / totalNetworkBoostedCredits) * totalFees * pNodeShare
    
    switch (timeframe) {
      case 'daily':
        return stoinc / 2 // Per epoch (2 days)
      case 'monthly':
        return stoinc * 15 // ~15 epochs per month
      case 'yearly':
        return stoinc * 182.5 // ~365 epochs per year
      default:
        return stoinc * 15
    }
  }

  // Calculate traditional rewards (separate from STOINC)
  const calculateRewards = (nodeType) => {
    if (!nodeType) return 0
    const monthlyReward = rewardRates[nodeType] * pNodeCount
    
    switch (timeframe) {
      case 'daily':
        return monthlyReward / 30
      case 'monthly':
        return monthlyReward
      case 'yearly':
        return monthlyReward * 12
      default:
        return monthlyReward
    }
  }

  const updatePNode = (index, field, value) => {
    const newPNodes = [...pNodes]
    newPNodes[index] = { ...newPNodes[index], [field]: value }
    setPNodes(newPNodes)
  }

  const togglePNodeNFT = (pNodeIndex, nftKey) => {
    const newPNodes = [...pNodes]
    const pNode = newPNodes[pNodeIndex]
    if (pNode.nfts.includes(nftKey)) {
      pNode.nfts = pNode.nfts.filter(nft => nft !== nftKey)
    } else {
      pNode.nfts = [...pNode.nfts, nftKey]
    }
    setPNodes(newPNodes)
  }

  const totalStorageCredits = calculateTotalStorageCredits()
  const geometricBoost = calculateGeometricMeanBoost()
  const boostedCredits = calculateBoostedCredits()
  const stoincEarnings = calculateSTOINC()
  const rewardEarnings = calculateRewards('pnode')
  const totalUsdValue = (rewardEarnings * xandPrice) + stoincEarnings

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="w-12 h-12 text-yellow-400 mr-3" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Advanced STOINC Calculator
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            Calculate your Storage Income (STOINC) using the complete formula with storage credits, boost factors, and NFT bonuses
          </p>
        </div>

        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="calculator">STOINC Calculator</TabsTrigger>
            <TabsTrigger value="formulas">Formulas & Math</TabsTrigger>
            <TabsTrigger value="info">Information</TabsTrigger>
          </TabsList>

          <TabsContent value="calculator">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Configuration Panel */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Parameters */}
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center text-white">
                      <Server className="w-5 h-5 mr-2" />
                      Basic Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="pNodeCount" className="text-white">Number of pNodes</Label>
                        <Input
                          id="pNodeCount"
                          type="number"
                          min="1"
                          max="10"
                          value={pNodeCount}
                          onChange={(e) => setPNodeCount(parseInt(e.target.value) || 1)}
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="timeframe" className="text-white">Timeframe</Label>
                        <Select value={timeframe} onValueChange={setTimeframe}>
                          <SelectTrigger className="bg-white/10 border-white/20 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Per Epoch (2 days)</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="yearly">Yearly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Individual pNode Configuration */}
                {pNodes.map((pNode, index) => (
                  <Card key={pNode.id} className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardHeader>
                      <CardTitle className="flex items-center text-white">
                        <Zap className="w-5 h-5 mr-2" />
                        pNode {pNode.id} Configuration
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label className="text-white">Storage Space (GB)</Label>
                          <Input
                            type="number"
                            min="1"
                            value={pNode.storageSpace}
                            onChange={(e) => updatePNode(index, 'storageSpace', parseInt(e.target.value) || 1)}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-white">Performance Score (0-1)</Label>
                          <Input
                            type="number"
                            min="0"
                            max="1"
                            step="0.1"
                            value={pNode.performanceScore}
                            onChange={(e) => updatePNode(index, 'performanceScore', parseFloat(e.target.value) || 0)}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-white">XAND Stake</Label>
                          <Input
                            type="number"
                            min="0"
                            value={pNode.stake}
                            onChange={(e) => updatePNode(index, 'stake', parseInt(e.target.value) || 0)}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                      </div>

                      {/* Purchase Era Selection */}
                      <div>
                        <Label className="text-white">Purchase Era</Label>
                        <Select 
                          value={pNode.purchaseEra} 
                          onValueChange={(value) => updatePNode(index, 'purchaseEra', value)}
                        >
                          <SelectTrigger className="bg-white/10 border-white/20 text-white">
                            <SelectValue placeholder="Select purchase era" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(eraBoosts).map(([key, era]) => (
                              <SelectItem key={key} value={key}>
                                {era.name} - {era.description}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* NFT Selection */}
                      <div>
                        <Label className="text-white mb-2 block">NFT Boosts</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(nftBoosts).map(([key, nft]) => (
                            <div key={key} className="flex items-center space-x-2">
                              <Checkbox
                                id={`${pNode.id}-${key}`}
                                checked={pNode.nfts.includes(key)}
                                onCheckedChange={() => togglePNodeNFT(index, key)}
                                className="border-white/20"
                              />
                              <Label htmlFor={`${pNode.id}-${key}`} className="text-sm text-gray-300">
                                {nft.name} ({nft.description})
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* pNode Calculations Display */}
                      <div className="bg-white/5 p-3 rounded-lg">
                        <div className="text-sm space-y-1">
                          <div className="flex justify-between">
                            <span className="text-gray-300">Storage Credits:</span>
                            <span className="text-white">{calculateStorageCredits(pNode).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Boost Factor:</span>
                            <span className="text-yellow-400">{calculatePNodeBoost(pNode).toFixed(3)}x</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Network Parameters */}
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center text-white">
                      <Users className="w-5 h-5 mr-2" />
                      Network Parameters
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Adjust network-wide parameters for STOINC calculation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label className="text-white">Total Fees (SOL)</Label>
                        <Input
                          type="number"
                          min="0"
                          value={totalFees}
                          onChange={(e) => setTotalFees(parseInt(e.target.value) || 0)}
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-white">pNode Share (%)</Label>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          step="1"
                          value={pNodeShare * 100}
                          onChange={(e) => setPNodeShare((parseInt(e.target.value) || 0) / 100)}
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-white">Network Boosted Credits</Label>
                        <Input
                          type="number"
                          min="1"
                          value={totalNetworkBoostedCredits}
                          onChange={(e) => setTotalNetworkBoostedCredits(parseInt(e.target.value) || 1)}
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-white">XAND Price (USD)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        value={xandPrice}
                        onChange={(e) => setXandPrice(parseFloat(e.target.value) || 0)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Results Panel */}
              <div className="space-y-6">
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center text-white">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      STOINC Calculation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="bg-white/5 p-3 rounded-lg">
                        <div className="text-sm space-y-1">
                          <div className="flex justify-between">
                            <span className="text-gray-300">Total Storage Credits:</span>
                            <span className="text-white">{totalStorageCredits.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Geometric Mean Boost:</span>
                            <span className="text-yellow-400">{geometricBoost.toFixed(3)}x</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Boosted Credits:</span>
                            <span className="text-green-400">{boostedCredits.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-lg border border-green-500/30">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Coins className="w-5 h-5 text-green-400 mr-2" />
                            <span className="text-white">STOINC Earnings</span>
                          </div>
                          <span className="text-2xl font-bold text-green-400">
                            {stoincEarnings.toFixed(4)} SOL
                          </span>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-4 rounded-lg border border-yellow-500/30">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Award className="w-5 h-5 text-yellow-400 mr-2" />
                            <span className="text-white">XAND Rewards</span>
                          </div>
                          <span className="text-2xl font-bold text-yellow-400">
                            {rewardEarnings.toLocaleString()} XAND
                          </span>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 rounded-lg border border-purple-500/30">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <TrendingUp className="w-5 h-5 text-purple-400 mr-2" />
                            <span className="text-white">Total USD Value</span>
                          </div>
                          <span className="text-2xl font-bold text-purple-400">
                            ${totalUsdValue.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-gray-400 space-y-1">
                      <p>* STOINC paid in SOL from sedApp fees</p>
                      <p>* XAND rewards are separate and paid monthly</p>
                      <p>* Calculations update every epoch (~2 days)</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="formulas">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Calculator className="w-5 h-5 mr-2" />
                    Storage Credits Formula
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-300">
                  <div className="bg-black/20 p-4 rounded-lg font-mono text-sm">
                    <div className="text-center text-white mb-2">storageCredits = pNodes × storageSpace × performanceScore × stake</div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-white font-semibold">Key Factors:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>pNodes:</strong> Number of pNodes owned</li>
                      <li>• <strong>storageSpace:</strong> Total storage capacity (GB)</li>
                      <li>• <strong>performanceScore:</strong> Network-measured performance (0-1)</li>
                      <li>• <strong>stake:</strong> Amount of XAND staked</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Zap className="w-5 h-5 mr-2" />
                    Boost Factors Formula
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-300">
                  <div className="bg-black/20 p-4 rounded-lg font-mono text-sm">
                    <div className="text-center text-white mb-2">boostedCredits = storageCredits × (boost₁ × boost₂ × ... × boostₙ)^(1/n)</div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-white font-semibold">Boost Sources:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>NFTs:</strong> Titan (11x), Dragon (4x), Coyote (2.5x), etc.</li>
                      <li>• <strong>Purchase Eras:</strong> DeepSouth (16x), South (10x), Main (7x), etc.</li>
                      <li>• <strong>Geometric Mean:</strong> Prevents single high-boost dominance</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Crown className="w-5 h-5 mr-2" />
                    Final STOINC Formula
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-300">
                  <div className="bg-black/20 p-4 rounded-lg font-mono text-sm">
                    <div className="text-center text-white mb-2">STOINC = (boostedCredits / totalBoostedCredits) × totalFees × pNodeShare</div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-white font-semibold">Variables:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>totalFees:</strong> All storage fees collected (SOL)</li>
                      <li>• <strong>pNodeShare:</strong> Percentage allocated to pNodes (e.g., 94%)</li>
                      <li>• <strong>totalBoostedCredits:</strong> Sum across all network participants</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Info className="w-5 h-5 mr-2" />
                    Example Calculation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-300">
                  <div className="bg-black/20 p-4 rounded-lg text-sm">
                    <div className="space-y-2">
                      <div className="text-white">3 pNodes, 100,000 storageCredits:</div>
                      <div>• pNode 1: 1.5x boost (50%)</div>
                      <div>• pNode 2: 1.0x boost (0%)</div>
                      <div>• pNode 3: 2.0x boost (100%)</div>
                      <div className="text-green-400 mt-2">
                        boostedCredits = 100,000 × (1.5 × 1.0 × 2.0)^(1/3) ≈ 144,225
                      </div>
                      <div className="text-yellow-400">
                        Average boost: 44.225%
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="info">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Coins className="w-5 h-5 mr-2" />
                    Rewards vs STOINC
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-300">
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-white font-semibold mb-2">XAND Rewards (Fixed)</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Validator Nodes: 10,000 XAND/month</li>
                        <li>• pNode Operators: 10,000 XAND/month</li>
                        <li>• Discord Moderators: 40,000 XAND/month</li>
                        <li>• Paid in locked XAND tokens</li>
                        <li>• Funded by Xandeum Foundation</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-semibold mb-2">STOINC (Variable)</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Paid in SOL from sedApp fees</li>
                        <li>• Based on storage credits and boosts</li>
                        <li>• Calculated every epoch (~2 days)</li>
                        <li>• Proportional to network contribution</li>
                        <li>• Can vary significantly based on usage</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Crown className="w-5 h-5 mr-2" />
                    NFT & Era Boosts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-300">
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-white font-semibold mb-2">Top NFT Boosts</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Titan NFT</span>
                          <span className="text-yellow-400">1,000% boost</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Dragon NFT</span>
                          <span className="text-yellow-400">300% boost</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Coyote NFT</span>
                          <span className="text-yellow-400">150% boost</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-semibold mb-2">Purchase Era Boosts</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>DeepSouth Era</span>
                          <span className="text-green-400">1,500% boost</span>
                        </div>
                        <div className="flex justify-between">
                          <span>South Era</span>
                          <span className="text-green-400">900% boost</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Main Era</span>
                          <span className="text-green-400">600% boost</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default App

