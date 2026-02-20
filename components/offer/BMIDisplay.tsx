import { TrendingDown } from "lucide-react";

interface BMIDisplayProps {
  currentBMI: number;
  currentWeight: number;
  targetWeight: number;
  targetBMI: number;
}

export function BMIDisplay({
  currentBMI,
  currentWeight,
  targetWeight,
  targetBMI,
}: BMIDisplayProps) {
  const weightLoss = currentWeight - targetWeight;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
      {/* Header */}
      <div className="text-center mb-5">
        <h2 
          className="text-xl font-bold text-gray-900 mb-1"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Your Weight Journey
        </h2>
        <p className="text-gray-500 text-sm">
          Projected results with the GLP Diet
        </p>
      </div>

      {/* Weight Cards */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        {/* Current */}
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-500 mb-1">Current</p>
          <p className="text-2xl font-bold text-gray-900">{currentWeight}</p>
          <p className="text-sm text-gray-400">kg</p>
          <div className="mt-2 px-2 py-1 bg-amber-100 rounded-full inline-block">
            <span className="text-xs font-medium text-amber-700">
              BMI {currentBMI.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Target */}
        <div className="bg-[#e6f5f8] rounded-xl p-4 text-center">
          <p className="text-sm text-[#0097b2] mb-1">Target</p>
          <p className="text-2xl font-bold text-[#0097b2]">{targetWeight}</p>
          <p className="text-sm text-[#0097b2]/60">kg</p>
          <div className="mt-2 px-2 py-1 bg-[#0097b2]/10 rounded-full inline-block">
            <span className="text-xs font-medium text-[#0097b2]">
              BMI {targetBMI.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Weight Loss Summary */}
      <div className="bg-gradient-to-r from-[#0097b2] to-[#00b0d0] rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <TrendingDown className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white/80 text-sm">You&apos;ll lose</p>
            <p className="text-white font-bold text-lg">{weightLoss} kg</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-white/80 text-sm">Expected in</p>
          <p className="text-white font-bold text-lg">12 weeks</p>
        </div>
      </div>
    </div>
  );
}
