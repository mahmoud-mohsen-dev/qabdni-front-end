import { Form } from 'antd';
import CalculationSystemTable from './CalculationSystemTable';
import { TableRowType } from '../../../../types';

function CalculationTable({
  heading,
  tooltipDurationStart,
  tooltipDurationEnd,
  dataSource,
  setDataSource,
  isSaved = false,
  isEmployeeDetailsPage = false
}: {
  heading: string;
  tooltipDurationStart: string;
  tooltipDurationEnd: string;
  dataSource: TableRowType[];
  setDataSource: React.Dispatch<React.SetStateAction<TableRowType[]>>;
  isSaved?: boolean;
  isEmployeeDetailsPage?: boolean;
}) {
  return (
    <Form disabled={isEmployeeDetailsPage ? isSaved : false}>
      <h3 className="mb-4 text-[13px] font-medium uppercase leading-4 text-other/black">{heading}</h3>
      <CalculationSystemTable
        dataSourceWithTimePickerString={dataSource}
        setDataSourceWithTimePickerString={setDataSource}
        tooltipDurationStart={tooltipDurationStart}
        tooltipDurationEnd={tooltipDurationEnd}
        isEmployeeDetailsPage={isEmployeeDetailsPage}
        isSaved={isSaved}
      />
    </Form>
  );
}

export default CalculationTable;
