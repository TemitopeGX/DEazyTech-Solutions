import React from "react";

const Background = () => {
  return (
    <div className="fixed inset-0 -z-50 pointer-events-none">
      {/* Main graph pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(#8a0faf05_1px,transparent_1px),linear-gradient(to_right,#8a0faf05_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Diagonal lines */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,#ff096c05_1px,transparent_1px),linear-gradient(-45deg,#8a0faf05_1px,transparent_1px)] bg-[size:48px_48px]" />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#ffffff_70%)]" />
    </div>
  );
};

export default Background;
