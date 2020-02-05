# Vue-Fast-Table

## Installation

##### NPM

```
npm install vue-fast-table --save
```

## Usage


## API

##### Table

name | 111 | 222 | 333 | 444
:-: | :-: | :-: | :-: | :-:
aaa | bbb | ccc | ddd | eee| 
fff | ggg| hhh | iii | 000|



参数|说明|类型|可选值|默认值
|-|-|-|-|
|border|是否有边框|Boolean|true/false|false|
|loading|是否显示loading遮罩层|Boolean|true/false|false|
|columns|表格列的配置描述，具体项见下表|Array|-|-|
|data|表格显示的数据|Array|-|-|
|height|表格的高度，默认为自动高度。可以为Number类型，400;也可为String类型，'400'/'400px';亦可为'+400',此时代表 height 为 calc(100vh - 400px)|Number/String|400/'400'/'400px'/'+400'|-|
|index|是否展示表格行号|Boolean|true/false|false|
|size|表格大小尺寸|String|default/small/mini|default|
|emptyText|表格无数据时的文字|String|-|No Data|


### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
