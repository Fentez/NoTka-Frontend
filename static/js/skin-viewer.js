function initSkinViewer(nick, options) {
  var container = document.getElementById('skin_container');
  if (!container) return;

  var width = (options && options.width) || 280;
  var height = (options && options.height) || 350;

  try {
    var skinViewer = new skinview3d.SkinViewer({
      canvas: container,
      width: width,
      height: height,
      skin: 'https://mc-heads.net/skin/' + nick,
    });

    skinViewer.camera.position.set(35, 20, 50);
    skinViewer.zoom = 0.85;
    skinViewer.animation = new skinview3d.WalkingAnimation();
    skinViewer.animation.speed = 0.6;
    skinViewer.autoRotate = false;

    var btnWalk = document.getElementById('btn-walk');
    var btnRotate = document.getElementById('btn-rotate');
    var isWalking = true;
    var isRotating = false;

    if (btnWalk) {
      btnWalk.addEventListener('click', function() {
        isWalking = !isWalking;
        btnWalk.classList.toggle('active', isWalking);
        if (isWalking) {
          skinViewer.animation = new skinview3d.WalkingAnimation();
          skinViewer.animation.speed = 0.6;
        } else {
          skinViewer.animation = null;
        }
      });
    }
    if (btnRotate) {
      btnRotate.addEventListener('click', function() {
        isRotating = !isRotating;
        btnRotate.classList.toggle('active', isRotating);
        skinViewer.autoRotate = isRotating;
      });
    }
  } catch (e) {}
}
