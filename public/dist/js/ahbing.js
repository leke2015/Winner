/*
*
*	这个文件处理图片上传  并且 预览显示
* 可以在发布商品  编辑发布商品时编辑封面图片 和 修改头像等地方使用
*
 */
;(function($){
	var ahbing = {};

	/*
	检测用户浏览器是否支持一些fileAPI
	 */
	var checkFileAPI = function(){
		if(window.File && window.FileReader && window.FileList && window.Blob){
			return true;
		}
		return false;
	};

	/*
	* handleFiles 监听input的change事件 读取上传的图片文件 并且预览显示
	* @param {Object} input对象
	* @param {Object} preview预览显示的盒子对象
	* @param {Function} 回调函数
	 */
	var handleInput = function(oInput,preview,cb) {
		oInput.addEventListener('change',function(e){
			var files = this.files;
			for(var i = 0; i< files.length;i++){
				var file = files[i];
				if(!file.type.match('image.*')){
					continue;
				}
				var oImg = preview.querySelector('img');
				var reader = new FileReader();
				reader.onload = (function(oImg){
					return function(e){
						oImg.src = e.target.result;
						cb && cb();
					}
				})(oImg);
				// 转换成一个data:URL
				reader.readAsDataURL(file);
			}
		},false)
	}
	/*
	美化标签
	 */
	var beautifyInput = function(){
		// 美化的按钮
		var oBtn = document.querySelector('a#inputBtn');
		// 隐藏的input控件
		var oInput = document.querySelector('input#hiddenInput');
		oBtn.addEventListener('click',function(e){
			e.preventDefault();
			oInput.click();
		},false)
	}
	/*
	* 兼容innerText 和 contentText
	* @param {Object} node对象
	* @param {String} 设置的新的text
	 */
	var setText = function(ele,text){
		if(typeof ele.textContent === 'string'){
			ele.textContent = text;
		}else{
			ele.innerText = text;
		}
	}
	/*
	* demo
	 */

	var oInput = $('#hiddenInput')[0];
 	var preview = $('#img-preview')[0];
	if(checkFileAPI()){
		// 支持fileAPI的就直接使用 显示预览
		handleInput(oInput,preview,function(){
			var oBtn = document.querySelector('a#inputBtn');
			setText(oBtn,'重新上传');
		});
	}else{
		// 不支持file  应该是ie
		var url = oInput.value;
		preview.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
    preview.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = url;
	}
	beautifyInput();
	window.ahbing = ahbing;
})(jQuery);
