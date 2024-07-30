import { Form } from 'antd';
import SubHeading from './SubHeading';
import useSubHeading from '../../hooks/useSubHeading';

function CalculationSystems() {
  const { isEditable, handleSave, handleEdit } = useSubHeading();
  return (
    <Form>
      <SubHeading global={true} isEditable={isEditable} handleSave={handleSave} handleEdit={handleEdit}>
        Calculation Systems
      </SubHeading>
    </Form>
  );
}

export default CalculationSystems;
