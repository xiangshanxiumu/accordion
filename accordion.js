/** 
 * @基于JQ的手风琴插件封装
 * @author xiangshanxiumu
 * @version 1.00
*/
class Accordion {
    constructor(options) {
        this.el = options.el
        this.imgs = options.imgs
        this.imgOpen = options.imgOpen
        //this.imgOpen ? this.imgOpen : 'X'
        this.imgOpen = this.imgOpen || 'X'

        this.init(this.el, this.imgs)
        this.event(this.ul, this.max, this.avg, this.min)
    }
    init(el, imgs) {
        if (this.imgOpen == 'X') {
            //创建ul 设置样式 添加到目标元素内
            this.ul = $('<ul></ul>').css({
                width: 'inherit',
                height: 'inherit',
                'background-color': '#ccc',
                display: 'flex',
                overflow: 'hidden'
            }).appendTo(el)

            this.max = 0.618 * this.ul.width() //图片最大显示宽度设置整个外框的黄金分割比例
            this.avg = this.ul.width() / imgs.length //计算出未展开时平均宽度
            this.min = (this.ul.width() - this.max) / (imgs.length - 1) //某张图片展开后 其余图片显示宽度
            // 依次创建li>a>img 设置样式 添加元素
            for (let i = 0; i < imgs.length; i++) {
                this.li = $('<li></li>').css({
                    'list-style': 'none',
                    width: this.avg,
                    height: 'inherit',
                    overflow: 'hidden'
                }).appendTo(this.ul)
                this.a = $('<a href="#"></a>').css({
                    'text-decoration': 'none',
                    width: 'inherit',
                    height: 'inherit'
                }).appendTo(this.li)
                this.img = $('<img src="' + imgs[i] + '"/>').css({
                    height: 'inherit',
                    width: this.max
                }).appendTo(this.a)
            }
        } else {
            //创建ul 设置样式 添加到目标元素内
            this.ul = $('<ul></ul>').css({
                width: 'inherit',
                height: 'inherit',
                'background-color': '#ccc',
                overflow: 'hidden'
            }).appendTo(el)

            this.max = 0.618 * this.ul.width() //图片最大显示高度设置外框宽度的黄金分割比例
            this.avg = this.ul.height() / imgs.length //计算出未展开时平均高度
            this.min = (this.ul.height() - this.max) / (imgs.length - 1) //某张图片展开后 其余图片显示高度
            // 依次创建li>a>img 设置样式 添加元素
            for (let i = 0; i < imgs.length; i++) {
                this.li = $('<li></li>').css({
                    'list-style': 'none',
                    width: 'inherit',
                    height: this.avg,
                    overflow: 'hidden'
                }).appendTo(this.ul)
                this.a = $('<a href="#"></a>').css({
                    'text-decoration': 'none',
                    width: 'inherit',
                    height: 'inherit'
                }).appendTo(this.li)
                this.img = $('<img src="' + imgs[i] + '"/>').css({
                    width: 'inherit',
                    height: this.max
                }).appendTo(this.a)
            }
        }
    }
    event(ul, max, avg, min) {
        if (this.imgOpen == 'X') { //'X'轴展开图片
            //遍历ul下面li 加载事件
            ul.children().each(function () {
                $(this).on('mouseenter', () => {
                    $(this).stop().animate({ width: max }, 300).siblings().stop().animate({ width: min }, 300)
                })
                $(this).on('mouseleave', () => {
                    $(this).stop().animate({ width: avg }, 300).siblings().stop().animate({ width: avg }, 300)
                })
            })
        } else { // 'Y'轴展开图片
            //遍历ul下面li 加载事件
            ul.children().each(function () {
                $(this).on('mouseenter', () => {
                    $(this).stop().animate({ height: max }, 300).siblings().stop().animate({ height: min }, 300)
                })
                $(this).on('mouseleave', () => {
                    $(this).stop().animate({ height: avg }, 300).siblings().stop().animate({ height: avg }, 300)
                })
            })
        }
    }

}

