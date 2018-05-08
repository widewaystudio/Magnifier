function Index(mul) {
    this.dom = {
        wrap: document.getElementsByClassName("platform")[0],
        viewImg: document.getElementsByClassName("view-img")[0],
        view: document.getElementsByClassName("view")[0],
        upOver: document.getElementsByClassName("up-over")[0],
        boost: document.getElementsByClassName("boost")[0],
        oU: document.getElementsByClassName("platform")[0].getElementsByTagName('ul')[0]
    };
    this.mul = mul > 2 ? mul : 2;
    this.init();
}
Index.prototype.init = function() {
    this.bindEvent();
    this.createView();
}
Index.prototype.bindEvent = function() {
    var self = this;

    self.getSize(0);
    self.dom.viewImg.addEventListener('mousemove', function(e) {
        self.move(e);
    }, false);
    self.dom.viewImg.addEventListener('mouseleave', function() {
        self.dom.boost.style.display = "none";
        self.dom.upOver.style.display = "none";
    }, false);
}
Index.prototype.createView = function() {
    var self = this;
    self.upOverW = 500 / self.mul;
    var width = self.upOverW;
    var upOver = self.dom.upOver;
    upOver.style.width = width + "px";
    upOver.style.height = width + "px";
    upOver.style.marginLeft = "0px";
    upOver.style.marginTop = "0px";
    upOver.style.display = "none";
}
Index.prototype.getSize = function(index) {
    var self = this;
    var view = self.dom.view,
        oU = self.dom.oU,
        src,
        imgH,
        imgW,
        imgT,
        imgL,
        boost = self.dom.boost,
        boostImgW,
        boostImgH,
        pd = false;
    src = oU.getElementsByTagName('img')[index].src;
    creatImg(src);
    oU.addEventListener('click', action, false);

    function action(e) {
        var event = e || window.event,
            target = event.target || event.srcElement;
        if (target.src) {
            creatImg(target.src);
            var liArr = oU.getElementsByClassName('active')[0];
            liArr.className = "";
            event.path[1].setAttribute("class", "active");
        }
    }

    function creatImg(src) {
        view.innerHTML = "";
        boost.innerHTML = "";
        var img = document.createElement('img');
        img.setAttribute("src", src);
        view.appendChild(img);
        imgH = getStyle(img, 'height');
        imgW = getStyle(img, "width");
        var img1 = document.createElement('img');
        img1.setAttribute("src", src);
        viewI = view.getElementsByTagName('img')[0];
        if (imgW > imgH) {
            imgT = imgH * 500 / imgW;
            viewI.style.width = "500px";
            viewI.style.height = imgT + "px";
            viewI.style.top = "50%";
            viewI.style.marginTop = "-" + imgT / 2 + "px";
            boostImgW = 500 * self.mul + "px";
        } else {
            imgL = imgW * 500 / imgH;
            viewI.style.height = "500px;"
            viewI.style.width = imgL + "px";
            viewI.style.left = "50%";
            viewI.style.marginLeft = "-" + imgL / 2 + "px";
            boostImgW = "";
            boostImgH = 500 * self.mul + "px";
        }

        boostImgW ? img1.setAttribute("width", boostImgW) : img1.setAttribute("height", boostImgH);
        boost.appendChild(img1);
        boost.setAttribute("style", 'display:none');


    }

}
Index.prototype.move = function(e) {
    var self = this,
        view = self.dom.viewImg,
        viewImg = view.getElementsByTagName("img")[0],
        boost = self.dom.boost,
        boostImg = boost.getElementsByTagName('img')[0];
    upOver = self.dom.upOver;
    var event = e || window.event;
    var target = event.target || event.srcElement;
    var wrap = self.dom.wrap;
    var imgW = getStyle(viewImg, 'width'),
        imgH = getStyle(viewImg, 'height'),
        upOverW = this.upOverW,
        minL = (500 - imgW) / 2,
        minT = (500 - imgH) / 2,
        maxR = 500 - minL - upOverW,
        maxB = 500 - minT - upOverW,
        wrapM = getStyle(wrap, "marginLeft"),
        wrapL = getStyle(wrap, "left"),
        wrapMT = getStyle(wrap, "marginTop"),
        wrapT = getStyle(wrap, "top"),
        rangL = wrapL + wrapM,
        rangT = wrapT + wrapMT,
        X = (e.pageX - rangL) - upOverW / 2,
        Y = (e.pageY - rangT) - upOverW / 2,
        endX = (X > minL) ? (X < maxR) ? X : maxR : minL,
        endY = (Y > minT) ? (Y < maxB) ? Y : maxB : minT,
        postX = (endX - (500 - imgW) / 2) * self.mul,
        postY = (endY - parseInt((500 - imgH) / 2)) * self.mul;
    boost.style.display = "block";
    upOver.style.marginLeft = endX + "px";
    upOver.style.marginTop = endY + "px";
    upOver.style.display = "";
    boostImg.style.marginLeft = "-" + postX + "px";
    boostImg.style.top = "-" + postY + "px";
}

function getStyle(elem, prop) {
    if (window.getComputedStyle) {
        return parseInt(window.getComputedStyle(elem, null)[prop]);
    } else {
        return parseInt(elem.currentStyle[prop]);
    }
}

new Index(4);