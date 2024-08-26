const nextUrlFunc = (node) => $(node[35]).find('div.bottem1 > a:nth-child(3)');// 下一页
const zhanjieNameFunc =  (node) => node.find('h1').text();// 章节名称
const contentFunc =  (node) => node.find('#booktxt').find('div').empty().parent().text().trim();// 内容
const bookNameFunc = (node) => $(node[35]).find('div.con_top > a:nth-child(3)').text();//书名
const hasNextFunc = (node) => $node.text() == '没有了';//结束判断
// 文件下载方法
function downloadTextAsFile(a,c){a=new Blob([a],{type:"text/plain;charset=utf-8"});if("msSaveOrOpenBlob"in navigator)window.navigator.msSaveOrOpenBlob(a,c);else{a=URL.createObjectURL(a);var b=document.createElement("a");b.href=a;b.download=c;b.style.display="none";document.body.appendChild(b);b.click();document.body.removeChild(b);URL.revokeObjectURL(a)}}

(function down(readUrl, content) {
    
    $.ajax({type: 'GET',url: readUrl, dataType: 'html', success: (data, status) => {
        let $content = $(data);
        let $nextNode = nextUrlFunc($content);
        let name = zhanjieNameFunc($content);
        let newContent = content + '\n\r' + name + '\n\r' + contentFunc($content);
        if (hasNextFunc($nextNode)) {
            let bookname = bookNameFunc($content);
            downloadTextAsFile(newContent, bookname);
        } else {
            setTimeout(() => {down($nextNode[0].href, newContent);}, 100);
        }
    }})
})(nextUrlFunc($('#wrapper > article'))[0].href, zhanjieNameFunc($('#wrapper > article')) + "\n\r" + contentFunc($('#wrapper > article')));
