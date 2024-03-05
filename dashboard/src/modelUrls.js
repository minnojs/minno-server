/**/
// const urlPrefix = 'http://app-prod-03.implicit.harvard.edu/openserver'; // first pathname section with slashes

// const urlPrefix = window.location.origin; // first pathname section with slashes

const urlPrefix = '..';//location.pathname.match(/^(?=\/)(.+?\/|$)/)[1]; // first pathname section with slashes


// console.log(location.href);
export const baseUrl            = `${urlPrefix}`;
export const studyUrl           = `${urlPrefix}/studies`;
export const launchUrl          = `${urlPrefix}/launch`;
export const templatesUrl       = `${urlPrefix}/templates`;
export const tagsUrl            = `${urlPrefix}/tags`;
export const translateUrl       = `${urlPrefix}/translate`;
export const poolUrl            = `${urlPrefix}/StudyData`;
export const statisticsUrl      = `${urlPrefix}/PITracking`;
export const downloadsUrl       = `${urlPrefix}/DashboardData`;
export const activationUrl      = `${urlPrefix}/activation`;
export const collaborationUrl   = `${urlPrefix}/fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987", {
  "headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "cache-control": "max-age=0",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; rxvt=1709631283185|1709627779470; dtPC=-97$229482501_582h-vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0; dtSa=true%7CC%7C-1%7C%D7%92%D7%90%D7%95%D7%9E%D7%98%D7%A8%D7%99%D7%94%20%D7%9C%D7%91%D7%99%D7%AA%20%D7%94%D7%A1%D7%A4%D7%A8%20%D7%94%D7%99%D7%A1%D7%95%D7%93%D7%99%20%28%D7%9C%D7%9B%D7%99%D7%AA%D7%94%20%D7%91%20%3A%20%D7%97%D7%93%D7%A9%21%29%20%2F%20%D7%A9%D7%91%D7%99%D7%9C%D7%99%D7%9D%20%3A%20%D7%9E%D7%AA%D7%9E%D7%98%D7%99%D7%A7%D7%94%20%D7%9C%D7%91%D7%99%D7%AA%20%D7%94%D7%A1%D7%A4%D7%A8%20%D7%94%D7%99%D7%A1%D7%95%D7%93%D7%99%5Ec%20%D7%9B%D7%99%D7%AA%D7%94%20%D7%91%27%20%2F%20%D7%A9%D7%91%D7%99%D7%9C%D7%99%D7%9D%20...%7C-%7C1709629484564%7C229482501_582%7Chttps%3A%2F%2Fschool-kotar-cet-ac-il.eu1.proxy.openathens.net%2FKotarApp%2FBrowseBooks.aspx%3FExpandNodeID%3D2330_25242342%26bAsImage%3DTrue%26class%3D2%26lang%3Dhe%5Ecen%7C%7C%7C%7C",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/BrowseBooks.aspx?ExpandNodeID=2330%242342&bAsImage=True&class=2&lang=he,en",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/ruxitagentjs_ICA2NVfhjqrtux_10283240117152214.js", {
  "headers": {
    "accept": "*/*",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "if-modified-since": "Wed, 03 Mar 2010 07:01:40 GMT",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "script",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "same-origin",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; rxvt=1709631283185|1709627779470; dtPC=-97$229482501_582h-vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0; dtSa=true%7CC%7C-1%7C%D7%92%D7%90%D7%95%D7%9E%D7%98%D7%A8%D7%99%D7%94%20%D7%9C%D7%91%D7%99%D7%AA%20%D7%94%D7%A1%D7%A4%D7%A8%20%D7%94%D7%99%D7%A1%D7%95%D7%93%D7%99%20%28%D7%9C%D7%9B%D7%99%D7%AA%D7%94%20%D7%91%20%3A%20%D7%97%D7%93%D7%A9%21%29%20%2F%20%D7%A9%D7%91%D7%99%D7%9C%D7%99%D7%9D%20%3A%20%D7%9E%D7%AA%D7%9E%D7%98%D7%99%D7%A7%D7%94%20%D7%9C%D7%91%D7%99%D7%AA%20%D7%94%D7%A1%D7%A4%D7%A8%20%D7%94%D7%99%D7%A1%D7%95%D7%93%D7%99%5Ec%20%D7%9B%D7%99%D7%AA%D7%94%20%D7%91%27%20%2F%20%D7%A9%D7%91%D7%99%D7%9C%D7%99%D7%9D%20...%7C-%7C1709629484564%7C229482501_582%7Chttps%3A%2F%2Fschool-kotar-cet-ac-il.eu1.proxy.openathens.net%2FKotarApp%2FBrowseBooks.aspx%3FExpandNodeID%3D2330_25242342%26bAsImage%3DTrue%26class%3D2%26lang%3Dhe%5Ecen%7C%7C%7C%7C",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/WebResource.axd?d=xu9uErIt0vyo0iG28wexfD7tsYNGR4uIiht-11-88ZiGGpSEahSdkZmQ5CEQfUk2msawckADssa9oj_d8jLGRzptSjQVfXFZDFeYD-TY_VcjSZ9Wq8_xPDRjh4i43nnVQljYsGluDw9s2Xbow2pGU9wh33Xp7D4oVqDZLeEHzRThqmk50&t=637434627200000000", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://cdn.cet.ac.il/libs/jquery.bs.dropdown/latest/css/jquery.bs.dropdown.css", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://cdn.cet.ac.il/libs/cet.mybag.groupbox/latest/css/groupbox.css", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://cdn.cet.ac.il/libs/cet.ui.soundplayer/1.1/cet.ui.soundplayer.css", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://cdn.cet.ac.il/libs/tinymce/4.1.10/plugins/cetKotarImg/cetImage.min.css", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://talkbackservice.cet.ac.il/css/talkbacks.css", {
  "headers": {
    "accept": "text/css,*/*;q=0.1",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "if-modified-since": "Sun, 03 Jan 2016 12:14:57 GMT",
    "if-none-match": "W/\\"2051625c2046d11:0\\"",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "style",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/ClientResourcesServingHandler.ashx?h=c6498d4142479201a4ffc2142d5ae7b6dfb36e25&t=css&minify=True", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://cdn.cet.ac.il/libs/cet.browsercheck/latest/check.min.css", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://cdn.proxy.openathens.net/cache/wMwhN7-ZUGt2Ly1OEWQQnKafV_FjB83kTEaAR6tbyzg/a35869d5/t/cdn.cet.ac.il/libs/jquery/2.1.4/jquery-2.1.4.min.js", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://cdn.cet.ac.il/libs/cet.mybag.ui/latest/js/mybagui.js", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://cdn.cet.ac.il/libs/cet.mybag.groupbox/latest/js/localization/he.js", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://cdn.cet.ac.il/libs/cet.mybag.groupbox/latest/js/localization/ar.js", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://cdn.cet.ac.il/libs/cet.mybag.groupbox/latest/js/localization/en.js", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://cdn.cet.ac.il/libs/cet.mybag.groupbox/latest/js/localization/zh.js", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://cdn.cet.ac.il/libs/cet.mybag.groupbox/latest/js/localization/vi.js", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://cdn.cet.ac.il/libs/cet.mybag.groupbox/latest/js/groupbox.js", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://cdn.cet.ac.il/libs/cet.mybag.groupbox/latest/js/groupboxApi.js", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://cdn.proxy.openathens.net/cache/Sor48eoleWw-net0gxVEMayof_7UWYmbEqsD61cS1GQ/26879cc3/t/cdn.cet.ac.il/libs/jquery.bs.dropdown/latest/js/jquery.bs.dropdown.js", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://cdn.proxy.openathens.net/cache/D1TGrC_8WGCQ1gbXHplkLbYcteuzaj4A9ydH0xFfeds/94cfb64d/t/cdn.cet.ac.il/libs/jquery/1.6.4/jquery.min.js", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://cdn.cet.ac.il/libs/soundmanager2/2.97.20150601/script/soundmanager2-jsmin.js", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://cdn.proxy.openathens.net/cache/KFHe7jYcVp_xAlyjZzw1cJiVooRi_jBzGdjjE6IK0sY/2744a875/t/cdn.cet.ac.il/libs/jquery.transit/0.9.9/jquery.transit.js", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://cdn.cet.ac.il/libs/cet.ui.soundplayer/1.1/cet.ui.soundplayer.js", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://cdn.cet.ac.il/libs/mustache/1.0/mustache.js", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://cdn.proxy.openathens.net/cache/MVOzSgTcik8byjIjiRz0wDE11FLJqxLwYFWlcYendg0/526b6b22/t/cdn.cet.ac.il/libs/tinymce/4.1.10/tinymce.min.js", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://cdn.cet.ac.il/libs/cet.editorManager/1.0/cetEditorManager.js", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://cdn.cet.ac.il/libs/velocity/1.2.2/velocity.min.js", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://cdn.cet.ac.il/libs/cet.mybag.taskform/1.0/js/TaskFormWrapper.js", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/System/js/comandhandler.js", {
  "headers": {
    "accept": "*/*",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "if-modified-since": "Thu, 21 Dec 2023 15:58:20 GMT",
    "if-none-match": "W/\\"036aa842634da1:0\\"",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "script",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "same-origin",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; rxvt=1709631283185|1709627779470; dtPC=-97$229482501_582h-vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0; dtSa=true%7CC%7C-1%7C%D7%92%D7%90%D7%95%D7%9E%D7%98%D7%A8%D7%99%D7%94%20%D7%9C%D7%91%D7%99%D7%AA%20%D7%94%D7%A1%D7%A4%D7%A8%20%D7%94%D7%99%D7%A1%D7%95%D7%93%D7%99%20%28%D7%9C%D7%9B%D7%99%D7%AA%D7%94%20%D7%91%20%3A%20%D7%97%D7%93%D7%A9%21%29%20%2F%20%D7%A9%D7%91%D7%99%D7%9C%D7%99%D7%9D%20%3A%20%D7%9E%D7%AA%D7%9E%D7%98%D7%99%D7%A7%D7%94%20%D7%9C%D7%91%D7%99%D7%AA%20%D7%94%D7%A1%D7%A4%D7%A8%20%D7%94%D7%99%D7%A1%D7%95%D7%93%D7%99%5Ec%20%D7%9B%D7%99%D7%AA%D7%94%20%D7%91%27%20%2F%20%D7%A9%D7%91%D7%99%D7%9C%D7%99%D7%9D%20...%7C-%7C1709629484564%7C229482501_582%7Chttps%3A%2F%2Fschool-kotar-cet-ac-il.eu1.proxy.openathens.net%2FKotarApp%2FBrowseBooks.aspx%3FExpandNodeID%3D2330_25242342%26bAsImage%3DTrue%26class%3D2%26lang%3Dhe%5Ecen%7C%7C%7C%7C",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://talkbackservice.cet.ac.il/js/talkbacks.js", {
  "headers": {
    "accept": "*/*",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "if-modified-since": "Mon, 20 Feb 2017 07:07:28 GMT",
    "if-none-match": "W/\\"50f8defe478bd21:0\\"",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "script",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://cdn.cet.ac.il/libs/cet.google.analytics.provider/1.0/cet.google.analytics.provider.js", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://apigateway.cet.ac.il/bigdataapi/provider/BigDataProvider.js", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/ClientResourcesServingHandler.ashx?h=dfaae3f12c1652ca6abbe84d72d4244c516b8487&t=javascript&minify=True", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/ClientResourcesServingHandler.ashx?h=8884510066a2480c345c00c485ac8d72eb0198d1&t=javascript&minify=True", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://cdn.cet.ac.il/ui-services/embeddedLogin/Scripts/embeddedLoginLoder.js", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://cdn.cet.ac.il/libs/cet.nagich.provider/1.0/cet.nagich.provider.js", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/kotarapp/resources/cet-sso-handler.js", {
  "headers": {
    "accept": "*/*",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "if-modified-since": "Thu, 21 Dec 2023 15:58:20 GMT",
    "if-none-match": "W/\\"036aa842634da1:0\\"",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "script",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "same-origin",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; rxvt=1709631283185|1709627779470; dtPC=-97$229482501_582h-vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0; dtSa=true%7CC%7C-1%7C%D7%92%D7%90%D7%95%D7%9E%D7%98%D7%A8%D7%99%D7%94%20%D7%9C%D7%91%D7%99%D7%AA%20%D7%94%D7%A1%D7%A4%D7%A8%20%D7%94%D7%99%D7%A1%D7%95%D7%93%D7%99%20%28%D7%9C%D7%9B%D7%99%D7%AA%D7%94%20%D7%91%20%3A%20%D7%97%D7%93%D7%A9%21%29%20%2F%20%D7%A9%D7%91%D7%99%D7%9C%D7%99%D7%9D%20%3A%20%D7%9E%D7%AA%D7%9E%D7%98%D7%99%D7%A7%D7%94%20%D7%9C%D7%91%D7%99%D7%AA%20%D7%94%D7%A1%D7%A4%D7%A8%20%D7%94%D7%99%D7%A1%D7%95%D7%93%D7%99%5Ec%20%D7%9B%D7%99%D7%AA%D7%94%20%D7%91%27%20%2F%20%D7%A9%D7%91%D7%99%D7%9C%D7%99%D7%9D%20...%7C-%7C1709629484564%7C229482501_582%7Chttps%3A%2F%2Fschool-kotar-cet-ac-il.eu1.proxy.openathens.net%2FKotarApp%2FBrowseBooks.aspx%3FExpandNodeID%3D2330_25242342%26bAsImage%3DTrue%26class%3D2%26lang%3Dhe%5Ecen%7C%7C%7C%7C",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://cdn.proxy.openathens.net/cache/LOuOlzBa3-gJGGEdutqi0KDCxwPjSV6-XzigfPliUPc/97f4d068/t/cdn.cet.ac.il/libs/jquery.validate/1.13.0/jquery.validate.js", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://cdn.proxy.openathens.net/cache/8izLzwi82oXlK9U4lRbwlnL1C_P6AtcPzwmCOFzyij4/cbb08546/t/school.kotar.cet.ac.il/kotarapp/resources/jquery/jquery-ui-1.11.custom.min.js", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=thumbnail&nBookID=95827987", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/CSS/FooterTouch.css", {
  "headers": {
    "accept": "text/css,*/*;q=0.1",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "if-modified-since": "Thu, 21 Dec 2023 15:58:22 GMT",
    "if-none-match": "W/\\"063db852634da1:0\\"",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "style",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "same-origin",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; rxvt=1709631283185|1709627779470; dtPC=-97$229482501_582h-vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0; dtSa=true%7CC%7C-1%7C%D7%92%D7%90%D7%95%D7%9E%D7%98%D7%A8%D7%99%D7%94%20%D7%9C%D7%91%D7%99%D7%AA%20%D7%94%D7%A1%D7%A4%D7%A8%20%D7%94%D7%99%D7%A1%D7%95%D7%93%D7%99%20%28%D7%9C%D7%9B%D7%99%D7%AA%D7%94%20%D7%91%20%3A%20%D7%97%D7%93%D7%A9%21%29%20%2F%20%D7%A9%D7%91%D7%99%D7%9C%D7%99%D7%9D%20%3A%20%D7%9E%D7%AA%D7%9E%D7%98%D7%99%D7%A7%D7%94%20%D7%9C%D7%91%D7%99%D7%AA%20%D7%94%D7%A1%D7%A4%D7%A8%20%D7%94%D7%99%D7%A1%D7%95%D7%93%D7%99%5Ec%20%D7%9B%D7%99%D7%AA%D7%94%20%D7%91%27%20%2F%20%D7%A9%D7%91%D7%99%D7%9C%D7%99%D7%9D%20...%7C-%7C1709629484564%7C229482501_582%7Chttps%3A%2F%2Fschool-kotar-cet-ac-il.eu1.proxy.openathens.net%2FKotarApp%2FBrowseBooks.aspx%3FExpandNodeID%3D2330_25242342%26bAsImage%3DTrue%26class%3D2%26lang%3Dhe%5Ecen%7C%7C%7C%7C",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Shop/JS/Cart.js", {
  "headers": {
    "accept": "*/*",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "if-modified-since": "Thu, 21 Dec 2023 15:58:20 GMT",
    "if-none-match": "W/\\"036aa842634da1:0\\"",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "script",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "same-origin",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; rxvt=1709631283185|1709627779470; dtPC=-97$229482501_582h-vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0; dtSa=true%7CC%7C-1%7C%D7%92%D7%90%D7%95%D7%9E%D7%98%D7%A8%D7%99%D7%94%20%D7%9C%D7%91%D7%99%D7%AA%20%D7%94%D7%A1%D7%A4%D7%A8%20%D7%94%D7%99%D7%A1%D7%95%D7%93%D7%99%20%28%D7%9C%D7%9B%D7%99%D7%AA%D7%94%20%D7%91%20%3A%20%D7%97%D7%93%D7%A9%21%29%20%2F%20%D7%A9%D7%91%D7%99%D7%9C%D7%99%D7%9D%20%3A%20%D7%9E%D7%AA%D7%9E%D7%98%D7%99%D7%A7%D7%94%20%D7%9C%D7%91%D7%99%D7%AA%20%D7%94%D7%A1%D7%A4%D7%A8%20%D7%94%D7%99%D7%A1%D7%95%D7%93%D7%99%5Ec%20%D7%9B%D7%99%D7%AA%D7%94%20%D7%91%27%20%2F%20%D7%A9%D7%91%D7%99%D7%9C%D7%99%D7%9D%20...%7C-%7C1709629484564%7C229482501_582%7Chttps%3A%2F%2Fschool-kotar-cet-ac-il.eu1.proxy.openathens.net%2FKotarApp%2FBrowseBooks.aspx%3FExpandNodeID%3D2330_25242342%26bAsImage%3DTrue%26class%3D2%26lang%3Dhe%5Ecen%7C%7C%7C%7C",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/ClientResourcesServingHandler.ashx?h=723a9f9a0468d0bc3fabbd879d84d17f9fc9ea7b&t=javascript&minify=True", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://cdn.cet.ac.il/libs/cet.content/latest/display.min.js", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://cdn.cet.ac.il/libs/cet.browsercheck/latest/check.min.js", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://www.googletagmanager.com/gtag/js?id=undefined", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://apigateway.cet.ac.il/provider/ApiProvider.js?8dc054c2cf9f580", {
  "headers": {
    "accept": "*/*",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "script",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://accounts.cet.ac.il/versioning/version.txt", {
  "headers": {
    "accept": "*/*",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://accounts.cet.ac.il/versioning/version.txt", {
  "headers": {
    "accept": "*/*",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://js.nagich.co.il/core/4.1.1/accessibility.js", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://js.nagich.co.il/style/style.css", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://js.nagich.co.il/style/btncolor.css", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://js.nagich.co.il/assets/locale/he.json", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://js.nagich.co.il/assets/scripts/pdf.js", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer/images/scroll/pagerbg.png?v=1", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "if-modified-since": "Thu, 21 Dec 2023 15:58:20 GMT",
    "if-none-match": "\\"036aa842634da1:0\\"",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "same-origin",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; dtPC=-97$229489934_670h4vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0; rxvt=1709631290298|1709627779470",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/theme/images/bookmark/sign.png", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "if-modified-since": "Thu, 21 Dec 2023 15:58:22 GMT",
    "if-none-match": "\\"063db852634da1:0\\"",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "same-origin",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; dtPC=-97$229489934_670h4vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0; rxvt=1709631290298|1709627779470",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Resources/Images/semiTransparent.png", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "if-modified-since": "Thu, 21 Dec 2023 15:58:20 GMT",
    "if-none-match": "\\"036aa842634da1:0\\"",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "same-origin",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; dtPC=-97$229489934_670h4vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0; rxvt=1709631290298|1709627779470",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://cdn.cet.ac.il/ui-services/embeddedLogin/Style/embeddedLogin.ebag.min.css?loder_id=106", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://apigateway.cet.ac.il/accessmngapi/provider/accessmanagement.js?loder_id=106", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://cdn.cet.ac.il/ui-services/embeddedLogin/Scripts/embeddedLogin.js?loder_id=106", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://apigateway.cet.ac.il/bigdataapi/Time/GetServerTime?registration=12fee5af-ab53-4e12-9ca8-6bb13157acd4", {
  "headers": {
    "accept": "application/json",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://apigateway.cet.ac.il/bigdataapi/resources/ValidateJson.min.js", {
  "headers": {
    "accept": "*/*",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "script",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://js.nagich.co.il/assets/images/10.svg", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/System/CommandHandler.aspx?command=BookExtensions.GetBookExtensionTargetLayers&SerType=2&nBookID=95827987&_=1709629490108", {
  "headers": {
    "accept": "*/*",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-dtpc": "-97$229489934_670h14vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "x-requested-with": "XMLHttpRequest",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631290616|1709627779470; dtPC=-97$229489934_670h14vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/kotarapp/resources/images/miniscroll.png", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "if-modified-since": "Thu, 21 Dec 2023 15:58:20 GMT",
    "if-none-match": "\\"036aa842634da1:0\\"",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "same-origin",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631290616|1709627779470; dtPC=-97$229489934_670h14vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/ClientResourcesServingHandler.ashx?h=c6498d4142479201a4ffc2142d5ae7b6dfb36e25&t=css&minify=True",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/System/CommandHandler.aspx?command=BookEmbedsParts.GetAllBookEmbededParts&nBookID=95827987&_=1709629490109", {
  "headers": {
    "accept": "*/*",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-dtpc": "-97$229489934_670h16vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "x-requested-with": "XMLHttpRequest",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631290644|1709627779470; dtPC=-97$229489934_670h16vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/System/CommandHandler.aspx?command=BookExtensions.GetBookExtensionTargetLayers&SerType=2&nBookID=95827987&_=1709629490110", {
  "headers": {
    "accept": "*/*",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-dtpc": "-97$229489934_670h17vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "x-requested-with": "XMLHttpRequest",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; dtPC=-97$229489934_670h17vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0; rxvt=1709631290658|1709627779470",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://talkbackservice.cet.ac.il/Templates/talkbacksHeaderTemplate.html", {
  "headers": {
    "accept": "*/*",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://talkbackservice.cet.ac.il/Templates/talkbacksListTemplate.html", {
  "headers": {
    "accept": "*/*",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/theme/images/toolbar/toolbar.png?v=3", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "if-modified-since": "Thu, 21 Dec 2023 15:58:22 GMT",
    "if-none-match": "\\"063db852634da1:0\\"",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "same-origin",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631290661|1709627779470; dtPC=-97$229489934_670h19vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/theme/images/toolbar/kotarlogo.png", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "if-modified-since": "Thu, 21 Dec 2023 15:58:22 GMT",
    "if-none-match": "\\"063db852634da1:0\\"",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "same-origin",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631290661|1709627779470; dtPC=-97$229489934_670h19vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/theme/images/toolbar/dots_Resize.png", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "if-modified-since": "Thu, 21 Dec 2023 15:58:22 GMT",
    "if-none-match": "\\"063db852634da1:0\\"",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "same-origin",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631290661|1709627779470; dtPC=-97$229489934_670h19vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=6b9fd50a-6ac9-443e-afb5-ae131c1e2efb&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/kotarapp/viewer/images/wordselection/firstfloor2.png", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "if-modified-since": "Thu, 21 Dec 2023 15:58:20 GMT",
    "if-none-match": "\\"036aa842634da1:0\\"",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "same-origin",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631290661|1709627779470; dtPC=-97$229489934_670h19vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/kotarapp/viewer/images/wordselection/secondfloor3.png", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "if-modified-since": "Thu, 21 Dec 2023 15:58:20 GMT",
    "if-none-match": "\\"036aa842634da1:0\\"",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "same-origin",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631290661|1709627779470; dtPC=-97$229489934_670h19vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/theme/images/toolbar/layers2.png?v=1", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "if-modified-since": "Thu, 21 Dec 2023 15:58:22 GMT",
    "if-none-match": "\\"063db852634da1:0\\"",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "same-origin",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631290661|1709627779470; dtPC=-97$229489934_670h19vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/theme/images/toolbar/Search.png", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "if-modified-since": "Thu, 21 Dec 2023 15:58:22 GMT",
    "if-none-match": "\\"063db852634da1:0\\"",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "same-origin",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631290661|1709627779470; dtPC=-97$229489934_670h19vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/theme/images/note/noteIcons.png", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "if-modified-since": "Thu, 21 Dec 2023 15:58:22 GMT",
    "if-none-match": "\\"063db852634da1:0\\"",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "same-origin",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631290661|1709627779470; dtPC=-97$229489934_670h19vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Resources/Images/preloaderbig.gif", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "if-modified-since": "Thu, 21 Dec 2023 15:58:20 GMT",
    "if-none-match": "\\"036aa842634da1:0\\"",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "same-origin",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631290661|1709627779470; dtPC=-97$229489934_670h19vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/System/js/comandhandler.js", {
  "headers": {
    "accept": "*/*",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "if-modified-since": "Thu, 21 Dec 2023 15:58:20 GMT",
    "if-none-match": "W/\\"036aa842634da1:0\\"",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "worker",
    "sec-fetch-mode": "same-origin",
    "sec-fetch-site": "same-origin",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631290675|1709627779470; dtPC=-97$229489934_670h15vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://login.eu1.proxy.openathens.net/perf/3c80eb6c-677b-4559-ac2d-d29d5f918d54/1ee13028", {
  "headers": {
    "accept": "*/*",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "content-type": "application/json",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631290767|1709627779470; dtPC=-97$229489934_670h32vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": "{\\"siteId\\":\\"3c80eb6c-677b-4559-ac2d-d29d5f918d54\\",\\"targetHost\\":\\"school.kotar.cet.ac.il\\",\\"timing\\":{\\"connectStart\\":1709629488746,\\"navigationStart\\":1709629488743,\\"secureConnectionStart\\":0,\\"fetchStart\\":1709629488746,\\"domContentLoadedEventStart\\":1709629490598,\\"responseStart\\":1709629489593,\\"domInteractive\\":1709629490597,\\"domainLookupEnd\\":1709629488746,\\"responseEnd\\":1709629489636,\\"redirectStart\\":0,\\"requestStart\\":1709629488756,\\"unloadEventEnd\\":0,\\"unloadEventStart\\":0,\\"domLoading\\":1709629489603,\\"domComplete\\":0,\\"domainLookupStart\\":1709629488746,\\"loadEventStart\\":0,\\"domContentLoadedEventEnd\\":1709629490666,\\"loadEventEnd\\":0,\\"redirectEnd\\":0,\\"connectEnd\\":1709629488746},\\"navigation\\":{\\"type\\":1,\\"redirectCount\\":0}}",
  "method": "POST"
}); ;
fetch("https://login.eu1.proxy.openathens.net/perf/3c80eb6c-677b-4559-ac2d-d29d5f918d54/1ee13028", {
  "headers": {
    "accept": "*/*",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "OPTIONS"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Account/Popups/BookSubscriptionExpiresSoon.aspx?nBookID=95827987&bShowResourceFieldName=false&gUserID=00000000-0000-0000-0000-000000000000", {
  "headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "iframe",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "upgrade-insecure-requests": "1",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631290767|1709627779470; dtPC=-97$229489934_670h32vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/System/CommandHandler.aspx?command=loadtoolbar&nBookID=95827987&platform=&_=1709629490111", {
  "headers": {
    "accept": "application/json, text/javascript, */*; q=0.01",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-dtpc": "-97$229489934_670h32vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "x-requested-with": "XMLHttpRequest",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631290767|1709627779470; dtPC=-97$229489934_670h32vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/theme/images/toolbar/usermenu.png", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "if-modified-since": "Thu, 21 Dec 2023 15:58:22 GMT",
    "if-none-match": "\\"063db852634da1:0\\"",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "same-origin",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631290767|1709627779470; dtPC=-97$229489934_670h32vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/ClientResourcesServingHandler.ashx?h=c6498d4142479201a4ffc2142d5ae7b6dfb36e25&t=css&minify=True",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/kotarapp/Resources/Images/cart_white_bold.svg", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "if-modified-since": "Thu, 21 Dec 2023 15:58:20 GMT",
    "if-none-match": "W/\\"036aa842634da1:0\\"",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "same-origin",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631290767|1709627779470; dtPC=-97$229489934_670h32vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/ClientResourcesServingHandler.ashx?h=c6498d4142479201a4ffc2142d5ae7b6dfb36e25&t=css&minify=True",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/theme/images/toolbar/toolbar.png?v=6", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "if-modified-since": "Thu, 21 Dec 2023 15:58:22 GMT",
    "if-none-match": "\\"063db852634da1:0\\"",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "same-origin",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631290767|1709627779470; dtPC=-97$229489934_670h32vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/ClientResourcesServingHandler.ashx?h=c6498d4142479201a4ffc2142d5ae7b6dfb36e25&t=css&minify=True",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/System/CommandHandlerNoSession.aspx?command=Page.GetPageWords&nPageID=95827988", {
  "headers": {
    "accept": "*/*",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-dtpc": "-97$229489934_670h33vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "x-requested-with": "XMLHttpRequest",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; dtPC=-97$229489934_670h33vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0; rxvt=1709631291941|1709627779470",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=5b24fe79-46ba-4266-a277-427ab4a4b8fa&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/System/CommandHandlerReadOnlySession.aspx?command=loadbibliography&nBookID=95827987&_=1709629490112", {
  "headers": {
    "accept": "*/*",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-dtpc": "-97$229489934_670h35vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "x-requested-with": "XMLHttpRequest",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631291954|1709627779470; dtPC=-97$229489934_670h35vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/System/CommandHandler.aspx?command=BookExtensions.GetAllBookExtensions&nBookID=95827987", {
  "headers": {
    "content-type": "application/x-www-form-urlencoded",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/System/js/comandhandler.js",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("chrome-extension://lkoeejijapdihgbegpljiehpnlkadljb/domains.json", {
  "referrer": "",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET"
}); ;
fetch("chrome-extension://lkoeejijapdihgbegpljiehpnlkadljb/ebook-domains.json", {
  "referrer": "",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer/Images/1x1transparent.svg", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "if-modified-since": "Thu, 21 Dec 2023 15:58:20 GMT",
    "if-none-match": "W/\\"036aa842634da1:0\\"",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "same-origin",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631291954|1709627779470; dtPC=-97$229489934_670h35vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/System/CommandHandlerNoSession.aspx?command=Page.GetPageWords&nPageID=95827992", {
  "headers": {
    "accept": "*/*",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-dtpc": "-97$229489934_670h36vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "x-requested-with": "XMLHttpRequest",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631292209|1709627779470; dtPC=-97$229489934_670h36vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/ruxitagentjs_ICA2NVfhjqrtux_10283240117152214.js", {
  "headers": {
    "accept": "*/*",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "if-modified-since": "Wed, 03 Mar 2010 07:01:40 GMT",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "script",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "same-origin",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631292209|1709627779470; dtPC=-97$229489934_670h35vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Account/Popups/BookSubscriptionExpiresSoon.aspx?nBookID=95827987&bShowResourceFieldName=false&gUserID=00000000-0000-0000-0000-000000000000",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/WebResource.axd?d=xu9uErIt0vyo0iG28wexfD7tsYNGR4uIiht-11-88ZiGGpSEahSdkZmQ5CEQfUk2msawckADssa9oj_d8jLGRzptSjQVfXFZDFeYD-TY_VcjSZ9Wq8_xPDRjh4i43nnVQljYsGluDw9s2Xbow2pGU9wh33Xp7D4oVqDZLeEHzRThqmk50&t=637434627200000000", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Account/Popups/BookSubscriptionExpiresSoon.aspx?nBookID=95827987&bShowResourceFieldName=false&gUserID=00000000-0000-0000-0000-000000000000",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/ClientResourcesServingHandler.ashx?h=f02115dbda59c570f49ba076fe65d2c0cdb630b5&t=css&minify=True", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Account/Popups/BookSubscriptionExpiresSoon.aspx?nBookID=95827987&bShowResourceFieldName=false&gUserID=00000000-0000-0000-0000-000000000000",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://cdn.cet.ac.il/libs/cet.browsercheck/latest/check.min.css", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://cdn.proxy.openathens.net/cache/wMwhN7-ZUGt2Ly1OEWQQnKafV_FjB83kTEaAR6tbyzg/a35869d5/t/cdn.cet.ac.il/libs/jquery/2.1.4/jquery-2.1.4.min.js", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/ClientResourcesServingHandler.ashx?h=7824f3a81eab16c16fc2903507b710d1fa95ca2d&t=javascript&minify=True", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Account/Popups/BookSubscriptionExpiresSoon.aspx?nBookID=95827987&bShowResourceFieldName=false&gUserID=00000000-0000-0000-0000-000000000000",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/ScriptResource.axd?d=6QqK0fDq5VoV_r73IBrTk0hsMaco3G0IWXoeN2ae7_Ib-2vJ-giPTveVKZD32hhMaFS8GI2RXhegqxvvm5pyi5NynnIT_rQiQkPrvcOE5Ib4s1Y40&t=f2cd5c5", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Account/Popups/BookSubscriptionExpiresSoon.aspx?nBookID=95827987&bShowResourceFieldName=false&gUserID=00000000-0000-0000-0000-000000000000",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/ScriptResource.axd?d=eLJgZf36EsBP9ghOD4LzmYG_OB15v_ynhFkn7ps8YzeSW_JQyw6IfxJUifcmjkO0uaY2KsvwS7H63uOWPDeF7FKhPPDnjRv3aJRGxo3fWIfTZophym2Sa2WNquNOU7MFvEIz6w2&t=f2cd5c5", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Account/Popups/BookSubscriptionExpiresSoon.aspx?nBookID=95827987&bShowResourceFieldName=false&gUserID=00000000-0000-0000-0000-000000000000",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/kotarapp/resources/cet-sso-handler.js", {
  "headers": {
    "accept": "*/*",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "if-modified-since": "Thu, 21 Dec 2023 15:58:20 GMT",
    "if-none-match": "W/\\"036aa842634da1:0\\"",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "script",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "same-origin",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631292209|1709627779470; dtPC=-97$229489934_670h35vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Account/Popups/BookSubscriptionExpiresSoon.aspx?nBookID=95827987&bShowResourceFieldName=false&gUserID=00000000-0000-0000-0000-000000000000",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://cdn.cet.ac.il/libs/cet.content/latest/display.min.js", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://cdn.cet.ac.il/libs/cet.browsercheck/latest/check.min.js", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("http://ajax.aspnetcdn.com/ajax/4.6/1/WebForms.js", {
  "referrer": "",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/WebResource.axd?d=OMIpl4FyBKe7TOhM9aMq_ovGEC7sQsohrpdvItXzCpQPLtvmgKWjFx4SJhc69fdn8g3iQynX8UN1q1YAaG3-9HzN5WU1&t=637814725746327080", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Account/Popups/BookSubscriptionExpiresSoon.aspx?nBookID=95827987&bShowResourceFieldName=false&gUserID=00000000-0000-0000-0000-000000000000",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/theme/images/popup/close.png", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "if-modified-since": "Thu, 21 Dec 2023 15:58:22 GMT",
    "if-none-match": "\\"063db852634da1:0\\"",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "same-origin",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; dtPC=-97$229489934_670h35p-97$229492583_822h37vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0; rxvt=1709631292593|1709627779470",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/ClientResourcesServingHandler.ashx?h=f02115dbda59c570f49ba076fe65d2c0cdb630b5&t=css&minify=True",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://images1-kotar-co-il.eu1.proxy.openathens.net/GetPageImg.ashx?Type=thumbnail&nBookID=95827987", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "same-site",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631292732|1709627779470; dtPC=-97$229489934_670h35vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/theme/images/embed/play2.svg", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "if-modified-since": "Thu, 21 Dec 2023 15:58:22 GMT",
    "if-none-match": "W/\\"063db852634da1:0\\"",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "same-origin",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; dtPC=-97$229489934_670h35vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0; rxvt=1709631292898|1709627779470",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/ClientResourcesServingHandler.ashx?h=c6498d4142479201a4ffc2142d5ae7b6dfb36e25&t=css&minify=True",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/System/CommandHandler.aspx?command=BookExtensions.SyncLmsItemTasks&nBookID=95827987&_=1709629490113", {
  "headers": {
    "accept": "*/*",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-dtpc": "-97$229489934_670h44vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "x-requested-with": "XMLHttpRequest",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631293634|1709627779470; dtPC=-97$229489934_670h44vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/theme/images/note/noteIcons.png?v=2", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "if-modified-since": "Thu, 21 Dec 2023 15:58:22 GMT",
    "if-none-match": "\\"063db852634da1:0\\"",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "same-origin",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631293634|1709627779470; dtPC=-97$229489934_670h-vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/ClientResourcesServingHandler.ashx?h=c6498d4142479201a4ffc2142d5ae7b6dfb36e25&t=css&minify=True",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/rb_bf09615paq?type=js3&sn=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI&svrid=-97&flavor=post&vi=RPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0&modifiedSince=1709533656549&rf=https%3A%2F%2Fschool-kotar-cet-ac-il.eu1.proxy.openathens.net%2FKotarApp%2FAccount%2FPopups%2FBookSubscriptionExpiresSoon.aspx%3FnBookID%3D95827987%26bShowResourceFieldName%3Dfalse%26gUserID%3D00000000-0000-0000-0000-000000000000&bp=3&app=e9953e14a16f0996&crc=1761212655&en=v0g517su&end=1", {
  "headers": {
    "accept": "*/*",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "content-type": "text/plain;charset=UTF-8",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631293634|1709627779470; dtPC=-97$229489934_670h-vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Account/Popups/BookSubscriptionExpiresSoon.aspx?nBookID=95827987&bShowResourceFieldName=false&gUserID=00000000-0000-0000-0000-000000000000",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": "$a=0%7C1%7C_load_%7CS%2C1%7C37%7C_load_%7C_load_%7C-%7C1709629490763%7C1709629492717%7Cdn%7C59%7Csvtrg%7C1%7Csvm%7Ci1%5Esk0%5Esh0%7Ctvtrg%7C1%7Ctvm%7Ci1%5Esk0%5Esh0%7Clr%7Chttps%3A%2F%2Fschool-kotar-cet-ac-il.eu1.proxy.openathens.net%2FKotarApp%2FViewer.aspx%3FnBookID%3D95827987%2C2%7C45%7C_event_%7C1709629490763%7C_vc_%7CV%7C1925%5Epc%7CVCD%7C1172%7CVCDS%7C0%7CVCS%7C2014%7CVCO%7C3163%7CVCI%7C0%7CVE%7C7%5Ep0%5Ep1120%5Eps%5Es%23closeButton%7CS%7C1866%2C2%7C46%7C_event_%7C1709629490763%7C_wv_%7ClcpE%7CTD%7ClcpSel%7Ctr%3Anth-of-type%281%29%3Etd%3Afirst-child%7ClcpS%7C5696%7ClcpT%7C1888%7ClcpU%7C-%7ClcpLT%7C0%7Cfcp%7C1888%7Cfp%7C1871%7Ccls%7C0%7Clt%7C0%2C2%7C38%7C_onload_%7C_load_%7C-%7C1709629492717%7C1709629492717%7Cdn%7C59%7Csvtrg%7C1%7Csvm%7Ci1%5Esk0%5Esh0%7Ctvtrg%7C1%7Ctvm%7Ci1%5Esk0%5Esh0%2C1%7C47%7C_event_%7C1709629490763%7C_view_%7Ctvtrg%7C1%7Ctvm%7Ci1%5Esk0%5Esh0$dO=school-kotar-cet-ac-il.eu1.proxy.openathens.net,cet.ac.il$pId=229489934_670$pFId=229489934_670$rId=RID_-954454128$rpId=-142829421$domR=1709629492713$tvn=%2FKotarApp%2FAccount%2FPopups%2FBookSubscriptionExpiresSoon.aspx$tvt=1709629490763$tvm=i1%3Bk0%3Bh0$tvtrg=1$w=2844$h=1138$sw=2560$sh=1440$nt=a0b1709629490763e1f1g1h1i1j1k11l1706m1709o1877p1878q1881r1951s1954t1954u3181v2881w7346X200M-142829421V0$ni=4g|10$url=https%3A%2F%2Fschool-kotar-cet-ac-il.eu1.proxy.openathens.net%2FKotarApp%2FAccount%2FPopups%2FBookSubscriptionExpiresSoon.aspx%3FnBookID%3D95827987%26bShowResourceFieldName%3Dfalse%26gUserID%3D00000000-0000-0000-0000-000000000000$title=$latC=0$app=e9953e14a16f0996$vi=RPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0$dnt=1$fId=229492583_822$v=10283240117152214$vID=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61$time=1709629493959",
  "method": "POST"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/System/CommandHandler.aspx?command=Statistics.RegisterCurrentPageView&tmp=tmp&gSiteID=52f90c98-2f29-47f7-b547-70ba4492d9d2&SessionID=ttrnedo1cl2vsutncnazfo4p&gInstituteID=a6a98b02-af1c-4d96-817e-cc559763a387&nSchoolID=0&nPageID=95827988&bIsOpen=true&sCurrentBookUrl=https%253A%252F%252Fschool-kotar-cet-ac-il.eu1.proxy.openathens.net%252FKotarApp%252FViewer.aspx%253FnBookID%253D95827987&_=1709629490114", {
  "headers": {
    "accept": "*/*",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-requested-with": "XMLHttpRequest",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631293634|1709627779470; dtPC=-97$229489934_670h-vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/System/CommandHandler.aspx?command=UserLastRead.Set&nBookID=95827987&nPageNum=1&nOffset=undefined&nSizeStep=6&sFitMode=default&_=1709629490115", {
  "headers": {
    "accept": "*/*",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-requested-with": "XMLHttpRequest",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631293634|1709627779470; dtPC=-97$229489934_670h-vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/rb_bf09615paq?type=js3&sn=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI&svrid=-97&flavor=post&vi=RPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0&modifiedSince=1709533656549&rf=https%3A%2F%2Fschool-kotar-cet-ac-il.eu1.proxy.openathens.net%2FKotarApp%2FViewer.aspx%3FnBookID%3D95827987&bp=3&app=e9953e14a16f0996&crc=3556199001&en=v0g517su&end=1", {
  "headers": {
    "accept": "*/*",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "content-type": "text/plain;charset=UTF-8",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631293634|1709627779470; dtPC=-97$229489934_670h-vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": "$a=d%7C-1%7C%D7%92%D7%90%D7%95%D7%9E%D7%98%D7%A8%D7%99%D7%94%20%D7%9C%D7%91%D7%99%D7%AA%20%D7%94%D7%A1%D7%A4%D7%A8%20%D7%94%D7%99%D7%A1%D7%95%D7%93%D7%99%20%28%D7%9C%D7%9B%D7%99%D7%AA%D7%94%20%D7%91%20%3A%20%D7%97%D7%93%D7%A9%21%29%20%2F%20%D7%A9%D7%91%D7%99%D7%9C%D7%99%D7%9D%20%3A%20%D7%9E%D7%AA%D7%9E%D7%98%D7%99%D7%A7%D7%94%20%D7%9C%D7%91%D7%99%D7%AA%20%D7%94%D7%A1%D7%A4%D7%A8%20%D7%94%D7%99%D7%A1%D7%95%D7%93%D7%99%5Ec%20%D7%9B%D7%99%D7%AA%D7%94%20%D7%91%27%20%2F%20%D7%A9%D7%91%D7%99%D7%9C%D7%99%D7%9D%20...%7CC%7C-%7C229482501_582%7C1709629484564%7Chttps%3A%2F%2Fschool-kotar-cet-ac-il.eu1.proxy.openathens.net%2FKotarApp%2FBrowseBooks.aspx%3FExpandNodeID%3D2330%25242342%26bAsImage%3DTrue%26class%3D2%26lang%3Dhe%5Ecen%7C%7C%7C%2FKotarApp%2FBrowseBooks.aspx%7C1709629481544%2C1%7C1%7C_load_%7C_load_%7C-%7C1709629488743%7C1709629493758%7Cdn%7C615%7Ccfa%7C1%7Csvtrg%7C1%7Csvm%7Ci1%5Esk0%5Esh0%7Ctvtrg%7C1%7Ctvm%7Ci1%5Esk0%5Esh0%7Clr%7Chttps%3A%2F%2Fschool-kotar-cet-ac-il.eu1.proxy.openathens.net%2FKotarApp%2FBrowseBooks.aspx%3FExpandNodeID%3D2330%25242342%26bAsImage%3DTrue%26class%3D2%26lang%3Dhe%5Ecen%2C2%7C49%7C_event_%7C1709629488743%7C_vc_%7CV%7C3945%5Epc%7CVCD%7C1210%7CVCDS%7C0%7CVCS%7C5068%7CVCO%7C6194%7CVCI%7C0%7CS%7C1527%2C2%7C50%7C_event_%7C1709629488743%7C_wv_%7ClcpE%7CDIV%7ClcpSel%7C%23BV_oPage_0%7ClcpS%7C1013142%7ClcpT%7C3214%7ClcpU%7Chttps%3A%2F%2Fkotarimagesstg.cet.ac.il%2FGetPageImg_5Fv2.ashx%3FType%3Dpage_5Fimg%26gPageToken%3D6b9fd50a-6ac9-443e-afb5-ae131c1e2efb%26nStep%3D7%26nVersion%3D10%7ClcpLT%7C3214%7Cfcp%7C1489%7Cfp%7C1489%7Ccls%7C0.0006%7Clt%7C1607%2C2%7C2%7Cx%7Cxhr%7Cx%7C1709629490062%7C1709629490367%7Cdn%7C165%7Cxu%7Chttps%3A%2F%2Faccounts.cet.ac.il%2Fversioning%2Fversion.txt%7Csvtrg%7C1%7Csvm%7Ci1%5Esk0%5Esh0%7Ctvtrg%7C1%7Ctvm%7Ci1%5Esk0%5Esh0%7Cxrt%7Cb1709629490065e0f8g9h9i85j40k85l165m165u306v6w6X200T-1z11I1M804861965V0W1%7Cxcs%7C305%7Cxce%7C305%2C2%7C3%7Cx%7Cxhr%7Cx%7C1709629490082%7C1709629490429%7Cdn%7C176%7Cxu%7Chttps%3A%2F%2Faccounts.cet.ac.il%2Fversioning%2Fversion.txt%7Csvtrg%7C1%7Csvm%7Ci1%5Esk0%5Esh0%7Ctvtrg%7C1%7Ctvm%7Ci1%5Esk0%5Esh0%7Cxrt%7Cb1709629490084e0f0g0h0i0j0k147l236m237u306v6w6X200T-2z1I1M-51800894V0W1%7Cxcs%7C347%7Cxce%7C347%2C2%7C11%7CsetTimeout%28...%5Ec%201%29%7C_t_%7C-%7C1709629490604%7C1709629493758%7Cdn%7C615%7Csvtrg%7C1%7Csvm%7Ci1%5Esk0%5Esh0%7Ctvtrg%7C1%7Ctvm%7Ci1%5Esk0%5Esh0%2C3%7C21%7Cx%7Cxhr%7Cx%7C1709629490691%7C1709629491931%7Cdn%7C585%7Cxu%7Chttps%3A%2F%2Flogin.eu1.proxy.openathens.net%2Fperf%2F3c80eb6c-677b-4559-ac2d-d29d5f918d54%2F1ee13028%7Csvtrg%7C1%7Csvm%7Ci1%5Esk0%5Esh0%7Ctvtrg%7C1%7Ctvm%7Ci1%5Esk0%5Esh0%7Cxrt%7Cb1709629490692e0m219X204T-3z11I1%7Cxcs%7C1240%7Cxce%7C1240%7Crc%7C971%7Crm%7CXHR%20Canceled%2C4%7C22%7CScript%20error.%7C_error_%7C-%7C1709629490713%7C1709629490713%7Cdn%7C-1%7Ctvtrg%7C1%7Ctvm%7Ci1%5Esk0%5Esh0%2C5%7C23%7CError%7C_type_%7C-%7C1709629490715%7C1709629490715%7Cdn%7C-1%7Ctvtrg%7C1%7Ctvm%7Ci1%5Esk0%5Esh0%2C5%7C24%7C%3Cgenerated%3E%5EpError%5Ep%20%20%20%20at%20cl%20%28https%3A%2F%2Fschool-kotar-cet-ac-il.eu1.proxy.openathens.net%2Fruxitagentjs_ICA2NVfhjqrtux_10283240117152214.js%3A171%3A291%29%5Ep%20%20%20%20at%20Object.bl%20%5Bas%20re%5D%20%28https%3A%2F%2Fschool-kotar-cet-ac-il.eu1.proxy.openathens.net%2Fruxitagentjs_ICA2NVfhjqrtux_10283240117152214.js%3A168%3A423%29%5Ep%20%20%20%20at%20Ka%20%28https%3A%2F%2Fschool-kotar-cet-ac-il.eu1.proxy.openathens.net%2Fruxitagentjs_ICA2NVfhjqrtux_10283240117152214.js%3A353%3A179%29%5Ep%20%20%20%20at%20https%3A%2F%2Fjs.nagich.co.il%2Fcore%2F4.1.1%2Faccessibility.js%3A1%3A21707%5Ep%20%20%20%20at%20async%20n.InitButtonStyle%20%28https%3A%2F%2Fjs.nagich.co.il%2Fcore%2F4.1.1%2Faccessibility.js%3A1%3A21578%29%7C_stack_%7C-%7C1709629490718%7C1709629490718%7Cdn%7C-1%7Ctvtrg%7C1%7Ctvm%7Ci1%5Esk0%5Esh0%2C5%7C25%7C779%7C_ts_%7C-%7C1709629490725%7C1709629490725%7Cdn%7C-1%7Ctvtrg%7C1%7Ctvm%7Ci1%5Esk0%5Esh0%2C5%7C26%7C1%7C_source_%7C-%7C1709629490728%7C1709629490728%7Cdn%7C-1%7Ctvtrg%7C1%7Ctvm%7Ci1%5Esk0%5Esh0%2C4%7C27%7CScript%20error.%7C_error_%7C-%7C1709629490730%7C1709629490730%7Cdn%7C-1%7Ctvtrg%7C1%7Ctvm%7Ci1%5Esk0%5Esh0%2C5%7C28%7CError%7C_type_%7C-%7C1709629490731%7C1709629490731%7Cdn%7C-1%7Ctvtrg%7C1%7Ctvm%7Ci1%5Esk0%5Esh0%2C5%7C29%7C%3Cgenerated%3E%5EpError%5Ep%20%20%20%20at%20cl%20%28https%3A%2F%2Fschool-kotar-cet-ac-il.eu1.proxy.openathens.net%2Fruxitagentjs_ICA2NVfhjqrtux_10283240117152214.js%3A171%3A291%29%5Ep%20%20%20%20at%20Object.bl%20%5Bas%20re%5D%20%28https%3A%2F%2Fschool-kotar-cet-ac-il.eu1.proxy.openathens.net%2Fruxitagentjs_ICA2NVfhjqrtux_10283240117152214.js%3A168%3A423%29%5Ep%20%20%20%20at%20Ka%20%28https%3A%2F%2Fschool-kotar-cet-ac-il.eu1.proxy.openathens.net%2Fruxitagentjs_ICA2NVfhjqrtux_10283240117152214.js%3A353%3A179%29%5Ep%20%20%20%20at%20https%3A%2F%2Fjs.nagich.co.il%2Fcore%2F4.1.1%2Faccessibility.js%3A1%3A21707%5Ep%20%20%20%20at%20async%20n.InitButtonStyle%20%28https%3A%2F%2Fjs.nagich.co.il%2Fcore%2F4.1.1%2Faccessibility.js%3A1%3A21578%29%7C_stack_%7C-%7C1709629490732%7C1709629490732%7Cdn%7C-1%7Ctvtrg%7C1%7Ctvm%7Ci1%5Esk0%5Esh0%2C5%7C30%7C796%7C_ts_%7C-%7C1709629490734%7C1709629490734%7Cdn%7C-1%7Ctvtrg%7C1%7Ctvm%7Ci1%5Esk0%5Esh0%2C5%7C31%7C1%7C_source_%7C-%7C1709629490737%7C1709629490737%7Cdn%7C-1%7Ctvtrg%7C1%7Ctvm%7Ci1%5Esk0%5Esh0%2C3%7C32%7Cx%7Cxhr%7Cx%7C1709629490764%7C1709629491892%7Cdn%7C585%7Cxu%7C%2FKotarApp%2FSystem%2FCommandHandler.aspx%3Fcommand%3Dloadtoolbar%26nBookID%3D95827987%26platform%3D%26_%3D1709629490111%7Csvtrg%7C1%7Csvm%7Ci1%5Esk0%5Esh0%7Ctvtrg%7C1%7Ctvm%7Ci1%5Esk0%5Esh0%7Cxrt%7Cb1709629490774e0f0g0h0i0j0k2l1110m1117u1034v734w1691X200T-4z11I1V1%7Cxcs%7C1128%7Cxce%7C1128%2C3%7C33%7Cx%7Cxhr%7Cx%7C1709629491938%7C1709629492191%7Cdn%7C589%7Cxu%7C%2FKotarApp%2FSystem%2FCommandHandlerNoSession.aspx%3Fcommand%3DPage.GetPageWords%26nPageID%3D95827988%7Csvtrg%7C1%7Csvm%7Ci1%5Esk0%5Esh0%7Ctvtrg%7C1%7Ctvm%7Ci1%5Esk0%5Esh0%7Cxrt%7Cb1709629491940e0f0g0h0i0j0k2l244m246u521v221w377X200T-5z11I1M-1176601056V0%7Cxcs%7C253%7Cxce%7C253%2C3%7C35%7Cx%7Cxhr%7Cx%7C1709629491954%7C1709629493720%7Cdn%7C615%7Cxu%7C%2FKotarApp%2FSystem%2FCommandHandlerReadOnlySession.aspx%3Fcommand%3Dloadbibliography%26nBookID%3D95827987%26_%3D1709629490112%7Csvtrg%7C1%7Csvm%7Ci1%5Esk0%5Esh0%7Ctvtrg%7C1%7Ctvm%7Ci1%5Esk0%5Esh0%7Cxrt%7Cb1709629491956e0f0g0h0i0j0k3l1756m1759u516v216w417X200T-6z11I1M1946443512V0%7Cxcs%7C1766%7Cxce%7C1766%2C3%7C36%7Cx%7Cxhr%7Cx%7C1709629492206%7C1709629492365%7Cdn%7C597%7Cxu%7C%2FKotarApp%2FSystem%2FCommandHandlerNoSession.aspx%3Fcommand%3DPage.GetPageWords%26nPageID%3D95827992%7Csvtrg%7C1%7Csvm%7Ci1%5Esk0%5Esh0%7Ctvtrg%7C1%7Ctvm%7Ci1%5Esk0%5Esh0%7Cxrt%7Cb1709629492213e0f0g0h0i0j0k3l144m146u1059v759w1586X200T-7z11I1M639400933V0%7Cxcs%7C158%7Cxce%7C159%2C3%7C44%7Cx%7Cxhr%7Cx%7C1709629493632%7C1709629493758%7Cdn%7C615%7Cxu%7C%2FKotarApp%2FSystem%2FCommandHandler.aspx%3Fcommand%3DBookExtensions.SyncLmsItemTasks%26nBookID%3D95827987%26_%3D1709629490113%7Csvtrg%7C1%7Csvm%7Ci1%5Esk0%5Esh0%7Ctvtrg%7C1%7Ctvm%7Ci1%5Esk0%5Esh0%7Cxrt%7Cb1709629493636e0f0g0h0i0j0k2l113m116u369v69w58X200T-8z11I1V1%7Cxcs%7C126%7Cxce%7C126%2C2%7C14%7Cx%7Cxhr%7Cx%7C1709629490615%7C1709629491934%7Cdn%7C585%7Cxu%7C%2FKotarApp%2FSystem%2FCommandHandler.aspx%3Fcommand%3DBookExtensions.GetBookExtensionTargetLayers%26SerType%3D2%26nBookID%3D95827987%26_%3D1709629490108%7Csvtrg%7C1%7Csvm%7Ci1%5Esk0%5Esh0%7Ctvtrg%7C1%7Ctvm%7Ci1%5Esk0%5Esh0%7Cxrt%7Cb1709629490618e0f0g0h0i0j0k2l650m654u432v132w471X200T-9z11I1M1429584322V0%7Cxcs%7C1318%7Cxce%7C1318%2C2%7C16%7Cx%7Cxhr%7Cx%7C1709629490643%7C1709629492896%7Cdn%7C615%7Cxu%7C%2FKotarApp%2FSystem%2FCommandHandler.aspx%3Fcommand%3DBookEmbedsParts.GetAllBookEmbededParts%26nBookID%3D95827987%26_%3D1709629490109%7Csvtrg%7C1%7Csvm%7Ci1%5Esk0%5Esh0%7Ctvtrg%7C1%7Ctvm%7Ci1%5Esk0%5Esh0%7Cxrt%7Cb1709629490646e0f0g0h0i0j0k2l2246m2248u1758v1458w10223X200T-10z11I1M-316213798V0%7Cxcs%7C2253%7Cxce%7C2253%2C2%7C17%7Cx%7Cxhr%7Cx%7C1709629490655%7C1709629492882%7Cdn%7C597%7Cxu%7C%2FKotarApp%2FSystem%2FCommandHandler.aspx%3Fcommand%3DBookExtensions.GetBookExtensionTargetLayers%26SerType%3D2%26nBookID%3D95827987%26_%3D1709629490110%7Csvtrg%7C1%7Csvm%7Ci1%5Esk0%5Esh0%7Ctvtrg%7C1%7Ctvm%7Ci1%5Esk0%5Esh0%7Cxrt%7Cb1709629490657e0f0g0h0i0j0k2l2223m2224u432v132w471X200T-11z11I1V1%7Cxcs%7C2227%7Cxce%7C2227%2C2%7C18%7Cx%7Cxhr%7Cx%7C1709629490658%7C1709629490761%7Cdn%7C585%7Cxu%7Chttps%3A%2F%2Ftalkbackservice.cet.ac.il%2FTemplates%2FtalkbacksHeaderTemplate.html%7Csvtrg%7C1%7Csvm%7Ci1%5Esk0%5Esh0%7Ctvtrg%7C1%7Ctvm%7Ci1%5Esk0%5Esh0%7Cxrt%7Cb1709629490660e0m101T-12z11I1%7Cxcs%7C103%7Cxce%7C103%7Crc%7C971%7Crm%7CXHR%20Canceled%2C2%7C19%7Cx%7Cxhr%7Cx%7C1709629490660%7C1709629490761%7Cdn%7C585%7Cxu%7Chttps%3A%2F%2Ftalkbackservice.cet.ac.il%2FTemplates%2FtalkbacksListTemplate.html%7Csvtrg%7C1%7Csvm%7Ci1%5Esk0%5Esh0%7Ctvtrg%7C1%7Ctvm%7Ci1%5Esk0%5Esh0%7Cxrt%7Cb1709629490662e0m99T-13z11I1%7Cxcs%7C101%7Cxce%7C101%7Crc%7C971%7Crm%7CXHR%20Canceled%2C2%7C39%7C_onload_%7C_load_%7C-%7C1709629492719%7C1709629492732%7Cdn%7C597%7Csvtrg%7C1%7Csvm%7Ci1%5Esk0%5Esh0%7Ctvtrg%7C1%7Ctvm%7Ci1%5Esk0%5Esh0%2C1%7C51%7C_event_%7C1709629488743%7C_view_%7Csvn%7C%2FKotarApp%2FBrowseBooks.aspx%7Csvt%7C1709629481544%7Csvtrg%7C1%7Csvm%7Ci1%5Esk0%5Esh0%7Ctvtrg%7C1%7Ctvm%7Ci1%5Esk0%5Esh0$dO=school-kotar-cet-ac-il.eu1.proxy.openathens.net,cet.ac.il$rId=RID_992730573$rpId=-268814376$domR=1709629492716$tvn=%2FKotarApp%2FViewer.aspx$tvt=1709629488743$tvm=i1%3Bk0%3Bh0$tvtrg=1$w=2844$h=1138$sw=2560$sh=1440$nt=a1b1709629488743e3f3g3h3i3j3k13l850m894o1854p1856q1923r3974s3976t3981u43443v43143w135295X200M-268814376V0$ni=4g|10$fd=b6-10$url=https%3A%2F%2Fschool-kotar-cet-ac-il.eu1.proxy.openathens.net%2FKotarApp%2FViewer.aspx%3FnBookID%3D95827987$title=%D7%A7%D7%A8%D7%90%D7%95%20%D7%91%D7%9B%D7%95%D7%AA%D7%A8%20-%20%D7%A9%D7%91%D7%99%D7%9C%D7%99%D7%9D%20%3A%20%D7%9E%D7%AA%D7%9E%D7%98%D7%99%D7%A7%D7%94%20%D7%9C%D7%91%D7%99%D7%AA%20%D7%94%D7%A1%D7%A4%D7%A8%20%D7%94%D7%99%D7%A1%D7%95%D7%93%D7%99%2C%20%D7%9B%D7%99%D7%AA%D7%94%20%D7%91%27%20-%20%D7%92%D7%90%D7%95%D7%9E%D7%98%D7%A8%D7%99%D7%94%20%D7%9C%D7%91%D7%99%D7%AA%20%D7%94%D7%A1%D7%A4%D7%A8%20%D7%94%D7%99%D7%A1%D7%95%D7%93%D7%99%20%28%D7%9C%D7%9B%D7%99%D7%AA%D7%94%20%D7%91%20%3A%20%D7%97%D7%93%D7%A9%21%29$latC=0$app=e9953e14a16f0996$vi=RPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0$dnt=1$fId=229489934_670$v=10283240117152214$vID=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61$time=1709629495030",
  "method": "POST"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/System/MessageBoxNew.aspx?bShowLoading=true&sLang=he", {
  "headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "iframe",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; rxvt=1709631293634|1709627779470; dtPC=-97$229489934_670h-vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0; dtSa=true%7CC%7C-1%7C%D7%91%D7%98%D7%9C%7C-%7C1709629495865%7C229492583_822%7Chttps%3A%2F%2Fschool-kotar-cet-ac-il.eu1.proxy.openathens.net%2FKotarApp%2FAccount%2FPopups%2FBookSubscriptionExpiresSoon.aspx%3FnBookID%3D95827987%26bShowResourceFieldName%3Dfalse%26gUserID%3D00000000-0000-0000-0000-000000000000%7C%7C%7C%7C",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/ruxitagentjs_ICA2NVfhjqrtux_10283240117152214.js", {
  "headers": {
    "accept": "*/*",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "if-modified-since": "Wed, 03 Mar 2010 07:01:40 GMT",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "script",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "same-origin",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; rxvt=1709631293634|1709627779470; dtSa=true%7CC%7C-1%7C%D7%91%D7%98%D7%9C%7C-%7C1709629495865%7C229492583_822%7Chttps%3A%2F%2Fschool-kotar-cet-ac-il.eu1.proxy.openathens.net%2FKotarApp%2FAccount%2FPopups%2FBookSubscriptionExpiresSoon.aspx%3FnBookID%3D95827987%26bShowResourceFieldName%3Dfalse%26gUserID%3D00000000-0000-0000-0000-000000000000%7C%7C%7C%7C; dtPC=-97$229492583_822h-vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/System/MessageBoxNew.aspx?bShowLoading=true&sLang=he",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/WebResource.axd?d=xu9uErIt0vyo0iG28wexfD7tsYNGR4uIiht-11-88ZiGGpSEahSdkZmQ5CEQfUk2msawckADssa9oj_d8jLGRzptSjQVfXFZDFeYD-TY_VcjSZ9Wq8_xPDRjh4i43nnVQljYsGluDw9s2Xbow2pGU9wh33Xp7D4oVqDZLeEHzRThqmk50&t=637434627200000000", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/System/MessageBoxNew.aspx?bShowLoading=true&sLang=he",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/ClientResourcesServingHandler.ashx?h=bc354050d63bbcf969a8d2e0e9388983c2e306f7&t=css&minify=True", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/System/MessageBoxNew.aspx?bShowLoading=true&sLang=he",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://cdn.cet.ac.il/libs/cet.browsercheck/latest/check.min.css", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/ClientResourcesServingHandler.ashx?h=081286f4653bf7a0b0cd4f3f020115e6e841979e&t=javascript&minify=True", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/System/MessageBoxNew.aspx?bShowLoading=true&sLang=he",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/ClientResourcesServingHandler.ashx?h=7824f3a81eab16c16fc2903507b710d1fa95ca2d&t=javascript&minify=True", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/System/MessageBoxNew.aspx?bShowLoading=true&sLang=he",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/kotarapp/resources/images/preloaderbig.gif?v=1", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "if-modified-since": "Thu, 21 Dec 2023 15:58:20 GMT",
    "if-none-match": "\\"036aa842634da1:0\\"",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "same-origin",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; rxvt=1709631293634|1709627779470; dtSa=true%7CC%7C-1%7C%D7%91%D7%98%D7%9C%7C-%7C1709629495865%7C229492583_822%7Chttps%3A%2F%2Fschool-kotar-cet-ac-il.eu1.proxy.openathens.net%2FKotarApp%2FAccount%2FPopups%2FBookSubscriptionExpiresSoon.aspx%3FnBookID%3D95827987%26bShowResourceFieldName%3Dfalse%26gUserID%3D00000000-0000-0000-0000-000000000000%7C%7C%7C%7C; dtPC=-97$229492583_822h-vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/System/MessageBoxNew.aspx?bShowLoading=true&sLang=he",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://cdn.cet.ac.il/libs/cet.content/latest/display.min.js", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://cdn.cet.ac.il/libs/cet.browsercheck/latest/check.min.js", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/rb_bf09615paq?type=js3&sn=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI&svrid=-97&flavor=post&vi=RPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0&modifiedSince=1709533656549&rf=https%3A%2F%2Fschool-kotar-cet-ac-il.eu1.proxy.openathens.net%2FKotarApp%2FSystem%2FMessageBoxNew.aspx%3FbShowLoading%3Dtrue%26sLang%3Dhe&bp=3&app=e9953e14a16f0996&crc=2686611889&en=v0g517su&end=1", {
  "headers": {
    "accept": "*/*",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "content-type": "text/plain;charset=UTF-8",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631296258|1709627779470; dtPC=-97$229496204_142h-vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/System/MessageBoxNew.aspx?bShowLoading=true&sLang=he",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": "$a=d%7C-1%7C%D7%91%D7%98%D7%9C%7CC%7C-%7C229492583_822%7C1709629495865%7Chttps%3A%2F%2Fschool-kotar-cet-ac-il.eu1.proxy.openathens.net%2FKotarApp%2FAccount%2FPopups%2FBookSubscriptionExpiresSoon.aspx%3FnBookID%3D95827987%26bShowResourceFieldName%3Dfalse%26gUserID%3D00000000-0000-0000-0000-000000000000%7C%7C%7C%2FKotarApp%2FAccount%2FPopups%2FBookSubscriptionExpiresSoon.aspx%7C1709629490763%2C1%7C52%7C_load_%7C_load_%7C-%7C1709629495890%7C1709629496260%7Cdn%7C17%7Csvtrg%7C1%7Csvm%7Ci1%5Esk0%5Esh0%7Ctvtrg%7C1%7Ctvm%7Ci1%5Esk0%5Esh0%7Clr%7Chttps%3A%2F%2Fschool-kotar-cet-ac-il.eu1.proxy.openathens.net%2FKotarApp%2FViewer.aspx%3FnBookID%3D95827987%2C2%7C55%7C_event_%7C1709629495890%7C_vc_%7CV%7C-1%5Epc%7CVCD%7C1223%7CVCDS%7C1%7CVCS%7C423%7CVCO%7C1601%7CVCI%7C0%7CS%7C-1%2C2%7C56%7C_event_%7C1709629495890%7C_wv_%7ClcpT%7C-5%7Cfcp%7C-5%7Cfp%7C-5%7Ccls%7C0%7Clt%7C0%2C2%7C53%7C_onload_%7C_load_%7C-%7C1709629496260%7C1709629496260%7Cdn%7C17%7Csvtrg%7C1%7Csvm%7Ci1%5Esk0%5Esh0%7Ctvtrg%7C1%7Ctvm%7Ci1%5Esk0%5Esh0%2C1%7C57%7C_event_%7C1709629495890%7C_view_%7Csvn%7C%2FKotarApp%2FAccount%2FPopups%2FBookSubscriptionExpiresSoon.aspx%7Csvt%7C1709629490763%7Csvtrg%7C1%7Csvm%7Ci1%5Esk0%5Esh0%7Ctvtrg%7C1%7Ctvm%7Ci1%5Esk0%5Esh0$dO=school-kotar-cet-ac-il.eu1.proxy.openathens.net,cet.ac.il$pId=229489934_670$pFId=229489934_670$rId=RID_-2016937626$rpId=-127568669$domR=1709629496257$tvn=%2FKotarApp%2FSystem%2FMessageBoxNew.aspx$tvt=1709629495890$tvm=i1%3Bk0%3Bh0$tvtrg=1$w=2844$h=1138$sw=2560$sh=1440$nt=a0b1709629495890e3f3g3h3i3j3k15l204m206o334p334q336r368s370t370u1306v1006w1905X200M-127568669V0$ni=4g|10$url=https%3A%2F%2Fschool-kotar-cet-ac-il.eu1.proxy.openathens.net%2FKotarApp%2FSystem%2FMessageBoxNew.aspx%3FbShowLoading%3Dtrue%26sLang%3Dhe$title=$latC=0$app=e9953e14a16f0996$vi=RPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0$dnt=1$fId=229496204_142$v=10283240117152214$vID=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61$time=1709629497556",
  "method": "POST"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=dfd2c935-3134-48c2-a396-c4017a9e321c&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://images1-kotar-co-il.eu1.proxy.openathens.net/GetPageImg.ashx?Type=thumbnail&nBookID=95827987", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=7c402208-4f7c-4f6b-a259-e70c85e0d279&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://images1-kotar-co-il.eu1.proxy.openathens.net/GetPageImg.ashx?Type=thumbnail&nBookID=95827987", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=a7a52877-105b-4f33-81e9-7bbd8c35a221&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=780a86f4-0d83-4729-b394-0ad21f20b62d&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=e1cc8543-3d14-4ddc-905a-7b246f6a563c&nStep=7&nVersion=11", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=3aad090b-5610-4c74-b1da-443cb85c2922&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=2e76aade-82a7-47da-b76b-2d29166663d8&nStep=7&nVersion=13", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=475b914c-8e6b-43c8-bc46-ef004a98a3c9&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=177b5169-63b0-4323-8065-ba743184f5ae&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=cd1ff41d-578a-43fe-9e32-0c503d8405ab&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=6d156696-2af1-46c3-9090-00737dd55102&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=343e59b6-8104-4d6c-836d-5864f1535634&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=c46542bb-d29f-43fd-8112-7a8ed114aaee&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=d677118e-318d-4f38-ad1f-433ecff8fd76&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=3ac332ac-5da1-4aba-9491-136cce4e815f&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=0f4d3663-f77a-47cb-81b3-c0271f70da47&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=40865f8e-b134-4174-ba4f-c01098aaf4ef&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=0e9b9134-2d8e-4c27-aa46-b52056990d8e&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=84aadd80-02b7-49e3-bc1e-2c3ccf33db2d&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=f35dc2f1-789d-453a-9021-129e2f1f3746&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=9d2c8ec2-f21e-4cb5-979e-ab1a1adc0ee5&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=ea90391e-22f4-4100-a3f2-4975229aa728&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=c5908e56-68f8-4830-bffa-4fdffb175bcb&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=28099a8c-374f-4d52-a36d-3ebc7b8bc4f0&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=d1003566-944a-4f5f-a72f-7ade3921b03c&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=b1120f45-9819-468c-a285-4454e0a6f336&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/System/CommandHandlerNoSession.aspx?command=Page.GetPageWords&nPageID=95828154", {
  "headers": {
    "accept": "*/*",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-dtpc": "-97$229489934_670h58vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "x-dtreferer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "x-requested-with": "XMLHttpRequest",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; dtPC=-97$229489934_670h58vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0; rxvt=1709631327918|1709627779470",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/System/CommandHandlerNoSession.aspx?command=Page.GetPageWords&nPageID=95828165", {
  "headers": {
    "accept": "*/*",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-dtpc": "-97$229489934_670h59vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "x-dtreferer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "x-requested-with": "XMLHttpRequest",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; dtPC=-97$229489934_670h59vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0; rxvt=1709631327922|1709627779470",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/System/CommandHandlerNoSession.aspx?command=Page.GetPageWords&nPageID=95828172", {
  "headers": {
    "accept": "*/*",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-dtpc": "-97$229489934_670h60vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "x-dtreferer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "x-requested-with": "XMLHttpRequest",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; dtPC=-97$229489934_670h60vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0; rxvt=1709631327924|1709627779470",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/System/CommandHandlerNoSession.aspx?command=Page.GetPageWords&nPageID=95828181", {
  "headers": {
    "accept": "*/*",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-dtpc": "-97$229489934_670h61vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "x-dtreferer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "x-requested-with": "XMLHttpRequest",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631327924|1709627779470; dtPC=-97$229489934_670h61vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/System/CommandHandler.aspx?command=Statistics.RegisterCurrentPageView&tmp=tmp&gSiteID=52f90c98-2f29-47f7-b547-70ba4492d9d2&SessionID=ttrnedo1cl2vsutncnazfo4p&gInstituteID=a6a98b02-af1c-4d96-817e-cc559763a387&nSchoolID=0&nPageID=95828165&bIsOpen=true&sCurrentBookUrl=https%253A%252F%252Fschool-kotar-cet-ac-il.eu1.proxy.openathens.net%252FKotarApp%252FViewer.aspx%253FnBookID%253D95827987%252326.6803.6.default&_=1709629490116", {
  "headers": {
    "accept": "*/*",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-requested-with": "XMLHttpRequest",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631327924|1709627779470; dtPC=-97$229489934_670h-vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/System/CommandHandler.aspx?command=UserLastRead.Set&nBookID=95827987&nPageNum=26&nOffset=6803&nSizeStep=6&sFitMode=default&_=1709629490117", {
  "headers": {
    "accept": "*/*",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "x-requested-with": "XMLHttpRequest",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=d24001b5-dd85-4acb-9166-1cefa302a459&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=74c23304-f8dc-46a1-ab60-165aa080999d&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=cd5bb4b2-4659-429f-92f7-7b6a4342b684&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=639b1e1b-e98e-4e10-a47e-b11237c64b0d&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=81db2eba-ca7a-48a7-b9d6-6ccdfb9f0ef7&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=17850656-eb74-48b5-b58f-3b429721ac82&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=22eea3a0-574e-43a7-a3a1-d6623d61b319&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=edaa244c-b5bd-430e-acf4-ec32cab88ea9&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=920dd331-928e-44ef-b615-801114011e73&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=652eb3d9-1405-436c-a46f-1ceb0fd01444&nStep=7&nVersion=11", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=385ab567-6f55-44d6-a088-9b900cf1ef4b&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=41387cd9-050d-4e47-a535-4828971b0316&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=0d855fb0-2433-41f3-a5f6-3bfb8604e947&nStep=7&nVersion=11", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=b725cc0b-5286-48f0-a921-1a87f571c9b7&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=3d302136-b774-476a-b689-d5fb2a2563a5&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=f1f0ba51-0b9e-4ebc-bf13-08cbdafc2415&nStep=7&nVersion=11", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=16ebcae3-7df2-4ac2-a137-41b40964563c&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=3de9d519-25be-438e-b0a1-40bd2956ae4f&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=b1540518-aed4-4979-b3ae-c76f1bccd329&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=55f1b7a0-37c8-4424-8362-831c4191ecc1&nStep=7&nVersion=11", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=b7dc1dbf-edd9-4392-b292-ccf5bc12c177&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=0c9c1df6-1c19-4602-a7be-7b701b055744&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=2f3ab05f-af3d-4359-aee6-1aef74ca345f&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=2008795c-665d-4631-9dbf-6eb4524e0c66&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=fa32db0d-c18f-44ac-a5f0-69d6b0d90791&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=9bf5b5c3-2df8-4c5b-b800-ead30cfb40a1&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=9bf5b5c3-2df8-4c5b-b800-ead30cfb40a1&nStep=7&nVersion=10", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=a2cdd2df-3c75-4a2c-91ff-e218eb8ef4ac&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=70009963-d8a4-4c17-bec8-dbbc3bbeb337&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=32f36ea5-49c1-4842-9e78-c8c09fea7579&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=b575a84c-9853-483b-8e65-91ee500ad3c2&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=26a5aaf3-0f64-4402-85d8-fcc5e3c30b70&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=thumbnail&nBookID=95827987", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer/Images/1x1transparent.svg", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "if-modified-since": "Thu, 21 Dec 2023 15:58:20 GMT",
    "if-none-match": "W/\\"036aa842634da1:0\\"",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "same-origin",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631327924|1709627779470; dtPC=-97$229489934_670h-vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=a1427af8-5594-456e-b8d1-bc1f556d3c63&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=5d3e00d0-7b9f-46d8-8cc5-91452f76d93b&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=b7c50ace-923b-41f6-b80c-287f59944ec2&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=cabf2b86-75b6-4407-aea3-efa469244923&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=thumbnail&nBookID=95827987", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer/Images/1x1transparent.svg", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "if-modified-since": "Thu, 21 Dec 2023 15:58:20 GMT",
    "if-none-match": "W/\\"036aa842634da1:0\\"",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "same-origin",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631327924|1709627779470; dtPC=-97$229489934_670h-vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=5c0fa958-1548-4c04-b095-b4030bd84820&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=2fc6c64d-1fb9-4a95-b513-83f383af8fd6&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=be55775d-af9f-4edb-a605-43579693bab2&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=a8aeffa0-b312-4615-bf89-0015c20a8050&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=dbc3153c-34b1-497c-8a82-1bc89986e335&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=ba47336c-e732-4a81-af41-c8d86208dff6&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=27ad9908-5746-4abe-afa1-403ad9979794&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=thumbnail&nBookID=95827987", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer/Images/1x1transparent.svg", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "if-modified-since": "Thu, 21 Dec 2023 15:58:20 GMT",
    "if-none-match": "W/\\"036aa842634da1:0\\"",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "same-origin",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631327924|1709627779470; dtPC=-97$229489934_670h-vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=8cf48c70-6928-421a-bacc-52fff1bd6cb2&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=49703145-52c5-48a2-86fe-b9591998d983&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=49703145-52c5-48a2-86fe-b9591998d983&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/System/CommandHandlerNoSession.aspx?command=Page.GetPageWords&nPageID=95828444", {
  "headers": {
    "accept": "*/*",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-dtpc": "-97$229489934_670h63vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "x-requested-with": "XMLHttpRequest",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631377123|1709627779470; dtPC=-97$229489934_670h63vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/System/CommandHandler.aspx?command=Statistics.RegisterCurrentPageView&tmp=tmp&gSiteID=52f90c98-2f29-47f7-b547-70ba4492d9d2&SessionID=ttrnedo1cl2vsutncnazfo4p&gInstituteID=a6a98b02-af1c-4d96-817e-cc559763a387&nSchoolID=0&nPageID=95828454&bIsOpen=true&sCurrentBookUrl=https%253A%252F%252Fschool-kotar-cet-ac-il.eu1.proxy.openathens.net%252FKotarApp%252FViewer.aspx%253FnBookID%253D95827987%252372.2103.6.default&_=1709629490118", {
  "headers": {
    "accept": "*/*",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-dtpc": "-97$229489934_670h64vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "x-requested-with": "XMLHttpRequest",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631380489|1709627779470; dtPC=-97$229489934_670h64vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/System/CommandHandler.aspx?command=UserLastRead.Set&nBookID=95827987&nPageNum=72&nOffset=2103&nSizeStep=6&sFitMode=default&_=1709629490119", {
  "headers": {
    "accept": "*/*",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-dtpc": "-97$229489934_670h65vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "x-requested-with": "XMLHttpRequest",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631380493|1709627779470; dtPC=-97$229489934_670h65vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=c3ed76a2-59e2-4edc-a3b7-1fa2c403f09f&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=e75299df-f1fe-4132-953c-9db3e0636d3d&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=94577129-1d68-4099-b7cf-4734eb6a2e48&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=963b6824-dd7a-4b8b-9310-fa252fba4cf0&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=53d6852a-12bb-44ad-b3e8-5de5127635bb&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=39b2fc29-03af-4798-b5e9-7627a3bd70dc&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=3d66efdf-e8f6-4e46-95e5-a7487d2389ca&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=6d56d208-d320-46df-aa4a-3d9a16b2579f&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=e899ef25-6187-46e0-8496-416108da3d1f&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=9eb00d5a-e6af-4a58-bfb8-9dde18502a9d&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=ec6709c0-d8a4-406b-be9c-a70cd203c397&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=thumbnail&nBookID=95827987", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=72116a33-0173-4f3b-94df-60887c45da79&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=cdf089ab-0b36-4780-997c-c248b2beac7f&nStep=7&nVersion=12", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=bd80db97-69f4-410f-b0cd-8b3d900b9ff3&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=9dbe903a-495e-4970-a6c5-6343bbfaba30&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=6209f448-1623-41db-93c0-92314fc52b64&nStep=7&nVersion=12", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=54ca5041-240a-4fe6-9d49-f56f51be4cc1&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=fc1807b5-9183-45b3-ac46-28dbdb8b6241&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=8678e797-dc99-49fe-8cb4-3e636c1880f7&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=eee83635-e187-49da-b93d-218072e85f35&nStep=7&nVersion=11", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=79ba1b94-bfbe-437b-baa2-6a43ffbf763e&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=9dcf4518-1571-412f-b7f3-01a6261b0bfe&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=f31beb8a-758a-416c-b07c-45c26cd0c8b9&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=d20388cf-720f-492d-a934-fdd4a6c29ca4&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=90a97831-c68d-47e6-85f4-4f493f198449&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=a85fcd09-131d-415b-ac10-6fd8dd4f6307&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=3e5e0aa8-dcb6-417a-9416-9411205c171d&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=043bf8c2-86be-4bab-85d9-071efc89ac0e&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=26501788-8fd1-446f-884a-c1b9b919cc0d&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=4c0ecf8b-a867-425e-86a3-f9f7d4d336f4&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=9478c94b-13d6-4919-aafa-8761b34ec488&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=49ab35a8-bfbb-41c7-a139-789e27e1f49e&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=134394b2-71fb-4c73-b70c-7f7ea7e725a0&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=e541b90f-5acd-41ea-b070-c79fbc45b24b&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=2cca3f5e-ddda-4bea-82af-8ed7467144e5&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=b03f80e1-eb84-4c26-803e-b0ddd648185f&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=2000575f-0b11-4491-9763-85a34f055e6d&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=804a7975-493a-4a3b-a943-5f797398b28a&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=thumbnail&nBookID=95827987", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=6996e60b-91ad-4203-b9d3-651e6b3a3e03&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=6996e60b-91ad-4203-b9d3-651e6b3a3e03&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=d16e7dc1-343e-47bd-aa16-94731412344d&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=d16e7dc1-343e-47bd-aa16-94731412344d&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "if-range": "Thu, 31 Dec 2009 22:00:00 GMT",
    "range": "bytes=81550-81550",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/System/CommandHandlerNoSession.aspx?command=Page.GetPageWords&nPageID=95828667", {
  "headers": {
    "accept": "*/*",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-dtpc": "-97$229489934_670h68vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "x-requested-with": "XMLHttpRequest",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631422896|1709627779470; dtPC=-97$229489934_670h68vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=391f599b-fc66-4096-8cdd-e7de5adfa4e0&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=112cd898-380f-4682-acc5-b9052287299c&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=fbe9cd50-7fd1-4cc6-a46c-8133cbde77a9&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=3b984704-619f-4d37-b0e9-9fe04fdd9a3b&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=thumbnail&nBookID=95827987", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=58ff3a7e-be9d-463f-9974-60718ca516d7&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=b06f4114-da66-4a41-84ad-a16dc0e37c5b&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=e8f77520-9eb7-4362-ba86-cfe9492c784a&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=a17948db-da7c-43bb-a518-4d4c83ddec64&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=79b5acda-af0a-4faa-9020-6f99122829b0&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=795d0365-e39e-4b11-b59b-12903a323313&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=0e446428-d378-45ab-af8c-9b7fb22d97c2&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=a1a29670-11ed-4832-b775-7393a335f2e9&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=520e508a-8b96-43b4-aa5e-54c60bf89348&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=91de746e-2fce-4755-94f7-c995a557785f&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=thumbnail&nBookID=95827987", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=39e7b778-fb35-4507-85c4-6f8fce32de5f&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=438f9bf5-9641-42fa-a9f7-4193f86ce841&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=8f69fed0-36d5-4f2f-bfff-6f50492c31b2&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=265c2a2c-341f-447e-8716-71c93c7f501f&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=61c7e0fe-67ad-4537-9404-d371a6f2ba1c&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=ba636e0a-6f73-473d-ae2a-386d8aa987f9&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=83fecd2e-9411-4b87-8fbb-906e108e8ab8&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=c0f7e660-97fe-41e3-b426-69c45296a63f&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=74a81404-7777-4662-b5ce-da1a7f9d0bfe&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=b422aafa-8cbb-40b9-9b2c-5fca2ed6dc12&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=66568ae8-8883-4411-97b1-a78551565b53&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=5a068a33-1cd2-4233-8aaf-6a081966b39e&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=3e5399da-7686-4167-a587-824914847894&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=d331c2bf-7f05-4819-b7cc-17e8bcb91596&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=12e9d203-bec2-4bf0-a8df-c49303861f34&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=74cdc2b4-3619-43dc-aa3c-d25f0a1869fa&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=thumbnail&nBookID=95827987", {
  "headers": {
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=de753854-4cb4-483a-b15d-fe71fbc08933&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=ec8d6c29-9b42-4540-a613-e73fb85b3d9f&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=5da4614b-4b99-4f56-a878-2996567cd31c&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=b9ae3b5c-c439-4ec5-9cde-735159085fec&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=b98561d0-400c-4155-82fa-7f68d25dce61&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=311dfc8d-5e6a-47ec-b0d0-5d4597ef55c5&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=f8fd2ce6-c444-4bc1-9c36-99a51c2254b3&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=d3bed8c0-d802-495e-85bd-a839c132eda0&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=c2ce901c-3e94-49aa-8dde-33248e1772e3&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=404452b6-d6df-4b4f-8420-5ad69c2e9d8f&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=ef038601-21a2-464a-a07e-f7e759ca254c&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://kotarimagesstg.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=0b818099-3be8-41ed-91ef-7aa1fb5d105c&nStep=7&nVersion=10", {
  "headers": {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "cookie": "_hjSessionUser_777542=eyJpZCI6IjU3MTQzMzViLTlmZWMtNWIzNS04MjdiLWM3NmFkOGZlOTNiZSIsImNyZWF0ZWQiOjE3MDcxMzQzNTg1MDgsImV4aXN0aW5nIjp0cnVlfQ==; ZNPCQ003-36313500=b17ffb4e",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/System/CommandHandlerNoSession.aspx?command=Page.GetPageWords&nPageID=95828932", {
  "headers": {
    "accept": "*/*",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-dtpc": "-97$229489934_670h72vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "x-requested-with": "XMLHttpRequest",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631466283|1709627779470; dtPC=-97$229489934_670h72vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/System/CommandHandlerNoSession.aspx?command=Page.GetPageWords&nPageID=95828936", {
  "headers": {
    "accept": "*/*",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-dtpc": "-97$229489934_670h73vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "x-requested-with": "XMLHttpRequest",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631466294|1709627779470; dtPC=-97$229489934_670h73vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/System/CommandHandler.aspx?command=Statistics.RegisterCurrentPageView&tmp=tmp&gSiteID=52f90c98-2f29-47f7-b547-70ba4492d9d2&SessionID=ttrnedo1cl2vsutncnazfo4p&gInstituteID=a6a98b02-af1c-4d96-817e-cc559763a387&nSchoolID=0&nPageID=95828936&bIsOpen=true&sCurrentBookUrl=https%253A%252F%252Fschool-kotar-cet-ac-il.eu1.proxy.openathens.net%252FKotarApp%252FViewer.aspx%253FnBookID%253D95827987%2523154.2069.6.default&_=1709629490120", {
  "headers": {
    "accept": "*/*",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-dtpc": "-97$229489934_670h74vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "x-dtreferer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "x-requested-with": "XMLHttpRequest",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631469580|1709627779470; dtPC=-97$229489934_670h74vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}); ;
fetch("https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/System/CommandHandler.aspx?command=UserLastRead.Set&nBookID=95827987&nPageNum=154&nOffset=2069&nSizeStep=6&sFitMode=default&_=1709629490121", {
  "headers": {
    "accept": "*/*",
    "accept-language": "he,en-US;q=0.9,en;q=0.8,es;q=0.7",
    "sec-ch-ua": "\\"Chromium\\";v=\\"122\\", \\"Not(A:Brand\\";v=\\"24\\", \\"Google Chrome\\";v=\\"122\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"Linux\\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-dtpc": "-97$229489934_670h75vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "x-dtreferer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "x-requested-with": "XMLHttpRequest",
    "cookie": "_gcl_au=1.1.1209071488.1707066084; _ga=GA1.1.715642467.1707066086; _cb=ZLjmMDqwxb2MeBt7; dtCookie=v_4_srv_-2D97_sn_RCUTECCER1LUJBO0G796JNEG6O1O4NQI; rxVisitor=1707302129389KIC224J8JRKUNML83URRKOCSV30H1G61; CET_WINDOW_HOSTNAME=school-kotar-cet-ac-il.eu1.proxy.openathens.net; _ga_V6JW03P6HP=GS1.1.1708802028.10.1.1708807150.60.0.0; _chartbeat2=.1707066088288.1708807151029.0010000110000001.zDFMkkry6yBOzPwvDRJlH8CNnduX.18; _ga_9NYDSKY226=GS1.1.1709625230.4.0.1709625237.0.0.0; oamps=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjpbIjNjODBlYjZjLTY3N2ItNDU1OS1hYzJkLWQyOWQ1ZjkxOGQ1NCJdLCJkIjoidGF1LmFjLmlsIiwiZSI6Imh0dHBzOi8vaWRwLnRhdS5hYy5pbC9lbnRpdHkiLCJvcmciOiI4MDE1MjgwMyIsImlkIjoiNTM1MGM0NWUtZmQ1My00YzdiLTljZjQtZmZhNWM1YWE0MzJlIiwiZXhwIjoxNzA5NjU0MDQ3LCJjcCI6ZmFsc2UsImNyIjpmYWxzZX0.ggcV8oTFhZeyw56cvif8NPLhL27yl8lGaO7SUTHvEYI; dtSa=-; rxvt=1709631469591|1709627779470; dtPC=-97$229489934_670h75vRPPPEICMCUHMUPUPMEOCPPRWCAUKRCUV-0e0",
    "Referer": "https://school-kotar-cet-ac-il.eu1.proxy.openathens.net/KotarApp/Viewer.aspx?nBookID=95827987",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
});`;
export const downloadsAccessUrl = `${urlPrefix}/DownloadsAccess`;
