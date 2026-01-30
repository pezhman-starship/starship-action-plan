// planContent.ts - Single source of truth for all plan content
// This file contains all content VERBATIM - do not summarize or shorten

export interface Persona {
  id: string;
  name: string;
  color: string;
}

export interface Touchpoint {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  aliases: string[];
  description: string;
  orbitRing: 'demand' | 'merchant' | 'fulfillment' | 'control' | 'enablers' | 'adjacent';
  touchpoints: string[];
  personas: string[];
  painTags: string[];
  icon: string;
}

export interface Bottleneck {
  id: string;
  title: string;
  painScenario: string;
  metricsImpacted: string[];
  proposedLevers: string[];
  products: string[];
  touchpoints: string[];
  personas: string[];
  roadmapPhases: string[];
  relatedExperiments: string[];
}

export interface RoadmapPhase {
  id: string;
  label: string;
  dateRange: string;
  goals: string[];
  deliverables: string[];
  exampleScenarios: string[];
  kpisWatched: string[];
  touchpointsAffected: string[];
  fullContent: string;
}

export interface Metric {
  id: string;
  name: string;
  category: string;
  definition: string;
  whyItMatters: string;
  painsAddressed: string[];
  touchpointsInfluencing: string[];
  personas: string[];
}

export interface Experiment {
  id: string;
  name: string;
  category: string;
  hypothesis: string;
  expectedImpact: string;
  risks: string[];
  requiredData: string[];
  successMetric: string;
  primaryTouchpoints: string[];
  personas: string[];
}

export interface DataNeed {
  id: string;
  item: string;
  whyNeeded: string;
  whatWithoutIt: string;
}

export interface Assumption {
  id: string;
  assumption: string;
  riskIfWrong: string;
  validationApproach: string;
  priority: 'high' | 'medium' | 'low';
}

export const personas: Persona[] = [
  { id: 'student', name: 'Student', color: 'persona-student' },
  { id: 'merchant', name: 'Merchant', color: 'persona-merchant' },
  { id: 'campus-ops', name: 'Campus Ops', color: 'persona-campus-ops' },
  { id: 'partner', name: 'Partner', color: 'persona-partner' },
  { id: 'fleet-ops', name: 'Fleet Ops', color: 'persona-fleet-ops' },
];

export const touchpoints: Touchpoint[] = [
  { id: 'customer-app', name: 'Customer App' },
  { id: 'kitchen-app', name: 'Kitchen App' },
  { id: 'kiosk', name: 'Kiosk' },
  { id: 'dashboard-portal', name: 'Dashboard & Portal' },
  { id: 'fulfillment', name: 'Fulfillment' },
  { id: 'integrations', name: 'Integrations' },
  { id: 'infrastructure', name: 'Infrastructure' },
  { id: 'support', name: 'Support' },
  { id: 'sendit', name: 'Sendit' },
];

export const products: Product[] = [
  {
    id: 'starship-360',
    name: 'Starship 360',
    aliases: ['Starship 360 full-service suite', 'end-to-end dining solution'],
    description: 'A full suite built for university campuses, covering the end-to-end campus dining journey for students, restaurant merchants, and university teams. Includes a mix of physical + digital products, with key touchpoints like customer, kitchen, and kiosk apps.',
    orbitRing: 'control',
    touchpoints: ['customer-app', 'kitchen-app', 'kiosk', 'dashboard-portal', 'fulfillment'],
    personas: ['student', 'merchant', 'campus-ops', 'partner'],
    painTags: ['end-to-end-reliability', 'multi-channel-complexity'],
    icon: 'Orbit',
  },
  {
    id: 'robot-delivery',
    name: 'Starship Campus Robot Delivery',
    aliases: ['University Campuses solution', 'autonomous robot delivery for campus dining'],
    description: 'On-demand robot delivery of hot food and groceries across campus, positioned as a core part of the campus dining program. Sold as a way to improve accessibility, ease staffing pressure, and unlock new revenue streams.',
    orbitRing: 'fulfillment',
    touchpoints: ['customer-app', 'fulfillment', 'infrastructure'],
    personas: ['student', 'campus-ops', 'fleet-ops'],
    painTags: ['delivery-reliability', 'accessibility', 'staffing-pressure'],
    icon: 'Bot',
  },
  {
    id: 'marketplace',
    name: 'Starship Marketplace',
    aliases: ['ordering ecosystem layer'],
    description: 'A campus ordering expansion that adds more ways to order beyond robot delivery, including self-order kiosks and mobile pickup. Also supports multiple payment types (including meal swipes at select locations, cards, Apple Pay/Google Pay, etc.).',
    orbitRing: 'demand',
    touchpoints: ['customer-app', 'kiosk', 'integrations'],
    personas: ['student', 'campus-ops', 'partner'],
    painTags: ['payment-complexity', 'channel-expansion'],
    icon: 'Store',
  },
  {
    id: 'mobile-pickup',
    name: 'Starship Mobile Pickup',
    aliases: ['pickup via the app'],
    description: 'Lets students place and pay in the Starship app and pick up orders at the venue instead of requesting robot delivery. Designed to help campuses serve more orders without extra front-of-house capacity.',
    orbitRing: 'demand',
    touchpoints: ['customer-app', 'kitchen-app'],
    personas: ['student', 'merchant'],
    painTags: ['capacity-constraints', 'handoff-friction'],
    icon: 'MapPin',
  },
  {
    id: 'kiosks',
    name: 'Starship Self-Order Kiosks',
    aliases: ['self-order kiosks', 'kiosk ordering'],
    description: 'Physical kiosks that let students place orders directly on campus, part of the Marketplace expansion for higher throughput and reduced staffing load. Positioned as another ordering channel alongside app ordering and delivery.',
    orbitRing: 'demand',
    touchpoints: ['kiosk', 'kitchen-app'],
    personas: ['student', 'campus-ops'],
    painTags: ['throughput', 'staffing-load'],
    icon: 'Monitor',
  },
  {
    id: 'customer-app',
    name: 'Starship Customer App',
    aliases: ['Starship Deliveries app', 'Starship app'],
    description: "The student-facing app for browsing options, ordering, tracking, and completing the experience (delivery or pickup). It's also the entry point for additional campus features like Sendit.",
    orbitRing: 'demand',
    touchpoints: ['customer-app', 'sendit'],
    personas: ['student'],
    painTags: ['eta-trust', 'order-tracking', 'accessibility'],
    icon: 'Smartphone',
  },
  {
    id: 'kitchen-app',
    name: 'Starship Kitchen App',
    aliases: ['merchant-side app'],
    description: 'The restaurant-side app used to receive and manage incoming orders, typically placed near the POS for staff visibility. It supports a simple operational flow (new → in progress/print ticket → done) for pickup orders.',
    orbitRing: 'merchant',
    touchpoints: ['kitchen-app'],
    personas: ['merchant'],
    painTags: ['order-management', 'kitchen-bottlenecks'],
    icon: 'ChefHat',
  },
  {
    id: 'merchant-tools',
    name: 'Starship Merchant Tools',
    aliases: ['merchant operations toolkit'],
    description: 'The set of tools Starship provides to help restaurant teams receive, prepare, and hand off orders, typically via a tablet and printer. It\'s operational software for the Starship channel, not a full restaurant management system.',
    orbitRing: 'merchant',
    touchpoints: ['kitchen-app', 'dashboard-portal'],
    personas: ['merchant'],
    painTags: ['operational-efficiency', 'multi-channel-management'],
    icon: 'Wrench',
  },
  {
    id: 'partner-dashboard',
    name: 'Partner Dashboard',
    aliases: ['client dashboard'],
    description: "A partner-facing dashboard to view/edit/update menu details, access data reports, and assign roles to team members. This is the 'control panel' for operators running the campus program.",
    orbitRing: 'control',
    touchpoints: ['dashboard-portal'],
    personas: ['partner', 'campus-ops'],
    painTags: ['visibility', 'menu-management', 'reporting'],
    icon: 'LayoutDashboard',
  },
  {
    id: 'portal',
    name: 'Starship Portal',
    aliases: ['venue editing portal'],
    description: "A dedicated portal described as 'for easy editing of venues,' which aligns with partner-side configuration and venue management. It appears to be a gated (login) tool used by operators/partners.",
    orbitRing: 'control',
    touchpoints: ['dashboard-portal'],
    personas: ['partner', 'campus-ops'],
    painTags: ['venue-configuration', 'deployment-friction'],
    icon: 'Settings',
  },
  {
    id: 'integrations',
    name: 'Custom Integrations',
    aliases: ['Starship app / partner ordering apps / campus e-commerce platform integration'],
    description: 'A deployment/integration offering that connects the campus dining program into multiple ordering entry points. Marketed as deployable quickly.',
    orbitRing: 'enablers',
    touchpoints: ['integrations', 'customer-app'],
    personas: ['partner', 'campus-ops'],
    painTags: ['integration-complexity', 'support-fragmentation'],
    icon: 'Plug',
  },
  {
    id: 'delivery-customization',
    name: 'Delivery Customization',
    aliases: ['robot characters + music options'],
    description: "A configurable delivery experience where users can choose robot characters and music options during delivery. Treated as a productized 'experience layer' to drive engagement and differentiation.",
    orbitRing: 'adjacent',
    touchpoints: ['customer-app', 'fulfillment'],
    personas: ['student'],
    painTags: ['engagement', 'differentiation'],
    icon: 'Sparkles',
  },
  {
    id: 'wireless-charging',
    name: 'Wireless Charging',
    aliases: ['infrastructure capability'],
    description: 'Wireless charging expanded across campus locations to increase utilization and efficiency, allowing robots to autonomously recharge and return to service.',
    orbitRing: 'enablers',
    touchpoints: ['infrastructure'],
    personas: ['fleet-ops', 'campus-ops'],
    painTags: ['fleet-utilization', 'uptime'],
    icon: 'Zap',
  },
  {
    id: 'reusable-packaging',
    name: 'Reusable Packaging Integration',
    aliases: ['integrated reusable packaging'],
    description: 'Integrated reusable packaging option inside checkout for mobile pickup and kiosk orders (with plans to extend to robot deliveries). Includes track-and-trace so users can see what containers they have and what to return.',
    orbitRing: 'adjacent',
    touchpoints: ['customer-app', 'kiosk', 'fulfillment'],
    personas: ['student', 'campus-ops'],
    painTags: ['sustainability', 'container-tracking'],
    icon: 'Recycle',
  },
  {
    id: 'sendit',
    name: 'Starship Sendit',
    aliases: ['Sendit with Starship', 'on-campus package delivery service'],
    description: "A non-dining campus service for sending packages across campus using robots via a 'Send' action inside the app.",
    orbitRing: 'adjacent',
    touchpoints: ['customer-app', 'sendit', 'fulfillment'],
    personas: ['student', 'campus-ops'],
    painTags: ['package-delivery', 'campus-services'],
    icon: 'Package',
  },
];

export const bottlenecks: Bottleneck[] = [
  {
    id: 'peak-hour-supply',
    title: 'Peak-hour supply constraint and cancellations',
    painScenario: "During lunch rush (11:30 AM - 1:30 PM), robot fleet capacity maxes out. Students see 'no robots available' or face 45+ minute ETAs. Some place orders anyway and cancel when wait becomes unbearable. Merchants prep food that never gets picked up. Campus ops fields complaints about 'unreliable service.'",
    metricsImpacted: ['Order completion rate', 'Cancellation rate', 'Peak-hour throughput', 'Food waste cost'],
    proposedLevers: ['Dynamic capacity throttling at order placement', 'Surge pricing or delivery fee adjustments', 'Pre-order time slots', 'Demand steering to pickup/kiosk channels', 'Fleet expansion planning with utilization data'],
    products: ['customer-app', 'marketplace', 'robot-delivery'],
    touchpoints: ['customer-app', 'fulfillment', 'infrastructure'],
    personas: ['student', 'merchant', 'fleet-ops'],
    roadmapPhases: ['0-30', '31-60'],
    relatedExperiments: ['demand-steering', 'capacity-throttling', 'surge-pricing'],
  },
  {
    id: 'handoff-friction',
    title: 'Handoff friction (late student, missed delivery window)',
    painScenario: "Robot arrives at dorm, student is in class or shower. Robot waits 5-10 minutes at the pin, blocking it from next delivery. Food cools. Student finally arrives, finds lukewarm burrito. Leaves 1-star review citing 'cold food.' Sometimes robot times out entirely, order becomes a support ticket.",
    metricsImpacted: ['Handoff success rate', 'Robot utilization', 'Customer satisfaction', 'Support ticket volume'],
    proposedLevers: ['Progressive ETA notifications with arrival countdown', 'Flexible handoff windows with student confirmation', 'Smart locker integration for asynchronous pickup', 'Gamification of on-time pickup behavior', 'Penalty/reward structure for handoff timing'],
    products: ['customer-app', 'robot-delivery'],
    touchpoints: ['customer-app', 'fulfillment'],
    personas: ['student'],
    roadmapPhases: ['31-60', '61-90'],
    relatedExperiments: ['handoff-ux', 'locker-integration', 'eta-notifications'],
  },
  {
    id: 'eta-trust',
    title: 'ETA trust and volatility',
    painScenario: "App shows 25-minute ETA. Student commits to ordering, skips dining hall. 40 minutes later, still waiting. Checks app repeatedly, sees ETA jumping around. Loses trust in the service. Next time, just walks to dining hall instead of dealing with uncertainty.",
    metricsImpacted: ['Repeat order rate', 'Customer trust score', 'App engagement', 'Order abandonment'],
    proposedLevers: ['Improved ETA prediction model with kitchen + delivery components', 'Confidence intervals instead of point estimates', 'Proactive delay notifications', 'Under-promise/over-deliver buffer system', 'Historical accuracy tracking and display'],
    products: ['customer-app', 'kitchen-app', 'robot-delivery'],
    touchpoints: ['customer-app', 'kitchen-app', 'fulfillment'],
    personas: ['student', 'merchant'],
    roadmapPhases: ['31-60', '61-90'],
    relatedExperiments: ['eta-modeling', 'confidence-intervals', 'delay-notifications'],
  },
  {
    id: 'merchant-throughput',
    title: 'Merchant throughput and kitchen bottlenecks',
    painScenario: "Small campus café gets slammed with 15 robot orders in 10 minutes. Staff scrambles, falls behind on in-person customers too. Kitchen app shows pile of pending orders, no way to throttle incoming. Quality drops as staff rushes. Merchant considers turning off Starship channel during peaks.",
    metricsImpacted: ['Merchant satisfaction', 'Prep time accuracy', 'Order quality', 'Channel retention'],
    proposedLevers: ['Real-time capacity controls in kitchen app', 'Automatic throttling based on queue depth', 'Staff availability indicators', 'Order batching optimization', 'Cross-venue load balancing for multi-location merchants'],
    products: ['kitchen-app', 'merchant-tools', 'partner-dashboard'],
    touchpoints: ['kitchen-app', 'dashboard-portal'],
    personas: ['merchant', 'partner'],
    roadmapPhases: ['31-60', '61-90'],
    relatedExperiments: ['capacity-controls', 'order-batching', 'load-balancing'],
  },
  {
    id: 'kiosk-chaos',
    title: 'Kiosk/pickup chaos risk if ops isn\'t designed',
    painScenario: "University installs 3 kiosks at student center. Day one: 50 students ordering simultaneously, but only 2 staff behind counter. Orders pile up, students crowd the counter asking 'is my order ready?' No queue management, no name calling system. Chaos ensues, bad first impression.",
    metricsImpacted: ['Kiosk adoption rate', 'Wait time satisfaction', 'Staff efficiency', 'Queue management scores'],
    proposedLevers: ['Order-ready notification system', 'Queue management display screens', 'Staff capacity planning tools', 'Peak-hour staffing recommendations', 'Self-service pickup lockers for high-volume locations'],
    products: ['kiosks', 'kitchen-app', 'mobile-pickup'],
    touchpoints: ['kiosk', 'kitchen-app', 'fulfillment'],
    personas: ['student', 'merchant', 'campus-ops'],
    roadmapPhases: ['61-90', '3-6'],
    relatedExperiments: ['queue-management', 'pickup-lockers', 'staff-planning'],
  },
  {
    id: 'support-fragmentation',
    title: 'Ownership/support fragmentation across partner channels',
    painScenario: "Student orders via integrated campus dining app (not Starship app). Order fails. Student contacts campus IT. Campus IT says 'that\'s Starship.' Starship support says 'we don\'t see that order in our system, must be integration issue.' Student bounces between 3 support channels, never gets resolution.",
    metricsImpacted: ['Support resolution time', 'Partner satisfaction', 'Integration reliability', 'Cross-channel NPS'],
    proposedLevers: ['Unified order ID tracking across all channels', 'Clear escalation paths documented per integration', 'Partner-facing support playbook', 'Real-time integration health monitoring', 'Shared incident response protocols'],
    products: ['integrations', 'partner-dashboard', 'portal'],
    touchpoints: ['integrations', 'support', 'dashboard-portal'],
    personas: ['partner', 'campus-ops', 'student'],
    roadmapPhases: ['61-90', '3-6'],
    relatedExperiments: ['support-playbook', 'integration-monitoring', 'unified-tracking'],
  },
  {
    id: 'accessibility-risk',
    title: 'Accessibility/sidewalk disruption risk (inclusive design)',
    painScenario: "Wheelchair user can't use the service because pickup locations aren't accessible. Vision-impaired student can't navigate the app. Student with mobility issues can't meet robot at designated spot. Service that promises 'campus accessibility' excludes the students who need it most.",
    metricsImpacted: ['Accessibility coverage', 'ADA compliance score', 'Inclusive order completion', 'Disability community NPS'],
    proposedLevers: ['Accessibility audit of all pickup locations', 'App accessibility improvements (screen reader, high contrast)', 'Flexible delivery locations for mobility needs', 'Partnership with campus disability services', 'Alternative fulfillment options'],
    products: ['customer-app', 'robot-delivery', 'mobile-pickup'],
    touchpoints: ['customer-app', 'fulfillment'],
    personas: ['student', 'campus-ops'],
    roadmapPhases: ['0-30', '3-6'],
    relatedExperiments: ['accessibility-audit', 'accessible-routing', 'alt-fulfillment'],
  },
  {
    id: 'physical-risks',
    title: 'Physical risks and constraints (congestion, vandalism/theft, terrain/weather)',
    painScenario: "Football game day: robots stuck in pedestrian congestion, deliveries delayed 30+ minutes. Winter storm: robots can't navigate icy sidewalks, service goes offline entirely. Late night: robot vandalized, expensive repair and bad PR. Campus considers banning robots from certain areas.",
    metricsImpacted: ['Fleet availability', 'Delivery success rate', 'Maintenance costs', 'Campus relationship health'],
    proposedLevers: ['Event-aware routing and capacity planning', 'Weather-adaptive operational modes', 'High-risk zone identification and mitigation', 'Security/vandalism prevention measures', 'Campus partnership on infrastructure improvements'],
    products: ['robot-delivery', 'wireless-charging'],
    touchpoints: ['fulfillment', 'infrastructure'],
    personas: ['fleet-ops', 'campus-ops'],
    roadmapPhases: ['61-90', '3-6'],
    relatedExperiments: ['event-routing', 'weather-modes', 'security-measures'],
  },
  {
    id: 'pricing-perception',
    title: 'Pricing perception / fee sensitivity (demand shaping)',
    painScenario: "Student opens app, sees $4.99 delivery fee on top of $8 meal. Total is $13 for campus food. Decides it's not worth it, closes app. Tells friends 'Starship is expensive.' Service gets reputation as luxury option rather than convenient utility.",
    metricsImpacted: ['Conversion rate', 'Order frequency', 'Price sensitivity segments', 'Value perception'],
    proposedLevers: ['Subscription/membership options', 'Dynamic pricing transparency', 'Bundled pricing with campus meal plans', 'First-time user promotions', 'Value communication improvements'],
    products: ['customer-app', 'marketplace'],
    touchpoints: ['customer-app'],
    personas: ['student'],
    roadmapPhases: ['31-60', '3-6'],
    relatedExperiments: ['subscription-model', 'price-transparency', 'value-messaging'],
  },
  {
    id: 'deployment-friction',
    title: 'Deployment/scaling friction across campuses',
    painScenario: "New university signs contract in June for August launch. Venue onboarding takes longer than expected. Menu digitization hits delays. Integration with campus payment system needs custom work. August arrives, only 3 of 12 venues are live. Bad first impression, takes months to recover.",
    metricsImpacted: ['Campus launch velocity', 'Venue activation rate', 'Partner satisfaction', 'Revenue ramp'],
    proposedLevers: ['Standardized deployment playbook', 'Pre-launch readiness checklist', 'Menu digitization automation', 'Integration templates for common systems', 'Campus success manager role'],
    products: ['portal', 'integrations', 'partner-dashboard'],
    touchpoints: ['dashboard-portal', 'integrations'],
    personas: ['partner', 'campus-ops'],
    roadmapPhases: ['3-6'],
    relatedExperiments: ['deployment-playbook', 'menu-automation', 'integration-templates'],
  },
  {
    id: 'payments-eligibility',
    title: 'Payments & eligibility integrity (campus funds / meal swipes)',
    painScenario: "Student uses meal swipe credit, but transaction fails silently. Charged to credit card instead. Doesn't notice until end of month. Another student figures out how to game the system with expired meal plan. Finance team demands audit, threatens to pull the program.",
    metricsImpacted: ['Payment success rate', 'Financial reconciliation accuracy', 'Fraud rate', 'Campus finance trust'],
    proposedLevers: ['Payment verification at point of order', 'Real-time eligibility checks', 'Fraud detection and prevention', 'Clear payment status communication', 'Campus finance integration improvements'],
    products: ['customer-app', 'marketplace', 'integrations'],
    touchpoints: ['customer-app', 'integrations'],
    personas: ['student', 'campus-ops', 'partner'],
    roadmapPhases: ['0-30', '31-60'],
    relatedExperiments: ['payment-verification', 'eligibility-checks', 'fraud-detection'],
  },
];

export const roadmapPhases: RoadmapPhase[] = [
  {
    id: '0-30',
    label: 'Days 0–30',
    dateRange: 'First Month',
    goals: [
      'Map full customer lifecycle and failure points',
      'Build relationships with key stakeholders',
      'Establish baseline metrics and instrumentation',
      'Identify quick wins that demonstrate value',
    ],
    deliverables: [
      'End-to-end journey map with pain points documented',
      'Failure mode taxonomy and dashboard concept',
      'Stakeholder 1:1 summary and alignment doc',
      'First hypothesis backlog with prioritization',
      'Accessibility audit initiation',
    ],
    exampleScenarios: [
      'Week 1: Shadow support team handling escalations, document top 10 failure modes',
      'Week 2: Ride along with campus ops, observe merchant onboarding, map integration touchpoints',
      'Week 3: Analyze cancellation data, identify preventable vs. unavoidable patterns',
      'Week 4: Present initial findings and proposed experiments to leadership',
    ],
    kpisWatched: ['Cancellation rate breakdown', 'Support ticket categories', 'Payment failure rate', 'Accessibility gaps identified'],
    touchpointsAffected: ['customer-app', 'kitchen-app', 'support', 'integrations'],
    fullContent: `The first 30 days are about listening, mapping, and validating assumptions. I'll resist the urge to ship anything significant until I understand the system.

WEEK 1: DEEP IMMERSION
- Shadow the support team for full shifts, document every escalation type
- Read through last 3 months of customer feedback, NPS comments, app store reviews
- Get access to all dashboards and data sources, understand what's instrumented vs. not
- Meet with engineering leads to understand technical debt and constraints

WEEK 2: STAKEHOLDER MAPPING
- 1:1s with every PM, design lead, and eng lead
- Understand each person's view of the biggest problems
- Map the org chart and decision-making dynamics
- Identify champions and skeptics for various initiatives

WEEK 3: SYSTEM MAPPING
- Create comprehensive journey maps for each persona
- Document every integration point and owner
- Build failure mode taxonomy with frequency and impact estimates
- Identify the 'invisible' systems that aren't well understood

WEEK 4: SYNTHESIS AND PROPOSAL
- Consolidate learnings into actionable hypothesis backlog
- Prioritize based on impact, confidence, and effort
- Present findings to leadership, get buy-in on next phase
- Establish regular stakeholder check-in rhythm`,
  },
  {
    id: '31-60',
    label: 'Days 31–60',
    dateRange: 'Second Month',
    goals: [
      'Launch first experiments on preventable cancellations',
      'Improve merchant capacity controls',
      'Enhance ETA accuracy foundation',
      'Build instrumentation for handoff success tracking',
    ],
    deliverables: [
      'Capacity throttling MVP in pilot venues',
      'Kitchen app queue depth visibility',
      'ETA confidence interval prototype',
      'Handoff success funnel dashboard',
      'First experiment results and learnings doc',
    ],
    exampleScenarios: [
      'Week 5: Launch order throttling during peak hours at 2 pilot venues',
      'Week 6: A/B test ETA confidence intervals vs. point estimates',
      'Week 7: Instrument handoff timing to understand drop-off patterns',
      'Week 8: Share early results, adjust experiment parameters based on data',
    ],
    kpisWatched: ['Preventable cancellation rate', 'ETA accuracy (predicted vs. actual)', 'Handoff success rate', 'Merchant capacity utilization'],
    touchpointsAffected: ['customer-app', 'kitchen-app', 'fulfillment'],
    fullContent: `Now we ship and learn. The goal is small, scoped experiments that generate signal without creating chaos.

WEEK 5: CAPACITY CONTROLS
- Work with 2 pilot venues to implement order throttling
- Create simple capacity indicator in kitchen app
- Set up monitoring for queue depth vs. completion time
- Establish baseline for 'healthy' vs. 'overwhelmed' state

WEEK 6: ETA EXPERIMENTS
- Launch A/B test: confidence intervals vs. point estimates
- Instrument actual vs. predicted time at each stage (kitchen, dispatch, delivery)
- Create internal dashboard for ETA accuracy tracking
- Begin building data foundation for improved prediction model

WEEK 7: HANDOFF INSTRUMENTATION
- Instrument full handoff funnel: notification → arrival → unlock → pickup
- Identify stages with highest drop-off
- Start collecting data on time-to-handoff variability
- Explore correlation between handoff friction and repeat orders

WEEK 8: SYNTHESIS AND ADJUSTMENT
- Compile experiment results and statistical significance
- Adjust parameters based on early learnings
- Share results broadly, build organizational learning culture
- Prioritize next wave of experiments based on results`,
  },
  {
    id: '61-90',
    label: 'Days 61–90',
    dateRange: 'Third Month',
    goals: [
      'Scale successful experiments across more venues',
      'Harden merchant ops tooling',
      'Launch handoff UX improvements',
      'Begin support loop improvements for integrated channels',
    ],
    deliverables: [
      'Capacity controls rolled out to 50% of venues',
      'Handoff notification redesign shipped',
      'Support escalation playbook for integrations',
      'Kiosk/pickup operational playbook draft',
      'Accessibility routing prototype',
    ],
    exampleScenarios: [
      'Week 9: Roll out proven capacity controls to additional venues',
      'Week 10: Ship handoff notification improvements, measure impact',
      'Week 11: Document and deploy integration support playbook',
      'Week 12: Begin accessibility routing exploration with pilot users',
    ],
    kpisWatched: ['Cross-venue cancellation improvement', 'Handoff success rate improvement', 'Support resolution time for integrations', 'Accessibility audit progress'],
    touchpointsAffected: ['kitchen-app', 'customer-app', 'integrations', 'support', 'kiosk'],
    fullContent: `Scale what works, kill what doesn't. This phase is about building operational muscle.

WEEK 9: SCALING SUCCESSES
- Take proven capacity controls to 50%+ of venues
- Create self-serve tools for ops team to configure venues
- Build monitoring for rollout health and edge cases
- Document patterns for campus-specific customization

WEEK 10: HANDOFF IMPROVEMENTS
- Ship redesigned handoff notification flow
- Add countdown timer and location confirmation
- Measure impact on time-to-handoff and customer satisfaction
- A/B test different notification cadences

WEEK 11: SUPPORT INFRASTRUCTURE
- Deploy integration support playbook
- Create shared incident response protocols with partners
- Build unified order tracking across all channels
- Train support team on new escalation paths

WEEK 12: ACCESSIBILITY FOUNDATIONS
- Complete accessibility audit with disability services
- Prototype accessible routing for mobility-impaired users
- Test with actual users from disability community
- Plan for integration into main routing system`,
  },
  {
    id: '3-6',
    label: 'Months 3–6',
    dateRange: 'Quarter 2',
    goals: [
      'Build scalable campus deployment playbook',
      'Launch accessibility-first features',
      'Mature the experiment culture and tooling',
      'Create self-serve partner tools',
    ],
    deliverables: [
      'Campus launch playbook with templates and checklists',
      'Accessibility routing in production',
      'Self-serve partner analytics dashboard',
      'Experiment platform with self-serve capability',
      'Cross-campus performance benchmarking',
    ],
    exampleScenarios: [
      'Month 4: Deploy new campus with 50% faster time-to-live using playbook',
      'Month 5: Launch accessibility routing campus-wide, measure inclusive adoption',
      'Month 6: Partner self-serve analytics reduces support burden by 30%',
    ],
    kpisWatched: ['Campus deployment velocity', 'Accessibility adoption rate', 'Partner self-serve engagement', 'Experiment velocity'],
    touchpointsAffected: ['dashboard-portal', 'integrations', 'customer-app', 'fulfillment'],
    fullContent: `This is where we move from firefighting to system-building. The focus shifts to scalability and sustainability.

MONTH 4: DEPLOYMENT PLAYBOOK
- Codify learnings from all campus launches into playbook
- Create standardized templates for venue onboarding
- Build integration templates for common campus systems
- Establish 'campus readiness score' with go/no-go criteria
- Test playbook with next campus launch, iterate based on friction

MONTH 5: ACCESSIBILITY AT SCALE
- Roll out accessible routing across all campuses
- Partner with disability services at each campus for local customization
- Create feedback loop for accessibility improvements
- Build metrics for inclusive service coverage
- Explore additional accessibility features based on user research

MONTH 6: SELF-SERVE AND SUSTAINABILITY
- Launch partner self-serve analytics dashboard
- Reduce dependency on PM/eng for routine partner requests
- Build experiment platform that enables faster iteration
- Create cross-campus benchmarking for continuous improvement
- Establish quarterly business review rhythm with key metrics`,
  },
];

export const metrics: Metric[] = [
  // Reliability
  {
    id: 'order-completion-rate',
    name: 'Order Completion Rate',
    category: 'Reliability',
    definition: 'Percentage of placed orders that are successfully delivered or picked up, excluding customer-initiated cancellations within grace period.',
    whyItMatters: "This is the north star for reliability. Every incomplete order is a broken promise and a customer who might not return.",
    painsAddressed: ['peak-hour-supply', 'handoff-friction', 'eta-trust'],
    touchpointsInfluencing: ['customer-app', 'kitchen-app', 'fulfillment'],
    personas: ['student', 'merchant'],
  },
  {
    id: 'preventable-cancellation-rate',
    name: 'Preventable Cancellation Rate',
    category: 'Reliability',
    definition: 'Cancellations that could have been avoided with better capacity management, ETA accuracy, or operational controls.',
    whyItMatters: "Not all cancellations are equal. Preventable cancellations are the ones we can actually fix with product and operational improvements.",
    painsAddressed: ['peak-hour-supply', 'eta-trust', 'merchant-throughput'],
    touchpointsInfluencing: ['customer-app', 'kitchen-app'],
    personas: ['student', 'merchant'],
  },
  // Marketplace balance
  {
    id: 'peak-utilization-ratio',
    name: 'Peak Utilization Ratio',
    category: 'Marketplace Balance',
    definition: 'Ratio of demand (orders) to supply (available robots and merchant capacity) during peak hours.',
    whyItMatters: "Understanding supply/demand balance helps us know when to throttle, when to expand, and how to price.",
    painsAddressed: ['peak-hour-supply', 'merchant-throughput'],
    touchpointsInfluencing: ['customer-app', 'fulfillment', 'infrastructure'],
    personas: ['fleet-ops', 'merchant'],
  },
  {
    id: 'channel-mix',
    name: 'Channel Mix (Delivery vs. Pickup vs. Kiosk)',
    category: 'Marketplace Balance',
    definition: 'Distribution of orders across delivery, mobile pickup, and kiosk channels.',
    whyItMatters: "Different channels have different capacity constraints. A healthy mix reduces pressure on any single channel.",
    painsAddressed: ['peak-hour-supply', 'kiosk-chaos'],
    touchpointsInfluencing: ['customer-app', 'kiosk', 'fulfillment'],
    personas: ['student', 'campus-ops'],
  },
  // Merchant ops
  {
    id: 'prep-time-accuracy',
    name: 'Prep Time Accuracy',
    category: 'Merchant Ops',
    definition: 'How closely actual prep time matches the time communicated to customers and used in ETA calculations.',
    whyItMatters: "Prep time is the black box in ETA. If merchants consistently over or under-estimate, ETAs will be wrong.",
    painsAddressed: ['eta-trust', 'merchant-throughput'],
    touchpointsInfluencing: ['kitchen-app'],
    personas: ['merchant'],
  },
  {
    id: 'merchant-capacity-utilization',
    name: 'Merchant Capacity Utilization',
    category: 'Merchant Ops',
    definition: 'Percentage of merchant\'s stated capacity being used during any given period.',
    whyItMatters: "High utilization means efficiency but also fragility. We need headroom for demand spikes.",
    painsAddressed: ['merchant-throughput', 'peak-hour-supply'],
    touchpointsInfluencing: ['kitchen-app', 'dashboard-portal'],
    personas: ['merchant', 'partner'],
  },
  // Handoff
  {
    id: 'handoff-success-rate',
    name: 'Handoff Success Rate',
    category: 'Handoff',
    definition: 'Percentage of deliveries where customer successfully retrieves order within the allowed window.',
    whyItMatters: "Failed handoffs waste robot time, result in cold food, and generate support tickets. This is a key friction point.",
    painsAddressed: ['handoff-friction'],
    touchpointsInfluencing: ['customer-app', 'fulfillment'],
    personas: ['student'],
  },
  {
    id: 'time-to-handoff',
    name: 'Time to Handoff',
    category: 'Handoff',
    definition: 'Time from robot arrival to customer retrieval.',
    whyItMatters: "Shorter handoff times mean more deliveries per robot and warmer food. This is utilization in action.",
    painsAddressed: ['handoff-friction'],
    touchpointsInfluencing: ['customer-app', 'fulfillment'],
    personas: ['student', 'fleet-ops'],
  },
  // Support
  {
    id: 'support-ticket-rate',
    name: 'Support Ticket Rate',
    category: 'Support',
    definition: 'Number of support tickets per 100 orders, segmented by category.',
    whyItMatters: "Support tickets are the canary in the coal mine. Rising ticket rates signal product or operational issues.",
    painsAddressed: ['support-fragmentation', 'eta-trust', 'payments-eligibility'],
    touchpointsInfluencing: ['support', 'customer-app', 'integrations'],
    personas: ['student', 'partner'],
  },
  {
    id: 'integration-support-resolution-time',
    name: 'Integration Support Resolution Time',
    category: 'Support',
    definition: 'Time to resolve support tickets involving integrated ordering channels.',
    whyItMatters: "Integration issues often involve multiple parties and are harder to resolve. This measures cross-org efficiency.",
    painsAddressed: ['support-fragmentation'],
    touchpointsInfluencing: ['integrations', 'support'],
    personas: ['partner', 'campus-ops'],
  },
  // Accessibility
  {
    id: 'accessibility-coverage',
    name: 'Accessibility Coverage',
    category: 'Accessibility',
    definition: 'Percentage of campus locations that are accessible for users with mobility, vision, or other disabilities.',
    whyItMatters: "A service that promises campus accessibility should actually be accessible to everyone.",
    painsAddressed: ['accessibility-risk'],
    touchpointsInfluencing: ['customer-app', 'fulfillment'],
    personas: ['student', 'campus-ops'],
  },
  // Fleet/Infra
  {
    id: 'robot-availability-rate',
    name: 'Robot Availability Rate',
    category: 'Fleet/Infra',
    definition: 'Percentage of time robots are available for delivery (not charging, not in maintenance, not stuck).',
    whyItMatters: "Fleet availability directly limits capacity. More availability = more orders served.",
    painsAddressed: ['peak-hour-supply', 'physical-risks'],
    touchpointsInfluencing: ['infrastructure', 'fulfillment'],
    personas: ['fleet-ops'],
  },
  {
    id: 'robot-utilization-rate',
    name: 'Robot Utilization Rate',
    category: 'Fleet/Infra',
    definition: 'Percentage of available robots actively delivering orders vs. idle.',
    whyItMatters: "Idle robots are wasted capacity. But 100% utilization means no slack for demand spikes.",
    painsAddressed: ['peak-hour-supply'],
    touchpointsInfluencing: ['fulfillment', 'infrastructure'],
    personas: ['fleet-ops'],
  },
];

export const experiments: Experiment[] = [
  // Pricing & incentives
  {
    id: 'surge-pricing',
    name: 'Dynamic Surge Pricing',
    category: 'Pricing & Incentives',
    hypothesis: 'If we show real-time demand-based pricing, students will either shift orders to off-peak times or accept higher fees during peaks, reducing cancellations from capacity constraints.',
    expectedImpact: '10-15% reduction in peak-hour preventable cancellations',
    risks: ['Perception of price gouging', 'Complex to communicate fairly', 'May reduce overall order volume'],
    requiredData: ['Historical order patterns by hour', 'Price elasticity estimates', 'Competitive pricing benchmarks'],
    successMetric: 'Peak-hour preventable cancellation rate',
    primaryTouchpoints: ['customer-app'],
    personas: ['student'],
  },
  {
    id: 'subscription-model',
    name: 'Subscription / Membership Pricing',
    category: 'Pricing & Incentives',
    hypothesis: 'A monthly subscription that includes free or reduced delivery fees will increase order frequency and reduce price sensitivity complaints.',
    expectedImpact: '20%+ increase in order frequency among subscribers',
    risks: ['Cannibalization of high-margin orders', 'Subscription fatigue', 'Operational complexity'],
    requiredData: ['Customer order frequency distribution', 'Fee revenue breakdown', 'Churn patterns'],
    successMetric: 'Order frequency per subscriber vs. non-subscriber',
    primaryTouchpoints: ['customer-app'],
    personas: ['student'],
  },
  // ETA modeling
  {
    id: 'eta-confidence-intervals',
    name: 'ETA Confidence Intervals',
    category: 'ETA Modeling',
    hypothesis: 'Showing "25-35 min" instead of "30 min" will set better expectations and reduce frustration when deliveries take longer than the point estimate.',
    expectedImpact: 'Improved customer satisfaction and trust metrics',
    risks: ['Wider ranges might feel less precise', 'May reduce conversion if ranges seem too wide'],
    requiredData: ['Historical ETA accuracy data', 'Variance by venue, time of day, weather'],
    successMetric: 'Customer satisfaction with delivery timing',
    primaryTouchpoints: ['customer-app'],
    personas: ['student'],
  },
  {
    id: 'eta-component-breakdown',
    name: 'ETA Component Breakdown',
    category: 'ETA Modeling',
    hypothesis: 'Breaking down ETA into "prep: 15 min, delivery: 10 min" will help customers understand where time is spent and reduce misattribution of delays.',
    expectedImpact: 'Reduced support tickets about delivery timing',
    risks: ['More complexity in UI', 'May expose merchant prep issues'],
    requiredData: ['Prep time tracking by venue', 'Delivery time by route'],
    successMetric: 'Support ticket rate for ETA-related issues',
    primaryTouchpoints: ['customer-app', 'kitchen-app'],
    personas: ['student', 'merchant'],
  },
  // Handoff UX
  {
    id: 'countdown-notifications',
    name: 'Progressive Countdown Notifications',
    category: 'Handoff UX',
    hypothesis: 'Sending notifications at 5 min, 2 min, and arrival will reduce time-to-handoff by helping customers be ready when robot arrives.',
    expectedImpact: '20%+ reduction in time-to-handoff',
    risks: ['Notification fatigue', 'May not help if customer is truly unavailable'],
    requiredData: ['Current notification open rates', 'Time-to-handoff distribution'],
    successMetric: 'Time-to-handoff p50 and p90',
    primaryTouchpoints: ['customer-app', 'fulfillment'],
    personas: ['student'],
  },
  {
    id: 'locker-integration',
    name: 'Smart Locker Integration',
    category: 'Handoff UX',
    hypothesis: 'Offering locker dropoff as an option will reduce failed handoffs for customers who can\'t meet the robot immediately.',
    expectedImpact: '15% reduction in handoff failures',
    risks: ['Food quality in lockers', 'Locker availability constraints', 'Additional infrastructure cost'],
    requiredData: ['Failed handoff patterns', 'Locker location feasibility'],
    successMetric: 'Handoff success rate for locker orders vs. direct',
    primaryTouchpoints: ['customer-app', 'fulfillment'],
    personas: ['student'],
  },
  // Merchant ops/capacity
  {
    id: 'capacity-throttling',
    name: 'Automatic Capacity Throttling',
    category: 'Merchant Ops / Capacity',
    hypothesis: 'If we automatically reduce incoming orders when queue depth exceeds threshold, merchants will maintain quality and completion rates.',
    expectedImpact: '25% reduction in merchant-side cancellations',
    risks: ['Lost revenue from throttled orders', 'Merchant may game the system'],
    requiredData: ['Queue depth data', 'Correlation between queue and completion time'],
    successMetric: 'Merchant completion rate during peaks',
    primaryTouchpoints: ['kitchen-app'],
    personas: ['merchant'],
  },
  {
    id: 'order-batching',
    name: 'Order Batching Optimization',
    category: 'Merchant Ops / Capacity',
    hypothesis: 'Batching similar orders together will reduce prep time per order and improve merchant efficiency.',
    expectedImpact: '10% improvement in prep time efficiency',
    risks: ['Increased wait time for first order in batch', 'Complexity in implementation'],
    requiredData: ['Order similarity patterns', 'Prep time by order type'],
    successMetric: 'Average prep time per order during peaks',
    primaryTouchpoints: ['kitchen-app'],
    personas: ['merchant'],
  },
  // Kiosk/pickup ops
  {
    id: 'queue-display',
    name: 'Order Queue Display System',
    category: 'Kiosk / Pickup Ops',
    hypothesis: 'Displaying order numbers and status on a screen will reduce counter crowding and improve pickup efficiency.',
    expectedImpact: '30% reduction in counter congestion complaints',
    risks: ['Requires hardware investment', 'Display failures create confusion'],
    requiredData: ['Current pickup wait time', 'Counter observation data'],
    successMetric: 'Time from order ready to pickup',
    primaryTouchpoints: ['kiosk', 'kitchen-app'],
    personas: ['student', 'merchant'],
  },
  // Accessibility
  {
    id: 'accessible-routing',
    name: 'Accessibility-Aware Routing',
    category: 'Accessibility Routing',
    hypothesis: 'Offering accessible pickup locations and delivery spots will increase service adoption among students with disabilities.',
    expectedImpact: '50%+ increase in orders from accessibility-focused users',
    risks: ['Limited accessible locations initially', 'May require infrastructure changes'],
    requiredData: ['Accessibility audit of all locations', 'User research with disability community'],
    successMetric: 'Order volume from users who select accessible options',
    primaryTouchpoints: ['customer-app', 'fulfillment'],
    personas: ['student', 'campus-ops'],
  },
  // Partner channel support
  {
    id: 'unified-order-tracking',
    name: 'Unified Cross-Channel Order Tracking',
    category: 'Partner Channel Support Loop',
    hypothesis: 'A single order ID visible to all support teams will reduce resolution time for cross-channel issues.',
    expectedImpact: '40% reduction in integration support resolution time',
    risks: ['Technical complexity', 'Partner system changes needed'],
    requiredData: ['Current support ticket routing', 'Integration failure modes'],
    successMetric: 'Integration support resolution time',
    primaryTouchpoints: ['integrations', 'support'],
    personas: ['partner', 'student'],
  },
  // Fleet utilization
  {
    id: 'charging-optimization',
    name: 'Predictive Charging Optimization',
    category: 'Fleet / Charging Utilization',
    hypothesis: 'Optimizing charging schedules based on demand prediction will increase robot availability during peaks.',
    expectedImpact: '15% increase in peak-hour robot availability',
    risks: ['Battery degradation risks', 'Prediction accuracy dependency'],
    requiredData: ['Charging patterns', 'Demand forecasts', 'Battery health data'],
    successMetric: 'Robot availability rate during peaks',
    primaryTouchpoints: ['infrastructure'],
    personas: ['fleet-ops'],
  },
];

export const dataNeeds: DataNeed[] = [
  {
    id: 'order-funnel-instrumentation',
    item: 'Full order funnel instrumentation (browse → cart → checkout → confirm → prep → dispatch → deliver → handoff)',
    whyNeeded: 'To identify exactly where orders fail and quantify the impact of each failure mode.',
    whatWithoutIt: 'I can work with aggregate completion rates, but will need to run targeted logging experiments to understand specific drop-off points.',
  },
  {
    id: 'eta-accuracy-history',
    item: 'Historical ETA accuracy data (predicted vs. actual, broken down by venue and time)',
    whyNeeded: 'To understand current ETA model performance and identify highest-leverage improvement opportunities.',
    whatWithoutIt: 'I can set up prospective tracking and build baseline over 2-4 weeks, but initial experiments will be less precisely targeted.',
  },
  {
    id: 'cancellation-reasons',
    item: 'Cancellation reason taxonomy and frequency (system-initiated vs. customer-initiated, with sub-categories)',
    whyNeeded: 'To distinguish preventable cancellations from acceptable ones and focus efforts accordingly.',
    whatWithoutIt: 'I can analyze patterns from support tickets and manual review, but this is slower and less precise.',
  },
  {
    id: 'merchant-queue-data',
    item: 'Real-time merchant queue depth and historical patterns',
    whyNeeded: 'To build capacity controls and understand merchant bottleneck dynamics.',
    whatWithoutIt: 'I can estimate from order timing data, but explicit queue tracking would be more actionable.',
  },
  {
    id: 'handoff-timing',
    item: 'Handoff timing data (robot arrival → notification → customer arrives → unlock → complete)',
    whyNeeded: 'To understand handoff friction and measure impact of notification improvements.',
    whatWithoutIt: 'I can instrument this from scratch, but need to prioritize the implementation work.',
  },
  {
    id: 'integration-health',
    item: 'Integration health metrics (error rates, latency, failure modes by partner)',
    whyNeeded: 'To proactively identify integration issues before they become support tickets.',
    whatWithoutIt: 'I can react to support patterns, but proactive monitoring is much more effective.',
  },
  {
    id: 'accessibility-audit',
    item: 'Accessibility audit of pickup locations (mobility, vision, hearing accommodations)',
    whyNeeded: 'To understand current accessibility gaps and prioritize improvements.',
    whatWithoutIt: 'I can initiate an audit as a first-month deliverable, partnering with campus disability services.',
  },
  {
    id: 'price-sensitivity',
    item: 'Price sensitivity and elasticity data (conversion by fee level, competitive pricing)',
    whyNeeded: 'To design pricing experiments that optimize for both revenue and adoption.',
    whatWithoutIt: 'I can run controlled experiments to measure elasticity, but this takes time.',
  },
  {
    id: 'fleet-utilization',
    item: 'Fleet utilization and availability patterns (by campus, time of day, weather)',
    whyNeeded: 'To understand capacity constraints and optimize fleet deployment.',
    whatWithoutIt: 'I can work with aggregate availability, but granular data enables better optimization.',
  },
  {
    id: 'payment-failure-breakdown',
    item: 'Payment failure breakdown (by type, campus, payment method, failure reason)',
    whyNeeded: 'To prioritize payment reliability improvements and identify integration issues.',
    whatWithoutIt: 'I can analyze from support tickets, but direct instrumentation is more complete.',
  },
];

export const assumptions: Assumption[] = [
  {
    id: 'capacity-main-issue',
    assumption: 'Peak-hour capacity constraints are a primary driver of cancellations and customer dissatisfaction.',
    riskIfWrong: 'If cancellations are mostly due to other factors (e.g., payment issues, menu problems), capacity controls won\'t move the needle.',
    validationApproach: 'Analyze cancellation taxonomy in first 2 weeks, segment by cause, validate with support team qualitatively.',
    priority: 'high',
  },
  {
    id: 'eta-accuracy-matters',
    assumption: 'ETA accuracy is a key driver of customer trust and repeat usage.',
    riskIfWrong: 'If customers don\'t actually check ETAs or care about accuracy, improvements won\'t impact satisfaction.',
    validationApproach: 'Review customer feedback for ETA-related complaints, analyze correlation between ETA accuracy and NPS/repeat orders.',
    priority: 'high',
  },
  {
    id: 'merchant-want-controls',
    assumption: 'Merchants want more control over order flow and will use capacity tools if provided.',
    riskIfWrong: 'If merchants prefer hands-off operation or don\'t trust the tools, capacity controls will be underutilized.',
    validationApproach: '1:1s with 5-10 merchants in first month, prototype testing, usage analytics post-launch.',
    priority: 'medium',
  },
  {
    id: 'handoff-friction-solvable',
    assumption: 'Handoff friction is primarily a notification/UX problem, not a fundamental behavioral issue.',
    riskIfWrong: 'If students simply can\'t be ready for deliveries due to lifestyle factors, UX changes won\'t help much.',
    validationApproach: 'Analyze handoff patterns, segment by time/location, test notification improvements on willing cohort.',
    priority: 'medium',
  },
  {
    id: 'integration-support-fixable',
    assumption: 'Integration support issues can be resolved with better playbooks and tooling, not fundamental architecture changes.',
    riskIfWrong: 'If the root cause is deep integration issues, playbooks will only partially help.',
    validationApproach: 'Deep dive on top 10 integration support tickets, map root causes, assess playbook vs. architecture fixes.',
    priority: 'medium',
  },
  {
    id: 'accessibility-priority',
    assumption: 'Accessibility is a real user need and competitive differentiator, not just a compliance checkbox.',
    riskIfWrong: 'If accessibility improvements don\'t drive adoption or satisfaction, they may be deprioritized.',
    validationApproach: 'Partner with campus disability services, interview students with accessibility needs, measure demand for accessible options.',
    priority: 'high',
  },
  {
    id: 'payments-eligibility',
    assumption: 'Payments and eligibility (meal swipes, campus funds) work reliably and are well-instrumented.',
    riskIfWrong: 'If there are hidden payment failures or eligibility issues, this could be a major trust problem requiring urgent attention.',
    validationApproach: 'Review payment failure rates in first week, shadow finance reconciliation, interview campus finance partners.',
    priority: 'high',
  },
  {
    id: 'pm-transition-neutral',
    assumption: 'The previous PM transition was standard, and I should focus on system improvements rather than organizational dynamics.',
    riskIfWrong: 'If there are unresolved team dynamics or stakeholder relationships, these could block progress.',
    validationApproach: 'Listen carefully in 1:1s for signals, focus on building trust through delivery, avoid speculation about past events.',
    priority: 'medium',
  },
];

export const introContent = {
  title: 'Pezhman action plan',
  subtitle: 'Senior Product Manager — Starship 360 full-service suite',
  introParagraph: `I’m really excited about the end-to-end reality of Starship 360 on university campuses. In my view, this is a full suite of products and services that working together: robots operating in real campus conditions, merchants running a dedicated order flow alongside their POS, students relying on accurate ETAs and predictable handoffs, and campus teams coordinating the operational layer that makes it all run. That system-level complexity is exactly what draws me in. In my previous roles, I’ve built and scaled products where physical constraints mixed with digital experiences, and I’ve learned the real leverage comes from understanding & improving the whole system, not just polishing one screen.`,
  linkedIn: 'pezhman-sh',
  howToRead: 'Scroll through sections or use the navigation bar. Filter by persona or touchpoint to focus on areas relevant to you. Click cards to expand details. Use the print button to export a PDF.',
  summaryPitch: `My first 3–6 months would focus on reliability across the full Starship 360 suite: customer app, kitchen tools, kiosks, pickup, delivery, and the partner control plane. I'll start by mapping the full lifecycle and building a failure-mode dashboard, then reduce preventable cancellations and missed handoffs through capacity controls, demand steering, and better readiness and ETA modeling. I'll harden merchant ops tooling and support loops, especially across integrated channels, and scale with a campus playbook that includes accessibility and operational constraints.`,
  businessUpsideTitle: 'Business upside (what this plan unlocks)',
  businessUpsideBullets: [
    'More completed orders at peak by steering demand to pickup/kiosk when delivery would fail',
    'Lower refunds and support cost by reducing late cancels, missed handoffs, and ownership ping-pong',
    'Higher merchant retention and coverage by preventing overload cascades with capacity controls',
    'Better fleet ROI by improving utilization without breaking reliability targets',
  ],
};

export const overviewContent = {
  mentalModel: `I think of Starship 360 as a campus marketplace with physical fulfillment. At its core, it's matching demand (students wanting food) with supply (merchants who can make it and robots/pickup that can deliver it). But unlike a pure digital marketplace, the constraints are physical: robots have limited capacity, merchants have kitchen limits, sidewalks have congestion, and weather affects everything. My mental model centers on understanding and managing these physical constraints while making the digital experience feel seamless.`,
  mentalModelEmphasis: `Beyond managing constraints, this model also helps identify new revenue streams by revealing where additional demand, new fulfillment modes, or premium experiences can be introduced without compromising reliability.`,
  definitions: [
    { term: 'Supply', definition: 'Available capacity to fulfill orders—robot availability, merchant kitchen capacity, kiosk throughput, and pickup station capacity combined.' },
    { term: 'Demand', definition: 'Orders and order intent from students, whether through the app, kiosks, integrated channels, or in-person.' },
    { term: 'Capacity throttling', definition: 'Intentionally limiting incoming orders when supply is constrained to prevent overload and maintain quality.' },
    { term: 'Handoff', definition: 'The moment when an order transitions from Starship\'s control to the customer—robot delivery completion, pickup retrieval, or kiosk order collection.' },
    { term: 'ETA', definition: 'Estimated time of arrival—the sum of prep time, dispatch time, and delivery/travel time, communicated to the customer.' },
    { term: 'Channel', definition: 'An ordering entry point: the Starship app, self-order kiosk, integrated partner app, or in-person ordering.' },
    { term: 'Venue', definition: 'A merchant location that can receive and fulfill Starship orders.' },
    { term: 'Integration', definition: 'Technical connection between Starship systems and external systems (campus payment, partner ordering apps, etc.).' },
  ],
};

export const fullPlanText = `# Full 3–6 Month Action Plan

## PHASE 1: DAYS 0–30 — LISTEN, MAP, AND VALIDATE

### Week 1: Deep Immersion
The first week is about absorbing as much context as possible before forming opinions.

**Activities:**
- Shadow the support team for full shifts, document every escalation type
- Read through last 3 months of customer feedback, NPS comments, app store reviews
- Get access to all dashboards and data sources, understand what's instrumented vs. not
- Meet with engineering leads to understand technical debt and constraints
- Review product documentation, roadmaps, and any post-mortems from past launches

**Outputs:**
- Initial failure mode taxonomy (draft)
- List of data gaps and instrumentation needs
- Technical constraint summary

### Week 2: Stakeholder Mapping
Understanding the people and org dynamics is as important as understanding the system.

**Activities:**
- 1:1s with every PM, design lead, and eng lead
- Understand each person's view of the biggest problems
- Map the org chart and decision-making dynamics
- Identify champions and skeptics for various initiatives
- Meet with campus ops and support leadership

**Outputs:**
- Stakeholder map with key relationships and influence
- Alignment on biggest problems (or explicit disagreements to resolve)
- Initial hypothesis about quick wins

### Week 3: System Mapping
Now synthesize technical and human understanding into a comprehensive system view.

**Activities:**
- Create comprehensive journey maps for each persona
- Document every integration point and owner
- Build failure mode taxonomy with frequency and impact estimates
- Identify the 'invisible' systems that aren't well understood
- Walk through order flow end-to-end with engineering

**Outputs:**
- Journey maps for Student, Merchant, Campus Ops, Partner, Fleet Ops
- Integration map with owners and health status
- Failure mode taxonomy v1

### Week 4: Synthesis and Proposal
Turn learnings into an actionable plan that builds organizational buy-in.

**Activities:**
- Consolidate learnings into actionable hypothesis backlog
- Prioritize based on impact, confidence, and effort
- Present findings to leadership, get buy-in on next phase
- Establish regular stakeholder check-in rhythm
- Initiate accessibility audit with campus disability services

**Outputs:**
- Prioritized hypothesis backlog
- 30-day findings presentation
- Stakeholder sync schedule
- Accessibility audit kickoff

---

## PHASE 2: DAYS 31–60 — FIRST EXPERIMENTS

### Week 5: Capacity Controls Launch
Start with the highest-confidence intervention: helping merchants manage demand.

**Activities:**
- Work with 2 pilot venues to implement order throttling
- Create simple capacity indicator in kitchen app
- Set up monitoring for queue depth vs. completion time
- Establish baseline for 'healthy' vs. 'overwhelmed' state
- Daily check-ins with pilot merchants

**Outputs:**
- Capacity throttling MVP live at 2 venues
- Baseline metrics established
- Merchant feedback documented

### Week 6: ETA Experiments
Test whether better ETA communication improves customer satisfaction.

**Activities:**
- Launch A/B test: confidence intervals vs. point estimates
- Instrument actual vs. predicted time at each stage (kitchen, dispatch, delivery)
- Create internal dashboard for ETA accuracy tracking
- Begin building data foundation for improved prediction model

**Outputs:**
- A/B test running with statistical significance plan
- ETA accuracy dashboard
- Data requirements for model improvement

### Week 7: Handoff Instrumentation
Build the measurement foundation for handoff improvements.

**Activities:**
- Instrument full handoff funnel: notification → arrival → unlock → pickup
- Identify stages with highest drop-off
- Start collecting data on time-to-handoff variability
- Explore correlation between handoff friction and repeat orders

**Outputs:**
- Handoff funnel dashboard
- Drop-off analysis
- Hypothesis for handoff improvements

### Week 8: Synthesis and Adjustment
Learn from experiments and adjust course.

**Activities:**
- Compile experiment results and statistical significance
- Adjust parameters based on early learnings
- Share results broadly, build organizational learning culture
- Prioritize next wave of experiments based on results
- Plan for scaling successful interventions

**Outputs:**
- Experiment results summary
- Adjusted experiment parameters
- Scaling plan for successful pilots

---

## PHASE 3: DAYS 61–90 — SCALE AND HARDEN

### Week 9: Scaling Successes
Take proven interventions to more venues.

**Activities:**
- Take proven capacity controls to 50%+ of venues
- Create self-serve tools for ops team to configure venues
- Build monitoring for rollout health and edge cases
- Document patterns for campus-specific customization

**Outputs:**
- Capacity controls at 50%+ venues
- Ops self-serve configuration
- Rollout monitoring dashboard

### Week 10: Handoff Improvements
Ship improvements based on Week 7–8 learnings.

**Activities:**
- Ship redesigned handoff notification flow
- Add countdown timer and location confirmation
- Measure impact on time-to-handoff and customer satisfaction
- A/B test different notification cadences

**Outputs:**
- New notification flow shipped
- Impact measurement plan
- A/B test results

### Week 11: Support Infrastructure
Build cross-channel support capabilities.

**Activities:**
- Deploy integration support playbook
- Create shared incident response protocols with partners
- Build unified order tracking across all channels
- Train support team on new escalation paths

**Outputs:**
- Integration support playbook
- Unified tracking system
- Support team training complete

### Week 12: Accessibility Foundations
Translate audit findings into product improvements.

**Activities:**
- Complete accessibility audit with disability services
- Prototype accessible routing for mobility-impaired users
- Test with actual users from disability community
- Plan for integration into main routing system

**Outputs:**
- Accessibility audit complete
- Accessible routing prototype
- User testing results
- Integration roadmap

---

## PHASE 4: MONTHS 3–6 — SYSTEMATIZE

### Month 4: Deployment Playbook
Codify everything learned into repeatable processes.

**Activities:**
- Codify learnings from all campus launches into playbook
- Create standardized templates for venue onboarding
- Build integration templates for common campus systems
- Establish 'campus readiness score' with go/no-go criteria
- Test playbook with next campus launch, iterate based on friction

**Outputs:**
- Campus deployment playbook v1
- Venue onboarding templates
- Integration templates
- Campus readiness scoring system

### Month 5: Accessibility at Scale
Roll out accessibility improvements broadly.

**Activities:**
- Roll out accessible routing across all campuses
- Partner with disability services at each campus for local customization
- Create feedback loop for accessibility improvements
- Build metrics for inclusive service coverage
- Explore additional accessibility features based on user research

**Outputs:**
- Accessible routing in production
- Campus-specific accommodations
- Accessibility metrics dashboard
- Feature roadmap for continued improvement

### Month 6: Self-Serve and Sustainability
Build systems that scale without linear PM/eng effort.

**Activities:**
- Launch partner self-serve analytics dashboard
- Reduce dependency on PM/eng for routine partner requests
- Build experiment platform that enables faster iteration
- Create cross-campus benchmarking for continuous improvement
- Establish quarterly business review rhythm with key metrics

**Outputs:**
- Partner self-serve analytics
- Experiment platform
- Cross-campus benchmarking
- QBR framework

---

## KEY THEMES THROUGHOUT

### Reliability First
Every initiative ties back to making the service more reliable—orders complete, ETAs accurate, handoffs successful.

### Inclusive by Design
Accessibility isn't an afterthought—it's woven into every phase, from audit to routing to ongoing improvement.

### Partner with Ops
The best product improvements come from deep partnership with operations, support, and campus teams.

### Experiment Culture
Build the muscle for rapid experimentation with clear hypotheses, measurement, and learning loops.

### Scale Through Systems
Don't just solve problems—build systems that prevent problems and enable others to solve them.`;

export const metricCategories = [
  'Reliability',
  'Marketplace Balance',
  'Merchant Ops',
  'Handoff',
  'Support',
  'Accessibility',
  'Fleet/Infra',
];

export const experimentCategories = [
  'Pricing & Incentives',
  'ETA Modeling',
  'Handoff UX',
  'Merchant Ops / Capacity',
  'Kiosk / Pickup Ops',
  'Accessibility Routing',
  'Partner Channel Support Loop',
  'Fleet / Charging Utilization',
];

export const orbitRings = [
  { id: 'demand', name: 'Demand', color: 'orbit-demand' },
  { id: 'merchant', name: 'Merchant Ops', color: 'orbit-merchant' },
  { id: 'fulfillment', name: 'Fulfillment', color: 'orbit-fulfillment' },
  { id: 'control', name: 'Control Plane', color: 'orbit-control' },
  { id: 'enablers', name: 'Enablers', color: 'orbit-enablers' },
  { id: 'adjacent', name: 'Adjacent', color: 'orbit-adjacent' },
];



