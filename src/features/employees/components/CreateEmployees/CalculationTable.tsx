import { Form } from 'antd';
import CalculationSystemTable from './CalculationSystemTable';
import { EmployeeCalculationTableNameType } from '../../../../types';

function CalculationTable({
  heading,
  tooltipDurationStart,
  tooltipDurationEnd,

  isSaved = false,
  isEmployeeDetailsPage = false,
  tableName
}: {
  heading: string;
  tooltipDurationStart: string;
  tooltipDurationEnd: string;
  isSaved?: boolean;
  isEmployeeDetailsPage?: boolean;
  tableName: EmployeeCalculationTableNameType;
}) {
  return (
    <Form disabled={isEmployeeDetailsPage ? isSaved : false}>
      <h3 className="mb-4 text-[13px] font-medium uppercase leading-4 text-other/black">{heading}</h3>
      <CalculationSystemTable
        tableName={tableName}
        tooltipDurationStart={tooltipDurationStart}
        tooltipDurationEnd={tooltipDurationEnd}
        isEmployeeDetailsPage={isEmployeeDetailsPage}
        isSaved={isSaved}
      />
    </Form>
  );
}

export default CalculationTable;
