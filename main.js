let boneco = document.querySelector("#boneco")
let tela = document.querySelector("#tela_1")

let velocidade_x = 0
let velocidade_y = 0
let gravidade = 1
let velocidadeMAX = 10
let noChao = false
let tamanho_pulo = -15

let movimento_distancia = 5

let teclas_pressionadas = {}

window.addEventListener("keydown", (event) => {
    teclas_pressionadas[event.key] = true
})

window.addEventListener("keyup", (event) => {
    teclas_pressionadas[event.key] = false
})

function movimento(){
    let boneco_pos = boneco.getBoundingClientRect()
    let tela_pos = tela.getBoundingClientRect()

    if (teclas_pressionadas["ArrowLeft"] && boneco_pos.left >tela_pos.left){
        velocidade_x = -movimento_distancia
    }
    else if (teclas_pressionadas["ArrowRight"] && boneco_pos.right < tela_pos.right){
        velocidade_x = movimento_distancia
    }
    else{
        velocidade_x = 0
    }

    if (teclas_pressionadas["ArrowUp"] && noChao){
        velocidade_y = tamanho_pulo
        noChao = false

    }

    if (!noChao){
        velocidade_y += gravidade
        if (velocidade_y> velocidadeMAX){
            velocidade_y = velocidadeMAX
        }
    }

    let novaPosX = boneco.offsetLeft + velocidade_x
    let novaPosY = boneco.offsetTop + velocidade_y

    if (novaPosX<0) {
        novaPosX = 0
    }

    if (novaPosX + boneco.offsetWidth > tela.offsetWidth){
        novaPosX = tela.offsetWidth - boneco.offsetWidth
    }

    if (novaPosY + boneco.offsetHeight >= tela.offsetHeight){
        novaPosY = tela.offsetHeight - boneco.offsetHeight
        noChao = true
        velocidade_y = 0
    }

    boneco.style.left = novaPosX + "px";
    boneco.style.top = novaPosY + "px";

    requestAnimationFrame(movimento)
}

movimento()