import {select} from 'd3-selection'
import {scalePoint, scaleLinear} from 'd3-scale'
import {axisBottom, axisLeft} from 'd3-axis'
import {mergeDefaults} from '../options'

const getYScale = (words, innerHeight) => {
	return scalePoint().domain(words).range([0, innerHeight]).padding(1)
}

const drawLeftAxis = (svg, yScale) => {
	svg.append('g').call(axisLeft(yScale))
}

const getXScale = (maxCount, innerWidth, margeY) => {
	return scaleLinear()
		.domain([0, maxCount])
		.range([0, innerWidth - (2 * margeY)])
}

const drawBottomAxis = (svg, xScale, innerHeight) => {
	svg.append('g')
		.attr('transform', `translate(0,${innerHeight})`)
		.call(axisBottom(xScale))
		.selectAll('text')
		.style('text-anchor', 'end')
}

const drawLollipop = (svg, data, x, y) => {
	// Lines
	svg.selectAll('myline')
		.data(data)
		.enter()
		.append('line')
		.attr('x1', d => x(d[1]))
		.attr('x2', x(0))
		.attr('y1', d => y(d[0]))
		.attr('y2', d => y(d[0]))
		.attr('stroke', 'grey')

	// Circles
	svg.selectAll('mycircle')
		.data(data)
		.enter()
		.append('circle')
		.attr('cx', d => x(d[1]))
		.attr('cy', d => y(d[0]))
		.attr('r', '7')
		.style('fill', '#69b3a2')
		.attr('stroke', 'black')
}

// See https://www.d3-graph-gallery.com/graph/lollipop_ordered.html
const lollipop = (div, data, options = {}) => {
	const sortedData = data.sort((a,b) => b[1] - a[1])
	const effOptions = mergeDefaults(options)

	// Calculate sizes
	const margeX = effOptions.margin.left + effOptions.margin.right
	const margeY = effOptions.margin.top + effOptions.margin.bottom

	const {width, height} = div.getBoundingClientRect()
	const innerWidth = width - margeY
	const innerHeight = height - margeX

	// Append an appropriately sized svg
	const svg = select(div)
		.append('svg')
		.attr('width', width)
		.attr('height', height)
		.append('g')
		.attr('transform',
			`translate(${effOptions.margin.left},${effOptions.margin.top})`)

	// Split data into parts and calculate maximum
	const words = sortedData.map(item => item[0])
	const counts = sortedData.map(item => item[1])
	const maxCount = counts.reduce((acc, c) => Math.max(acc, c), 0)

	// X-Axis
	const xScale = getXScale(maxCount, innerWidth, margeY)
	drawBottomAxis(svg, xScale, innerHeight)

	// Y-Axis
	const yScale = getYScale(words, innerHeight)
	drawLeftAxis(svg, yScale)

	// Finally the lollipop
	drawLollipop(svg, sortedData, xScale, yScale)
}

export default lollipop
