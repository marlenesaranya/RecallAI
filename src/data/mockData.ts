import { Decision, Event, Message, GraphNode, GraphLink } from '../types';

export const mockDecisions: Decision[] = [
  {
    id: '1',
    title: 'Event logistics finalized',
    date: 'Mar 2, 2026',
    timestamp: new Date('2026-03-02').getTime(),
    summary: 'Budget ₹50,000, Venue: Main Auditorium. Catering confirmed for 200 pax.',
    source: 'Email from Logistics Team',
    sourceType: 'email',
  },
  {
    id: '4',
    title: 'Guest speakers confirmed',
    date: 'Mar 1, 2026',
    timestamp: new Date('2026-03-01').getTime(),
    summary: 'Dr. Aris and Prof. Sarah confirmed for the keynote sessions.',
    source: 'Speaker_Confirmation.pdf',
    sourceType: 'pdf',
  },
  {
    id: '2',
    title: 'Marketing budget approved',
    date: 'Feb 28, 2026',
    timestamp: new Date('2026-02-28').getTime(),
    summary: '₹80,000 allocated for social media ads and physical banners.',
    source: 'Budget_Approval_Q1.pdf',
    sourceType: 'pdf',
  },
  {
    id: '3',
    title: 'Transportation arranged',
    date: 'Feb 25, 2026',
    timestamp: new Date('2026-02-25').getTime(),
    summary: 'College buses booked for student transport from city center.',
    source: 'WhatsApp Group Chat',
    sourceType: 'chat',
  },
  {
    id: '5',
    title: 'Sponsorship package finalized',
    date: 'Feb 15, 2026',
    timestamp: new Date('2026-02-15').getTime(),
    summary: 'Three tiers of sponsorship defined: Platinum, Gold, and Silver.',
    source: 'Sponsorship_Proposal.docx',
    sourceType: 'pdf',
  },
  {
    id: '6',
    title: 'Initial theme selected',
    date: 'Jan 20, 2026',
    timestamp: new Date('2026-01-20').getTime(),
    summary: '"Future of AI" chosen as the primary theme for Tech Fest 2026.',
    source: 'Brainstorming Session Notes',
    sourceType: 'chat',
  },
];

export const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Tech Fest 2026',
    date: 'Mar 20, 2026',
    location: 'Main Auditorium',
    status: 'confirmed',
  },
  {
    id: '2',
    name: 'AI Workshop',
    date: 'Mar 15, 2026',
    location: 'Lab 2',
    status: 'pending',
  },
  {
    id: '3',
    name: 'Logistics Sync',
    date: 'Mar 10, 2026',
    location: 'Conference Room B',
    status: 'confirmed',
  },
];

export const mockMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Hello! I am RecallAI. How can I help you find information today?',
  },
  {
    id: '2',
    role: 'user',
    content: 'What did we decide about event logistics?',
  },
  {
    id: '3',
    role: 'assistant',
    content: "I've analyzed your communications regarding event logistics. Here are the key details I've extracted from the Logistics Team email and the Venue Contract:",
    structuredData: {
      events: [
        { id: 'e1', name: 'Tech Fest 2026', date: 'Mar 20, 2026', location: 'Main Auditorium', status: 'confirmed' }
      ],
      budget: { amount: '₹50,000', status: 'Finalized', details: 'Allocated for venue and catering' },
      contacts: [
        { name: 'Rahul', role: 'Primary contact for venue coordination' }
      ]
    },
    sources: [
      { title: 'Logistics Team Email', type: 'email' },
      { title: 'Venue_Contract.pdf', type: 'pdf' }
    ],
  },
];

export const mockGraph: { nodes: GraphNode[]; links: GraphLink[] } = {
  nodes: [
    { id: 'd1', label: 'Event Logistics', type: 'decision' },
    { id: 'v1', label: 'Main Auditorium', type: 'document' },
    { id: 'b1', label: 'Budget ₹50,000', type: 'task' },
    { id: 'p1', label: 'Rahul', type: 'person' },
    { id: 'd2', label: 'Marketing Budget', type: 'decision' },
    { id: 'p2', label: 'Priya', type: 'person' },
  ],
  links: [
    { source: 'd1', target: 'v1' },
    { source: 'd1', target: 'b1' },
    { source: 'd1', target: 'p1' },
    { source: 'd2', target: 'p2' },
    { source: 'd2', target: 'b1' },
  ],
};
