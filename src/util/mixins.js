let cached
let timeout = null
export default {
  methods: {
    $width(data) {
      let width = ''
      if (!data) {
        width = ''
      } else if (typeof data === 'number') {
        width = data + 'px'
      } else if (data.includes('+')) {
        width = `calc(100vw - ${data.slice(1)}px)`
      } else if (data.includes('calc') || data.includes('px')) {
        width = data
      } else {
        width = data + 'px'
      }
      return width
    },

    /**
     * @param data 主高度
     * @param subData 需要减去的高度
     * */
    $height(data, subData = 0) {
      let height = ''
      if (!data) {
        height = ''
      } else if (typeof data === 'number') {
        height = data - subData + 'px'
      } else if (data.includes('+')) {
        height = `calc(100vh - ${data.slice(1) - subData}px)`
      } else if (data.includes('calc')) {
        // height = data
      } else if (data.includes('px')) {
        height = parseInt(data) - subData + 'px'
      } else {
        height = data - subData + 'px'
      }
      return height
    },
    $h(data) {
      let height
      if (!data) return ''
      if (data.includes('+')) {
        height = `calc(100vh - ${data.slice(1)}px)`
      } else if (!isNaN(data / 1)) {
        height = data + 'px'
      } else {
        height = data
      }
      return height
    },

    getScrollBarWidth(fresh) {
      if (this.$isServer) return 0
      if (fresh || cached === undefined) {
        const inner = document.createElement('div');
        inner.style.width = '100%';
        inner.style.height = '200px';

        const outer = document.createElement('div');
        const outerStyle = outer.style;

        outerStyle.position = 'absolute';
        outerStyle.top = 0;
        outerStyle.left = 0;
        outerStyle.pointerEvents = 'none';
        outerStyle.visibility = 'hidden';
        outerStyle.width = '200px';
        outerStyle.height = '150px';
        outerStyle.overflow = 'hidden';

        outer.appendChild(inner);

        document.body.appendChild(outer);

        const widthContained = inner.offsetWidth;
        outer.style.overflow = 'scroll';
        let widthScroll = inner.offsetWidth;

        if (widthContained === widthScroll) {
          widthScroll = outer.clientWidth;
        }

        document.body.removeChild(outer);

        cached = widthContained - widthScroll;
      }
      return cached;
    },

    /**
     * 定时器事件(如果没有瞬间第二次触发，才触发最终事件)
     * */
    $timeout(func, timeout = 0) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      timeout = setTimeout(_ => {
        func()
      }, timeout)
    },
  },
}
