const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

c.canvas.width = 14 * 64 //window.innerWidth;
c.canvas.height = 24 * 64 //window.innerHeight;

const bgImage = new Image()
bgImage.onload = () => {
    animate()
}
bgImage.src = 'assets/homepageBackground.png'

function animate() {
    requestAnimationFrame(animate)


}