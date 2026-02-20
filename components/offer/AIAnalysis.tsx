import type { AnalysisResponse } from "@/types";
import { Sparkles, AlertCircle, Lightbulb } from "lucide-react";

interface AIAnalysisProps {
  analysis: AnalysisResponse;
}

export function AIAnalysis({ analysis }: AIAnalysisProps) {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-[#e6f5f8] px-4 py-2 rounded-full mb-3">
          <Sparkles className="w-4 h-4 text-[#0097b2]" />
          <span className="text-sm font-semibold text-[#0097b2]">
            AI Analysis Complete
          </span>
        </div>
        <h2 
          className="text-xl font-bold text-gray-900"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Your Personalized Insights
        </h2>
      </div>

      {/* Main Summary */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
        <p className="text-gray-700 leading-relaxed">
          {analysis.summary}
        </p>
      </div>

      {/* Key Insights */}
      {analysis.keyInsights && analysis.keyInsights.length > 0 && (
        <div className="bg-[#fffbeb] rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-amber-600" />
            <h3 className="font-semibold text-gray-900">Key Insights</h3>
          </div>
          <ul className="space-y-2">
            {analysis.keyInsights.map((insight, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span className="text-[14px] text-gray-700">{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendations */}
      {analysis.recommendations && analysis.recommendations.length > 0 && (
        <div className="bg-[#e6f5f8] rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-[#0097b2]" />
            <h3 className="font-semibold text-gray-900">Recommendations</h3>
          </div>
          <ul className="space-y-2">
            {analysis.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-[#0097b2] font-bold">•</span>
                <span className="text-[14px] text-gray-700">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggested Timeline */}
      {analysis.timeline && (
        <div className="bg-gradient-to-r from-[#0097b2] to-[#00b0d0] rounded-2xl p-5 text-white">
          <h3 className="font-semibold mb-2">Your Timeline</h3>
          <p className="text-white/90 text-sm leading-relaxed">
            {analysis.timeline}
          </p>
        </div>
      )}
    </div>
  );
}
