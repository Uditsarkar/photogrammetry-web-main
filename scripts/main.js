function init() {
    const menuBtns = document.querySelectorAll(".main-menu");
    menuBtns.forEach(function(btn){
        btn.addEventListener("click", function(){
            var btnId = btn.id;
            var pageId;
            switch (btnId) {
                case "home":
                    pageId = "first-page";
                    break;
                case "intro":
                    pageId = "intro-page";
                    break;
                case "web-arch":
                    pageId = "web-arch-page";
                    break;
                case "tools":
                    pageId = "tools-page";
                    break;
                case "workflow":
                    pageId = "flowchart-page";
                    break;
                case "map":
                    pageId = "map-page";
                    break;
                case "aboutus":
                    pageId = "aboutus-page";
                    break;
            }

            var current = document.querySelector(".active");
            // let s make sure there is a current active class
            // before trying to remove it from DOM
            if (current) {
              // then use classList to add/remove class names
              current.classList.remove('active');
            }
            this.classList.add('active');
            var element = document.getElementById(pageId);
            element.scrollIntoView({
                behavior: "smooth"
            });
        })
    });

    /* Compare map */
    /* map1 */
    osmLayer = new ol.layer.Tile({
        source: new ol.source.OSM(),
        title: 'OSM'
    });
    const enschedeCoord = [6.89583, 52.21833]; /*[lon, lat] format -> x=lon, y=lat*/
    let newCoord = new ol.proj.transform(enschedeCoord, 'EPSG:4326', 'EPSG:3857');
    var lgnSource = new ol.source.ImageWMS({
        url: 'https://gisedu.itc.utwente.nl/cgi-bin/mapserv.exe?map=d:/iishome/student/s3234223/project/config/configWMS.map&',
        params: {'LAYERS': 'lgn2018_raster'},
        ratio: 1,
        projection: 'EPSG:3857'
    });
    var svmSource = new ol.source.ImageWMS({
        url: 'https://gisedu.itc.utwente.nl/cgi-bin/mapserv.exe?map=d:/iishome/student/s3234223/project/config/configWMS.map&',
        params: {'LAYERS': 'svm_raster'},
        ratio: 1,
        projection: 'EPSG:3857'
    });
    var mlcSource = new ol.source.ImageWMS({
        url: 'https://gisedu.itc.utwente.nl/cgi-bin/mapserv.exe?map=d:/iishome/student/s3234223/project/config/configWMS.map&',
        params: {'LAYERS': 'mlc_raster'},
        ratio: 1,
        projection: 'EPSG:3857'
    });
    var originalSource = new ol.source.ImageWMS({
        url: 'https://gisedu.itc.utwente.nl/cgi-bin/mapserv.exe?map=d:/iishome/student/s3234223/project/config/configWMS.map&',
        params: {'LAYERS': 'original_raster'},
        ratio: 1,
        projection: 'EPSG:3857'
    });
    var lgnPhoto = new ol.layer.Image({
        source: lgnSource,
        title: 'LGN 2018 classification'
    });
    var svmPhoto = new ol.layer.Image({
        source: svmSource,
        title: 'SVM classification'
    });
    var mlcPhoto = new ol.layer.Image({
        source: mlcSource,
        title: 'MLC classification'
    });
    var originalPhoto = new ol.layer.Image({
        source: originalSource,
        title: 'Original ortho photo'
    });
    // const graphicUrl = wmsSource.getLegendUrl(resolution);
    // const img = document.getElementById('legend');
    // img.src = graphicUrl;
    const mapView = new ol.View({
        center: newCoord,
        zoom: 14,
    });
    
    const map1 = new ol.Map({
        target: 'map1',
        layers: [osmLayer, originalPhoto, lgnPhoto],
        view: mapView,
    });
    const map2 = new ol.Map({
        target: 'map2',
        layers: [osmLayer, mlcPhoto, svmPhoto],
        view: mapView,
    });

    var layerSwitcher1 = new ol.control.LayerSwitcher();
    layerSwitcher1.useLegendGraphics = true;
    map1.addControl(layerSwitcher1);
    var layerSwitcher2 = new ol.control.LayerSwitcher();
    layerSwitcher2.useLegendGraphics = true;
    map2.addControl(layerSwitcher2);

    // Define a new legend
    var lgnLegend = new ol.legend.Legend({ 
        title: 'Legend',
        margin: 3,
        maxWidth: 200
    });
    var svmLegend = new ol.legend.Legend({ 
        title: 'Legend',
        margin: 3,
        maxWidth: 200
    });
    var mlcLegend = new ol.legend.Legend({ 
        title: 'Legend',
        margin: 3,
        maxWidth: 200
    });

    var lgnLegendCtrl = new ol.control.Legend({
        legend: lgnLegend,
        collapsed: false
    });
    var svmLegendCtrl = new ol.control.Legend({
        legend: svmLegend,
        collapsed: false
    });
    var mlcLegendCtrl = new ol.control.Legend({
        legend: mlcLegend,
        collapsed: false
    });

    map1.addControl(lgnLegendCtrl);
    map2.addControl(svmLegendCtrl);
    map2.addControl(mlcLegendCtrl);

    // New legend associated with a layer
    var lgnLayerLegend = new ol.legend.Legend({
        layer: lgnPhoto 
    });
    var svmLayerLegend = new ol.legend.Legend({
        layer: svmPhoto 
    });
    var mlcLayerLegend = new ol.legend.Legend({
        layer: mlcPhoto 
    });
    lgnLayerLegend.addItem(new ol.legend.Image({
        title: 'Land cover classification',
        src: 'https://gisedu.itc.utwente.nl/cgi-bin/mapserv.exe?map=d:/iishome/student/s3234223/project/config/configWMS.map&SERVICE=WMS&VERSION=1.3.0&SLD_VERSION=1.1.0&REQUEST=GetLegendGraphic&WIDTH=100&HEIGHT=100&FORMAT=image/png&LAYER=lgn2018_raster'
    }));
    svmLayerLegend.addItem(new ol.legend.Image({
        title: 'Land cover classification',
        src: 'https://gisedu.itc.utwente.nl/cgi-bin/mapserv.exe?map=d:/iishome/student/s3234223/project/config/configWMS.map&SERVICE=WMS&VERSION=1.3.0&SLD_VERSION=1.1.0&REQUEST=GetLegendGraphic&WIDTH=100&HEIGHT=100&FORMAT=image/png&LAYER=svm_raster'
    }));
    mlcLayerLegend.addItem(new ol.legend.Image({
        title: 'Land cover classification',
        src: 'https://gisedu.itc.utwente.nl/cgi-bin/mapserv.exe?map=d:/iishome/student/s3234223/project/config/configWMS.map&SERVICE=WMS&VERSION=1.3.0&SLD_VERSION=1.1.0&REQUEST=GetLegendGraphic&WIDTH=100&HEIGHT=100&FORMAT=image/png&LAYER=mlc_raster'
    }));
    lgnLegend.addItem(lgnLayerLegend);
    svmLegend.addItem(svmLayerLegend);
    mlcLegend.addItem(mlcLayerLegend);

    /* train and test dataset */
    // Load GeoJSON data and add to map
    var geojsonUrlTrain = "https://gisedu.itc.utwente.nl/student/S3234223/project/geojson/train_area_3857.txt";
    var geojsonUrlTest = "https://gisedu.itc.utwente.nl/student/S3234223/project/geojson/test_area_3857.txt";
    let newCoordNl = new ol.proj.transform(enschedeCoord, 'EPSG:4326', 'EPSG:28992');
    // const mapViewNl = new ol.View({
    //     center: newCoordNl,
    //     zoom: 14,
    //     projection: 'EPSG:28992'
    // });

    const trianMap = new ol.Map({
        target: 'train-map',
        layers: [osmLayer, originalPhoto],
        view: mapView,
    });
    var layerSwitcher = new ol.control.LayerSwitcher();
    layerSwitcher.useLegendGraphics = true;
    trianMap.addControl(layerSwitcher);
    fetchGeoJson(geojsonUrlTrain, trianMap);
    var test = document.getElementById("test-tab");
    test.addEventListener("click", function(){
        const testMap = new ol.Map({
            target: 'test-map',
            layers: [osmLayer, originalPhoto],
            view: mapView,
        });
        testMap.addControl(layerSwitcher);
        fetchGeoJson(geojsonUrlTest, testMap);
    });
    var train = document.getElementById("train-tab");
    train.addEventListener("click", function(){
        var div = document.getElementById('test-map');
        while(div.firstChild){
            div.removeChild(div.firstChild);
        }
    });
    /* Button */
    const container = document.querySelector("#wf-button-group");
    const workflowBtns = container.querySelectorAll(".btn-rectangle");
    workflowBtns.forEach(function(btn){
        btn.addEventListener("click", function(e){
            var btnId = btn.id;
            console.log(btnId);
            var pageId;
            switch (btnId) {
                case "collect-explore-btn":
                    pageId = "explore-data-page";
                    break;
                case "train-test-btn":
                    pageId = "train-test-data-page";
                    break;
                case "classification-btn":
                    pageId = "classification-data-page";
                    break;
                case "output-btn":
                    pageId = "map-page";
                    break;
                case "acc-btn":
                    pageId = "acc-page";
                    break;
                case "uncertainty-btn":
                    pageId = "uncertainty-page";
                    break;
              }
            var element = document.getElementById(pageId);
            element.scrollIntoView({
                behavior: "smooth"
            });
        })
    });

    /* sync the navbar on scroll */
    const sections = document.querySelectorAll(".main-content");
    const navLi = document.querySelectorAll("nav .container-fluid #navbarToggler ul li a");
    window.onscroll = () => {
        var current = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 60) {
                current = section.getAttribute("id");
            }
        });

        navLi.forEach((li) => {
            li.classList.remove("active");
            if (li.classList.contains(current)) {
                li.classList.add("active");
            }
            if ((current === "explore-data-page")|(current === "train-test-data-page")|
            (current === "classification-data-page")|(current === "acc-page")|(current === "uncertainty-page")) {
                if (li.id === "workflow") {
                    li.classList.add("active");
                }
            }
        });
    };  
}

function zoom(e){
    var zoomer = e.currentTarget;
    e.offsetX ? offsetX = e.offsetX : offsetX = e.touches[0].pageX
    e.offsetY ? offsetY = e.offsetY : offsetX = e.touches[0].pageX
    x = offsetX/zoomer.offsetWidth*100
    y = offsetY/zoomer.offsetHeight*100
    zoomer.style.backgroundPosition = x + '% ' + y + '%';
}

function fetchGeoJson(geojsonUrl, map) {
    var myStyle = new ol.style.Style({
        stroke: new ol.style.Stroke({
        color: '#000',
        width: 10
        })
    });
    fetch(geojsonUrl)
    .then(response => response.json())
    .then(data => {
        var geojsonFormat = new ol.format.GeoJSON();
        var features = geojsonFormat.readFeatures(data);
        var vectorSource = new ol.source.Vector({
            features: features
        });
        // var vectorSource = new ol.source.Vector({
        //     features: (new ol.format.GeoJSON({
        //         defaultDataProjection: 'EPSG:28992',
        //         featureProjection: 'EPSG:3857'
        //     })).readFeatures(data)
        //   });
        var vectorLayer = new ol.layer.Vector({
            source: vectorSource,
            style: myStyle,
            title: 'polygon layer'
        });
        map.addLayer(vectorLayer);
        // Function to zoom to the clicked feature
        function zoomToFeature(feature) {
            var extent = feature.getGeometry().getExtent();
            map.getView().fit(extent, map.getSize());
        }

        // Click and zoom to feature
        map.on('click', function(event) {
            map.forEachFeatureAtPixel(event.pixel, function(feature) {
                zoomToFeature(feature);
            });
        });
    });
}