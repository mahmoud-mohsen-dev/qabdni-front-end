import { Divider, Empty, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { useForm } from 'antd/es/form/Form';
import { useEffect } from 'react';
import {
  addPositionTemp,
  assignTempFromFinal,
  assignTempFromValue,
  positionType,
  save
} from '../../../../store/positionsReducer';
import { AppDispatch, RootState } from '../../../../store';
import { FiveColorsType } from '../../../../types';
import Btn from '../../../../components/Btn';
import LabelInput from '../CreateEmployees/LabelInput';
import PositionItem from './PositionItem';
import CustomDrawer from '../../../../components/CustomDrawer';

interface CustomDrawerType {
  isOpened: boolean;
  loading: boolean;
  closeDrawer: () => void;
}

function isInPosition(arr: [] | positionType[], value: string) {
  const index = arr.findIndex((position) => position.name.toLowerCase() === value.toLowerCase());
  return index !== -1;
}

function PositionsDrawer({ isOpened, loading, closeDrawer }: CustomDrawerType) {
  const { final, temp } = useSelector((state: RootState) => state.positions);
  const dispatch = useDispatch<AppDispatch>();

  const [form] = useForm();

  const handleCloseDrawer = () => {
    dispatch(assignTempFromValue([]));
  };

  const handleSave = () => {
    dispatch(save());
  };

  const onFinish = (values: { position: string }) => {
    // console.log(values);
    const payload: { name: string; color: FiveColorsType } = { name: values.position.toLowerCase(), color: 'indigo' };
    dispatch(addPositionTemp(payload));
    form.resetFields();
  };

  useEffect(() => {
    console.log(isOpened);
    dispatch(assignTempFromFinal());
  }, [isOpened]);

  return (
    <CustomDrawer
      title="Positions"
      handleSave={handleSave}
      handleCloseDrawer={handleCloseDrawer}
      isOpened={isOpened}
      loading={loading}
      closeDrawer={closeDrawer}
    >
      <div className="positions rounded-xl border border-gray/light">
        <Form layout="horizontal" colon={false} requiredMark={false} onFinish={onFinish} form={form}>
          <div className="flex w-full p-8">
            <Form.Item
              name="position"
              label={<LabelInput title="ADD  NEW  POSITION" description="Position Name" />}
              rules={[
                { required: true },
                {
                  validator: (_, value) => {
                    if (isInPosition(temp.all, value) || isInPosition(final.all, value)) {
                      return Promise.reject(new Error('Position name exist, try another one'));
                    }
                    return Promise.resolve();
                  }
                }
              ]}
            >
              <Input type="text" placeholder="Enter Position Title" />
            </Form.Item>
            <Form.Item>
              <Btn color="black" size="lg" type="submit">
                Add
              </Btn>
            </Form.Item>
          </div>
        </Form>
        <Divider className="my-0 bg-gray/ultralight" />
        {/* Main content */}
        <div className="px-8 py-0">
          {/* Row */}
          {temp.all.length > 0 ? (
            temp.all.map((position, i, arr) => {
              return (
                <PositionItem name={position.name} color={position.color} key={v4()} index={i} length={arr.length} />
              );
            })
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </div>
      </div>
    </CustomDrawer>
  );
}

export default PositionsDrawer;
