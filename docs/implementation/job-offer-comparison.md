# Job Offer Comparison Tool - Implementation Plan

## Overview
Compare multiple job offers comprehensively including salary, bonuses, benefits, and work-life balance factors.

## UI/UX Design

### Component Structure
```
components/
  ├── offer-comparison/
  │   ├── OfferComparison.tsx        # Main comparison table
  │   ├── OfferForm.tsx             # Add new offer form
  │   ├── OfferCard.tsx             # Individual offer display
  │   ├── BenefitsCalculator.tsx     # Benefits valuation
  │   └── ComparisonChart.tsx        # Visual comparison
```

### Data Model
```typescript
interface JobOffer {
  id: string;
  companyName: string;
  position: string;
  location: string;
  baseSalary: number;          // Gross monthly
  bonuses: {
    performance: number;        // Annual performance bonus
    signing?: number;          // One-time signing bonus
    stock?: {
      type: 'ESOP' | 'RSU' | 'Stock Options';
      value: number;           // Annual value
      vesting: string;        // e.g., "4 years"
    };
  };
  benefits: {
    healthInsurance: number;    // Monthly value
    mealAllowance: number;      // Monthly value
    transport: number;          // Monthly value
    gym: number;               // Monthly value
    learning: number;          // Annual budget
    other: number;            // Other benefits value
  };
  workLife: {
    workingDays: number;       // Days/week
    overtime: 'rare' | 'sometimes' | 'often' | 'always';
    leaveDays: number;         // Annual leave days
    remoteDays: number;        // Remote days/week
  };
  commute: {
    distance: number;          // km
    cost: number;             // Monthly cost
    time: number;             // Minutes/day
  };
}
```

### Implementation Steps

#### Week 1: Core Components
1. **JobOfferCard.tsx**
   - Display single offer details
   - Calculate total compensation
   - Show benefits breakdown

2. **OfferForm.tsx**
   - Form to add new offer
   - Smart defaults for common benefits
   - Validation for required fields

3. **JobOffer type definitions**
   - Create TypeScript interfaces
   - Add Zod schema for validation
   - Form submission handlers

#### Week 2: Comparison Logic
1. **OfferComparison.tsx**
   - Side-by-side comparison table
   - Highlight best values in each category
   - Calculate total monthly/yearly value

2. **BenefitsCalculator.tsx**
   - Assign monetary value to non-monetary benefits
   - Standard benefit valuations:
     - Health insurance: 2-5M/month depending on coverage
     - Free lunch: 1-2M/month
     - Gym membership: 500K-1M/month
     - Learning budget: Direct value
     - Remote work: Calculate time/commute savings

3. **Comparison Metrics**
   - Total Compensation Score (60% weight)
   - Work-Life Balance Score (30% weight)
   - Growth Potential Score (10% weight)

#### Week 3: Visualizations & Polish
1. **ComparisonChart.tsx**
   - Radar chart for visual comparison
   - Bar chart for total compensation
   - WLB indicator (work-life balance)

2. **Decision Matrix**
   - User-defined priorities
   - Weighted scoring system
   - "Best match" recommendation

3. **Export/Share**
   - PDF export of comparison
   - Share link (if logged in)
   - Print-friendly view

## API Requirements

### New Routes
```typescript
// POST /api/offers
// Create new offer comparison

// GET /api/offers/:id
// Get saved comparison

// PUT /api/offers/:id
// Update comparison

// GET /api/benefits/defaults
// Get default benefit valuations
```

### Data Storage
- Store in localStorage for anonymous users
- Persist in database for logged users
- Shareable comparison links

## Success Metrics
- Average time spent: >5 minutes per comparison
- Feature adoption: >30% of monthly active users
- User satisfaction: >4.5/5 rating
- Share rate: >10% of comparisons shared

## Next Features
- AI-powered negotiation suggestions
- Market rate comparison
- Anonymous offer reviews
- Company culture insights

## Technical Considerations
- Responsive design for mobile
- Smooth animations for better UX
- Offline functionality
- Fast loading with lazy loading