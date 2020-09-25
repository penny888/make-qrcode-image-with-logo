/*!
 * 生成带logo二维码工具类QRcodeUtil
 * 依赖qrcode.js、html2canvas.js
 * QRcodeUtil.makeCode({
        logo: document.getElementById('logo'), // logo元素(可选)
        logoBgShow: true, // 是否显示logo背景 (可选)
        url: 'http://www.baidu.com', // 二维码url
        target: document.body, // 显示二维码的目标元素
        width: 400, // 二维码宽度(px) (可选)
        height: 400, // 二维码高度(px) (可选)
        borderWidth: 20 // 二维码边框宽度 (可选)
        borderColor: '#fff' // 二维码边框颜色 (可选)
    }).makeImage(); // 生成二维码图片(可选)
 *
 */

!function(A) {
    var document = A.document;
    var QRcodeUtil =  {};
    var e;
    QRcodeUtil.makeCode = function (options) {
        e = document.createElement('div');
        e.style.position = 'relative';
        e.style.boxSizing = 'content-box';
        var w1 = options.width || 160;
        var h1 = (options.height || 160);
        if ((options.width < 100) || (options.height < 100)) {alert('二维码宽高不能小于100'); return;}
        var bw = options.borderWidth || 16;
        e.style.width =  w1 + 'px';
        e.style.height =  h1 +'px';
        e.style.border = bw + 'px solid ' + (options.borderColor || '#fff');
        new QRCode(e, {width: w1, height: h1}).makeCode(options.url);
        if (options.logo) {
            var c = e.querySelector('canvas').cloneNode();
            var scale = 2;
            c.width = w1 * scale;
            c.height = h1 * scale;
            c.style.width = w1 + "px";
            c.style.height = h1 + "px";
            var ctx = c.getContext('2d');
            ctx.scale(scale, scale);
            ctx.drawImage(options.logo, parseInt(w1*0.75/2), parseInt(h1*0.75/2), parseInt(w1*0.25), parseInt(h1*0.25));
            if (options.logoBgShow) {
                var d1 = document.createElement('div');
                d1.style.position = 'absolute';
                d1.style.height = parseInt(h1*0.25) - 1 + 'px';
                d1.style.width = parseInt(w1*0.25) + 'px';
                d1.style.border = '1px solid #ccc';
                d1.style.borderRadius = '8px';
                d1.style.top = parseInt((h1 - (h1*0.25 + 2))/2) + 'px';
                d1.style.left = parseInt((w1 - (w1*0.25 + 2))/2) + 'px';
                d1.style.zIndex = '999';
                d1.style.backgroundColor = '#fff';
                var d2 = document.createElement('div');
                d2.style.position = 'absolute';
                d2.style.height = parseInt(h1*0.25 + h1*0.04) + 'px';
                d2.style.width = parseInt(w1*0.25 + w1*0.04) + 'px';
                d2.style.borderRadius = '10px';
                d2.style.top = parseInt((h1 - (h1*0.25 + h1*0.04))/2) + 'px';
                d2.style.left = parseInt((w1 - (w1*0.25 + w1*0.04))/2) + 'px';
                d2.style.zIndex = '998';
                d2.style.backgroundColor = '#fff';
                e.insertAdjacentElement('beforeend', d1);
                e.insertAdjacentElement('beforeend', d2);
            }
            var i = document.createElement('img');
            i.src = c.toDataURL('image/png');
            i.style.height = h1 + 'px';
            i.style.width = w1 + 'px';
            i.style.position = 'absolute';
            i.style.top = '0';
            i.style.left = '0';
            i.style.zIndex = '1000';
            e.insertAdjacentElement('beforeend', i);
        }
        options.target.insertAdjacentElement('beforeend', e);
        return this;
    };
    QRcodeUtil.makeImage = function () {
        var c = document.createElement("canvas");
        var w = e.offsetWidth;
        var h = e.offsetHeight;
        var scale = 4;
        c.width = w * scale;
        c.height = h * scale;
        c.style.width = w + "px";
        c.style.height = h + "px";
        c.getContext("2d").scale(scale, scale);
        var opts = {
            canvas: c,
            width: w,
            height: h,
            scale: scale,
            logging: false,
            useCORS: true
        };
        html2canvas(e, opts).then(function (canvas) {
            var i = new Image();
            i.width = w;
            i.height = h;
            i.onload = function() {
                e.innerHTML = '';
                e.style.border = 'none';
                e.insertAdjacentElement('beforeend', this);
            };
            i.src = canvas.toDataURL();
        });
    };
    A.QRcodeUtil = QRcodeUtil;
}(window);