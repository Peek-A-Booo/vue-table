# Vue-Fast-Table


## Installation

##### NPM

```
npm install vue-fast-table --save
```

## Usage

#### Global

```js
// require lib
import Vue from 'vue'
import VueFastTable from 'vue-fast-table'

Vue.use(VueFastTable /*, { size: { theme: 'default'  }} */）

// in page
<vue-table :data="data" :columns="columns"></vue-table>
```

#### Component

```js
// in template
<vue-table :data="data" :columns="columns"></vue-table>

// require component
import { VueFastTable } from 'vue-fast-table'

// component
export default {
  components: {
    VueFastTable
  }
}
```


## Props

#### Table

参数 | 说明 | 类型 | 可选值 | 默认值
:-: | :-: | :-: | :-: | :-:
border|是否有边框|Boolean|true/false|false|
loading|是否显示loading遮罩层|Boolean|true / false|false|
columns|表格列的配置描述，具体项见下表|Array|-|-|
data|表格显示的数据|Array|-|-|
height|表格的高度，默认为自动高度。可以为Number类型，400;也可为String类型，'400' / '400px';亦可为'+400',此时代表 height 为 calc(100vh - 400px)|Number/String|400/'400'/'400px'/'+400'|-|
index|是否展示表格行号|Boolean|true / false|false|
size|表格大小尺寸|String|default / small / mini | default|
emptyText|表格无数据时显示的文本内容|String|-|No Data|
rowClass|表格行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。|Function({row, rowIndex})|-|-|

#### Column

参数 | 说明 | 类型 | 可选值 | 默认值
:-: | :-: | :-: | :-: | :-:
key|对应表格数据的字段|String|-|-|
label|对应表头显示文本|-|-|-|
align|设置列的对齐方式|String|left / center / right|left|
slot|指定插槽对应的key|String|-|-|
tooltip|当内容过长时隐藏|Boolean|true / false|false|
width|列的固定宽度|String / Number|-|-|
type|设定某些特殊列|String|select / ..|-|
hide|是否隐藏掉该列|Boolean|true / false|false|



## Table Events

事件名 | 说明 | 参数 
:-: | :-: | :-:
select-change|当选择项发生变化时会触发该事件|selection
select-all|当用户手动勾选全选时触发的事件|selection



## Table Methods

事件名 | 说明 | 参数 
:-: | :-: | :-:
clearSelection|用于多选表格，清空用户的选择|-



## License
Copyright (c) 2020 [Peek-A-Booo](https://github.com/Peek-A-Booo) by [MIT](https://opensource.org/licenses/MIT)
