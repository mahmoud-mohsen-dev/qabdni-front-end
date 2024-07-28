import { Divider, Drawer, Empty, Form, Input, Space } from 'antd';
import LabelInput from '../features/employees/components/CreateEmployees/LabelInput';
import Btn from './Btn';
import PositionItem from '../features/employees/components/Drawer/PositionItem';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { v4 } from 'uuid';
import { FiveColorsType } from '../types';
import {
  addPositionTemp,
  assignTempFromFinal,
  assignTempFromValue,
  positionType,
  save
} from '../store/positionsReducer';
import { useForm } from 'antd/es/form/Form';
import { useEffect } from 'react';

interface CustomDrawerType {
  openDrawer: boolean;
  closeDrawer: () => void;
  loading: boolean;
}

function isInPosition(arr: [] | positionType[], value: string) {
  const index = arr.findIndex((position) => position.name.toLowerCase() === value.toLowerCase());
  return index !== -1;
}

function CustomDrawer({ openDrawer, closeDrawer, loading }: CustomDrawerType) {
  const { final, temp } = useSelector((state: RootState) => state.positions);
  const dispatch = useDispatch<AppDispatch>();

  const [form] = useForm();

  const onCloseDrawer = () => {
    closeDrawer();
    assignTempFromValue([]);
  };

  const SaveChanges = () => {
    dispatch(save());
    closeDrawer();
  };

  const onFinish = (values: { position: string }) => {
    // console.log(values);
    const payload: { name: string; color: FiveColorsType } = { name: values.position.toLowerCase(), color: 'indigo' };
    dispatch(addPositionTemp(payload));
    form.resetFields();
  };

  useEffect(() => {
    dispatch(assignTempFromFinal());
  }, [openDrawer]);

  return (
    <Drawer
      title={<h2 className="font-Libre text-3xl font-semibold text-other/black&blue-normal">Positions</h2>}
      width={720}
      closable={false}
      onClose={onCloseDrawer}
      open={openDrawer}
      loading={loading}
      destroyOnClose={true}
      className="drawer"
      styles={{
        header: {
          paddingInline: 40,
          borderBottom: '1px solid #E0E4EA'
        },
        body: {
          paddingBottom: 40,
          paddingInline: 40
        }
      }}
      extra={
        <Space>
          <Btn
            onClick={onCloseDrawer}
            color="blueAccent"
            size="none"
            className="rounded-full px-[36px] py-[8px] ring-blue/normal ring-offset-1 hover:ring-1"
          >
            Cancel
          </Btn>
          <Btn
            onClick={SaveChanges}
            type="submit"
            size="none"
            className="ml-2 rounded-lg px-[36px] py-[8px] ring-blue/normal ring-offset-1 hover:ring-1"
          >
            Save
          </Btn>
        </Space>
      }
    >
      <button
        className="absolute left-0 top-1/2 z-30 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gray/ultralight focus:outline-none"
        onClick={onCloseDrawer}
      >
        <img src="/images/chevron-right.svg" alt="chevron right" />
      </button>

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
        <div className="px-8 py-4">
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
    </Drawer>
  );
}

export default CustomDrawer;
