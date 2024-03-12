function VWOMixpanelPlugin(mixpanel){
    window.VWO = window.VWO || [];
    var _vis_data = {};
    
    window.VWO.push([
        "onVariationApplied", function(data) {
            if (!data) 
                return;
            var expId = data[1];
            var variationId = data[2];
            if (expId && variationId &&
                ["VISUAL_AB", "VISUAL", "SPLIT_URL"].indexOf(window._vwo_exp[expId].type) > -1
            ) {
                if (mixpanel) {
                    _vis_data["VWO-Test-ID-" + expId] = window._vwo_exp[expId].comb_n[variationId];
                    _vis_data["experiments"] = _vis_data["experiments"] || [];
                    _vis_data["experiments"].push({"eN": window._vwo_exp[expId].name, "vN": window._vwo_exp[expId].comb_n[variationId]});

                    mixpanel.track("VWO", _vis_data);
                    for (var i = 0; i < _vis_data["experiments"].length; i++) {
                        var experiment = _vis_data["experiments"][i];
                        mixpanel.track("Experiment Started", {"Experiment name": experiment.eN, "Variant name": experiment.vN});
                    }

                    mixpanel.people.set({
                        $vwo_user_id: window.VWO.data.vin.uuid
                    });
                } else {
                    console.warn("VWO Mixpanel Plugin Log - mixpanel is not defined")
                }
            }
        },
    ])
}

module.exports = VWOMixpanelPlugin