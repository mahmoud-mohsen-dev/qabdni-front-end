import { Divider, Empty, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
// import { useForm } from 'antd/es/form/Form';
import { AppDispatch, RootState } from '../../../../store';
// import Btn from '../../../../components/Btn';
// import LabelInput from '../../../employees/components/LabelInput';
import FirstPageCustomDrawer from '../../../../components/FirstPageCustomDrawer';
import { v4 } from 'uuid';
import DotsMenu from '../../../../components/DotsMenu';
import BtnAddNewRow from '../../../../components/BtnAddNewRow';
import { useState } from 'react';
import SecondPageCustomDrawer from '../../../../components/SecondPageCustomDrawer';
import LabelInput from '../../../employees/components/LabelInput';
import { capitalizeName } from '../../../../utils/user';
import { updateTempWorkPlan } from '../../../../store/workPlansSlice';
import WorkPlanTable from '../UI/WorkPlanTable';

interface CustomDrawerType {
  isOpened: boolean;
  loading: boolean;
  closeDrawer: () => void;
}

function WorkPlanDrawer({ isOpened, loading, closeDrawer }: CustomDrawerType) {
  const { final } = useSelector((state: RootState) => state.workPlans);
  const dispatch = useDispatch<AppDispatch>();
  const [openSecondDrawer, setOpenSecondDrawer] = useState(false);
  const [isSecondDrawerLoading, setIsSecondDrawerLoading] = useState(false);

  //   const handleSave = () => {
  //     //   dispatch(savePosition());
  //   };
  const handleOpenNextDrawer = () => {
    setOpenSecondDrawer(true);
    setIsSecondDrawerLoading(true);
    setTimeout(() => {
      setIsSecondDrawerLoading(false);
    }, 800);
  };
  const handleCloseSecondDrawer = () => {
    setOpenSecondDrawer(false);
    setIsSecondDrawerLoading(false);
  };

  const handleSaveSecondDrawer = () => {};

  const handleCloseDrawer = () => {
    //   dispatch(assignTempPositionFromValue([]));
  };
  //   const deleteConfirm = (name: string) => {
  //     dispatch(removePositionTemp({ name }));
  //   };

  //   const onFinish = () => {
  //     // console.log(values);
  //     //   const payload: { name: string; color: FiveColorsType } = { name: values.position.toLowerCase(), color: 'indigo' };
  //     //   dispatch(addPositionTemp(payload));
  //     form.resetFields();
  //   };

  const handleWorkPlanDelete = () => {};

  //   useEffect(() => {
  //     // console.log(isOpened);
  //     dispatch(assignTempPositionFromFinal());
  //   }, [isOpened]);

  return (
    <>
      <FirstPageCustomDrawer
        title="Manage Work Plans"
        handleCloseDrawer={handleCloseDrawer}
        isOpened={isOpened}
        loading={loading}
        closeDrawer={closeDrawer}
      >
        {/* Main content */}
        <div className="flex min-h-[calc(100vh-140px)] flex-col justify-between px-8 py-8">
          {/* Row */}
          {final.length > 0 ? (
            <>
              <div>
                {final.map((workPlan, i, arr) => (
                  <div key={v4()}>
                    <div className="flex items-center justify-between">
                      <p key={v4()} className="text-lg font-medium">
                        {workPlan.workPlanName}
                      </p>
                      <DotsMenu
                        titleDeleteMessageConfirm="Delete Work Plan"
                        contentDeleteMessageConfirm="Are you sure to delete this work Plan?"
                        handleDelete={handleWorkPlanDelete}
                      />
                    </div>
                    {i + 1 < arr.length && <Divider className="text-gray/ultraultralight my-5" />}
                  </div>
                ))}
              </div>
              <BtnAddNewRow hideText={true} onClick={handleOpenNextDrawer} className="ml-auto mt-8" size={24} />
            </>
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </div>
      </FirstPageCustomDrawer>
      <SecondPageCustomDrawer
        title="Work Plan"
        handleCloseDrawer={handleCloseSecondDrawer}
        handleSaveDrawer={handleSaveSecondDrawer}
        isOpened={openSecondDrawer}
        loading={isSecondDrawerLoading}
        closeDrawer={handleCloseSecondDrawer}
      >
        {/* Main content */}
        <div className="flex min-h-[calc(100vh-140px)] flex-col justify-between px-8 pb-8">
          <Form
            requiredMark={false}
            colon={false}
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            labelAlign="left"
            // form={form}
            // initialValues={{ ...bankInformationData }}
          >
            <Form.Item
              name="workPlanName"
              label={
                <LabelInput
                  title="Name of Work pattern"
                  description="Specify the name of the work pattern"
                  isRequired={true}
                />
              }
              rules={[{ required: true, message: 'Work plan is required' }, { whitespace: true }, { max: 35 }]}
            >
              <Input
                placeholder={capitalizeName('Work Plan Name')}
                // disabled={isSaved}
                onChange={(e) => {
                  const value = e.target.value;
                  dispatch(updateTempWorkPlan({ targetName: 'workPlanName', data: value }));
                }}
              />
            </Form.Item>

            <div className="mt-8">
              <WorkPlanTable isSaved={false} isInViewDetails={true} />
            </div>
          </Form>
        </div>
      </SecondPageCustomDrawer>
    </>
  );
}

export default WorkPlanDrawer;
