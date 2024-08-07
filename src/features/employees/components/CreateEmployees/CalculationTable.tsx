import { Form } from 'antd';
import CalculationSystemTable, { DataType } from './CalculationSystemTable';

function CalculationTable({
  heading,
  tooltipDurationStart,
  tooltipDurationEnd,
  dataSource,
  setDataSource
}: {
  heading: string;
  tooltipDurationStart: string;
  tooltipDurationEnd: string;
  dataSource: DataType[];
  setDataSource: React.Dispatch<React.SetStateAction<DataType[]>>;
}) {
  return (
    <Form>
      <h3 className="mb-4 text-[13px] font-medium uppercase leading-4 text-other/black">{heading}</h3>
      <CalculationSystemTable
        dataSource={dataSource}
        setDataSource={setDataSource}
        tooltipDurationStart={tooltipDurationStart}
        tooltipDurationEnd={tooltipDurationEnd}
      />
    </Form>
  );
}

export default CalculationTable;
