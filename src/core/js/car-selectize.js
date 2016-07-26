(function($) {
    var defaults = {
        data: [],
        type: 'json',
        placeholder: ['brand', 'series', 'model'],
        required: true
    };
    var pinyin = new Pinyin(true, 'default');

    $.fn.carselect = function(options) {
        var ParentWidth = $(this).get(0).getBoundingClientRect().width;




        return this.each(function() {

            options = $.extend({}, defaults, options);

            var $box_obj = $(this);
            var $select = $box_obj.find('select');

            var car_brand = $select && $select[0];
            var car_series = $select && $select[1];
            var car_model = $select && $select[2];

            if (car_brand && car_series && car_model) {
                var selected = {
                    car_brand: null,
                    car_series: null,
                    car_model: null
                };
                var $brand = $(car_brand).selectize({
                    valueField: 'id',
                    searchField: ['title', 'py', 'pyf'],
                    labelField: 'title',
                    placeholder: options.placeholder[0],
                    selectOnTab: true,
                    create: false,
                    optgroupField: 'tag',
                    render: {
                        item: function(item, escape) {
                            return '<div>' +
                                (item.logo ? '<img class="selectize-img" src=' + escape(item.logo) + '>' + '</span>' : '') +
                                (item.title ? '<span>' + escape(item.title) + '</span>' : '') +
                                '</div>';
                        },
                        option: function(item, escape) {
                            return '<div class="col-medio-width">' +
                                (item.logo ? '<img class="selectize-img" src="' + escape(item.logo) + '" >' + '</span>' : '') +
                                (item.title ? '<span>' + escape(item.title) + '</span>' : '') +
                                '</div>';
                        },
                        optgroup_header: function(data, escape) {
                            return '<div class=" optgroup_header">' + escape(data.label) + '系</div>';
                        }
                    },
                    onChange: function(value) {

                        if (value) {
                            $series.clearOptions();
                            $model.clearOptions();
                            seriesStart(value);
                        }
                    }

                })[0].selectize;

                var $series = $(car_series).selectize({
                    valueField: 'id',
                    searchField: ['py', 'pyf', 'title'],
                    labelField: 'title',
                    placeholder: options.placeholder[1],
                    selectOnTab: true,
                    create: false,
                    render: {
                        item: function(item, escape) {
                            return '<div>' +
                                (item.title ? '<span class="f-ib">' + escape(item.title) + '</span>' : '') +
                                '</div>';
                        },
                        option: function(item, escape) {
                            return '<div>' +
                                (item.title ? '<span class="col-medio-width f-ib">' + escape(item.title) + '</span>' : '') +
                                '</div>';
                        },
                    },
                    onChange: function(value) {

                        if (value) {
                            $model.clearOptions();
                            modelStart(value);
                        }
                    }

                })[0].selectize;

                var $model = $(car_model).selectize({
                    valueField: 'id',
                    searchField: ['py', 'pyf', 'title'],
                    labelField: 'title',
                    placeholder: options.placeholder[2],
                    selectOnTab: true,
                    create: false,
                    render: {
                        item: function(item, escape) {
                            return '<div>' +
                                (item.title ? '<span >' + escape(item.title) + '</span>' : '') +
                                '</div>';
                        },
                        option: function(item, escape) {
                            return '<div>' +
                                (item.title ? '<span class="col-medio-width f-ib">' + escape(item.title) + '</span>' : '') +
                                '</div>';
                        },
                        optgroup_header: function(data, escape) {
                            return '<div class="optgroup-header">这是' + escape(data.label) + '&nbsp;tag<span class="scientific">' + escape(data.label_scientific) + '</span></div>';
                        }
                    },
                    onChange: function(value) {

                        if (value) {
                            seriesStart(value);
                        }
                    }

                })[0].selectize;

                var brandStart = function(value) {
                    var params = {
                        params: {
                            timetag: value
                        }
                    }
                    $.ajax({
                        url: 'http://dev.xiaomadada.com/paacitic-js/rest/api/system/brand/get',
                        data: JSON.stringify(params),
                        type: 'POST',
                        async: false,
                        contentType: 'json',
                        success: function(respData, status) {
                            if (respData && respData.rc === 0) {
                                if (!car_brand) {
                                    return
                                }
                                selected.car_brand = null;
                                var group_temp = null;
                                $.each(respData.brands, function(key, value) {
                                    var temp_py = pinyin.getCamelChars(value.name);
                                    var temp_pyf = pinyin.getFullChars(value.name);
                                    $brand.addOption({
                                        id: value.bid,
                                        logo: value.logo,
                                        title: value.name,
                                        tag: value.tag,
                                        py: temp_py,
                                        pyf: temp_pyf
                                    })
                                    if (value.tag !== group_temp) {
                                        $brand.addOptionGroup(value.tag, { label: value.tag });
                                    }
                                })



                            } else {
                                console.log('brand获取无效');
                            }
                        },
                        error: function(xhr, status, errorThrown) {
                            console.log('error');
                        },
                        complete: function(xhr, status) {
                            if (status === 'timeout') {
                                console.log('timeout');
                            }
                        }
                    });
                };
                var seriesStart = function(value) {
                    var params = {
                        params: {
                            bid: value
                        }
                    }
                    $.ajax({
                        url: 'http://dev.xiaomadada.com/paacitic-js/rest/api/system/series/get',
                        data: JSON.stringify(params),
                        type: 'POST',
                        async: false,
                        contentType: 'json',
                        success: function(respData, status) {
                            if (respData && respData.rc === 0) {
                                if (!car_brand) {
                                    console.log('err1')
                                    return
                                }
                                selected.car_series = null;
                                $.each(respData.series, function(key, value) {
                                    var temp_py = pinyin.getCamelChars(value.name);
                                    var temp_pyf = pinyin.getFullChars(value.name);
                                    $series.addOption({
                                        id: value.sid,
                                        title: value.name,
                                        py: temp_py,
                                        pyf: temp_pyf
                                    })
                                })


                            } else {
                                console.log('series');
                            }
                        },
                        error: function(xhr, status, errorThrown) {
                            console.log('error');
                        },
                        complete: function(xhr, status) {
                            if (status === 'timeout') {
                                console.log('timeout');
                            }
                        }
                    });
                };
                var modelStart = function(value) {
                    var params = {
                        params: {
                            sid: value
                        }
                    }
                    $.ajax({
                        url: 'http://dev.xiaomadada.com/paacitic-js/rest/api/system/model/get',
                        data: JSON.stringify(params),
                        type: 'POST',
                        async: false,
                        contentType: 'json',
                        success: function(respData, status) {
                            if (respData && respData.rc === 0) {
                                if (!car_brand) {
                                    return
                                }
                                selected.car_model = null;
                                $.each(respData.models, function(key, value) {
                                    var temp_py = pinyin.getCamelChars(value.name);
                                    var temp_pyf = pinyin.getFullChars(value.name);
                                    $model.addOption({
                                        price: value.price,
                                        id: value.mid,
                                        title: value.name,
                                        py: temp_py,
                                        pyf: temp_pyf
                                    })
                                })


                            } else {
                                console.log('series');
                            }
                        },
                        error: function(xhr, status, errorThrown) {
                            console.log('error');
                        },
                        complete: function(xhr, status) {
                            if (status === 'timeout') {
                                console.log('timeout');
                            }
                        }
                    });
                };
                brandStart(0);

            }
        })
    }

})(jQuery);
