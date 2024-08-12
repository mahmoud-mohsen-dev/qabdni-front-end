import { Divider, Empty, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { useForm } from 'antd/es/form/Form';
import { useEffect } from 'react';
import {
  addDepartmentTemp,
  assignDepartmendTempFromFinal,
  assignDepartmendTempFromValue,
  removeDepartmentTemp,
  saveDepartment,
  updateDepartmendColorTemp
} from '../../../../store/departmentsReducer';
import { AppDispatch, RootState } from '../../../../store';
import { FiveColorsType, ValueItemType } from '../../../../types';
import Btn from '../../../../components/Btn';
import LabelInput from '../../../employees/components/LabelInput';
import CustomDrawer from '../../../../components/CustomDrawer';
import AddedItem from '../AddedItem';
// import { capitalizeName } from '../../../../utils/user';

interface CustomDrawerType {
  isOpened: boolean;
  loading: boolean;
  closeDrawer: () => void;
}

function isInDepartment(arr: [] | ValueItemType[], value: string) {
  const index = arr.findIndex((department) => department.name.toLowerCase() === value.toLowerCase());
  return index !== -1;
}

function DepartmentsDrawer({ isOpened, loading, closeDrawer }: CustomDrawerType) {
  const { final, temp } = useSelector((state: RootState) => state.departments);
  const dispatch = useDispatch<AppDispatch>();

  const [form] = useForm();

  const handleCloseDrawer = () => {
    dispatch(assignDepartmendTempFromValue([]));
  };

  const handleSave = () => {
    dispatch(saveDepartment());
  };
  const deleteConfirm = (name: string) => {
    dispatch(removeDepartmentTemp({ name }));
  };
  const handleColorChange = (updatedValue: { name: string; color: FiveColorsType }) => {
    dispatch(updateDepartmendColorTemp(updatedValue));
  };

  const onFinish = (values: { department: string }) => {
    // console.log(values);
    const payload: { name: string; color: FiveColorsType } = { name: values.department.toLowerCase(), color: 'indigo' };
    dispatch(addDepartmentTemp(payload));
    form.resetFields();
  };

  useEffect(() => {
    // console.log(isOpened);
    dispatch(assignDepartmendTempFromFinal());
  }, [isOpened]);

  return (
    <CustomDrawer
      title="Departments"
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
              name="department"
              label={<LabelInput title="ADD  NEW  DEPARTMENT" description="department Name" />}
              rules={[
                { required: true },
                {
                  validator: (_, value) => {
                    if (isInDepartment(temp.all, value) || isInDepartment(final.all, value)) {
                      return Promise.reject(new Error('Department name exist, try another one'));
                    }
                    return Promise.resolve();
                  }
                }
              ]}
            >
              <Input
                type="text"
                placeholder="Enter Department Title"
                // value={capitalizeName(form.getFieldValue('department'))}
              />
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
            temp.all.map((department, i, arr) => {
              return (
                <AddedItem
                  name={department.name}
                  color={department.color}
                  handleChange={handleColorChange}
                  deleteConfirm={deleteConfirm}
                  key={v4()}
                  index={i}
                  length={arr.length}
                />
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

export default DepartmentsDrawer;
