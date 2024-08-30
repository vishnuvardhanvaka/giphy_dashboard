import useViewport from '@/hooks/useViewport';
import { AreaChart as Container, Area, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';

export default function AreaChart({ data, color, xKey, yKey, xFormat, yFormat }) {
	const { isMobile } = useViewport();

	return (
		<ResponsiveContainer width='100%' aspect={isMobile ? 1.5 : 3}>
			<Container data={data} margin={{ left: 3, right: 3, top: 3, bottom: 0 }}>
				<defs>
					<linearGradient id={`${xKey}_${yKey}_${color}`} x1='0' y1='0' x2='0' y2='1'>
						<stop offset='0%' stopColor={color} stopOpacity={1} />
						<stop offset='100%' stopColor={color} stopOpacity={0} />
					</linearGradient>
				</defs>
				<YAxis tickMargin={5} strokeOpacity={0.25} tickFormatter={yFormat?.axis} mirror />
				<Area type='monotone' dataKey={yKey} stroke={color} fill={`url(#${xKey}_${yKey}_${color})`} />
				<XAxis dataKey={xKey} tickMargin={10} strokeOpacity={0.25} tickFormatter={xFormat?.axis} />
				<Tooltip wrapperClassName='chart-tooltip' formatter={yFormat?.tooltip} labelFormatter={xFormat?.tooltip} />
			</Container>
		</ResponsiveContainer>
	);
}
