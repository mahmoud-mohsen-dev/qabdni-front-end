function FixedBars({ value }: { value: number }) {
  return (
    <div className="mt-4 flex items-end justify-between">
      <div className="flex items-end gap-[5px]">
        <div className="h-11 w-4 rounded-[4px] bg-green-yellow/light"></div>
        <div className="h-6 w-4 rounded-[4px] bg-green/light"></div>
        <div className="h-9 w-4 rounded-[4px] bg-green-yellow/light"></div>
        <div className="h-11 w-4 rounded-[4px] bg-green-yellow/light"></div>
        <div className="h-6 w-4 rounded-[4px] bg-green/light"></div>
        <div className="h-9 w-4 rounded-[4px] bg-green-yellow/light"></div>
        <div className="h-7 w-4 rounded-[4px] bg-green/light"></div>
        <div className="h-8 w-4 rounded-[4px] bg-green/light"></div>
        <div className="h-11 w-4 rounded-[4px] bg-green-yellow/light"></div>
        <div className="h-6 w-4 rounded-[4px] bg-green/light"></div>
      </div>
      <span className="text-xl font-semibold">{value}</span>
    </div>
  );
}

export default FixedBars;
