// This is an example code block to place in Project JavaScript
// It will load the wedcs js file and call ```getOptimizelyExperiments()```

 var loadScript = function(location, callback){
   var fileRef = document.createElement('script');
   fileRef.setAttribute('type','text/javascript');

   if (callback) {
     if (fileRef.readyState) {  // IE
       fileRef.onreadystatechange = function() {
         if (fileRef.readyState == 'loaded' || fileRef.readyState == 'complete') {
           fileRef.onreadystatechange = null;
           callback();
         }
       };
     } else {  // Non-IE
       fileRef.onload = function(){
         callback();
       };
     }
   }

   fileRef.setAttribute('src', location);
   document.head.appendChild(fileRef);
 };

 loadScript("https://raw.githubusercontent.com/optimizely/sales-engineering-custom-code/master/analytics/MSFT/WEDCS/wedcs.js?token=AG-M-hMybnlMNXXecWI-aJHe7frP4B5kks5XWfoFwA%3D%3D", function() {
   getOptimizelyExperiments("My Project - Whelan");
 });
