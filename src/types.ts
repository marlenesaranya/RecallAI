import * as d3 from 'd3';

export interface Decision {
  id: string;
  title: string;
  date: string;
  timestamp: number;
  summary: string;
  source: string;
  sourceType: 'email' | 'pdf' | 'chat';
}

export interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  status: 'confirmed' | 'pending' | 'tentative';
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  extractedInfo?: string[];
  structuredData?: {
    events?: Event[];
    decisions?: Decision[];
    contacts?: { name: string; role: string; icon?: string }[];
    budget?: { amount: string; status: string; details?: string };
  };
  sources?: { title: string; type: string }[];
  graphData?: {
    nodes: GraphNode[];
    links: GraphLink[];
  };
}

export interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  type: 'decision' | 'person' | 'document' | 'task' | 'event' | 'budget' | 'location';
}

export interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  source: string;
  target: string;
}
