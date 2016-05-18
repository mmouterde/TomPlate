# TomPlate

A extra-light template tool that allows function bindings :

~~~javascript
(function(){
 var HTMLString = "<a href='#' onclick='{HelloScopedFn()}' ondblclick='globalFn()'>link</a>";
 var handlers = {
                  HelloScopedFn: function(){
                              console.log("hello!");
                          }
                };
 var element = tomplate(HTMLString,handlers);
 })();
~~~
