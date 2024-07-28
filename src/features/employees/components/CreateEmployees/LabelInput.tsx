interface RawInputType {
  title: string;
  description: string;
  isRequired?: boolean;
}

function LabelInput({ title, description, isRequired = false }: RawInputType) {
  return (
    <div className="flex flex-col items-start gap-1">
      <div className="font-Libre text-[13px] font-medium uppercase leading-3 text-other/black">
        {title} {isRequired && <span className='font-["SimSun,sans-serif"] text-red/accent'>*</span>}
      </div>
      <div className="font-mullish text-xs font-normal capitalize text-gray/darkest">{description}</div>
    </div>
  );
}

export default LabelInput;
