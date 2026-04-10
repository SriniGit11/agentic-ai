'use client';

import React from 'react';
import { MetricsData } from '@/app/types';
import { formatCost, formatCO2 } from '@/app/lib/utils';

interface MetricsPanelProps {
  data: MetricsData;
  onToggleMetrics?: () => void;
}

export default function MetricsPanel({ data, onToggleMetrics }: MetricsPanelProps) {
  return (
    <aside className="w-80 bg-gray-50 flex flex-col h-screen border-l border-gray-200 overflow-y-auto">
      <div className="p-6 border-b border-gray-200 flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-gray-900 mb-0">Operational Metrics</h2>
        {onToggleMetrics && (
          <button
            type="button"
            onClick={onToggleMetrics}
            className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center text-gray-700 transition-colors"
            aria-label="Collapse metrics panel"
          >
            <span className="text-lg">›</span>
          </button>
        )}
      </div>

        <div className="space-y-4">
          {/* Estimated Cost */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Estimated Cost</span>
              <span className="text-xl font-bold text-green-600">{formatCost(data.estimatedCost)}</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Based on current API usage</p>
          </div>

          {/* CO₂ Impact */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">CO₂ Impact</span>
              <span className="text-xl font-bold text-emerald-600">{formatCO2(data.co2Impact)}</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Carbon footprint of this session</p>
          </div>
        </div>

      {/* Execution Log */}
      <div className="flex-1 p-6 flex flex-col">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Execution Log</h3>

        <div className="space-y-3 flex-1">
          {data.executionSteps.map((step, index) => (
            <div key={step.id} className="flex items-start gap-3">
              {/* Checkbox */}
              <div className="mt-1 flex-shrink-0">
                {step.completed ? (
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                )}
              </div>

              {/* Step Content */}
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium ${
                    step.completed ? 'text-gray-900' : 'text-gray-600'
                  }`}
                >
                  {step.name}
                </p>
                {step.timestamp && (
                  <p className="text-xs text-gray-500 mt-1">
                    {step.timestamp.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-6 border-t border-gray-200 bg-white">
        <p className="text-xs text-gray-500 text-center">
          Session ID: <span className="font-mono text-gray-700">sess_3a8f2b9</span>
        </p>
      </div>
    </aside>
  );
}
