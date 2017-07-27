/**
 * Created by sachin on 27/7/17.
 */
define(['books','_utils'], function (books,_utils) {


    var init = function () {

        inProcess = false;
        $(document).ready(function () {

            _utils._bindScroll(loadMoreBlocks,document.body);

        });
    };

    function loadMoreBlocks () {

        if (inProcess) {
            return false;
        }

        inProcess = true;

        var url = findNextUrl();
        url = _utils.requestHTML(_utils.fixUrl(url));

        if (!url) {
            return false;
        }

        /*      $.ajax({
         type: 'GET',
         url:  url,
         success: function (data) {
         mainContent.append(data);
         },
         beforeSend : function () {
         progress.show();
         },
         complete : function () {
         inProcess = false;
         progress.hide();
         },
         error: function (err) {
         console.log('Error while retrieving data!',err);
         }
         });
         // document.getElementById('video').src = url ;
         }
         */
        function findNextUrl() {

            // var url = $(".repeater-card:last").find(".repeat-next a").attr('href') || "";
            //return url;

        }

        return {
            init: init
        };
    }
});