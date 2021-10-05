    // // Component
    // AFRAME.registerComponent('collider-check', {
    //     dependencies: ['raycaster'],
      
    //     init: function () {
  
    //       var el = this.el;
    //       var data = this.data;
    //       data.clickTime = 300; // msec
            
    //       const scene = this.el.sceneEl
  
    //       var blockList = document.createElement("a-entity");
    //       blockList.id = "blockList";
    //       scene.appendChild(blockList);
          
    //       colorPicker = document.querySelector("#colorPicker");
    //       blockSelector = document.querySelector("#blockSelector");
    //       buttonRecenter = document.querySelector("#recenter");
  
    //       markerPos = document.querySelector("#markerPos");
    //       data.info = document.querySelector("#info");
          
    //       buttonRecenter.addEventListener('click', () => {
    //         scene.emit('recenter', {});
    //       })
          
    //       scene.addEventListener('touchstart', () => {
    //         if (_f_shotMode) {
    //           changeMode(_MODE_CRAFT);
    //           return true;
    //         } else if (_f_pickMode) {
    //           if (data.block) {
    //             blockPick(data.block);
    //           }
    //           changePickMode(_MODE_CRAFT);
    //           return true;
    //         }
            
    //         data.touchStartTime = new Date();
    //       })
          
    //       function blockPick(blockEntity) {
    //         let color = blockEntity.getAttribute("color");
    //         if (color) {
    //           // 色ブロックモード
    //           blockSelector.value = _COLOR_BLOCK_IMG;
    //           blockSelector.style.backgroundImage="url(./images/" + _COLOR_BLOCK_IMG + ")";
    //           colorSelector.value = color;
    //           colorPicker.value = color;
    //         } else {
    //           // 通常ブロックモード
    //           let blockImg = blockEntity.getAttribute("material").src.id;
    //           blockSelector.value = blockImg;
    //           blockSelector.style.backgroundImage="url(./images/" + blockImg + ")";
    //         }
    //       }
          
    //       scene.addEventListener('touchend', () => {
    //         if ((new Date() - data.touchStartTime) < data.clickTime && data.pos) {
              
    //           let box = document.createElement("a-box");
    //           box.id = generateUuid();
    //           box.className = "block";
    //           if (blockSelector.value == _COLOR_BLOCK_IMG) {
    //             box.setAttribute("color", colorPicker.value);
    //             box.setAttribute("material","shader:standard");
    //           } else {
    //             box.setAttribute("material","shader:standard;src:#"+blockSelector.value);
    //             if (blockSelector.value == _WATER_IMG) {
    //               box.setAttribute("opacity", 0.9);
    //             } else {
    //               box.setAttribute("opacity", 1);
    //             }
  
    //           }
    //           box.setAttribute("position", data.pos.x+" "+data.pos.y+" "+data.pos.z);
    //           box.setAttribute("scale", "1.01 1.01 1.01");
              
    //           blockList.appendChild(box);
    //           sendCreateblock(box);
  
    //         }
    //         data.touchStartTime = '';
    //         data.flgRmBox = false;
            
    //       })
          
    //       function sendCreateblock(blockobj) {
    //         let socketdata = {};
    //         socketdata["datetime"] = new Date();
    //         socketdata["userUuid"] = userUuid;
    //         socketdata["blockUuid"] = blockobj.id;
    //         socketdata["method"] = "create";
    //         let block = [];
    //         block.push({class: (blockobj.getAttribute("class") ? blockobj.getAttribute("class") : "")});
    //         block.push({color: (blockobj.getAttribute("color") ? blockobj.getAttribute("color") : "")});
    //         block.push({material: (!blockobj.getAttribute("color") ? "shader:standard;src:#"+blockSelector.value : "")});
    //         block.push({opacity: (blockobj.getAttribute("opacity") ? blockobj.getAttribute("opacity") : "")});
    //         block.push({position: data.pos.x+" "+data.pos.y+" "+data.pos.z});
    //         block.push({scale: "1.01 1.01 1.01"});
    //         socketdata["block"] = block;
    //         ws.emit("makeblock", JSON.stringify(socketdata));
            
    //       }
          
    //       scene.addEventListener('deleteAll',() => {
    //         console.log("emit: deleteAll");
    //         blockList.parentNode.removeChild(blockList);
    //         blockList = document.createElement("a-entity");
    //         blockList.id = "blockList";
    //         scene.appendChild(blockList);
    //       })
          
    //       scene.addEventListener('save',(e) => {
    //         console.log("emit: save ["+e.detail.savename+"]");
    //         let savename = e.detail.savename;
    //         try {
    //           let data = {};
    //           data["datetime"] = new Date();
    //           data["title"] = "";
    //           data["comment"] = "";
    //           data["list"] = [];
    //           let list = document.getElementsByClassName("block");
              
    //           // とりあえず動いた。暫定的な書き方。
    //           for (var i = 0; i < list.length; i++) {
    //             let block = [];
    //             const attr = ["class","color","material.shader","material.src","opacity","position","scale"];
    //             block.push({class: (list[i].getAttribute("class") ? list[i].getAttribute("class") : "")});
    //             block.push({color: (list[i].getAttribute("color") ? list[i].getAttribute("color") : "")});
    //             block.push({materialShader: (list[i].getAttribute("material").shader ? list[i].getAttribute("material").shader : "")});
    //             block.push({materialSrc: (list[i].getAttribute("material").src.id ? list[i].getAttribute("material").src.id : "")});
    //             block.push({opacity: (list[i].getAttribute("opacity") ? list[i].getAttribute("opacity") : "")});
    //             block.push({position: (list[i].getAttribute("position") ? list[i].getAttribute("position") : "")});
    //             block.push({scale: (list[i].getAttribute("scale") ? list[i].getAttribute("scale") : "")});
    //             data["list"].push(block);
    //           }
    //           localStorage.setItem(savename,JSON.stringify(data));
    //         } catch(e) {
    //           console.log(e);
    //           // 本来呼び出し元で実行すべきだろうが、知識不足でこちらで呼ぶ。
    //           alert(transMessageWords[_LANG]["saveFailure"]);
    //           return false;
    //         }
    //         // 本来呼び出し元で実行すべきだろうが、知識不足でこちらで呼ぶ。
    //         alert(transMessageWords[_LANG]["saveSuccess"]);
    //       })
  
    //       scene.addEventListener('load',(e) => {
    //         console.log("emit: load ["+e.detail.loadname+"]");
    //         scene.emit("deleteAll");
            
    //         let loadname = e.detail.loadname;
            
    //         try {
    //           let data = JSON.parse(localStorage.getItem(loadname));
    //           let list = data["list"];
              
    //           // とりあえず動いた、暫定的な書き方。
    //           // javascriptの配列<->JSONのやり方の理解が追いついてない。
    //           // しかしなんてアホな書き方なんだ・・・
    //           for (let i = 0; i < list.length; i++) {
    //             let box = document.createElement("a-box");
    //             box.className = list[i][0].class;
    //             if (list[i][1].color != "") {
    //               box.setAttribute("color", list[i][1].color);
    //               box.setAttribute("material","shader",list[i][2].materialShader);
    //             } else {
    //               box.setAttribute("material","shader",list[i][2].materialShader);
    //               box.setAttribute("material","src","#"+list[i][3].materialSrc);
    //               box.setAttribute("opacity", list[i][4].opacity);
    //             }
    //             box.setAttribute("position", list[i][5].position);
    //             box.setAttribute("scale", list[i][6].scale);
    
    //             blockList.appendChild(box);
    //           }
    //         } catch(e) {
    //           // 本来呼び出し元で実行すべきだろうが、知識不足でこちらで呼ぶ。
    //           console.log(e);
    //           alert(transMessageWords[_LANG]["loadFailure"]);
    //           return false;
    //         }
    //         // 本来呼び出し元で実行すべきだろうが、知識不足でこちらで呼ぶ。
    //         alert(transMessageWords[_LANG]["loadSuccess"]);
    //       })
          
    //       scene.addEventListener('picker', () => {
    //         changePickMode(_MODE_PICK);
    //       })
  
    //       scene.addEventListener('exportGltf',() => {
    //         console.log("emit: exportGltf");
    //         let options = {
    //           trs: false,
    //           onlyVisible: true,
    //           truncateDrawRange: true,
    //           binary: false,
    //           forceIndices: false,
    //           forcePowerOfTwoTextures: false
    //         };
    //         scene.systems['gltf-exporter'].export(blockList, options);
    //       })
  
    //       scene.addEventListener('exportGlb',() => {
    //         console.log("emit: exportGlb");
    //         let options = {
    //           trs: false,
    //           onlyVisible: true,
    //           truncateDrawRange: true,
    //           binary: true,
    //           forceIndices: false,
    //           forcePowerOfTwoTextures: false
    //         };
    //         scene.systems['gltf-exporter'].export(blockList, options);
    //       })
  
    //       scene.addEventListener('exportObj',() => {
    //         console.log("emit: exportObj");
    //         scene.systems['gltf-exporter'].exportObj(blockList);
    //       })
  
    //       scene.addEventListener('exportStl',() => {
    //         console.log("emit: exportStl");
    //         scene.systems['gltf-exporter'].exportStl(blockList);
    //       })
  
    //       scene.addEventListener('screenshotready', (e) => {
    //         let filename = "craftblocks"+ getFormatDateTime()+".png";
    //         imgLink.href = 'data:image/jpeg;base64,' + event.detail;
    //         imgLink.download = filename;
    //         imgLink.click();
    //         changeMode(_MODE_CRAFT);
    //       })
  
    //       scene.addEventListener('screenshoterror', (e) => {
    //         console.log("screen shot error");
    //         changeMode(_MODE_CRAFT);
    //         alert(transMessageWords[_LANG]["screenshotFailure"]);
    //       })
          
    //       data.target = document.querySelector("#target");
    //       data.marker = document.querySelector("#marker");
    //       data.offsetY = data.marker.getAttribute("scale").y/2;
          
    //       scene.addEventListener('camerastatuschange', (e) => {
    //         data.camerastatus = e.detail.status;
    //       })
    //     },
  










    //     // main loop
    //     tick: function (time, timeDelta) {
    //       if (this.data.camerastatus == "hasVideo") {
    //         let data = this.data;
    //         let el = this.el;
            
    //         el.components.raycaster.refreshObjects();
    //         let intersection = getNearestIntersection(el.components.raycaster.intersections);
    //         if (intersection) {
    //           if (_f_shotMode == 0) {
    //             if (intersection.object.el.getAttribute("material").src.id == _QRCODE_IMG) {
    //               data.marker.setAttribute("visible", false);
    //               data.target.setAttribute("visible", false);
    //             } else {
    //               data.marker.setAttribute("visible", true);
    //               data.target.setAttribute("visible", true);
    //             }
    //           }
    //           if (data.touchStartTime) {
    //             if (!data.flgRmBox && (new Date() - data.touchStartTime) > data.clickTime) {
    //               if (intersection.object.el.className == 'block') {
    //                 sendDeleteBlock(intersection.object.el);
    //                 intersection.object.el.parentNode.removeChild(intersection.object.el);
    //               }
    //               data.flgRmBox = true;
    //             }
    //             data.block = "";
    //           } else {
    //             let pos = intersection.point;
    //             if (intersection.object.el.className == 'block') {
    //               data.block = intersection.object.el;
    //             } else {
    //               data.block = '';
    //             }
    //             pos.x = Math.round(pos.x);
    //             pos.y = Math.round(pos.y - data.offsetY <= 0 ? 0 : pos.y - data.offsetY ) + data.offsetY;
    //             pos.z = Math.round(pos.z);
    //             data.marker.setAttribute("position", pos);
    //             data.pos = pos;
    //           }
    //           if (data.pos) {
    //             data.info.innerHTML = "X:"+ data.pos.x+" Y:" +(data.pos.y - data.offsetY)+" Z:"+data.pos.z;
    //           } else {
    //             data.info.innerHTML = "";
    //           }
    //         } else {
    //           data.pos = "";
    //           data.block = "";
    //           data.marker.setAttribute("visible", false);
    //           data.info.innerHTML = "";
    //         }
  
    //         // get target intersection
    //         function getNearestIntersection(intersections) {
    //           for (var i = 0, l = intersections.length; i < l; i++) {
    //               // ignore cursor itself to avoid flicker && ignore "ignore-ray" class
    //               if (data.target === intersections[i].object.el || intersections[i].object.el.classList.contains("ignore-ray")) { continue; }
    //               return intersections[i];
    //           }
    //           return null;
    //         }
            
    //         function sendDeleteBlock(block) {
    //           let socketdata = {};
    //           socketdata["datetime"] = new Date();
    //           socketdata["userUuid"] = userUuid;
    //           socketdata["blockUuid"] = block.getAttribute("id");
    //           socketdata["method"] = "delete";
    //           ws.emit("makeblock", JSON.stringify(socketdata));
    //         }
    //       }
    //     }
    //   });







    // AFRAME.registerComponent('random-cube-generator', {
    //     init() {
    //             const scene = this.el.sceneEl;

    //             const newCube = document.createElement("a-box")
    //             newCube.setAttribute("color", `${randomCubeColor[random]}`)
    //             newCube.setAttribute("scale", "3 3 3")
    //             newCube.setAttribute('position', "0 0 0")
    //             newCube.setAttribute("class", "cantap")
    //             newCube.setAttribute("xrextras-hold-drag", "")
    //             newCube.setAttribute("xrextras-two-finger-rotate", "")
    //             newCube.setAttribute("xrextras-pinch-scale", "")
    //             scene.appendChild(newCube)  
    //       },
    
    //       tick(){
    //           console.log(newCube.object3D.position)
    //       }
        
        
    // }) 