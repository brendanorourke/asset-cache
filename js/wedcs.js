// Function to retrieve Optimizely experiment/variation information and pass it to WEDCS as a custom event
getOptimizelyExperiments = function(projectName) {
  if (typeof optimizely != "undefined") {
    var cot = "11";
    var opt_sta = "Staging";
    var queryParams = window.location.search;
    if (!queryParams.match("optimizely_x") && !window.location.hostname.match("ppe")) {
      opt_sta = "Active";
    };
    if (typeof projectName == "undefined") {
      projectName = optimizely.getProjectId().toString();
    }
    var OptDataArray = ["wcs.cot", cot, "ms.opt_sta", opt_sta, "ms.expe", "opt", "ms.opt_pnm", projectName];
    var opt_tid = "";
    var opt_eid = "";
    // Variables to store test and variation names
    var opt_tnm = "";
    var opt_vnm = "";
    //pull the active experiment(s) and associate them with the experiment variation(s)
    var OptActiveTestArray = optimizely.activeExperiments;
    count = 0;
    for (key in OptActiveTestArray) {
      if (OptActiveTestArray.hasOwnProperty(key)) {
        count++;
        opt_tid = opt_tid + ";" + OptActiveTestArray[key];
        opt_eid = opt_eid + ";" + optimizely.variationIdsMap[OptActiveTestArray[key]];
        opt_tnm = opt_tnm + ";" + optimizely.allExperiments[OptActiveTestArray[key]].name;
        opt_vnm = opt_vnm + ";" + optimizely.variationNamesMap[OptActiveTestArray[key]];
      }
    }
    opt_tid = opt_tid.substring(1);
    opt_eid = opt_eid.substring(1);
    opt_tnm = opt_tnm.substring(1);
    opt_vnm = opt_vnm.substring(1);
    OptDataArray.push("ms.opt_tid", opt_tid, "ms.opt_eid", opt_eid, "ms.opt_tnm", opt_tnm, "ms.opt_vnm", opt_vnm);
    console.log(OptDataArray);
    if (count !== 0) {
      if (typeof MscomCustomEvent === "function") {
        MscomCustomEvent.apply(null, OptDataArray);
        //console.log(OptDataArray);
      }
    }
  } else {
    return;
  }
}
//--------------------------------------
