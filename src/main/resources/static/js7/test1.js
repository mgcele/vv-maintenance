    $(function() {
        $("select[name=brand]").change(function() {
            var bid = $(this).val();

            if(bid == "其他") {
                var html = '<option value="0">款式</option>';
                html += '<option value="其他" selected>其他</option>';
                $("#sub_brand").html(html);
                var html2 = '<option value="0">款式</option>';
                html += '<option value="其他" selected>其他</option>';
                $("#cc").html(html);
                return false;
            }


            $.get("/user/carModel/id=0",
                function(data) {

                    if(data.status == 1) {
                        html = '<option value="0">车型</option>';
                        list = data.list;
                        for(var i = 0; i < list.length; i++) {
                            html += '<option value="' + list[i].id + '">' + list[i].title + '</option>';
                        }
                        $("#sub_brand").html(html);
                    }
                }, "json");

        });

        $("select[name=sub_brand]").change(function() {
            var bid = $(this).val();
            $.get("carSerials.json",
                function(data) {
                    if(data.status == 1) {
                        html = '<option value="0">款式</option>';
                        list = data.list;
                        for(var i = 0; i < list.length; i++) {
                            html += '<option value="' + list[i].id + '">' + list[i].title + '</option>';
                        }
                        $("#cc").html(html);
                    }
                }, "json");
        });

        $("select[name=cc]").change(function() {
            var id = $(this).val();
            if(id * 1 > 0) {
                $("#abc").removeClass("disbtn");
                $("#abc").addClass("btn");
            } else {
                $("#abc").removeClass("btn");
                $("#abc").addClass("disbtn");
            }
        });
    });

function order() {

    var bid = ($("#brand").find("option:selected"));
    var sid = ($("#sub_brand").find("option:selected"));
    var tid = ($("#cc").find("option:selected"));

    if(bid.val() == "其他") {
        var temp1 = "mobile.php?act=module&do=step&name=wecarservice&weid=3&from_user=&bid=" + bid.val();
        var dirname1 = $("#url").attr('url');
        var url1 = "http://" + window.location.host + "/" + dirname1 + "/" + temp1;
        window.location.href = url1;
        return false;

    }
    if(bid.val() == 0 || bid.val() == '') {
        alert("请选择车型");
        bid.focus();
        return false;
    }
    if(sid.val() == 0 || sid.val() == '') {
        alert("请选择款式");
        bid.focus();
        return false;
    }
    if(tid.val() == 0 || tid.val() == '') {
        alert("请选择车系");
        bid.focus();
        return false;
    }
    /*var temp = "mobile.php?act=module&do=order&name=wecarservice&weid=3&from_user=&brand=" + bid.val() + "&seris=" + sid.val() + "&tid=" + tid.val();
     var dirname = $("#url").attr('url');
     var url = "http://" + window.location.host + "/" + dirname + "/" + temp;*/
    localStorage.setItem("carType1",bid.text());
    localStorage.setItem("carType2",sid.text());
    localStorage.setItem("carType3",tid.text().split(" ")[0]);
    window.location.href = "order2.html";
}