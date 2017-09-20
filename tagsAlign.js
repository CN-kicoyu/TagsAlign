/**
* 
* @func       tagsAlign
* @abstract   两端对齐，宽度自适应，个数自适应 / 个数固定
* @author     kico-yu
* @email      kicoyu@126.com
* @time       2017-09-20
* @params     el -- 对应的ul元素的ID, space -- 两个tag之间的间距, cols -- 需要的固定列数，可以不传，不传自适应
* @discussion 实现个数的自适应宽度元素，每行两端对齐
* @extend     可以根据使用的框架需要相应的位置，但是逻辑可以维持
*             如果是用vue，请确保DOM元素已经渲染，将函数运行在 this.$nextTick(() => {}) 之中
* 
*/
function tagsAlign(el, cols, space) {
 document.getElementById(el).style.fontSize = 0;
 const LI_NUM = document.getElementById(el).getElementsByTagName('li');
 const SPACE = space || 10;    // 两个tag之间的间距
 let IS_RUN = 0,
     MAX_WIDTH = document.getElementById(el).clientWidth,
     other_Padding = SPACE,
     IS_OVER = cols ? (cols - 1) : 0;
 while (LI_NUM.length - IS_RUN > IS_OVER) {
   let row_width_a = 0,
       row_width_b = 0,
       row_padding = 0,
       row_num = 0,
       is_NUM = cols ? (cols - 1) : LI_NUM.length - IS_RUN,
       isCol;
   for (var i = 0; i < is_NUM; i++) {
     // 加上2个像素
     row_width_a += LI_NUM[IS_RUN + i].clientWidth + 2;
     row_num++;
     if (!cols && IS_RUN + row_num !== LI_NUM.length) {
       row_width_b = LI_NUM[IS_RUN + row_num].clientWidth + 2;
       if (row_width_a + (row_num + 1) * SPACE + row_width_b > MAX_WIDTH / 2 ) break;
     }
   }
   if (cols) {
     row_width_b = LI_NUM[IS_RUN + row_num].clientWidth + 2;
     isCol = (MAX_WIDTH - (cols - 1) * SPACE) / (cols - 1) > row_width_b ? cols : (cols - 1);
     row_padding = (MAX_WIDTH - (cols - 1) * SPACE - row_width_a - row_width_b) / isCol;
   } else {
     row_padding = (MAX_WIDTH - (row_num - 1) * SPACE - row_width_a) / row_num - 1;
   }
   other_Padding = row_padding / 2;
   let NUM = cols ? isCol : row_num;
   for (var n = 0; n < NUM; n++) {
     LI_NUM[IS_RUN + n].setAttribute('style', 'padding: 0 ' + row_padding / 2 + 'px;');
   }
   LI_NUM[IS_RUN + n - 1].setAttribute('style', 'margin-right: 0;padding: 0 ' + row_padding / 2 + 'px;');
   IS_RUN += NUM;
 }
 if (cols && LI_NUM.length > IS_RUN) {
   for ( let j = IS_RUN; j < LI_NUM.length; j++) {
     LI_NUM[j].setAttribute('style', 'padding: 0 ' + other_Padding + 'px;');
   }
 }
}

// 使用方法
// tagsAlign('fromList');
// tagsAlign('studyList', 4);