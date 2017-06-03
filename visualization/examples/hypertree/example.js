var labelType, useGradients, nativeTextSupport, animate;

(function() {
  var ua = navigator.userAgent,
      iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
      typeOfCanvas = typeof HTMLCanvasElement,
      nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
      textSupport = nativeCanvasSupport 
        && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  //I'm setting this based on the fact that ExCanvas provides text support for IE
  //and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
  nativeTextSupport = labelType == 'Native';
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
})();

var Log = {
  elem: false,
  write: function(text){
    if (!this.elem) 
      this.elem = document.getElementById('log');
    this.elem.innerHTML = text;
    this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
  }
};


function init(){
    //init data
    var json = {
        "id": "0",
        "name": "Brasil",
        "children": [{
            "id": "0_1",
            "name": "Norte",
            "children": [
                {"id": "0_1_0", "name": "Rio Grande do Norte", data:{"region": "Norte" ,"size": 3474998, "rate": 48.6}},
                {"id": "0_1_1", "name": "Pará", data:{"region": "Norte" ,"size": 8272724, "rate": 45.8}},
                {"id": "0_1_2", "name": "Amapá", data:{"region": "Norte" ,"size": 782295, "rate": 40.6}},
                {"id": "0_1_3", "name": "Amazonas", data:{"region": "Norte" ,"size": 4001667, "rate": 37.1}},
                {"id": "0_1_4", "name": "Rondônia", data:{"region": "Norte" ,"size": 1787279, "rate": 31}},
                {"id": "0_1_5", "name": "Tocantins", data:{"region": "Norte" ,"size": 1523902, "rate": 25.7}},
                {"id": "0_1_6", "name": "Acre", data:{"region": "Norte" ,"size": 816687, "rate": 25.3}}
            ],
            data:{"region": "Brasil", "size": 17184554, rate: 34.25}
        },
        {
            "id": "0_2",
            "name": "Nordeste",
            "children": [
            {"id": "0_2_0", "name": "Sergipe", data:{"region": "Nordeste", "size": 2265779, "rate": 57.3}},
            {"id": "0_2_1", "name": "Alagoas", data:{"region": "Nordeste", "size": 3358963, "rate": 50.8}},
            {"id": "0_2_2", "name": "Rio Grande do Norte", data:{"region": "Nordeste", "size": 3474998, "rate": 48.6}},
            {"id": "0_2_3", "name": "Bahia", data:{"region": "Nordeste", "size": 15276566, "rate": 41.7}},
            {"id": "0_2_4", "name": "Pernambuco", data:{"region": "Nordeste", "size": 9410336, "rate": 41.6}},
            {"id": "0_2_5", "name": "Paraíba", data:{"region": "Nordeste", "size": 3999415, "rate": 37.8}},
            {"id": "0_2_6", "name": "Maranhão", data:{"region": "Nordeste", "size": 8272724, "rate": 33.8}},
            {"id": "0_2_7", "name": "Piauí", data:{"region": "Nordeste", "size": 3212180, "rate": 20.8}}
            ],
            data:{"region": "Brasil", "size": 49270961, rate: 41.55}
        },{
            "id":"0_3",
            "name": "Centro-Oeste",
            "children": [
            {"id": "0_3_0", "name": "Goias", data:{"region": "Centro-Oeste" ,"size": 6695855, "rate": 44.3}},
            {"id": "0_3_1", "name": "Mato Grosso", data:{"region": "Centro-Oeste" ,"size": 3305531, "rate": 41.3}},
            {"id": "0_3_2", "name": "Distrito Federal", data:{"region": "Centro-Oeste" ,"size": 2977216, "rate": 23.4}},
            {"id": "0_3_3", "name": "Mato Grosso do Sul", data:{"region": "Centro-Oeste" ,"size": 2682386, "rate": 22.6}}
            ],
            data:{"region": "Brasil", "size": 15660988, rate: 32.9}
        },{
            "id": "0_4",
            "name": "Suldeste",
            "children": [
            {"id": "0_4_0", "name": "Espirito Santo", data:{"region":"Suldeste", "size": 3973697, "rate": 37.4}},
            {"id": "0_4_1", "name": "Rio de Janeiro", data:{"region":"Suldeste", "size": 16690709, "rate": 30.3}},
            {"id": "0_4_2", "name": "Minas Gerais", data:{"region":"Suldeste", "size": 21024678, "rate": 20.8}},
            {"id": "0_4_3", "name": "São Paulo", data:{"region":"Suldeste", "size": 44846530, "rate": 11.7}}
            ],
            data:{"region": "Brasil", "size": 86535614, rate: 25.05}
        },{
            "id": "0_5",
            "name": "Sul",
            "children": [
            {"id": "0_5_0", "name": "Paraná", data:{"region": "Sul", "size": 11242720, "rate": 25.2}},
            {"id": "0_5_1", "name": "Rio Grande do Sul", data:{"region": "Sul", "size": 11286500, "rate": 24.7}},
            {"id": "0_5_2", "name": "Santa Catarina", data:{"region": "Sul", "size": 6910553, "rate": 14.3}},
            {"id": "0_5_3", "name": "Mato Grosso do Sul", data:{"region": "Sul", "size": 2682386, "rate": 22.6}}
            ],
            data:{"region": "Brasil", "size": 29439773, rate: 21.4}
        }],
        data:{"region": "", "size": 198091890, rate: 32.96}
    };
    //end
    var infovis = document.getElementById('infovis');
    var w = infovis.offsetWidth - 50, h = infovis.offsetHeight - 50;
    
    //init Hypertree
    var ht = new $jit.Hypertree({
      //id of the visualization container
      injectInto: 'infovis',
      //canvas width and height
      width: w,
      height: h,
      //Change node and edge styles such as
      //color, width and dimensions.
      Node: {
          dim: 9,
          color: "#f00"
      },
      Edge: {
          lineWidth: 2,
          color: "#088"
      },
      onBeforeCompute: function(node){
          Log.write("centering");
      },
      //Attach event handlers and add text to the
      //labels. This method is only triggered on label
      //creation
      onCreateLabel: function(domElement, node){
          domElement.innerHTML = node.name;
          $jit.util.addEvent(domElement, 'click', function () {
              ht.onClick(node.id, {
                  onComplete: function() {
                      ht.controller.onComplete();
                  }
              });
          });
      },
      //Change node styles when labels are placed
      //or moved.
      onPlaceLabel: function(domElement, node){
          var style = domElement.style;
          style.display = '';
          style.cursor = 'pointer';
          if (node._depth <= 1) {
              style.fontSize = "0.8em";
              style.color = "#eee";

          } else if(node._depth == 2){
              style.fontSize = "0.7em";
              style.color = "#aaa";

          } else {
              style.display = 'none';
          }

          var left = parseInt(style.left);
          var w = domElement.offsetWidth;
          style.left = (left - w / 2) + 'px';
      },
      
      onComplete: function(){
          Log.write("done");
          
          //Build the right column relations list.
          //This is done by collecting the information (stored in the data property) 
          //for all the nodes adjacent to the centered node.
          var node = ht.graph.getClosestNodeToOrigin("current");
          var html = "<h4>" + node.name + "</h4><b>Connections:</b>";
          html += "<ul>";
          node.eachAdjacency(function(adj){
              var child = adj.nodeTo;
              if (child.data) {
                  var population = (child.data.region == node.name) ? child.data.size : node.data.size;
                  var rate = (child.data.region == node.name) ? child.data.rate : node.data.rate;
                  html += "<li>" + child.name + " " + "<div class=\"relation\">(Population: " + population + " Homicide Rate: " + rate + ")</div></li>";
              }
          });
          html += "</ul>";
          $jit.id('inner-details').innerHTML = html;
      }
    });
    //load JSON data.
    ht.loadJSON(json);
    //compute positions and plot.
    ht.refresh();
    //end
    ht.controller.onComplete();
}
