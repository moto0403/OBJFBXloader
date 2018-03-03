// 左クリック：オービット
// 右クリック：トラッキング
// ホイール：ドリー
// r：視点リセット


var container;

//シーン、カメラ、レンダラ作成
var scene,camera,renderer;

//ヘルパー関連
var controls,grid;


var cube;




init();

//mtl,obj読み込み
var mtlloader=new THREE.MTLLoader();
mtlloader.setPath('./mtlfile/');
mtlloader.load('testcube.mtl',function(materials){
  materials.preload();

  // var mat=new THREE.MeshNormalMaterial();
  var objloader=new THREE.OBJLoader();
  objloader.setMaterials(materials);
  objloader.setPath('./objfile/');
  objloader.load('testcube.obj',function(object){
    scene.add(object);
  });
});




animate();





function init(){
  container=document.createElement('div');
  document.body.appendChild(container);

  //シーン
  scene=new THREE.Scene();

  //カメラ
  camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,2000);
  var cpos=new THREE.Vector3(0,30,200);
  camera.position.z=cpos.z;
  camera.position.y=cpos.y;

  //レンダラ
  renderer=new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth,window.innerHeight);
  container.appendChild(renderer.domElement);

  //ヘルパー追加
  //カメラ操作
  controls = new THREE.OrbitControls(camera);
  controls.autoRotate=true;
	controls.addEventListener('change',render);
  //グリッド
  grid=new THREE.GridHelper(1000,100,0x888888);
  scene.add(grid);




  //リサイズのイベント
  window.addEventListener('resize',onWindowResize,false);

  //カメラリセット
  window.addEventListener('keydown',resetCamera);


  var ambientlight=new THREE.AmbientLight(0xffffff,0.5);
  scene.add(ambientlight);

  //var axes=new THREE.AxisHelper(100);
  //scene.add(axes);


// テスト用ボックス
  var geo=new THREE.BoxGeometry(10,10,10);
  var mat=new THREE.MeshBasicMaterial({color:0x444400});
  cube=new THREE.Mesh(geo,mat);
  // scene.add(cube);
  // camera.lookAt(cube.position);


}


function animate(){
  requestAnimationFrame(animate);

//
  cube.rotation.y+=0.1;

  //orbitcontrol更新
  controls.update();

  render();
}



//レンダリング
function render(){
  renderer.render(scene,camera);
}




//ウィンドウリサイズ
function onWindowResize(event){
  camera.aspect=window.innerWidth/window.innerHeight;
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.updateProjectionMatrix();
}


//カメラリセット
function resetCamera(event){
  //rでリセット
  if (event.keyCode==82) {
    controls.reset();
    render();
  }
}
