const nextUrlPath = '#wrapper > article > div.bottem1 > a:nth-child(3)';
const zhanjieNamePath = '#wrapper > article > h1';
const contentPath = '#booktxt';

function downloadTextAsFile(text, filename) {
    // 创建 Blob 对象
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    if('msSaveOrOpenBlob' in navigator){
        // 使用 Edge 浏览器专有方法
        window.navigator.msSaveOrOpenBlob(blob, filename);
        return;
    }
    // 创建 URL
    const url = URL.createObjectURL(blob);
  
    // 创建下载链接
    const link = document.createElement('a');
    link.href = url;
    link.download = filename; // 默认文件名为 output.txt
    link.style.display = 'none';
  
    // 添加到文档中
    document.body.appendChild(link);
  
    // 触发点击事件
    link.click();
  
    // 清理
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
(function down(readUrl, content) {
    
    $.ajax({type: 'GET',url: readUrl, dataType: 'text', success: (data, status) => {
        let $content = $(data);
        let $nextUrl = $content.find(nextUrlPath);
        let name = $content.find(zhanjieNamePath).text();
        let newContent = content + '\n\r' + name + '\n\r' + $content.find(contentPath).find('div').empty().parent().text().trim();
        if ($nextUrl.text() == '没有了') {
            let bookname = $content.find('#wrapper > article > div.con_top > a:nth-child(3)').text();
            downloadTextAsFile(newContent, bookname);
        } else {
            setTimeout(() => {down($nextUrl[0].href, newContent);}, 200);
        }
    }})
})($(nextUrlPath)[0].href, $(zhanjieNamePath).text() + "\n\r" + $(contentPath).find('div').empty().parent().text().trim());
