'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FEATURE_ROADMAP, getFeaturesByCategory, getImplementationQueue } from '@/lib/features/feature-roadmap';
import { IMPLEMENTATION_PLAN, calculateProgress, SUCCESS_METRICS } from '@/lib/features/feature-planning';
import { Calendar, Clock, TrendingUp, AlertTriangle, CheckCircle2, Target, Zap } from 'lucide-react';

const priorityColors = {
  'must-have': 'bg-red-500',
  'high': 'bg-orange-500',
  'medium': 'bg-yellow-500',
  'low': 'bg-green-500'
};

const complexityColors = {
  'low': 'text-green-600',
  'medium': 'text-yellow-600',
  'high': 'text-orange-600',
  'very-high': 'text-red-600'
};

export default function RoadmapPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const progress = calculateProgress();
  const next30Days = getImplementationQueue(12);

  const categories = ['all', ...Array.from(new Set(FEATURE_ROADMAP.map(f => f.category)))];
  const filteredFeatures = selectedCategory === 'all'
    ? FEATURE_ROADMAP
    : getFeaturesByCategory(selectedCategory);

  const stats = {
    total: FEATURE_ROADMAP.length,
    completed: FEATURE_ROADMAP.filter(f => f.status === 'completed').length,
    inProgress: FEATURE_ROADMAP.filter(f => f.status === 'in-progress').length,
    planned: FEATURE_ROADMAP.filter(f => f.status === 'planned').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            🚀 SalaryCalc VN Feature Roadmap
          </h1>
          <p className="text-lg text-slate-600">
            Building the ultimate salary calculator for Vietnamese professionals
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Features</p>
                  <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
                </div>
                <Target className="h-8 w-8 text-slate-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Completed</p>
                  <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">In Progress</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.inProgress}</p>
                </div>
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Planned</p>
                  <p className="text-3xl font-bold text-slate-600">{stats.planned}</p>
                </div>
                <Calendar className="h-8 w-8 text-slate-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Bar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Overall Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={(stats.completed / stats.total) * 100} className="h-3" />
            <p className="text-sm text-slate-600 mt-2">
              {stats.completed} of {stats.total} features completed ({Math.round((stats.completed / stats.total) * 100)}%)
            </p>
          </CardContent>
        </Card>

        <Tabs defaultValue="roadmap" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
            <TabsTrigger value="sprints">Sprints</TabsTrigger>
            <TabsTrigger value="next30">Next 30 Days</TabsTrigger>
            <TabsTrigger value="metrics">Success Metrics</TabsTrigger>
          </TabsList>

          {/* Features Roadmap */}
          <TabsContent value="roadmap" className="space-y-4">
            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                    selectedCategory === cat
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFeatures.map(feature => (
                <Card key={feature.id} className="relative overflow-hidden">
                  <div className={`h-1 ${priorityColors[feature.priority]}`} />
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{feature.name}</CardTitle>
                      <Badge variant={feature.status === 'completed' ? 'default' : 'secondary'}>
                        {feature.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600">{feature.description}</p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Priority</span>
                        <Badge variant="outline" className={priorityColors[feature.priority]}>
                          {feature.priority}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Complexity</span>
                        <span className={complexityColors[feature.complexity]}>
                          {feature.complexity}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Est. Time</span>
                        <span>{feature.estimatedWeeks} weeks</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Value: </span>
                        <span className="text-slate-600">{feature.value}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Sprints */}
          <TabsContent value="sprints" className="space-y-6">
            {IMPLEMENTATION_PLAN.map((sprint, index) => (
              <Card key={sprint.sprint}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Sprint {sprint.sprint}: {sprint.duration} weeks
                  </CardTitle>
                  {sprint.notes && (
                    <p className="text-sm text-slate-600 mt-2">{sprint.notes}</p>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-medium text-green-600 mb-2">Planned ({sprint.features.planned.length})</h4>
                      <ul className="text-sm space-y-1">
                        {sprint.features.planned.map(feature => (
                          <li key={feature} className="text-slate-600">• {feature}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-600 mb-2">In Progress ({sprint.features.inProgress.length})</h4>
                      <ul className="text-sm space-y-1">
                        {sprint.features.inProgress.map(feature => (
                          <li key={feature} className="text-slate-600">• {feature}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-600 mb-2">Completed ({sprint.features.completed.length})</h4>
                      <ul className="text-sm space-y-1">
                        {sprint.features.completed.map(feature => (
                          <li key={feature} className="text-slate-600">• {feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Next 30 Days */}
          <TabsContent value="next30" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Next 30 Days Implementation Queue</CardTitle>
                <p className="text-sm text-slate-600">
                  Features prioritized by impact and complexity. Total: {next30Days.reduce((sum, f) => sum + f.estimatedWeeks, 0)} weeks
                </p>
              </CardHeader>
            </Card>

            <div className="space-y-4">
              {next30Days.map((feature, index) => (
                <Card key={feature.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-lg font-bold text-slate-400">#{index + 1}</span>
                          <h3 className="text-lg font-semibold">{feature.name}</h3>
                          <Badge variant="outline" className={priorityColors[feature.priority]}>
                            {feature.priority}
                          </Badge>
                        </div>
                        <p className="text-slate-600 mb-3">{feature.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {feature.estimatedWeeks} weeks
                          </span>
                          <span className={complexityColors[feature.complexity]}>
                            {feature.complexity} complexity
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Success Metrics */}
          <TabsContent value="metrics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(SUCCESS_METRICS).map(([feature, metrics]) => (
                <Card key={feature}>
                  <CardHeader>
                    <CardTitle className="capitalize">{feature.replace(/-/g, ' ')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(metrics).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-sm text-slate-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}