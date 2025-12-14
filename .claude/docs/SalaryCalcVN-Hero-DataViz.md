# 🎨 SalaryCalc VN - Hero Section với Data & Visualization

> Hero section nâng cao với animated statistics, live charts, floating data cards, và Glass UI

---

## 📋 MỤC LỤC

- [Enhanced Hero Component](#-enhanced-hero-component)
- [Animated Statistics](#-animated-statistics)
- [Mini Charts & Visualizations](#-mini-charts--visualizations)
- [Floating Data Cards](#-floating-data-cards)
- [Interactive Elements](#-interactive-elements)
- [Complete Examples](#-complete-examples)

---

## 🚀 ENHANCED HERO COMPONENT

### **Complete Hero với Data Viz**

**File: `components/landing/hero-section.tsx`**
```typescript
'use client';

import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { 
  TrendingUp, 
  Calculator, 
  Users, 
  Clock,
  ArrowRight,
  Sparkles,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { AnimatedCounter } from './animated-counter';
import { MiniLineChart } from './mini-line-chart';
import { MiniPieChart } from './mini-pie-chart';
import { FloatingDataCard } from './floating-data-card';

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Animated Background Elements */}
      <BackgroundElements />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                         bg-white/10 backdrop-blur-md border border-white/20 mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span className="text-white/90 text-sm font-medium">
                #1 Công cụ tính lương tại Việt Nam
              </span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Công cụ tính lương{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                miễn phí
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
              Chính xác nhất cho người lao động Việt Nam
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <StatCard
                icon={<Users className="h-5 w-5" />}
                value={50000}
                suffix="+"
                label="Người dùng"
                delay={0.3}
              />
              <StatCard
                icon={<Calculator className="h-5 w-5" />}
                value={250000}
                suffix="+"
                label="Tính toán"
                delay={0.4}
              />
              <StatCard
                icon={<Clock className="h-5 w-5" />}
                value={99.9}
                suffix="%"
                label="Chính xác"
                delay={0.5}
              />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="
                  bg-gradient-to-r from-purple-600 to-pink-600
                  hover:from-purple-700 hover:to-pink-700
                  text-white font-bold text-lg
                  px-8 py-6
                  shadow-2xl hover:shadow-purple-500/50
                  group
                "
              >
                🚀 Bắt đầu tính toán
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="
                  border-2 border-white/30 text-white
                  hover:bg-white/10
                  font-semibold
                  px-8 py-6
                "
              >
                📊 Xem demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <motion.div
              className="mt-8 flex items-center gap-6 text-white/60 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white/20"
                    />
                  ))}
                </div>
                <span>2,500+ đánh giá 5 sao</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-green-400" />
                <span>Live updates</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side: Data Visualization */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <DataVisualization />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Stat Card Component
function StatCard({ icon, value, suffix, label, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <GlassCard variant="subtle" className="p-4 text-center">
        <div className="text-purple-400 mb-2 flex justify-center">
          {icon}
        </div>
        <div className="text-2xl font-bold text-white mb-1">
          <AnimatedCounter end={value} suffix={suffix} />
        </div>
        <div className="text-xs text-white/60">{label}</div>
      </GlassCard>
    </motion.div>
  );
}
```

---

## 📊 DATA VISUALIZATION COMPONENT

### **Main Visualization Area**

```typescript
function DataVisualization() {
  return (
    <div className="relative h-[600px]">
      {/* Main Chart Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <GlassCard variant="strong" className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">
                Salary Trends 2024
              </h3>
              <p className="text-sm text-white/60">
                Theo dõi biến động lương thị trường
              </p>
            </div>
            <div className="px-3 py-1 rounded-full bg-green-500/20 border border-green-400/30">
              <span className="text-green-400 text-sm font-medium">
                +12.5% YoY
              </span>
            </div>
          </div>

          {/* Main Chart */}
          <div className="h-64 mb-4">
            <SalaryTrendChart />
          </div>

          {/* Mini Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            <MiniStatCard
              icon={<TrendingUp className="h-4 w-4 text-green-400" />}
              label="Avg Gross"
              value="25.5M"
              change="+8%"
              positive
            />
            <MiniStatCard
              icon={<PieChart className="h-4 w-4 text-blue-400" />}
              label="Avg Net"
              value="20.2M"
              change="+7%"
              positive
            />
            <MiniStatCard
              icon={<BarChart3 className="h-4 w-4 text-purple-400" />}
              label="Tax Rate"
              value="15.3%"
              change="-0.5%"
              positive
            />
          </div>
        </GlassCard>
      </motion.div>

      {/* Floating Data Cards */}
      <FloatingDataCard
        position={{ top: '10%', right: '-10%' }}
        delay={0.6}
        icon={<Calculator className="h-5 w-5 text-blue-400" />}
        title="Active Users"
        value="2,847"
        subtitle="Calculating now"
        trend="+23%"
      />

      <FloatingDataCard
        position={{ bottom: '20%', left: '-15%' }}
        delay={0.8}
        icon={<Activity className="h-5 w-5 text-green-400" />}
        title="Avg Salary"
        value="₫28.5M"
        subtitle="Tech sector"
        trend="+15%"
        chartData={[20, 25, 22, 28, 26, 30, 28.5]}
      />

      <FloatingDataCard
        position={{ top: '60%', right: '-8%' }}
        delay={1.0}
        icon={<TrendingUp className="h-5 w-5 text-purple-400" />}
        title="Growth Rate"
        value="12.5%"
        subtitle="This quarter"
        pieData={[65, 35]}
      />
    </div>
  );
}

// Mini Stat Card
function MiniStatCard({ icon, label, value, change, positive }: any) {
  return (
    <div className="p-3 rounded-lg bg-white/5 border border-white/10">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-xs text-white/60">{label}</span>
      </div>
      <div className="text-lg font-bold text-white mb-1">{value}</div>
      <div className={`text-xs font-medium ${positive ? 'text-green-400' : 'text-red-400'}`}>
        {change}
      </div>
    </div>
  );
}
```

---

## 🔢 ANIMATED COUNTER COMPONENT

```typescript
'use client';

import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export function AnimatedCounter({
  end,
  duration = 2,
  suffix = '',
  prefix = '',
  decimals = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const element = ref.current;
    if (!element) return;

    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const updateCounter = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (endTime - startTime), 1);
      
      // Easing function (easeOutCubic)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      const currentValue = end * easeProgress;
      const displayValue = decimals > 0 
        ? currentValue.toFixed(decimals)
        : Math.floor(currentValue).toLocaleString('en-US');

      element.textContent = `${prefix}${displayValue}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    updateCounter();
  }, [end, duration, suffix, prefix, decimals, isInView]);

  return <span ref={ref}>0</span>;
}
```

---

## 📈 SALARY TREND CHART COMPONENT

```typescript
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

export function SalaryTrendChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // Simulate real-time data
    const generateData = () => {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return months.map((month, index) => ({
        month,
        gross: 20 + index * 1.2 + Math.random() * 2,
        net: 16 + index * 0.9 + Math.random() * 1.5,
      }));
    };

    setData(generateData());

    // Update data every 3 seconds for "live" effect
    const interval = setInterval(() => {
      setData(generateData());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="grossGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="netGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
        </defs>
        
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        
        <XAxis
          dataKey="month"
          stroke="rgba(255,255,255,0.5)"
          style={{ fontSize: '12px' }}
        />
        
        <YAxis
          stroke="rgba(255,255,255,0.5)"
          style={{ fontSize: '12px' }}
          tickFormatter={(value) => `${value}M`}
        />
        
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(0,0,0,0.8)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '8px',
            backdropFilter: 'blur(10px)',
          }}
          labelStyle={{ color: '#fff' }}
        />
        
        <Area
          type="monotone"
          dataKey="gross"
          stroke="#8b5cf6"
          strokeWidth={2}
          fill="url(#grossGradient)"
          animationDuration={1500}
        />
        
        <Area
          type="monotone"
          dataKey="net"
          stroke="#10b981"
          strokeWidth={2}
          fill="url(#netGradient)"
          animationDuration={1500}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
```

---

## 💫 FLOATING DATA CARD COMPONENT

```typescript
'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { MiniSparkline } from './mini-sparkline';
import { MiniDonut } from './mini-donut';

interface FloatingDataCardProps {
  position: { top?: string; bottom?: string; left?: string; right?: string };
  delay?: number;
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
  trend?: string;
  chartData?: number[];
  pieData?: number[];
}

export function FloatingDataCard({
  position,
  delay = 0,
  icon,
  title,
  value,
  subtitle,
  trend,
  chartData,
  pieData,
}: FloatingDataCardProps) {
  return (
    <motion.div
      className="absolute hidden lg:block"
      style={position}
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
      }}
      transition={{ 
        delay,
        duration: 0.5,
      }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <GlassCard variant="strong" className="p-4 min-w-[200px]">
          <div className="flex items-start justify-between mb-3">
            <div className="p-2 rounded-lg bg-white/10">
              {icon}
            </div>
            {trend && (
              <div className="px-2 py-1 rounded-full bg-green-500/20 border border-green-400/30">
                <span className="text-green-400 text-xs font-medium">
                  {trend}
                </span>
              </div>
            )}
          </div>

          <div className="text-xs text-white/60 mb-1">{title}</div>
          <div className="text-2xl font-bold text-white mb-1">{value}</div>
          <div className="text-xs text-white/50">{subtitle}</div>

          {/* Mini Chart */}
          {chartData && (
            <div className="mt-3 h-12">
              <MiniSparkline data={chartData} />
            </div>
          )}

          {/* Mini Pie */}
          {pieData && (
            <div className="mt-3">
              <MiniDonut data={pieData} />
            </div>
          )}
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}
```

---

## ✨ MINI SPARKLINE COMPONENT

```typescript
'use client';

import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface MiniSparklineProps {
  data: number[];
  color?: string;
}

export function MiniSparkline({ data, color = '#10b981' }: MiniSparklineProps) {
  const chartData = data.map((value, index) => ({ value, index }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={false}
          animationDuration={1000}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
```

---

## 🍩 MINI DONUT CHART COMPONENT

```typescript
'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface MiniDonutProps {
  data: number[];
  colors?: string[];
}

export function MiniDonut({ 
  data, 
  colors = ['#8b5cf6', '#ec4899'] 
}: MiniDonutProps) {
  const chartData = data.map((value, index) => ({
    value,
    name: `Segment ${index + 1}`,
  }));

  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              innerRadius={14}
              outerRadius={20}
              startAngle={90}
              endAngle={-270}
              animationDuration={1000}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex-1">
        <div className="text-xs text-white/60 mb-1">Completion</div>
        <div className="text-sm font-bold text-white">{data[0]}%</div>
      </div>
    </div>
  );
}
```

---

## 🌟 BACKGROUND ELEMENTS

```typescript
function BackgroundElements() {
  return (
    <>
      {/* Gradient Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-20 animate-pulse" 
           style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-orange-500 rounded-full blur-3xl opacity-10 animate-pulse"
           style={{ animationDelay: '2s' }} />

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [null, Math.random() * window.innerHeight],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
    </>
  );
}
```

---

## 🎨 COMPLETE HERO EXAMPLE

```typescript
// app/page.tsx
import { HeroSection } from '@/components/landing/hero-section';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      <HeroSection />
      {/* Other sections */}
    </div>
  );
}
```

---

## 📊 ALTERNATIVE: STATS DASHBOARD STYLE

```typescript
export function HeroWithDashboard() {
  return (
    <section className="relative min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Top: Main Message */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6">
            Công cụ tính lương <span className="text-yellow-400">miễn phí</span>
          </h1>
          <p className="text-xl text-white/80 mb-8">
            Được tin dùng bởi 50,000+ người lao động Việt Nam
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <DashboardCard
            icon={<Users className="h-6 w-6 text-blue-800" />}
            title="Active Users"
            value={50247}
            change="+12.5%"
            sparkline={[45, 48, 50, 47, 50, 52, 50.2]}
          />
          
          <DashboardCard
            icon={<Calculator className="h-6 w-6 text-green-400" />}
            title="Calculations Today"
            value={8934}
            change="+23.1%"
            sparkline={[80, 85, 82, 88, 86, 90, 89.3]}
          />
          
          <DashboardCard
            icon={<TrendingUp className="h-6 w-6 text-purple-400" />}
            title="Avg Salary"
            value="28.5M"
            change="+8.2%"
            sparkline={[20, 22, 25, 24, 26, 27, 28.5]}
          />
          
          <DashboardCard
            icon={<Activity className="h-6 w-6 text-pink-400" />}
            title="Accuracy Rate"
            value="99.9%"
            change="+0.1%"
            donut={[99.9, 0.1]}
          />
        </div>

        {/* Large Chart */}
        <GlassCard variant="strong" className="p-8">
          <h3 className="text-2xl font-bold text-white mb-6">
            Salary Trends - Last 12 Months
          </h3>
          <div className="h-96">
            <SalaryTrendChart />
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

function DashboardCard({ icon, title, value, change, sparkline, donut }: any) {
  return (
    <GlassCard variant="strong" className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-lg bg-white/10">
          {icon}
        </div>
        <div className={`text-sm font-medium ${change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
          {change}
        </div>
      </div>

      <div className="text-sm text-white/60 mb-2">{title}</div>
      <div className="text-3xl font-bold text-white mb-4">
        {typeof value === 'number' ? (
          <AnimatedCounter end={value} />
        ) : (
          value
        )}
      </div>

      {sparkline && (
        <div className="h-12">
          <MiniSparkline data={sparkline} />
        </div>
      )}

      {donut && (
        <div className="h-12">
          <MiniDonut data={donut} />
        </div>
      )}
    </GlassCard>
  );
}
```

---

## 🎯 INTERACTIVE REAL-TIME COUNTER

```typescript
export function LiveCounter() {
  const [count, setCount] = useState(50247);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 5));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <motion.div
        className="w-2 h-2 rounded-full bg-green-400"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
      <span className="text-white/80 text-sm">
        <AnimatedCounter end={count} /> người đang sử dụng
      </span>
    </div>
  );
}
```

---

## 🎨 DESIGN VARIATIONS

### **Variation 1: Minimal Stats**
```
┌─────────────────────────────────────┐
│  Hero Text                          │
│                                     │
│  [50K Users] [250K Calcs] [99.9%]  │
│  Simple counters only               │
└─────────────────────────────────────┘
```

### **Variation 2: Full Dashboard** ⭐
```
┌─────────────────────────────────────┐
│  Hero Text                          │
│                                     │
│  [Card] [Card] [Card] [Card]       │
│  Stats with mini charts             │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ Large Trend Chart           │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### **Variation 3: Floating Elements**
```
┌─────────────────────────────────────┐
│                    [Float Card]     │
│  Hero Text                          │
│  [Float Card]                       │
│                         [Float Card]│
│  Main Chart in Center               │
└─────────────────────────────────────┘
```

---

## 📦 REQUIRED DEPENDENCIES

```bash
npm install recharts framer-motion
npm install lucide-react
```

---

## ✅ IMPLEMENTATION CHECKLIST

- [ ] Install dependencies (recharts, framer-motion)
- [ ] Create AnimatedCounter component
- [ ] Create SalaryTrendChart component
- [ ] Create FloatingDataCard component
- [ ] Create MiniSparkline component
- [ ] Create MiniDonut component
- [ ] Add BackgroundElements
- [ ] Integrate into HeroSection
- [ ] Test animations performance
- [ ] Optimize for mobile
- [ ] Add loading states
- [ ] Test with real data

---

## 🎯 PERFORMANCE TIPS

```typescript
// Lazy load charts
const SalaryTrendChart = dynamic(() => import('./salary-trend-chart'), {
  loading: () => <ChartSkeleton />,
  ssr: false,
});

// Reduce animation on mobile
const shouldReduceMotion = useReducedMotion();

<motion.div
  animate={shouldReduceMotion ? {} : { y: [0, -10, 0] }}
>
```

---

## 🚀 QUICK START

```typescript
// 1. Copy all components
// 2. Import in hero section
import { HeroSection } from '@/components/landing/hero-section';

// 3. Use in page
export default function HomePage() {
  return <HeroSection />;
}

// 4. Customize data, colors, animations
// 5. Deploy! 🎉
```

---

Bạn muốn mình:
1. **Tạo thêm chart types** (bar, pie, radar)?
2. **Add more interactive elements** (click to expand)?
3. **Create mobile-optimized version**?
4. **Add real-time WebSocket data**?
5. **Export complete code files**?

Data viz này sẽ làm Hero section **SUPER impressive**! 🚀📊
