import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Calculator, Coins, Server, Users, TrendingUp, Info } from 'lucide-react'
import './App.css'

function App() {
  const [nodeType, setNodeType] = useState('')
  const [nodeCount, setNodeCount] = useState(1)
  const [storageAmount, setStorageAmount] = useState(0)
  const [timeframe, setTimeframe] = useState('monthly')
  const [xandPrice, setXandPrice] = useState(0.1)

  // Reward rates (XAND per month)
  const rewardRates = {
    validator: 10000,
    pnode: 10000,
    discord: 40000
  }

  // Calculate rewards
  const calculateRewards = () => {
    if (!nodeType) return 0
    const monthlyReward = rewardRates[nodeType] * nodeCount
    
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

  // Calculate storage income (simplified calculation)
  const calculateStorageIncome = () => {
    if (nodeType !== 'pnode') return 0
    // Simplified calculation: assume $0.01 per GB per month
    const monthlyStorageIncome = storageAmount * 0.01 * nodeCount
    
    switch (timeframe) {
      case 'daily':
        return monthlyStorageIncome / 30
      case 'monthly':
        return monthlyStorageIncome
      case 'yearly':
        return monthlyStorageIncome * 12
      default:
        return monthlyStorageIncome
    }
  }

  const totalXandRewards = calculateRewards()
  const totalStorageIncome = calculateStorageIncome()
  const totalUsdValue = (totalXandRewards * xandPrice) + totalStorageIncome

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="w-12 h-12 text-yellow-400 mr-3" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Xandeum STOINC Calculator
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Calculate your potential rewards and storage income from participating in the Xandeum Devnet
          </p>
        </div>

        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="info">Information</TabsTrigger>
          </TabsList>

          <TabsContent value="calculator">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Panel */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Server className="w-5 h-5 mr-2" />
                    Configuration
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Configure your node setup and parameters
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="nodeType" className="text-white">Node Type</Label>
                    <Select value={nodeType} onValueChange={setNodeType}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select node type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="validator">Validator Node</SelectItem>
                        <SelectItem value="pnode">pNode</SelectItem>
                        <SelectItem value="discord">Discord Moderator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nodeCount" className="text-white">Number of Nodes</Label>
                    <Input
                      id="nodeCount"
                      type="number"
                      min="1"
                      value={nodeCount}
                      onChange={(e) => setNodeCount(parseInt(e.target.value) || 1)}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>

                  {nodeType === 'pnode' && (
                    <div className="space-y-2">
                      <Label htmlFor="storageAmount" className="text-white">Storage Amount (GB)</Label>
                      <Input
                        id="storageAmount"
                        type="number"
                        min="0"
                        value={storageAmount}
                        onChange={(e) => setStorageAmount(parseInt(e.target.value) || 0)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="timeframe" className="text-white">Timeframe</Label>
                    <Select value={timeframe} onValueChange={setTimeframe}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="xandPrice" className="text-white">XAND Price (USD)</Label>
                    <Input
                      id="xandPrice"
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

              {/* Results Panel */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Earnings Projection
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Your potential earnings based on current configuration
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-4 rounded-lg border border-yellow-500/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Coins className="w-5 h-5 text-yellow-400 mr-2" />
                          <span className="text-white">XAND Rewards</span>
                        </div>
                        <span className="text-2xl font-bold text-yellow-400">
                          {totalXandRewards.toLocaleString()} XAND
                        </span>
                      </div>
                    </div>

                    {nodeType === 'pnode' && (
                      <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-lg border border-green-500/30">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Server className="w-5 h-5 text-green-400 mr-2" />
                            <span className="text-white">Storage Income</span>
                          </div>
                          <span className="text-2xl font-bold text-green-400">
                            ${totalStorageIncome.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    )}

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

                  <div className="text-sm text-gray-400 space-y-1">
                    <p>* Rewards are paid in locked XAND tokens</p>
                    <p>* Storage income estimates are simplified</p>
                    <p>* Actual earnings may vary based on network conditions</p>
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
                    Rewards Program
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-300">
                  <p>The Rewards Program supports those who help keep the Xandeum Devnet running smoothly. Rewards are paid in locked XAND tokens and funded by the Xandeum Foundation.</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <span>Validator Node Operators</span>
                      <span className="text-yellow-400 font-semibold">10,000 XAND/month</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <span>pNode Operators</span>
                      <span className="text-yellow-400 font-semibold">10,000 XAND/month</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <span>Discord Moderators</span>
                      <span className="text-yellow-400 font-semibold">40,000 XAND/month</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Server className="w-5 h-5 mr-2" />
                    Storage Income (STOINC)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-300">
                  <p>Storage Income can be earned by running pNodes, funded by fees from sedApps (storage-enabled applications). This provides substantial income for pNode owners.</p>
                  
                  <div className="bg-white/5 p-4 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">Key Features:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Earn from storage fees paid by applications</li>
                      <li>• Income scales with storage capacity</li>
                      <li>• Paid in USD equivalent</li>
                      <li>• Passive income opportunity</li>
                    </ul>
                  </div>
                  
                  <div className="text-sm text-yellow-400">
                    <Info className="w-4 h-4 inline mr-1" />
                    This is a draft that will be revised multiple times
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

