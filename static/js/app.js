 $(function () {
     $("#shares").click(function () {

         var mainLink = $("#url").val();

         if (mainLink.indexOf("://") == -1) {

                 $(".md-trigger" ).trigger( "click" );
         }


         //=================


         (function () {
             window.VK = {
                 Share: {
                     queue: [],
                     push: function (url, defer) {
                         VK.Share.queue.push({url: url, defer: defer})
                         VK.Share.request()
                     },
                     request: function () {
                         if (VK.Share.progress) {
                             return
                         }

                         var job = VK.Share.queue.shift()

                         if (!job) {
                             return
                         }

                         VK.Share.progress = true

                         VK.Share.count = VK.Share._count.bind(this, job.defer)

                         $.getScript('https://vk.com/share.php?act=count&index=1&url=' + encodeURI(job.url), function () {})
                     },
                     _count: function (defer, i, count) {
                         defer && defer.resolve && defer.resolve(count)

                         VK.Share.progress = false
                         VK.Share.request()
                     }
                 }
             }

             function numbers(page_url) {
                 var resp = {
                     vk: $.Deferred(),
                     twitter: $.Deferred(),
                     fb: $.Deferred()
                 }

                 VK.Share.push(page_url, resp.vk)

                 $.getJSON('https://graph.facebook.com/?access_token=171397342909894|trYhYsG3AqBzoxOLmdIMa3xTmTo&id=' + encodeURI(page_url), function (response) {
                     resp.fb.resolve(response && response.share.share_count || 0)
                 });

                 $.getJSON('https://opensharecount.com/count.json?url=' + encodeURI(page_url), function (response) {
                     resp.twitter.resolve(response && response.count || 0)
                 });

                 return resp
             };



             var resp = numbers(mainLink)
             console.log(resp)

             $.when(resp.vk, resp.fb, resp.twitter).done(function (vkCount, fbCount, twCount) {


                 $(".row").addClass("valign-topper");
                 $(".counters").addClass("counters-topper");

                 $('#datafb').animateNumber({number: fbCount});
                 $('#datavk').animateNumber({number: vkCount});
                 $('#datatw').animateNumber({number: twCount});
                 $('#dataall').animateNumber({number: fbCount+vkCount+twCount});


                 $("#linkfb").attr("href", "https://www.facebook.com/search/str/"+encodeURIComponent(mainLink)+"/keywords_top");
                 $("#linkvk").attr("href", "https://vk.com/search?c%5Bq%5D="+encodeURIComponent(mainLink)+"&c%5Bsection%5D=auto");
                 $("#linktw").attr("href", "https://twitter.com/search?q="+encodeURIComponent(mainLink.substring(mainLink.indexOf("//")+2))+"&src=typd");

                 //console.log(
                 //    {
                 //        vk: vkCount,
                 //        fb: fbCount,
                 //        tw: twCount
                 //    }
                 //)
             })

         })();

         //=================













     });


 });

