import { Form } from 'antd';
// import SubHeading from '../SubHeading';
// import useSubHeading from '../../hooks/useSubHeading';
import { useForm } from 'antd/es/form/Form';
import CalculationSystemTable from './CalculationSystemTable';

function CalculationSystems({
  heading,
  tooltipDurationStart,
  tooltipDurationEnd
}: {
  heading: string;
  tooltipDurationStart: string;
  tooltipDurationEnd: string;
}) {
  // const { isSaved, handleGlobal, handleCancel, handleEdit } = useSubHeading();
  const [form] = useForm();

  return (
    <Form form={form}>
      {/* <SubHeading
        global={true}
        form={form}
        isSaved={isSaved}
        handleGlobal={handleGlobal}
        handleEdit={handleEdit}
        handleCancel={handleCancel}
      >
        Calculation Systems
      </SubHeading> */}
      <h3 className="mb-4 text-[13px] font-medium uppercase leading-4 text-other/black">{heading}</h3>

      <CalculationSystemTable tooltipDurationStart={tooltipDurationStart} tooltipDurationEnd={tooltipDurationEnd} />
    </Form>
  );
}

export default CalculationSystems;
