define(['text!reporterTpl/force/force4/line.html'  ,'echarts',
                'echarts/chart/force','echarts/chart/chord' ],function(lineTpl ,ec){
	return { 
 
	 showPage : function(tabid){
			$('#main-content > div[data-contentid="'+tabid+'"]').html(lineTpl) ; 	 
			//Todo...
		 	 
					 	 
			var nodes = [];
			var links = [];
			var constMaxDepth = 4;
			var constMaxChildren = 3;
			var constMinChildren = 2;
			var constMaxRadius = 10;
			var constMinRadius = 2;
			var mainDom = document.getElementById('main');
			
			function rangeRandom(min, max) {
			    return Math.random() * (max - min) + min;
			}
			
			function createRandomNode(depth) {
			    var x = mainDom.clientWidth / 2 + (.5 - Math.random()) * 200;
			    var y = (mainDom.clientHeight - 20) * depth / (constMaxDepth + 1) + 20;
			    var node = {
			        name : 'NODE_' + nodes.length,
			        value : rangeRandom(constMinRadius, constMaxRadius),
			        // Custom properties
			        id : nodes.length,
			        depth : depth,
			        initial : [x, y],
			        fixY : true,
			        category : depth === constMaxDepth ? 0 : 1
			    }
			    nodes.push(node);
			
			    return node;
			}
			
			function forceMockThreeData() {
			    var depth = 0;
			
			    var rootNode = createRandomNode(0);
			    rootNode.name = 'ROOT';
			    rootNode.category = 2;
			
			    function mock(parentNode, depth) {
			        var nChildren = Math.round(rangeRandom(constMinChildren, constMaxChildren));
			        
			        for (var i = 0; i < nChildren; i++) {
			            var childNode = createRandomNode(depth);
			            links.push({
			                source : parentNode.id,
			                target : childNode.id,
			                weight : 1 
			            });
			            if (depth < constMaxDepth) {
			                mock(childNode, depth + 1);
			            }
			        }
			    }
			
			    mock(rootNode, 1);
			}
			
			forceMockThreeData();
			
			option = {
			    title : {
			        text: 'Force',
			        subtext: 'Force-directed tree',
			        x:'right',
			        y:'bottom'
			    },
			    tooltip : {
			        trigger: 'item',
			        formatter: '{a} : {b}'
			    },
			    toolbox: {
			        show : true,
			        feature : {
			            restore : {show: true},
			            magicType: {show: true, type: ['force', 'chord']},
			            saveAsImage : {show: true}
			        }
			    },
			    legend: {
			        x: 'left',
			        data:['叶子节点','非叶子节点', '根节点']
			    },
			    series : [
			        {
			            type:'force',
			            name : "Force tree",
			            ribbonType: false,
			            categories : [
			                {
			                    name: '叶子节点',
			                    itemStyle: {
			                        normal: {
			                            color : '#ff7f50'
			                        }
			                    }
			                },
			                {
			                    name: '非叶子节点',
			                    itemStyle: {
			                        normal: {
			                            color : '#6f57bc'
			                        }
			                    }
			                },
			                {
			                    name: '根节点',
			                    itemStyle: {
			                        normal: {
			                            color : '#af0000'
			                        }
			                    }
			                }
			            ],
			            itemStyle: {
			                normal: {
			                    label: {
			                        show: false
			                    },
			                    nodeStyle : {
			                        brushType : 'both',
			                        strokeColor : 'rgba(255,215,0,0.6)',
			                        lineWidth : 1
			                    }
			                }
			            },
			            minRadius : constMinRadius,
			            maxRadius : constMaxRadius,
			            nodes : nodes,
			            links : links
			        }
			    ]
			};
			
			                    
                     
		 	 
		 	 
        
	         $('#forceReport4').css({width:'1000px',height:'900px'});
	         var myChart = ec.init($('#forceReport4')[0]);
	         myChart.setOption(option) ;
		 		

			
	 
		 	
		 	 
		}
	}
}); 

 