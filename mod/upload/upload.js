/**
<input type="file" id="upload" />
<script>
require.async('upload', function(Upload){
    new Upload({
        dom: '#upload',
        uploader: '/test/1.json',
        width: 100,
        height: 100,
        buttonText: '编辑头像',
        swf: '/js/web/common/mod/upload/upload.swf',
        fileTypeExts: '*.jpg;*.jpeg;*.png;*.JPG;*.JPEG;*.PNG',
        onUploadSuccess: function(){
            console.log(arguments);
        }
    });
});
</script>
*/

var $ = require('jquery');

require('./lib/uploadify.js');

var Upload = module.exports = function(opt){
	this.dom = $(opt.dom);

	this.options = $.extend({
		debug: false,
		width: this.dom.width(),
		height: this.dom.height(),
		buttonText: '选择文件',
		overrideEvents: [
			'onUploadProgress', 'onUploadComplete', 'onUploadSuccess', 'onUploadStart', 'onUploadError', 
			'onSelect'
		]
	}, opt || {});

	this.init();
};

Upload.prototype = {
	init: function(){
		this.dom.uploadify(this.options);
	}
};

$.each('cancel destroy disable settings stop upload'.split(' '), function(key, method){
	Upload.prototype[method] = function(){
		this.dom.uploadify.apply(this.dom, arguments);
	};
});