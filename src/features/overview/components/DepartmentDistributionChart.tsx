import { EChart } from '@kbox-labs/react-echarts';
import { PieChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, VisualMapComponent } from 'echarts/components';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

function DepartmentDistributionChart() {
  return (
    <EChart
      use={[TitleComponent, TooltipComponent, VisualMapComponent, PieChart, CanvasRenderer, LabelLayout]}
      renderer={'svg'}
      style={{
        height: '100%',
        width: '100%',
        padding: 0
      }}
      tooltip={{
        trigger: 'item'
      }}
      series={[
        {
          name: 'Distribution by Departments',
          type: 'pie',
          radius: '60%',
          center: ['50%', '50%'],
          data: [
            { value: 5, name: 'Development' },
            { value: 10, name: 'Sales & Marketing' },
            { value: 8, name: 'Project Management' },
            { value: 11, name: 'Analytics & Data' },
            { value: 15, name: 'Finance' }
          ].sort(function (a, b) {
            return a.value - b.value;
          }),
          roseType: 'radius',
          label: {
            color: 'rgba(255, 255, 255, 0.5)'
          },
          labelLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.5)'
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          }
        }
      ]}
      stateAnimation={{ duration: 300, easing: 'cubicOut' }}
      animation={true}
      animationDuration={1000}
      animationDurationUpdate={500}
      animationEasing="cubicInOut"
      animationEasingUpdate="cubicInOut"
      animationThreshold={2000}
      progressiveThreshold={3000}
      progressive={400}
      hoverLayerThreshold={3000}
      animationDelay={600}
    />
  );
}

export default DepartmentDistributionChart;
