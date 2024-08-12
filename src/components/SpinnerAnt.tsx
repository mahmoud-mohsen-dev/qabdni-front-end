import { Spin } from 'antd';

function SpinnerAnt() {
  return (
    <div className="m-auto grid place-items-center py-20">
      <Spin tip="Loading" size="large">
        <div style={{ padding: '50px' }} />
      </Spin>
    </div>
  );
}

export default SpinnerAnt;
