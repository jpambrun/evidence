---
title: Bubble Chart
sidebar_position: 1
---

![bubble](/img/exg-multi-series-bubble-nt.svg)

```markdown
<BubbleChart 
    data={query_name} 
    x=column_x 
    y=column_y
    size=column_size
/>
```

## Examples

### Bubble

![bubble](/img/exg-bubble-nt.svg)

```markdown
<BubbleChart 
    data={simple_example} 
    x=x 
    y=y 
    size=size 
    xAxisTitle=true 
    yAxisTitle=true
/>
```

### Multi-Series Bubble

![bubble](/img/exg-multi-series-bubble-nt.svg)

```markdown
<BubbleChart 
    data={scores_by_region} 
    x=score_a 
    y=score_b 
    size=size 
    series=region 
    xAxisTitle=true 
    yAxisTitle=true
/>
```

## Options

### Data

<PropListing 
    name="data"
    required
    options="query name"
>

Query name, wrapped in curly braces

</PropListing>
<PropListing 
    name="x"
    required
    options="column name"
    defaultValue="First column"
>

Column to use for the x-axis of the chart

</PropListing>
<PropListing 
    name="y"
    required
    options="column name | array of column names"
    defaultValue="Any non-assigned numeric columns"
>

Column(s) to use for the y-axis of the chart

</PropListing>
<PropListing 
    name="series"
    options="column name"
>

Column to use as the series (groups) in a multi-series chart

</PropListing>
<PropListing 
    name="size"
    required
    options="column name"
>

Column to use to scale the size of the bubbles

</PropListing>
<PropListing 
    name="sort"
    options={['true', 'false']}
    defaultValue=true
>

Whether to apply default sort to your data. Default is x ascending for number and date x-axes, and y descending for category x-axes

</PropListing>
<PropListing 
    name="tooltipTitle"
    options="column name"
>

Column to use as the title for each tooltip. Typically, this is a name to identify each point.

</PropListing>
<PropListing 
    name="emptySet"
    options={['error', 'warn', 'pass']}
    defaultValue='error'
>

Sets behaviour for empty datasets. Can throw an error, a warning, or allow empty. When set to 'error', empty datasets will block builds in `build:strict`. Note this only applies to initial page load - empty datasets caused by input component changes (dropdowns, etc.) are allowed.

</PropListing>
<PropListing 
    name="emptyMessage"
    options="string"
    defaultValue='No records'
>

Text to display when an empty dataset is received - only applies when `emptySet` is 'warn' or 'pass', or when the empty dataset is a result of an input component change (dropdowns, etc.).

</PropListing>

### Formatting & Styling

<PropListing 
    name="xFmt"
    options="Excel-style format | built-in format name | custom format name"
>

Format to use for x column ([see available formats](/core-concepts/formatting))

</PropListing>
<PropListing 
    name="yFmt"
    options="Excel-style format | built-in format name | custom format name"
>

Format to use for y column ([see available formats](/core-concepts/formatting))

</PropListing>
<PropListing 
    name="sizeFmt"
    options="Excel-style format | built-in format name | custom format name"
>

Format to use for size column ([see available formats](/core-concepts/formatting))

</PropListing>
<PropListing 
    name="shape"
    options="circle | emptyCircle | rect | triangle | diamond"
    defaultValue='circle'
>

Options for which shape to use for bubble points

</PropListing>
<PropListing 
    name="scaleTo"
    options="number"
    defaultValue=1
>

Scale the size of the bubbles by this factor (e.g., 2 will double the size)

</PropListing>
<PropListing 
    name="opacity"
    options="number (0 to 1)"
    defaultValue=0.7
>

% of the full color that should be rendered, with remainder being transparent

</PropListing>
<PropListing 
    name="fillColor"
    options="CSS name | hexademical | RGB | HSL"
>

Color to override default series color. Only accepts a single color.

</PropListing>
<PropListing 
    name="outlineWidth"
    options="number"
    defaultValue=0
>

Width of line surrounding each shape

</PropListing>
<PropListing 
    name="outlineColor"
    options="CSS name | hexademical | RGB | HSL"
>

Color to use for outline if outlineWidth > 0

</PropListing>
<PropListing 
    name="colorPalette"
    options="array of color strings (CSS name | hexademical | RGB | HSL)"
    defaultValue='built-in color palette'
>

Array of custom colours to use for the chart. E.g., ['#cf0d06','#eb5752','#e88a87'] Note that the array must be surrounded by curly braces.

</PropListing>
<PropListing 
    name="seriesColors"
    options="object with series names and assigned colors"
    defaultValue='colors applied by order of series in data'
>

Apply a specific color to each series in your chart. Unspecified series will receive colors from the built-in palette as normal. Note the double curly braces required in the syntax `seriesColors={{"Canada": "red", "US": "blue"}}`

</PropListing>

### Axes

<PropListing 
    name="yLog"
    options={['true', 'false']}
    defaultValue=false
>

Whether to use a log scale for the y-axis

</PropListing>
<PropListing 
    name="yLogBase"
    options="number"
    defaultValue=10
>

Base to use when log scale is enabled

</PropListing>
<PropListing 
    name="xAxisTitle"
    options="true | string | false"
    defaultValue=true
>

Name to show under x-axis. If 'true', formatted column name is used. Only works with swapXY=false

</PropListing>
<PropListing 
    name="yAxisTitle"
    options="true | string | false"
    defaultValue=true
>

Name to show beside y-axis. If 'true', formatted column name is used.

</PropListing>
<PropListing 
    name="xGridlines"
    options={['true', 'false']}
    defaultValue=false
>

Turns on/off gridlines extending from x-axis tick marks (vertical lines when swapXY=false)

</PropListing>
<PropListing 
    name="yGridlines"
    options={['true', 'false']}
    defaultValue=true
>

Turns on/off gridlines extending from y-axis tick marks (horizontal lines when swapXY=false)

</PropListing>
<PropListing 
    name="xAxisLabels"
    options={['true', 'false']}
    defaultValue=true
>

Turns on/off value labels on the x-axis

</PropListing>
<PropListing 
    name="yAxisLabels"
    options={['true', 'false']}
    defaultValue=true
>

Turns on/off value labels on the y-axis

</PropListing>
<PropListing 
    name="xBaseline"
    options={['true', 'false']}
    defaultValue=true
>

Turns on/off thick axis line (line appears at y=0)

</PropListing>
<PropListing 
    name="yBaseline"
    options={['true', 'false']}
    defaultValue=false
>

Turns on/off thick axis line (line appears directly alongside the y-axis labels)

</PropListing>
<PropListing 
    name="xTickMarks"
    options={['true', 'false']}
    defaultValue=false
>

Turns on/off tick marks for each of the x-axis labels

</PropListing>
<PropListing 
    name="yTickMarks"
    options={['true', 'false']}
    defaultValue=false
>

Turns on/off tick marks for each of the y-axis labels

</PropListing>
<PropListing 
    name="yMin"
    options="number"
>

Starting value for the y-axis

</PropListing>
<PropListing 
    name="yMax"
    options="number"
>

Maximum value for the y-axis

</PropListing>

### Chart

<PropListing 
    name="title"
    options="string"
>

Chart title. Appears at top left of chart.

</PropListing>
<PropListing 
    name="subtitle"
    options="string"
>

Chart subtitle. Appears just under title.

</PropListing>
<PropListing 
    name="legend"
    options={['true', 'false']}
    defaultValue='true for multiple series'
>

Turns legend on or off. Legend appears at top center of chart.

</PropListing>
<PropListing 
    name="chartAreaHeight"
    options="number"
    defaultValue=180
>

Minimum height of the chart area (excl. header and footer) in pixels. Adjusting the height affects all viewport sizes and may impact the mobile UX.

</PropListing>
<PropListing 
    name="renderer"
    options="canvas | svg"
    defaultValue='canvas'
>

Which chart renderer type (canvas or SVG) to use. See ECharts' [documentation on renderers](https://echarts.apache.org/handbook/en/best-practices/canvas-vs-svg/).

</PropListing>

### Custom Echarts Options

<PropListing 
    name="echartsOptions"
    options="{`{{exampleOption:'exampleValue'}}`}"
>

Custom Echarts options to override the default options. See [reference page](/components/echarts-options/) for available options.

</PropListing>
<PropListing 
    name="seriesOptions"
    options="{`{{exampleSeriesOption:'exampleValue'}}`}"
>

Custom Echarts options to override the default options for all series in the chart. This loops through the series to apply the settings rather than having to specify every series manually using `echartsOptions`. See [reference page](/components/echarts-options/) for available options.

</PropListing>
<PropListing 
    name="printEchartsConfig"
    options={['true', 'false']}
    defaultValue="false"
>

Helper prop for custom chart development - inserts a code block with the current echarts config onto the page so you can see the options used and debug your custom options

</PropListing>

### Interactivity

<PropListing
    name=connectGroup
>

Group name to connect this chart to other charts for synchronized tooltip hovering. Charts with the same `connectGroup` name will become connected

</PropListing>


## Annotations

Bubble charts can include [annotations](/components/annotations) using the `ReferenceLine` and `ReferenceArea` components. These components are used within a chart component like so:

```html
<BubbleChart data={sales_data} x=date y=sales>
  <ReferenceLine data={target_data} y=target label=name/>
  <ReferenceArea xMin='2020-03-14' xMax='2020-05-01'/>
</BubbleChart>
```