// 下一页
function downloadTextAsFile(text, filename) {
    // 创建 Blob 对象
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  
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
    $.get(readUrl, (data, status) => {
        let $content = $(data + "</body>");
        let nextUrl = $content.find('#pager_next')[0].href;
        let name = $content.find('.bookname > h1').text();
        let newContent = content + '\n\r' + name + '\n\r' + $content.find('#content').text();
        // if (nextUrl.split('/').length >= 5) {
            // setTimeout(() => {down(nextUrl, newContent);}, 500);
        // } else {
            let bookname = $content.find('div.con_top > a:nth-child(2)').text();
            downloadTextAsFile(newContent, bookname);
        // }
    })
})($('#pager_next')[0].href, $('.bookname > h1').text() + "\n\r" + $('#content').text());
