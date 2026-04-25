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
      {/* Execution Log - on TOP with banner */}
      <div className="flex-1 p-6 flex flex-col min-h-[400px]">
        {/* Banner for Execution Log */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-4 mb-4 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 className="text-white font-bold uppercase tracking-wider">Execution Log</h3>
          </div>
          {onToggleMetrics && (
            <button
              type="button"
              onClick={onToggleMetrics}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center text-white transition-colors"
              aria-label="Collapse panel"
            >
              <span className="text-lg">›</span>
            </button>
          )}
        </div>

        <div className="space-y-3 flex-1 overflow-y-auto">
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

      {/* Operational Metrics - on BOTTOM with banner */}
      <div className="p-6 border-t border-gray-200 space-y-4">
        {/* Banner for Operational Metrics */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-4 flex items-center gap-3 shadow-lg">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-white font-bold uppercase tracking-wider">Operational Metrics</h3>
        </div>
        
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

      {/* Footer Info */}
      <div className="p-6 border-t border-gray-200 bg-white">
        <p className="text-xs text-gray-500 text-center">
          Session ID: <span className="font-mono text-gray-700">sess_3a8f2b9</span>
        </p>
      </div>
    </aside>
  );
}
