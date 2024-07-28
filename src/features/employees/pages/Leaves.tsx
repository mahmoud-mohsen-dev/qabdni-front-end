function Leaves() {
  return (
    <div>
      Leaves{' '}
      <div style={{ position: 'relative', zIndex: 9999 }}>
        <button onClick={() => console.log('clicked')}>click</button>
      </div>
    </div>
  );
}

export default Leaves;
