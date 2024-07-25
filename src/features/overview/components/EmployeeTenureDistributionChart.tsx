import { EChart } from '@kbox-labs/react-echarts';
import { TooltipComponent, LegendComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

function EmployeeTenureDistributionChart() {
  return (
    <EChart
      use={[TooltipComponent, LegendComponent, PieChart, CanvasRenderer, LabelLayout]}
      style={{ width: '100%', height: '100%' }}
      tooltip={{
        trigger: 'item'
      }}
      legend={{
        bottom: '2%',
        left: 'center',
        icon: 'circle'
      }}
      series={[
        {
          name: 'Employee Tenure Distribution',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '42%'],
          avoidLabelOverlap: false,
          padAngle: 5,
          itemStyle: {
            borderRadius: 10
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 2, name: '< 1 year', itemStyle: { color: '#FAAB3C' } },
            { value: 5, name: '2-3 years', itemStyle: { color: '#1F74EC' } },
            { value: 10, name: '3+ years', itemStyle: { color: '#9566F2' } }
          ]
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

export default EmployeeTenureDistributionChart;
