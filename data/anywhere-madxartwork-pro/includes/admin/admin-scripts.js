jQuery(document).ready(function($){
    $("#butterbean-manager-ae_pro .butterbean-control").hide();
    initialLoad();

    activate_post_load();
    activate_term_load();
    activate_acf_repeater_fields_load();


    jQuery(document).on('change',
            '[name="butterbean_ae_pro_setting_ae_apply_global"], ' +
            '[name="butterbean_ae_pro_setting_ae_render_mode"], ' +
            '#butterbean-control-ae_hook_apply_on input, ' +
            '[name="butterbean_ae_pro_setting_ae_usage"]',
        function(){
            $("#butterbean-manager-ae_pro .butterbean-control").hide();
            initialLoad();

    });



    function activate_post_load(){
        jQuery('.ae_prev_post').aeselect2({
            ajax: {
                url: ajaxurl,
                dataType: 'json',
                data: function (params) {
                    render_mode = jQuery('[name="butterbean_ae_pro_setting_ae_render_mode"]').val();
                    if(render_mode != 'block_layout' && render_mode != 'acf_repeater_layout'){
                        post_type = jQuery('.ae-post-type').val();
                    }else{
                        post_type = 'any';
                    }

                    return {
                        q: params.term,
                        action: 'ae_prev_post',
                        post_type: post_type
                    }
                },
                processResults: function (res) {
                    return {
                        results: res.data
                    }
                }
            },
            minimumInputLength: 2
        });
    }

    function activate_term_load(){
        jQuery('.ae_prev_term').aeselect2({
            ajax: {
                url: ajaxurl,
                dataType: 'json',
                data: function (params) {
                    taxonomy = jQuery('.ae-taxonomy').val();
                    return {
                        q: params.term,
                        action: 'ae_prev_term',
                        taxonomy: taxonomy
                    }
                },
                processResults: function (res) {
                    return {
                        results: res.data
                    }
                }
            },
            minimumInputLength: 2
        });
    }

    function activate_acf_repeater_fields_load(){
        jQuery('.ae_prev_post').on('change',function () {
            id = jQuery(this).val();
            jQuery.ajax({
                url: ajaxurl,
                dataType: 'json',
                data: {
                    action: 'ae_acf_repeater_fields',
                    post_id: id,
                },
                success: function (res) {
                    jQuery(".ae_acf_repeater_name").find('option').remove().end();
                    if(res.data.length){
                        jQuery.each(res.data, function(i, d) {
                            jQuery(".ae_acf_repeater_name").append(jQuery("<option/>", {
                                value: d.id,
                                text: d.text
                            }));
                        });
                    }
                }
            });
        });
    }


    function initialLoad(){
        showfield('butterbean_ae_pro_setting_ae_render_mode');
        $('[href="#butterbean-ae_pro-section-rules"]').parent('li').hide();
        var render_mode = $('[name="butterbean_ae_pro_setting_ae_render_mode"]').val();
        switch(render_mode){
            case 'post_type_archive_template'   :    pt_archive();
                                                    break;

            case 'post_template'                :  post_template();
                                                   break;

            case 'archive_template'             : archive_template();
                                                  break;

            case 'block_layout'                 : block_layout();
                                                  break;

            case 'normal'                       :  normal();
                                                    break;

            case '404'                          : _404();
                                                  break;

            case 'search'                       : _search();
                                                  break;

            case 'author_template'               : _author();
                                                  break;

            case 'date_template'                : _date();
                                                    break;

            case 'acf_repeater_layout'          : acf_repeater_layout();
                                                  break;
        }
    }

    function showfield(field){
        $('[name="' + field +'"]').closest('.butterbean-control').show();
    }

    function _404(){
        showfield('butterbean_ae_pro_setting_ae_madxartwork_template');
    }

    function _search(){
        showfield('butterbean_ae_pro_setting_ae_madxartwork_template');
    }

    function archive_template(){
        //showfield('butterbean_ae_pro_setting_ae_preview_post_ID');
        showfield('butterbean_ae_pro_setting_ae_apply_global');
        $("#butterbean-control-ae_rule_taxonomy").show();
        showfield('butterbean_ae_pro_setting_ae_full_override');
        showfield('butterbean_ae_pro_setting_ae_madxartwork_template');
        showfield('butterbean_ae_pro_setting_ae_preview_term');

    }

    function block_layout(){
        showfield('butterbean_ae_pro_setting_ae_preview_post_ID');

    }

    function acf_repeater_layout(){
        showfield('butterbean_ae_pro_setting_ae_preview_post_ID');
        showfield('butterbean_ae_pro_setting_ae_acf_repeater_name');

    }

    function normal(){
        showfield('butterbean_ae_pro_setting_ae_usage');

        usage_area = $('[name="butterbean_ae_pro_setting_ae_usage"]').val();

        if(usage_area == 'custom'){
            $("#butterbean-control-ae_custom_usage_area").show();
        }

        if(usage_area != ''){
            $('[href="#butterbean-ae_pro-section-rules"]').parent('li').show();
            jQuery("#butterbean-control-ae_apply_global").show();
            auto_apply = $('[name="butterbean_ae_pro_setting_ae_apply_global"]').is(":checked");

            if(!auto_apply){
                // auto apply not set.. reveal advanced rules
                $("#butterbean-control-ae_hook_apply_on").show();
                console.log("page type reveal");
                page_types = $("#butterbean-control-ae_hook_apply_on input:checked").map(function () {return this.value;}).get();

                // show post options in case of single post
                console.log(page_types);
                console.log('index of ' + page_types.indexOf('single'));
                if(page_types.indexOf('single') >= 0){
                    jQuery("#butterbean-control-ae_hook_post_types").show();
                    jQuery("#butterbean-control-ae_hook_posts_selected").show();
                    jQuery("#butterbean-control-ae_hook_posts_excluded").show();
                }

                if(page_types.indexOf('archive') >= 0){
                    jQuery("#butterbean-control-ae_hook_taxonomies").show();
                    jQuery("#butterbean-control-ae_hook_terms_selected").show();
                    jQuery("#butterbean-control-ae_hook_terms_excluded").show();
                }
            }



        }
    }

    function post_template(){
        showfield('butterbean_ae_pro_setting_ae_preview_post_ID');
        showfield('butterbean_ae_pro_setting_ae_apply_global');
        showfield('butterbean_ae_pro_setting_ae_rule_post_type');
        showfield('butterbean_ae_pro_setting_ae_madxartwork_template');
    }

    function pt_archive(){
        showfield('butterbean_ae_pro_setting_ae_preview_post_ID');
        showfield('butterbean_ae_pro_setting_ae_rule_post_type_archive');
        showfield('butterbean_ae_pro_setting_ae_full_override');
        showfield('butterbean_ae_pro_setting_ae_madxartwork_template');
    }

    function _author() {
        showfield('butterbean_ae_pro_setting_ae_apply_global');
        showfield('butterbean_ae_pro_setting_ae_madxartwork_template');
        showfield('butterbean_ae_pro_setting_ae_preview_author');
    }

    function _date() {
        //showfield('butterbean_ae_pro_setting_ae_apply_global');
        showfield('butterbean_ae_pro_setting_ae_madxartwork_template');
    }

});

