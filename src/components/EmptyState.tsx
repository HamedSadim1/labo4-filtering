import React from "react";

const EmptyState: React.FC = () => {
  return (
    <div className="backdrop-blur-xl bg-black/20 dark:bg-black/30 rounded-2xl p-8 text-center shadow-2xl border border-white/10 dark:border-white/5">
      <div className="text-6xl mb-4">🔍</div>
      <h3 className="text-xl font-semibold text-white mb-2">
        No students found
      </h3>
      <p className="text-white/70">Try adjusting your search criteria</p>
    </div>
  );
};

export default EmptyState;
