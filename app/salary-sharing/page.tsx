'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  TrendingUp,
  Shield,
  Search,
  Filter,
  BarChart3,
  PieChart,
  Award,
  MapPin,
  Building,
  Clock,
  CheckCircle2,
  Plus,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GlassCard } from '@/components/shared/glass-card';
import { SalarySharingForm } from '@/components/salary-sharing/salary-sharing-form';
import { formatCurrency } from '@/lib/utils/format-currency';
import type { SalaryShare, SalaryStatistics } from '@/types/salary-sharing';
import {
  INDUSTRY_CATEGORIES,
  COMPANY_SIZE_CATEGORIES,
} from '@/types/salary-sharing';
import {
  getAllSalaryShares,
  getSalaryStatistics,
  searchSalaryShares,
  saveSalaryShare,
} from '@/lib/storage/salary-sharing-storage';
import type { SalaryShareForm } from '@/types/salary-sharing';

export default function SalarySharingPage() {
  const [showForm, setShowForm] = useState(false);
  const [shares, setShares] = useState<SalaryShare[]>([]);
  const [statistics, setStatistics] = useState<SalaryStatistics | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    industry: '',
    location: '',
    companySize: '',
    experienceMin: 0,
    experienceMax: 50,
  });

  useEffect(() => {
    loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const loadData = () => {
    const allShares = searchSalaryShares(filters);
    setShares(allShares);
    setStatistics(getSalaryStatistics());
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term) {
      const filtered = searchSalaryShares({
        ...filters,
        position: term,
      });
      setShares(filtered);
    } else {
      loadData();
    }
  };

  const handleSubmitShare = async (data: SalaryShareForm) => {
    const newShare = saveSalaryShare(data);
    setShowForm(false);
    loadData();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
      },
    },
  };

  if (showForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
        <div className="container mx-auto py-8">
          <Button
            variant="outline"
            onClick={() => setShowForm(false)}
            className="mb-4 bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            ← Back to Overview
          </Button>
          <SalarySharingForm onSubmit={handleSubmitShare} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            Anonymous Salary Sharing
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Share your salary anonymously and compare with real market data from professionals in Vietnam
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <Button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8"
            >
              <Plus className="h-4 w-4 mr-2" />
              Share Your Salary
            </Button>
            <Button
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Eye className="h-4 w-4 mr-2" />
              Browse Data
            </Button>
          </div>
        </motion.div>

        {/* Statistics Cards */}
        {statistics && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-4 gap-6 mb-12"
          >
            <motion.div variants={itemVariants}>
              <GlassCard className="p-6 text-center">
                <Users className="h-12 w-12 text-blue-300 mx-auto mb-3" />
                <h3 className="text-3xl font-bold text-white mb-1">
                  {statistics.totalShares.toLocaleString()}
                </h3>
                <p className="text-white/60">Total Shares</p>
              </GlassCard>
            </motion.div>

            <motion.div variants={itemVariants}>
              <GlassCard className="p-6 text-center">
                <CheckCircle2 className="h-12 w-12 text-green-300 mx-auto mb-3" />
                <h3 className="text-3xl font-bold text-white mb-1">
                  {statistics.verifiedShares.toLocaleString()}
                </h3>
                <p className="text-white/60">Verified</p>
              </GlassCard>
            </motion.div>

            <motion.div variants={itemVariants}>
              <GlassCard className="p-6 text-center">
                <TrendingUp className="h-12 w-12 text-purple-300 mx-auto mb-3" />
                <h3 className="text-3xl font-bold text-white mb-1">
                  {formatCurrency(statistics.benefitsStats.averageBenefitsValue)}
                </h3>
                <p className="text-white/60">Avg Benefits</p>
              </GlassCard>
            </motion.div>

            <motion.div variants={itemVariants}>
              <GlassCard className="p-6 text-center">
                <Award className="h-12 w-12 text-yellow-300 mx-auto mb-3" />
                <h3 className="text-3xl font-bold text-white mb-1">
                  {statistics.satisfactionStats.overallAverage.toFixed(1)}/10
                </h3>
                <p className="text-white/60">Avg Satisfaction</p>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}

        {/* Search and Filters */}
        <GlassCard className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
                <Input
                  placeholder="Search positions, companies..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/50"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Select value={filters.industry} onValueChange={(value) => setFilters({ ...filters, industry: value })}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white w-48">
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Industries</SelectItem>
                  {INDUSTRY_CATEGORIES.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.companySize} onValueChange={(value) => setFilters({ ...filters, companySize: value })}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white w-48">
                  <SelectValue placeholder="Company Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Sizes</SelectItem>
                  {COMPANY_SIZE_CATEGORIES.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </GlassCard>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 border-white/20">
            <TabsTrigger value="overview" className="text-white data-[state=active]:bg-white/20">
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="positions" className="text-white data-[state=active]:bg-white/20">
              <Users className="h-4 w-4 mr-2" />
              Positions
            </TabsTrigger>
            <TabsTrigger value="industries" className="text-white data-[state=active]:bg-white/20">
              <Building className="h-4 w-4 mr-2" />
              Industries
            </TabsTrigger>
            <TabsTrigger value="locations" className="text-white data-[state=active]:bg-white/20">
              <MapPin className="h-4 w-4 mr-2" />
              Locations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {statistics && (
              <div className="grid md:grid-cols-2 gap-6">
                {/* Top Positions */}
                <GlassCard className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Highest Paying Positions
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(statistics.positionStats)
                      .sort(([, a], [, b]) => b.averageSalary - a.averageSalary)
                      .slice(0, 5)
                      .map(([position, stats], index) => (
                        <div key={position} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-white/60 w-6">{index + 1}</span>
                            <span className="text-white">{position}</span>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-semibold">
                              {formatCurrency(stats.averageSalary)}
                            </p>
                            <p className="text-white/60 text-xs">
                              {stats.count} shares
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </GlassCard>

                {/* Industry Overview */}
                <GlassCard className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Industry Overview
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(statistics.industryStats)
                      .sort(([, a], [, b]) => b.count - a.count)
                      .slice(0, 5)
                      .map(([industry, stats]) => (
                        <div key={industry} className="flex items-center justify-between">
                          <span className="text-white">{industry}</span>
                          <div className="text-right">
                            <p className="text-white font-semibold">
                              {formatCurrency(stats.averageSalary)}
                            </p>
                            <p className="text-white/60 text-xs">
                              {stats.count} shares
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </GlassCard>
              </div>
            )}

            {/* Recent Shares */}
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Recent Salary Shares</h3>
              <div className="space-y-4">
                {shares.slice(0, 10).map((share, index) => (
                  <div key={share.id} className="border-b border-white/10 pb-4 last:border-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-white font-semibold">{share.position.title}</h4>
                        <p className="text-white/60">{share.companyInfo.industry} • {share.companyInfo.location}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge variant="outline" className="bg-white/10 text-white">
                            {share.companyInfo.size}
                          </Badge>
                          <Badge variant="outline" className="bg-white/10 text-white">
                            {share.experience.totalYears} years exp
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-green-300">
                          {formatCurrency(share.compensation.totalCompensation)}
                        </p>
                        <p className="text-white/60 text-sm">total/month</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </TabsContent>

          <TabsContent value="positions" className="space-y-6">
            {statistics && (
              <GlassCard className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Salary by Position</h3>
                <div className="space-y-4">
                  {Object.entries(statistics.positionStats)
                    .sort(([, a], [, b]) => b.averageSalary - a.averageSalary)
                    .map(([position, stats]) => (
                      <Card key={position} className="bg-white/5 border-white/10">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-white font-semibold">{position}</h4>
                              <p className="text-white/60 text-sm">
                                {stats.count} data points • Range: {stats.salaryRange}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-green-300">
                                {formatCurrency(stats.averageSalary)}
                              </p>
                              <p className="text-white/60 text-sm">
                                Median: {formatCurrency(stats.medianSalary)}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </GlassCard>
            )}
          </TabsContent>

          <TabsContent value="industries" className="space-y-6">
            {statistics && (
              <GlassCard className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Salary by Industry</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(statistics.industryStats).map(([industry, stats]) => (
                    <Card key={industry} className="bg-white/5 border-white/10">
                      <CardContent className="p-4">
                        <h4 className="text-white font-semibold mb-3">{industry}</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-white/60">Average Salary</span>
                            <span className="text-white font-semibold">
                              {formatCurrency(stats.averageSalary)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/60">Median Salary</span>
                            <span className="text-white">
                              {formatCurrency(stats.medianSalary)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/60">Data Points</span>
                            <span className="text-white">{stats.count}</span>
                          </div>
                        </div>
                        {stats.topPositions.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-white/10">
                            <p className="text-white/60 text-sm mb-2">Top Positions:</p>
                            <div className="space-y-1">
                              {stats.topPositions.slice(0, 3).map((pos) => (
                                <div key={pos.position} className="flex justify-between text-sm">
                                  <span className="text-white/80">{pos.position}</span>
                                  <span className="text-white">{formatCurrency(pos.salary)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </GlassCard>
            )}
          </TabsContent>

          <TabsContent value="locations" className="space-y-6">
            {statistics && (
              <GlassCard className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Salary by Location</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(statistics.locationStats).map(([location, stats]) => (
                    <Card key={location} className="bg-white/5 border-white/10">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <MapPin className="h-4 w-4 text-white/60" />
                          <h4 className="text-white font-semibold">{location}</h4>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-white/60">Average</span>
                            <span className="text-white font-semibold">
                              {formatCurrency(stats.averageSalary)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/60">Median</span>
                            <span className="text-white">
                              {formatCurrency(stats.medianSalary)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/60">CoL Index</span>
                            <span className="text-white">
                              {(stats.costOfLivingIndex * 100).toFixed(0)}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/60">Real Wage</span>
                            <span className="text-white">
                              {stats.realWageIndex.toFixed(2)}x
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </GlassCard>
            )}
          </TabsContent>
        </Tabs>

        {/* Privacy Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <GlassCard className="p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="h-6 w-6 text-blue-300" />
              <h3 className="text-xl font-semibold text-white">Privacy Guaranteed</h3>
            </div>
            <p className="text-white/80">
              All salary data is anonymized and aggregated. We never share personal information.
              Your contribution helps build transparency in the Vietnamese job market.
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}