function VWOMixpanelPlugin(mixpanel){
    window.VWO = window.VWO || [];
    window.VWO.push([
        "onVariationApplied", function(data) {
            if (!data) 
                return;
            const expId = data[1];
            const variationId = data[2];
            const eventProperties = {};
            if (expId && variationId &&
                ["VISUAL_AB", "VISUAL", "SPLIT_URL"].indexOf(window._vwo_exp[expId].type) > -1
            ) {
                if (mixpanel) {
                    eventProperties["VWO-Test-ID-" + expId] = window._vwo_exp[expId].comb_n[variationId];
                    const eventName = "VWO";
                    mixpanel.track(eventName, eventProperties);
                } else {
                    console.warn("VWO Mixpanel Plugin Log - mixpanel is not defined")
                }
            }
        },
    ])
}

module.exports = VWOMixpanelPlugin