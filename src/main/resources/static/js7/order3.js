    $(function(){
        window.addEventListener("DOMContentLoaded", function() {
            var now = new Date();
            var hours = now.getHours();
            var minutes = now.getMinutes();
            var nowArr = [now.getFullYear(), now.getMonth() + 1, now.getDate()];
            $("#dpd1").each(function(k, v) {
                var ndate = $(v).datepicker({
                    format: "yyyy-mm-dd",
                    onRender: function(date) {
                        var t1 = new Date(date.valueOf() + 1);
                        var t2 = new Date(now.valueOf() + 1);

                        t1 = t1.getFullYear() + "-" + (t1.getMonth() + 1) + "-" + t1.getDate();
                        t2 = t2.getFullYear() + "-" + (t2.getMonth() + 2) + "-" + t2.getDate();
                        return (t1 != t2 && (date.valueOf() < now.valueOf())) ? 'disabled' : '';
                    }
                }).on("changeDate", function(date) {
                    if ('days' == date.viewMode) {
                        ndate.datepicker('hide');
                    }
                });
            });
        }, false);

        var carType1=localStorage.getItem("carType1");
        var carType2=localStorage.getItem("carType2");
        var carType3=localStorage.getItem("carType3");
        $("#order3Car").html(carType1+"-"+carType2+"-"+carType3);
    })
