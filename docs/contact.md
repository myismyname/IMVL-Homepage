# **Contact**

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="keywords" content="百度地图,百度地图API，百度地图自定义工具，百度地图所见即所得工具" />
    <meta name="description" content="百度地图API自定义地图，帮助用户在可视化操作下生成百度地图" />
    <title>百度地图API自定义地图</title>
    <!--引用百度地图API-->
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=tY3HOuLE9Y55M5D5HFXBV05QtUFBwYBE"></script>
  </head>
  
  <body>
    <!--百度地图容器-->
    <div style="width:700px;height:550px;border:#ccc solid 1px;font-size:12px" id="map"></div>
  </body>
  <script type="text/javascript">
    //创建和初始化地图函数：
    function initMap(){
      createMap();//创建地图
      setMapEvent();//设置地图事件
      addMapControl();//向地图添加控件
      addMapOverlay();//向地图添加覆盖物
    }
    function createMap(){ 
      map = new BMap.Map("map"); 
      map.centerAndZoom(new BMap.Point(121.671248,29.927316),17);
    }
    function setMapEvent(){
      map.enableScrollWheelZoom();
      map.enableKeyboard();
      map.enableDragging();
      map.enableDoubleClickZoom()
    }
    function addClickHandler(target,window){
      target.addEventListener("click",function(){
        target.openInfoWindow(window);
      });
    }
    function addMapOverlay(){
    }
    //向地图添加控件
    function addMapControl(){
      var scaleControl = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
      scaleControl.setUnit(BMAP_UNIT_IMPERIAL);
      map.addControl(scaleControl);
      var navControl = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
      map.addControl(navControl);
      var overviewControl = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:true});
      map.addControl(overviewControl);
    }
    var map;
      initMap();
  </script>
</html>

## **Prospective Members**


The Intelligent Media and Vision Laboratory (IMVL) is actively seeking self-motivated **PhD candidates (Spring & Fall 2026), research interns, and postdocs** from diverse background (CS/Robotics/EE/Math/Physics/BME/...) to join our team. If your research interests align with ours, we invite you to email us your CV/resume.

**PhD Opportunities**: we recruit students through several joint PhD programs between EIT and leading domestic/international universities including SJTU, PolyU and USTC. For more information, please visit the [EIT PhD Admissions](https://www.eitech.edu.cn/457/list.htm) page.  

## **Contact Us**

:fontawesome-solid-map-location: **Address**: No. 2911, Haijiang Avenue, Jiaochuan Subdistrict, Zhenhai District, Ningbo, Zhejiang, China

:fontawesome-solid-envelope: **E-mail**: wzeng-vp[at]eitech.edu.cn