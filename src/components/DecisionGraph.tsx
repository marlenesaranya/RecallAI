import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { mockGraph } from '../data/mockData';
import { GraphNode, GraphLink } from '../types';

interface DecisionGraphProps {
  nodes?: GraphNode[];
  links?: GraphLink[];
  title?: string;
  subtitle?: string;
  height?: string;
}

export const DecisionGraph: React.FC<DecisionGraphProps> = ({ 
  nodes = mockGraph.nodes, 
  links = mockGraph.links,
  title = "Decision Graph",
  subtitle = "Visual mapping of how decisions, people, and documents are connected.",
  height = "h-full"
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const simulation = d3.forceSimulation<GraphNode>(nodes)
      .force('link', d3.forceLink<GraphNode, GraphLink>(links).id((d) => d.id).distance(100))
      .force('charge', d3.forceManyBody<GraphNode>().strength(-300))
      .force('center', d3.forceCenter<GraphNode>(width / 2, height / 2));

    const link = svg.append('g')
      .attr('stroke', '#27272a')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', 1.5);

    const node = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .call(d3.drag<any, GraphNode>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended) as any);

    node.append('circle')
      .attr('r', 15)
      .attr('fill', (d: any) => {
        switch (d.type) {
          case 'decision': return '#a855f7'; // Purple
          case 'person': return '#10b981';   // Green
          case 'document': return '#f59e0b'; // Orange
          case 'budget': return '#ef4444';   // Red
          case 'event': return '#3b82f6';    // Blue
          case 'location': return '#6366f1'; // Indigo
          default: return '#71717a';
        }
      })
      .attr('stroke', '#09090b')
      .attr('stroke-width', 2);

    node.append('text')
      .text((d: any) => d.label)
      .attr('x', 20)
      .attr('y', 4)
      .attr('fill', '#a1a1aa')
      .attr('font-size', '10px')
      .attr('font-weight', '500');

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node
        .attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => simulation.stop();
  }, [nodes, links]);

  return (
    <div className={`p-6 ${height} flex flex-col`}>
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="text-xs text-zinc-400">{subtitle}</p>
      </div>
      <div className="flex-1 bg-zinc-950/50 border border-zinc-800 rounded-xl overflow-hidden relative min-h-[300px]">
        <svg ref={svgRef} className="w-full h-full" />
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            <span className="text-[9px] text-zinc-500 uppercase font-bold">Decision</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[9px] text-zinc-500 uppercase font-bold">Person</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-[9px] text-zinc-500 uppercase font-bold">Document</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-[9px] text-zinc-500 uppercase font-bold">Budget</span>
          </div>
        </div>
      </div>
    </div>
  );
};
