$(function () {
        System.Declare("com.ykx.common");

        var Area = React.createClass({displayName: "Area",
                render             : function () {
                        var areas = this.state.areas;

                        var lis       = [];
                        var me        = this;
                        var curAreaId = this.state.curAreaId;
                        var curArea   = null;

                        areas.map(function (item, index) {
                                var ele           = React.createElement("li", {key: index}, item.name);
                                ele.props.onClick = me.onSelectArea.bind(me, item);
                                if (item.id == curAreaId) {
                                        curArea             = item;
                                        ele.props.className = "selected";
                                } else {
                                        ele.props.className = "";
                                }
                                lis.push(ele);
                        });
                        if (curArea == null && areas.length > 0) {
                                curArea = areas[0].parent;
                        }

                        var _titles = [];
                        while (curArea) {
                                _titles.push(React.createElement("span", {onClick: this.onClickTitle.bind(this, curArea)},
                                        curArea.name
                                ));
                                curArea = curArea.parent;
                        }
                        if (_titles.length > 1) {
                                _titles = _titles.reverse();
                        }
                        if (_titles.length < 3) {
                                _titles.push(React.createElement("span", null, "请选择"));
                        }
                        _titles[_titles.length - 1].props.className = "selected";

                        // 遮罩层?
                        var loadingLayer = null;
                        var showStyle    = {display: 'none'};
                        if (this.state.loading) {
                                loadingLayer      = React.createElement("div", {className: "full-cover"});
                                showStyle.display = 'block';
                        }

                        return (React.createElement("div", null, 
                                loadingLayer, 
                                React.createElement("div", {className: "areaSelector", style: showStyle}, 
                                        React.createElement("div", {className: "top"}, 
                                                React.createElement("span", null, "选择地区"), 
                                                React.createElement("span", {className: "close", onClick: this.close}, "X")
                                        ), 
                                        React.createElement("div", {className: "title flex"}, _titles), 
                                        React.createElement("ul", null, lis)
                                )
                        ));
                },
                loadData           : function (parentId) {
                        if (!$.isNumeric(parentId) || parentId < 0) {
                                return;
                        }

                        $.getJSON("/setting/getAreas/" + parentId, function (resp) {
                                if (resp.type != 'info') {
                                        alert(resp.message);
                                } else {
                                        this.setState({areas: resp.data})
                                }
                        }.bind(this));
                },
                onClickTitle       : function (item) {
                        this.onSelectArea(item.parent);
                },
                onSelectArea       : function (item) {
                        if (!item) {
                                this.setState({curAreaId: 0});
                                return;
                        }
                        this.setState({curAreaId: item.id});

                        if (item.level == 3) {
                                if (this.props.onSelectedArea) {
                                        this.props.onSelectedArea.call(null, item);
                                }
                                this.close();
                        }
                },
                cancel             : function () {
                        this.close();
                },
                close              : function () {
                        this.setState({areas: [], curAreaId: null, loading: false});
                        $(this.getDOMNode()).hide();
                },
                show               : function (initAreaId) {
                        this.setState({curAreaId: initAreaId || 0, loading: true});
                        $(this.getDOMNode()).show();
                },
                getInitialState    : function () {
                        return {areas: [], curAreaId: null, loading: false};
                },
                componentWillUpdate: function (nextProps, nextState) {
                        // 改变地区
                        if (nextState.curAreaId != null && nextState.curAreaId != this.state.curAreaId) {
                                this.loadData(nextState.curAreaId);
                        }
                }
        });

        com.ykx.common.Area                = function (option) {
                var opt       = option || {};
                var container = opt.container;
                if (!container) {
                        container = document.createElement("div");
                        document.body.appendChild(container);
                }

                this.container      = container;
                this.onSelectedArea = opt.onSelectedArea;
                var initArea        = opt.initAreaId || 0;

                this.ctrl = React.render(React.createElement(Area, {initArea: initArea, onSelectedArea: this.onSelectedArea}), container);
        };
        com.ykx.common.Area.prototype.show = function (areaId) {
                this.ctrl.show(areaId);
        };

});
