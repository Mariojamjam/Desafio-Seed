let boneco = document.querySelector("#boneco")
let tela = document.querySelector("#tela_1")
let plataformas = document.querySelectorAll(".plataformas")

let velocidade_x = 0
let velocidade_y = 0
let gravidade = 1
let velocidadeMAX = 20
let noChao = false
let tamanho_pulo = -25
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

    noChao=false
    plataformas.forEach((plataformas) => {
        let plataformas_pos = plataformas.getBoundingClientRect()
        if (
            boneco_pos.bottom + velocidade_y >= plataformas_pos.top &&
            boneco_pos.top < plataformas_pos.top &&
            boneco_pos.right > plataformas_pos.left &&
            boneco_pos.left < plataformas_pos.right
        )
            
            {
            novaPosY = plataformas_pos.top - ((plataformas_pos.bottom - plataformas_pos.top)+13)
            noChao = true
            velocidade_y=0
            }

        if (
            velocidade_y <0 &&
            boneco_pos.top + velocidade_y <= plataformas_pos.bottom &&
            boneco_pos.bottom > plataformas_pos.bottom &&
            boneco_pos.right > plataformas_pos.left &&
            boneco_pos.left < plataformas_pos.right
        )
            
            {
            novaPosY = plataformas_pos.bottom
            velocidade_y=0

            }

        if(boneco_pos.right +velocidade_x >= plataformas_pos.left&&
            boneco_pos.bottom > plataformas_pos.top +8&&
            boneco_pos.top < plataformas_pos.bottom -8&&
            boneco_pos.left < plataformas_pos.left
        ){
            novaPosX = plataformas_pos.left- (boneco_pos.right - boneco_pos.left)
            velocidade_x =0

        }

        if(boneco_pos.left +velocidade_x <= plataformas_pos.right&&
            boneco_pos.bottom > plataformas_pos.top+8&&
            boneco_pos.top < plataformas_pos.bottom -8&&
            boneco_pos.right > plataformas_pos.right
        ){
            novaPosX = plataformas_pos.right
            velocidade_x =0

        }
    
    })

    if (novaPosY + boneco.offsetHeight > tela.offsetHeight){
        novaPosY = tela.offsetHeight - boneco.offsetHeight
        noChao = true
        velocidade_y = 0
    }

    boneco.style.left = novaPosX + "px";
    boneco.style.top = novaPosY + "px";

    requestAnimationFrame(movimento)
}

movimento()